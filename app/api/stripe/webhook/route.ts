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
        const planId = session.metadata?.planId;

        console.log(`Checkout complété - UserID: ${userId}, PlanID: ${planId}`);
        console.log('Métadonnées de la session:', session.metadata);

        if (!userId || !planId) {
          console.error("Metadata manquante dans la session", { userId, planId, metadata: session.metadata });
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
        
        // Définir les crédits selon le plan
        const creditsToAssign = getCreditsForPlan(planId);
        
        console.log(`Crédits à attribuer pour le plan ${planId}:`, creditsToAssign);
        
        // Utiliser une transaction pour garantir l'atomicité
        try {
          const result = await prisma.$transaction(async (tx) => {
            // Mettre à jour ou créer l'abonnement
            const updatedSubscription = await tx.subscription.upsert({
              where: { userId },
              update: {
                status: "active",
                plan: planId,
                stripeCustomerId: session.customer as string,
                stripeSubscriptionId: subscriptionId,
                stripePriceId: subscription.items.data[0]?.price.id,
                currentPeriodStart: new Date(subscription.current_period_start * 1000),
                currentPeriodEnd: new Date(subscription.current_period_end * 1000)
              },
              create: {
                userId,
                status: "active",
                plan: planId,
                stripeCustomerId: session.customer as string,
                stripeSubscriptionId: subscriptionId,
                stripePriceId: subscription.items.data[0]?.price.id,
                currentPeriodStart: new Date(subscription.current_period_start * 1000),
                currentPeriodEnd: new Date(subscription.current_period_end * 1000)
              }
            });

            // Mettre à jour ou créer les crédits
            const updatedCredits = await tx.credits.upsert({
              where: { userId },
              update: creditsToAssign,
              create: {
                userId,
                ...creditsToAssign
              }
            });

            return { subscription: updatedSubscription, credits: updatedCredits };
          });
          
          console.log(`Transaction réussie pour ${userId}:`, result);
          
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
        const planId = subscription.metadata?.planId;

        if (!userId || !planId) {
          console.error("Métadonnées manquantes dans l'abonnement", { userId, planId });
          return NextResponse.json({ error: "Données incomplètes" }, { status: 400 });
        }

        console.log(`Paiement réussi pour l'utilisateur ${userId} (plan: ${planId})`);
        
        // Définir les crédits selon le plan
        const creditsToRenew = getCreditsForPlan(planId);
        
        console.log(`Crédits à renouveler:`, creditsToRenew);

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
              data: creditsToRenew
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
          
          console.log(`Utilisateur ${userId} réinitialisé au plan gratuit`);
          
        } catch (err) {
          console.error("Erreur lors de la transaction Prisma:", err);
          return NextResponse.json({ error: "Échec de mise à jour en base de données" }, { status: 500 });
        }

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

// Fonction utilitaire pour définir les crédits selon le plan
function getCreditsForPlan(planId: string) {
  switch (planId) {
    case "premium":
      return {
        cvCredits: 999, // Valeur élevée pour "illimité"
        letterCredits: 999
      };
    case "standard":
      return {
        cvCredits: 5,
        letterCredits: 5
      };
    case "free":
    default:
      return {
        cvCredits: 1,
        letterCredits: 1
      };
  }
}