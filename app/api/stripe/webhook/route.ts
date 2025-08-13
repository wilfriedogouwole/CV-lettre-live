import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

if (!process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error("STRIPE_WEBHOOK_SECRET manquant dans les variables d'environnement");
}

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const runtime = 'nodejs';
export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = headers().get("Stripe-Signature")!;

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Échec de vérification de la signature :", err);
      return NextResponse.json({ error: "Signature invalide" }, { status: 400 });
    }

    console.log(`Événement webhook reçu : ${event.type}`);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const userId = session.metadata?.userId;
        const planId = session.metadata?.plan;

        console.log(`Checkout complété pour l'utilisateur ${userId} (plan: ${planId})`);

        if (!userId || !planId) {
          console.error("Metadata manquante dans la session");
          return NextResponse.json({ error: "Données incomplètes" }, { status: 400 });
        }

        // Vérifier que la subscription existe dans la session
        if (!session.subscription) {
          console.error("ID d'abonnement manquant dans la session");
          return NextResponse.json({ error: "Données incomplètes" }, { status: 400 });
        }

        // Récupération des détails de l'abonnement
        const subscriptionId = typeof session.subscription === 'string' 
          ? session.subscription 
          : session.subscription.id;
          
        // Récupérer les détails complets de l'abonnement
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        
        // Log pour déboguer
        console.log(`Détails de l'abonnement récupérés: ${subscriptionId}`);
        console.log(`Plan ID: ${planId}, Statut: ${subscription.status}`);
        
        // Définir les crédits selon le plan
        const credits = {
          cvCredits: planId === "premium" ? -1 : 5,
          letterCredits: planId === "premium" ? -1 : 5
        };
        
        console.log(`Crédits à attribuer:`, credits);
        
        // Utiliser une transaction pour garantir l'atomicité
        try {
          await prisma.$transaction([
            prisma.subscription.upsert({
              where: { userId },
              update: {
                status: "active",
                plan: planId,
                stripeCustomerId: session.customer as string,
                stripeSubscriptionId: subscriptionId,
                currentPeriodStart: new Date(subscription.current_period_start * 1000),
                currentPeriodEnd: new Date(subscription.current_period_end * 1000)
              },
              create: {
                userId,
                status: "active",
                plan: planId,
                stripeCustomerId: session.customer as string,
                stripeSubscriptionId: subscriptionId,
                currentPeriodStart: new Date(subscription.current_period_start * 1000),
                currentPeriodEnd: new Date(subscription.current_period_end * 1000)
              }
            }),
            prisma.credits.upsert({
              where: { userId },
              update: credits,
              create: {
                userId,
                ...credits
              }
            })
          ]);
          
          // Vérifier les crédits mis à jour pour déboguer
          const updatedCredits = await prisma.credits.findUnique({
            where: { userId }
          });
          console.log(`Crédits après mise à jour:`, updatedCredits);
          
        } catch (err) {
          console.error("Erreur lors de la transaction Prisma:", err);
          return NextResponse.json({ error: "Échec de mise à jour en base de données" }, { status: 500 });
        }

        console.log(`Mise à jour réussie pour ${userId}`);
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object;
        
        // Vérifier que la subscription existe
        if (!invoice.subscription) {
          console.error("ID d'abonnement manquant dans la facture");
          return NextResponse.json({ error: "Données incomplètes" }, { status: 400 });
        }
        
        const subscriptionId = typeof invoice.subscription === 'string'
          ? invoice.subscription
          : invoice.subscription.id;
        
        // Récupérer les détails de l'abonnement
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const userId = subscription.metadata?.userId;
        
        // Détermine le plan à partir des métadonnées ou du premier item
        const planId = subscription.metadata?.plan || 
                      (subscription.items?.data[0]?.price?.id?.includes("premium") ? "premium" : "standard");

        if (!userId) {
          console.error("UserId manquant dans les métadonnées de l'abonnement");
          return NextResponse.json({ error: "Données incomplètes" }, { status: 400 });
        }

        console.log(`Paiement réussi pour l'utilisateur ${userId} (plan: ${planId})`);
        
        // Définir les crédits selon le plan
        const credits = {
          cvCredits: planId === "premium" ? -1 : 5,
          letterCredits: planId === "premium" ? -1 : 5
        };
        
        console.log(`Crédits à renouveler:`, credits);

        // Mise à jour périodique des crédits
        try {
          await prisma.$transaction([
            prisma.subscription.update({
              where: { userId },
              data: {
                currentPeriodStart: new Date(subscription.current_period_start * 1000),
                currentPeriodEnd: new Date(subscription.current_period_end * 1000)
              }
            }),
            prisma.credits.update({
              where: { userId },
              data: credits
            })
          ]);
          
          // Vérifier les crédits mis à jour pour déboguer
          const updatedCredits = await prisma.credits.findUnique({
            where: { userId }
          });
          console.log(`Crédits après renouvellement:`, updatedCredits);
          
        } catch (err) {
          console.error("Erreur lors de la transaction Prisma:", err);
          return NextResponse.json({ error: "Échec de mise à jour en base de données" }, { status: 500 });
        }

        console.log(`Crédits renouvelés pour ${userId}`);
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object;
        const userId = subscription.metadata?.userId;

        if (!userId) {
          console.error("UserId manquant dans les métadonnées");
          return NextResponse.json({ error: "Données incomplètes" }, { status: 400 });
        }

        console.log(`Abonnement mis à jour pour l'utilisateur ${userId}`);

        // Mise à jour des informations d'abonnement uniquement
        await prisma.subscription.update({
          where: { userId },
          data: {
            status: subscription.status,
            currentPeriodStart: new Date(subscription.current_period_start * 1000),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000)
          }
        });

        console.log(`Statut d'abonnement mis à jour pour ${userId}`);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        const userId = subscription.metadata?.userId;

        if (!userId) {
          console.error("UserId manquant dans les métadonnées");
          return NextResponse.json({ error: "Données incomplètes" }, { status: 400 });
        }

        console.log(`Abonnement supprimé pour l'utilisateur ${userId}`);

        // Réinitialisation vers le plan gratuit
        try {
          await prisma.$transaction([
            prisma.subscription.update({
              where: { userId },
              data: {
                status: "inactive",
                plan: "free",
                stripeSubscriptionId: null
              }
            }),
            prisma.credits.update({
              where: { userId },
              data: {
                cvCredits: 1,
                letterCredits: 1
              }
            })
          ]);
          
          // Vérifier les crédits mis à jour pour déboguer
          const updatedCredits = await prisma.credits.findUnique({
            where: { userId }
          });
          console.log(`Crédits après suppression d'abonnement:`, updatedCredits);
          
        } catch (err) {
          console.error("Erreur lors de la transaction Prisma:", err);
          return NextResponse.json({ error: "Échec de mise à jour en base de données" }, { status: 500 });
        }

        console.log(`Utilisateur ${userId} réinitialisé au plan gratuit`);
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Erreur du webhook :", error);
    return NextResponse.json(
      { error: "Échec du traitement du webhook" },
      { status: 500 }
    );
  }
}