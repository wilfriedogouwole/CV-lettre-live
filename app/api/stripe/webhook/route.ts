import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";


export const dynamic = 'force-dynamic'; // ⬅️ AJOUTE CECI



export const runtime = 'nodejs';

export async function POST(request: Request) {

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error("STRIPE_WEBHOOK_SECRET must be defined in your environment variables");
  }
  
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  try {
    const body = await request.text();
    const signature = headers().get("Stripe-Signature")!;

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const userId = session.metadata?.userId;
        const planId = session.metadata?.plan;

        if (!userId || !planId) {
          throw new Error("Missing metadata");
        }

        const subscriptionId = typeof session.subscription === 'string' 
          ? session.subscription 
          : session.subscription?.id;

        const subscriptionDetails = subscriptionId 
          ? await stripe.subscriptions.retrieve(subscriptionId)
          : null;

        // Update subscription status
        await prisma.subscription.update({
          where: { userId },
          data: {
            status: "active",
            plan: planId,
            stripePriceId: session.line_items?.data[0]?.price?.id || null,
            stripeSubscriptionId: subscriptionId || null,
            currentPeriodStart: subscriptionDetails 
              ? new Date(subscriptionDetails.current_period_start * 1000)
              : new Date(),
            currentPeriodEnd: subscriptionDetails
              ? new Date(subscriptionDetails.current_period_end * 1000)
              : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // Default to 30 days
          }
        });

        // Update credits based on plan
        const credits = planId === "premium" 
          ? { cvCredits: -1, letterCredits: -1 }  // Unlimited
          : { cvCredits: 5, letterCredits: 5 };   // Standard plan

        // First try to update existing credits
        const existingCredits = await prisma.credits.findUnique({
          where: { userId }
        });

        if (existingCredits) {
          await prisma.credits.update({
            where: { userId },
            data: credits
          });
        } else {
          // If no credits exist, create new entry
          await prisma.credits.create({
            data: {
              userId,
              ...credits
            }
          });
        }

        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object;
        const userId = subscription.metadata?.userId;

        if (!userId) {
          throw new Error("Missing userId in metadata");
        }

        await prisma.subscription.update({
          where: { userId },
          data: {
            status: subscription.status,
            currentPeriodStart: new Date(subscription.current_period_start * 1000),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000)
          }
        });

        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        const userId = subscription.metadata?.userId;

        if (!userId) {
          throw new Error("Missing userId in metadata");
        }

        // Reset to free plan
        await prisma.subscription.update({
          where: { userId },
          data: {
            status: "inactive",
            plan: "free",
            stripePriceId: null,
            stripeSubscriptionId: null
          }
        });

        // Reset credits to free plan
        const existingCredits = await prisma.credits.findUnique({
          where: { userId }
        });

        if (existingCredits) {
          await prisma.credits.update({
            where: { userId },
            data: {
              cvCredits: 1,
              letterCredits: 1
            }
          });
        } else {
          await prisma.credits.create({
            data: {
              userId,
              cvCredits: 1,
              letterCredits: 1
            }
          });
        }

        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}