import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

if (!process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error("STRIPE_WEBHOOK_SECRET manquant dans les variables d'environnement");
}

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Configuration centralisée des plans avec les vrais Price IDs de Stripe
const PLAN_CONFIG = {
  "price_1RGHQtPK9vZL53ppxU832fPv": { // Standard Price ID
    plan: "standard",
    cvCredits: 5,
    letterCredits: 5
  },
  "price_1RGHR5PK9vZL53ppZXKNf1oy": { // Premium Price ID
    plan: "premium", 
    cvCredits: -1,
    letterCredits: -1
  }
};

// Fonction utilitaire pour déterminer le plan et les crédits
function getPlanConfig(subscription: any) {
  console.log("Détection du plan pour subscription:", subscription.id);
  
  // 1. Vérifier d'abord les métadonnées
  if (subscription.metadata?.plan) {
    const planFromMeta = subscription.metadata.plan;
    console.log("Plan trouvé dans métadonnées:", planFromMeta);
    
    if (planFromMeta === "standard") {
      return { plan: "standard", cvCredits: 5, letterCredits: 5 };
    } else if (planFromMeta === "premium") {
      return { plan: "premium", cvCredits: -1, letterCredits: -1 };
    }
  }
  
  // 2. Vérifier le premier item de l'abonnement
  if (subscription.items?.data?.[0]?.price?.id) {
    const priceId = subscription.items.data[0].price.id;
    console.log("Price ID trouvé:", priceId);
    
    const config = PLAN_CONFIG[priceId];
    if (config) {
      console.log("Configuration trouvée pour le price ID:", config);
      return config;
    }
  }
  
  // 3. Fallback - analyser le nom du produit ou le price ID
  if (subscription.items?.data?.[0]?.price?.nickname) {
    const nickname = subscription.items.data[0].price.nickname.toLowerCase();
    if (nickname.includes("premium")) {
      return { plan: "premium", cvCredits: -1, letterCredits: -1 };
    } else if (nickname.includes("standard")) {
      return { plan: "standard", cvCredits: 5, letterCredits: 5 };
    }
  }
  
  // 4. Dernier fallback basé sur le montant
  const amount = subscription.items?.data?.[0]?.price?.unit_amount || 0;
  if (amount >= 2000) { // 20€ ou plus = premium
    console.log("Plan premium détecté par le prix:", amount);
    return { plan: "premium", cvCredits: -1, letterCredits: -1 };
  } else {
    console.log("Plan standard détecté par défaut, prix:", amount);
    return { plan: "standard", cvCredits: 5, letterCredits: 5 };
  }
}

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

    console.log(`=== Événement webhook reçu : ${event.type} ===`);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const userId = session.metadata?.userId;
        
        console.log(`Checkout complété pour l'utilisateur ${userId}`);
        console.log("Session metadata:", session.metadata);

        if (!userId) {
          console.error("UserId manquant dans la session metadata");
          return NextResponse.json({ error: "Données incomplètes" }, { status: 400 });
        }

        if (!session.subscription) {
          console.error("ID d'abonnement manquant dans la session");
          return NextResponse.json({ error: "Données incomplètes" }, { status: 400 });
        }

        const subscriptionId = typeof session.subscription === 'string' 
          ? session.subscription 
          : session.subscription.id;
          
        // Récupérer les détails complets de l'abonnement
        const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
          expand: ['items.data.price']
        });
        
        console.log("Détails de l'abonnement récupérés:", {
          id: subscription.id,
          status: subscription.status,
          metadata: subscription.metadata,
          priceId: subscription.items.data[0]?.price?.id
        });
        
        // Obtenir la configuration du plan
        const planConfig = getPlanConfig(subscription);
        console.log("Configuration du plan déterminée:", planConfig);
        
        // Utiliser une transaction pour garantir l'atomicité
        try {
          const result = await prisma.$transaction(async (tx) => {
            // Mise à jour de l'abonnement
            const updatedSubscription = await tx.subscription.upsert({
              where: { userId },
              update: {
                status: "active",
                plan: planConfig.plan,
                stripeCustomerId: session.customer as string,
                stripeSubscriptionId: subscriptionId,
                stripePriceId: subscription.items.data[0]?.price?.id || null,
                currentPeriodStart: new Date(subscription.current_period_start * 1000),
                currentPeriodEnd: new Date(subscription.current_period_end * 1000)
              },
              create: {
                userId,
                status: "active",
                plan: planConfig.plan,
                stripeCustomerId: session.customer as string,
                stripeSubscriptionId: subscriptionId,
                stripePriceId: subscription.items.data[0]?.price?.id || null,
                currentPeriodStart: new Date(subscription.current_period_start * 1000),
                currentPeriodEnd: new Date(subscription.current_period_end * 1000)
              }
            });
            
            // Mise à jour des crédits
            const updatedCredits = await tx.credits.upsert({
              where: { userId },
              update: {
                cvCredits: planConfig.cvCredits,
                letterCredits: planConfig.letterCredits
              },
              create: {
                userId,
                cvCredits: planConfig.cvCredits,
                letterCredits: planConfig.letterCredits
              }
            });
            
            return { updatedSubscription, updatedCredits };
          });
          
          console.log(`✅ Mise à jour réussie pour ${userId}:`, {
            subscription: result.updatedSubscription.plan,
            credits: {
              cv: result.updatedCredits.cvCredits,
              letter: result.updatedCredits.letterCredits
            }
          });
          
        } catch (err) {
          console.error("❌ Erreur lors de la transaction Prisma:", err);
          return NextResponse.json({ error: "Échec de mise à jour en base de données" }, { status: 500 });
        }

        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object;
        
        if (!invoice.subscription) {
          console.error("ID d'abonnement manquant dans la facture");
          return NextResponse.json({ error: "Données incomplètes" }, { status: 400 });
        }
        
        const subscriptionId = typeof invoice.subscription === 'string'
          ? invoice.subscription
          : invoice.subscription.id;
        
        // Récupérer les détails de l'abonnement
        const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
          expand: ['items.data.price']
        });
        
        // Récupérer l'utilisateur via l'abonnement en base
        const dbSubscription = await prisma.subscription.findFirst({
          where: { stripeSubscriptionId: subscriptionId }
        });
        
        if (!dbSubscription) {
          console.error("Abonnement non trouvé en base pour:", subscriptionId);
          return NextResponse.json({ error: "Abonnement introuvable" }, { status: 404 });
        }
        
        const userId = dbSubscription.userId;
        console.log(`Paiement réussi pour l'utilisateur ${userId}`);
        
        // Obtenir la configuration du plan
        const planConfig = getPlanConfig(subscription);
        console.log("Renouvellement - Configuration du plan:", planConfig);

        // Mise à jour périodique des crédits
        try {
          const result = await prisma.$transaction(async (tx) => {
            const updatedSubscription = await tx.subscription.update({
              where: { userId },
              data: {
                status: subscription.status,
                plan: planConfig.plan,
                currentPeriodStart: new Date(subscription.current_period_start * 1000),
                currentPeriodEnd: new Date(subscription.current_period_end * 1000)
              }
            });
            
            const updatedCredits = await tx.credits.upsert({
              where: { userId },
              update: {
                cvCredits: planConfig.cvCredits,
                letterCredits: planConfig.letterCredits
              },
              create: {
                userId,
                cvCredits: planConfig.cvCredits,
                letterCredits: planConfig.letterCredits
              }
            });
            
            return { updatedSubscription, updatedCredits };
          });
          
          console.log(`✅ Crédits renouvelés pour ${userId}:`, {
            credits: {
              cv: result.updatedCredits.cvCredits,
              letter: result.updatedCredits.letterCredits
            }
          });
          
        } catch (err) {
          console.error("❌ Erreur lors du renouvellement:", err);
          return NextResponse.json({ error: "Échec de mise à jour en base de données" }, { status: 500 });
        }

        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object;
        
        // Récupérer l'utilisateur via l'abonnement en base
        const dbSubscription = await prisma.subscription.findFirst({
          where: { stripeSubscriptionId: subscription.id }
        });
        
        if (!dbSubscription) {
          console.log("Abonnement non trouvé en base pour mise à jour:", subscription.id);
          return NextResponse.json({ received: true });
        }
        
        const userId = dbSubscription.userId;
        console.log(`Abonnement mis à jour pour l'utilisateur ${userId}, nouveau statut: ${subscription.status}`);

        // Récupérer les détails complets pour la configuration
        const fullSubscription = await stripe.subscriptions.retrieve(subscription.id, {
          expand: ['items.data.price']
        });
        
        const planConfig = getPlanConfig(fullSubscription);

        // Mise à jour des informations d'abonnement et des crédits si nécessaire
        try {
          await prisma.$transaction(async (tx) => {
            await tx.subscription.update({
              where: { userId },
              data: {
                status: subscription.status,
                plan: planConfig.plan,
                currentPeriodStart: new Date(subscription.current_period_start * 1000),
                currentPeriodEnd: new Date(subscription.current_period_end * 1000)
              }
            });
            
            // Si l'abonnement devient inactif, réinitialiser les crédits
            if (subscription.status === "canceled" || subscription.status === "unpaid") {
              await tx.credits.update({
                where: { userId },
                data: {
                  cvCredits: 1,
                  letterCredits: 1
                }
              });
              console.log(`Crédits réinitialisés pour ${userId} (abonnement ${subscription.status})`);
            }
          });
          
          console.log(`✅ Statut d'abonnement mis à jour pour ${userId}`);
        } catch (err) {
          console.error("❌ Erreur lors de la mise à jour:", err);
        }

        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        
        // Récupérer l'utilisateur via l'abonnement en base
        const dbSubscription = await prisma.subscription.findFirst({
          where: { stripeSubscriptionId: subscription.id }
        });
        
        if (!dbSubscription) {
          console.log("Abonnement non trouvé en base pour suppression:", subscription.id);
          return NextResponse.json({ received: true });
        }
        
        const userId = dbSubscription.userId;
        console.log(`Abonnement supprimé pour l'utilisateur ${userId}`);

        // Réinitialisation vers le plan gratuit
        try {
          await prisma.$transaction(async (tx) => {
            await tx.subscription.update({
              where: { userId },
              data: {
                status: "inactive",
                plan: "free",
                stripeSubscriptionId: null,
                stripePriceId: null
              }
            });
            
            await tx.credits.update({
              where: { userId },
              data: {
                cvCredits: 1,
                letterCredits: 1
              }
            });
          });
          
          console.log(`✅ Utilisateur ${userId} réinitialisé au plan gratuit`);
          
        } catch (err) {
          console.error("❌ Erreur lors de la suppression:", err);
          return NextResponse.json({ error: "Échec de mise à jour en base de données" }, { status: 500 });
        }

        break;
      }

      default:
        console.log(`Événement non géré: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("❌ Erreur générale du webhook :", error);
    return NextResponse.json(
      { error: "Échec du traitement du webhook" },
      { status: 500 }
    );
  }
}