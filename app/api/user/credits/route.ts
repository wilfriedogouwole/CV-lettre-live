import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      );
    }

    // Récupérer les crédits et l'abonnement de l'utilisateur
    const [credits, subscription] = await Promise.all([
      prisma.credits.findUnique({
        where: { userId }
      }),
      prisma.subscription.findUnique({
        where: { userId }
      })
    ]);

    // Si l'utilisateur n'a pas de crédits, les créer avec les valeurs par défaut
    if (!credits) {
      const newCredits = await prisma.credits.create({
        data: {
          userId,
          cvCredits: 1,
          letterCredits: 1
        }
      });

      return NextResponse.json({
        credits: newCredits,
        subscription: subscription || { plan: "free", status: "inactive" }
      });
    }

    return NextResponse.json({
      credits,
      subscription: subscription || { plan: "free", status: "inactive" }
    });

  } catch (error) {
    console.error("Erreur lors de la récupération des crédits:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      );
    }

    const { type, amount = 1 } = await request.json();

    if (!type || !['cv', 'letter'].includes(type)) {
      return NextResponse.json(
        { error: "Type de crédit invalide" },
        { status: 400 }
      );
    }

    // Vérifier les crédits actuels
    const currentCredits = await prisma.credits.findUnique({
      where: { userId }
    });

    if (!currentCredits) {
      return NextResponse.json(
        { error: "Crédits non trouvés" },
        { status: 404 }
      );
    }

    const fieldName = type === 'cv' ? 'cvCredits' : 'letterCredits';
    const currentAmount = currentCredits[fieldName];

    // Si les crédits sont "illimités" (valeur élevée), ne pas décrémenter
    if (currentAmount >= 999) {
      return NextResponse.json({
        success: true,
        message: "Crédits illimités",
        remainingCredits: currentAmount
      });
    }

    // Vérifier si l'utilisateur a suffisamment de crédits
    if (currentAmount < amount) {
      return NextResponse.json(
        { error: "Crédits insuffisants" },
        { status: 400 }
      );
    }

    // Décrémenter les crédits
    const updatedCredits = await prisma.credits.update({
      where: { userId },
      data: {
        [fieldName]: Math.max(0, currentAmount - amount)
      }
    });

    return NextResponse.json({
      success: true,
      remainingCredits: updatedCredits[fieldName],
      updatedCredits
    });

  } catch (error) {
    console.error("Erreur lors de l'utilisation des crédits:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}