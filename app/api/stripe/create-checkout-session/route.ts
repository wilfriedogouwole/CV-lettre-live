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
      cv: 5,
      letter: 5
    }
  },
  premium: {
    name: "Premium",
    priceId: "price_1RGHR5PK9vZL53ppZXKNf1oy",
    credits: {
      cv: -1,
      letter: -1
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
    const { priceId } = await request.json();
    const plan = PLANS[priceId as keyof typeof PLANS];

    // Vérifier que le plan existe
    if (!plan) {
      return NextResponse.json(
        { error: "Plan invalide" },
        { status: 400 }
      );
    }

    console.log(`Création de session pour l'utilisateur ${userId}, plan: ${priceId}`);

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

      // Créer ou mettre à jour l'enregistrement d'abonnement
      subscription = await prisma.subscription.upsert({
        where: { userId },
        update: {
          stripeCustomerId,
          status: "inactive",
          plan: priceId
        },
        create: {
          userId,
          stripeCustomerId,
          status: "inactive",
          plan: priceId
        }
      });
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
      success_url: `${DOMAIN}/dashboard?success=true`,
      cancel_url: `${DOMAIN}/pricing?canceled=true`,
      metadata: {
        userId,
        plan: priceId
      },
      subscription_data: {
        metadata: {
          userId,
          plan: priceId  // S'assurer que le plan est aussi dans les métadonnées de l'abonnement
        }
      }
    });

    console.log(`Session de paiement créée: ${session.id}`);

    // Retourner l'URL de la session de paiement
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Erreur lors de la création de la session de paiement:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}