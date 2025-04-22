import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const runtime = 'nodejs';

const DOMAIN = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000" || "https://cvmaster.derrickogouwole.fr/";

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
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY manquant dans .env");
  }

  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { priceId } = await request.json();
    const plan = PLANS[priceId as keyof typeof PLANS];

    if (!plan) {
      return NextResponse.json(
        { error: "Invalid plan" },
        { status: 400 }
      );
    }

    if (!plan.priceId) {
      return NextResponse.json(
        { error: "Price ID not configured" },
        { status: 500 }
      );
    }

    // Get or create Stripe customer
    let subscription = await prisma.subscription.findUnique({
      where: { userId }
    });

    let stripeCustomerId = subscription?.stripeCustomerId;

    if (!stripeCustomerId) {
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });

      if (!user) {
        return NextResponse.json(
          { error: "User not found" },
          { status: 404 }
        );
      }

      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          userId
        }
      });

      stripeCustomerId = customer.id;

      // Create or update subscription record
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

    // Create Stripe checkout session
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
          userId
        }
      }
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}