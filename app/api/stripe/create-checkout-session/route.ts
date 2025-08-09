import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const DOMAIN = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000" || "https://cvmaster.derrickogouwole.fr/";

// Configuration des plans disponibles
const PLANS = {
  standard: {
    name: "Standard",
    priceId: "price_1RGHQtPK9vZL53ppxU832fPv",
    credits: {
      cvCredits: 5,
      letterCredits: 5
    }
  },
  premium: {
    name: "Premium", 
    priceId: "price_1RGHR5PK9vZL53ppZXKNf1oy",
    credits: {
      cvCredits: 999, // Utiliser une grande valeur au lieu de -1
      letterCredits: 999
    }
  }
};

export async function POST(request: Request) {
  try {
    // Authentification de l'utilisateur
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      );
    }

    // Récupérer l'ID du plan choisi depuis la requête
    const { planId } = await request.json();
    const plan = PLANS[planId as keyof typeof PLANS];

    // Vérifier que le plan existe
    if (!plan) {
      return NextResponse.json(
        { error: `Plan invalide: ${planId}` },
        { status: 400 }
      );
    }

    console.log(`Création de session pour l'utilisateur ${userId}, plan: ${planId}`);

    // Récupérer ou créer le client Stripe
    let subscription = await prisma.subscription.findUnique({
      where: { userId }
    });

    let stripeCustomerId = subscription?.stripeCustomerId;

    // Si l'utilisateur n'a pas encore de compte client Stripe
    if (!stripeCustomerId) {
      // Récupérer les infos utilisateur pour obtenir l'email
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });

      if (!user) {
        return NextResponse.json(
          { error: "Utilisateur introuvable" },
          { status: 404 }
        );
      }

      // Créer un client Stripe
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          userId
        }
      });

      stripeCustomerId = customer.id;
      console.log(`Nouveau client Stripe créé: ${stripeCustomerId}`);
    }

    // Créer une session de paiement Stripe
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      billing_address_collection: 'required',
      payment_method_types: ['card'],
      line_items: [
        {
          price: plan.priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${DOMAIN}/dashboard?success=true&plan=${planId}`,
      cancel_url: `${DOMAIN}/pricing?canceled=true`,
      metadata: {
        userId,
        planId // Assurer la cohérence du nom
      },
      subscription_data: {
        metadata: {
          userId,
          planId
        }
      }
    });

    console.log(`Session de paiement créée: ${session.id} pour le plan ${planId}`);

    // Retourner l'URL de la session de paiement
    return NextResponse.json({ 
      url: session.url,
      sessionId: session.id,
      planId 
    });
  } catch (error) {
    console.error("Erreur lors de la création de la session de paiement:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}