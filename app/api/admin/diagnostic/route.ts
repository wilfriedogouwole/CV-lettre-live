// pages/api/admin/diagnostic.ts
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Sécurité : vérifier que c'est un admin (vous pouvez adapter selon votre système)
  const { searchParams } = new URL(request.url);
  const adminKey = searchParams.get('adminKey');
  
  if (adminKey !== process.env.ADMIN_SECRET_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    console.log("🔍 Démarrage du diagnostic...");

    // 1. Vérifier tous les utilisateurs avec abonnements
    const usersWithSubscriptions = await prisma.user.findMany({
      include: {
        subscription: true,
        credits: true
      },
      where: {
        subscription: {
          isNot: null
        }
      }
    });

    console.log(`📊 Trouvé ${usersWithSubscriptions.length} utilisateurs avec abonnements`);

    const diagnosticResults = [];

    for (const user of usersWithSubscriptions) {
      const userDiagnostic = {
        userId: user.id,
        email: user.email,
        localData: {
          subscription: user.subscription,
          credits: user.credits
        },
        stripeData: null,
        issues: [],
        recommendations: []
      };

      // 2. Vérifier les données Stripe si applicable
      if (user.subscription?.stripeSubscriptionId) {
        try {
          const stripeSubscription = await stripe.subscriptions.retrieve(
            user.subscription.stripeSubscriptionId,
            { expand: ['items.data.price'] }
          );

          userDiagnostic.stripeData = {
            id: stripeSubscription.id,
            status: stripeSubscription.status,
            current_period_start: new Date(stripeSubscription.current_period_start * 1000),
            current_period_end: new Date(stripeSubscription.current_period_end * 1000),
            priceId: stripeSubscription.items.data[0]?.price?.id,
            amount: stripeSubscription.items.data[0]?.price?.unit_amount,
            metadata: stripeSubscription.metadata
          };

          // 3. Analyser les incohérences
          const localStatus = user.subscription.status;
          const stripeStatus = stripeSubscription.status;
          
          if (localStatus !== stripeStatus && stripeStatus === "active") {
            userDiagnostic.issues.push(`Statut local (${localStatus}) différent de Stripe (${stripeStatus})`);
            userDiagnostic.recommendations.push("Mettre à jour le statut local");
          }

          // Vérifier les crédits selon le plan
          const priceId = stripeSubscription.items.data[0]?.price?.id;
          let expectedCredits;

          if (priceId === "price_1RGHQtPK9vZL53ppxU832fPv") {
            expectedCredits = { cv: 5, letter: 5, plan: "standard" };
          } else if (priceId === "price_1RGHR5PK9vZL53ppZXKNf1oy") {
            expectedCredits = { cv: -1, letter: -1, plan: "premium" };
          } else {
            userDiagnostic.issues.push(`Price ID inconnu: ${priceId}`);
            expectedCredits = { cv: 1, letter: 1, plan: "unknown" };
          }

          if (user.credits) {
            if (user.credits.cvCredits !== expectedCredits.cv) {
              userDiagnostic.issues.push(`Crédits CV incorrects: ${user.credits.cvCredits} au lieu de ${expectedCredits.cv}`);
              userDiagnostic.recommendations.push(`Corriger les crédits CV à ${expectedCredits.cv}`);
            }
            if (user.credits.letterCredits !== expectedCredits.letter) {
              userDiagnostic.issues.push(`Crédits lettres incorrects: ${user.credits.letterCredits} au lieu de ${expectedCredits.letter}`);
              userDiagnostic.recommendations.push(`Corriger les crédits lettres à ${expectedCredits.letter}`);
            }
          } else {
            userDiagnostic.issues.push("Aucun enregistrement de crédits trouvé");
            userDiagnostic.recommendations.push("Créer un enregistrement de crédits");
          }

          if (user.subscription.plan !== expectedCredits.plan) {
            userDiagnostic.issues.push(`Plan local incorrect: ${user.subscription.plan} au lieu de ${expectedCredits.plan}`);
            userDiagnostic.recommendations.push(`Corriger le plan à ${expectedCredits.plan}`);
          }

        } catch (stripeError) {
          userDiagnostic.issues.push(`Erreur Stripe: ${stripeError.message}`);
          userDiagnostic.recommendations.push("Vérifier la validité de l'ID d'abonnement Stripe");
        }
      } else {
        userDiagnostic.issues.push("Pas d'ID d'abonnement Stripe");
      }

      diagnosticResults.push(userDiagnostic);
    }

    // 4. Résumé général
    const summary = {
      totalUsers: usersWithSubscriptions.length,
      usersWithIssues: diagnosticResults.filter(r => r.issues.length > 0).length,
      commonIssues: {},
      timestamp: new Date().toISOString()
    };

    // Compter les problèmes fréquents
    diagnosticResults.forEach(result => {
      result.issues.forEach(issue => {
        const key = issue.split(':')[0]; // Prendre la première partie avant ':'
        summary.commonIssues[key] = (summary.commonIssues[key] || 0) + 1;
      });
    });

    console.log("✅ Diagnostic terminé");

    return NextResponse.json({
      summary,
      details: diagnosticResults,
      generated: new Date().toISOString()
    });

  } catch (error) {
    console.error("❌ Erreur lors du diagnostic:", error);
    return NextResponse.json(
      { error: "Erreur lors du diagnostic", details: error.message },
      { status: 500 }
    );
  }
}

// Endpoint pour corriger automatiquement les problèmes détectés
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const adminKey = searchParams.get('adminKey');
  
  if (adminKey !== process.env.ADMIN_SECRET_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { userId, action } = await request.json();

    if (!userId || !action) {
      return NextResponse.json({ error: "userId et action requis" }, { status: 400 });
    }

    console.log(`🔧 Correction pour utilisateur ${userId}, action: ${action}`);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { subscription: true, credits: true }
    });

    if (!user?.subscription?.stripeSubscriptionId) {
      return NextResponse.json({ error: "Abonnement Stripe non trouvé" }, { status: 404 });
    }

    // Récupérer les données Stripe
    const stripeSubscription = await stripe.subscriptions.retrieve(
      user.subscription.stripeSubscriptionId,
      { expand: ['items.data.price'] }
    );

    const priceId = stripeSubscription.items.data[0]?.price?.id;
    let planConfig;

    if (priceId === "price_1RGHQtPK9vZL53ppxU832fPv") {
      planConfig = { plan: "standard", cvCredits: 5, letterCredits: 5 };
    } else if (priceId === "price_1RGHR5PK9vZL53ppZXKNf1oy") {
      planConfig = { plan: "premium", cvCredits: -1, letterCredits: -1 };
    } else {
      return NextResponse.json({ error: `Price ID non reconnu: ${priceId}` }, { status: 400 });
    }

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

    console.log(`✅ Correction appliquée pour ${userId}`);

    return NextResponse.json({
      message: "Correction appliquée avec succès",
      userId,
      result: {
        subscription: result.updatedSubscription,
        credits: result.updatedCredits
      }
    });

  } catch (error) {
    console.error("❌ Erreur lors de la correction:", error);
    return NextResponse.json(
      { error: "Erreur lors de la correction", details: error.message },
      { status: 500 }
    );
  }
}