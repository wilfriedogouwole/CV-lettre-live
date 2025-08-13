import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Récupérer toutes les informations de l'utilisateur
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        credits: true,
        subscription: true
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    let stripeData = null;
    
    // Si l'utilisateur a un abonnement avec un ID Stripe
    if (user.subscription?.stripeSubscriptionId) {
      try {
        const stripeSubscription = await stripe.subscriptions.retrieve(
          user.subscription.stripeSubscriptionId,
          { expand: ['items.data.price', 'customer'] }
        );
        
        stripeData = {
          id: stripeSubscription.id,
          status: stripeSubscription.status,
          current_period_start: new Date(stripeSubscription.current_period_start * 1000),
          current_period_end: new Date(stripeSubscription.current_period_end * 1000),
          priceId: stripeSubscription.items.data[0]?.price?.id,
          priceName: stripeSubscription.items.data[0]?.price?.nickname,
          amount: stripeSubscription.items.data[0]?.price?.unit_amount,
          metadata: stripeSubscription.metadata,
          customer: {
            id: stripeSubscription.customer,
            email: typeof stripeSubscription.customer === 'object' ? stripeSubscription.customer.email : null
          }
        };
      } catch (stripeError) {
        console.error("Erreur Stripe:", stripeError);
        stripeData = { error: "Impossible de récupérer les données Stripe" };
      }
    }

    return NextResponse.json({
      userId,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt
      },
      credits: user.credits,
      subscription: user.subscription,
      stripeData,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error("Erreur debug credits:", error);
    return NextResponse.json(
      { error: "Failed to get debug info", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// Endpoint pour forcer la synchronisation avec Stripe
export async function POST() {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const subscription = await prisma.subscription.findUnique({
      where: { userId }
    });

    if (!subscription?.stripeSubscriptionId) {
      return NextResponse.json(
        { error: "No Stripe subscription found" },
        { status: 404 }
      );
    }

    // Récupérer les données Stripe
    const stripeSubscription = await stripe.subscriptions.retrieve(
      subscription.stripeSubscriptionId,
      { expand: ['items.data.price'] }
    );

    // Déterminer le plan et les crédits
    const priceId = stripeSubscription.items.data[0]?.price?.id;
    let planConfig;

    if (priceId === "price_1RGHQtPK9vZL53ppxU832fPv") {
      planConfig = { plan: "standard", cvCredits: 5, letterCredits: 5 };
    } else if (priceId === "price_1RGHR5PK9vZL53ppZXKNf1oy") {
      planConfig = { plan: "premium", cvCredits: -1, letterCredits: -1 };
    } else {
      // Fallback basé sur le montant
      const amount = stripeSubscription.items.data[0]?.price?.unit_amount || 0;
      planConfig = amount >= 2000 
        ? { plan: "premium", cvCredits: -1, letterCredits: -1 }
        : { plan: "standard", cvCredits: 5, letterCredits: 5 };
    }

    // Mettre à jour en base
    const result = await prisma.$transaction(async (tx) => {
      const updatedSubscription = await tx.subscription.update({
        where: { userId },
        data: {
          status: stripeSubscription.status === "active" ? "active" : "inactive",
          plan: planConfig.plan,
          stripePriceId: priceId,
          currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
          currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000)
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

    return NextResponse.json({
      message: "Synchronisation réussie",
      before: {
        subscription: subscription,
        // Les anciens crédits ne sont pas disponibles ici
      },
      after: {
        subscription: result.updatedSubscription,
        credits: result.updatedCredits
      },
      stripeData: {
        status: stripeSubscription.status,
        priceId,
        planDetected: planConfig.plan
      }
    });

  } catch (error) {
    console.error("Erreur sync credits:", error);
    return NextResponse.json(
      { error: "Failed to sync", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}