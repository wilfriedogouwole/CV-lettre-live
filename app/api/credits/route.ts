import { prisma } from "@/lib/prisma";
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

    // Get or create credits for user
    const credits = await prisma.credits.upsert({
      where: {
        userId
      },
      update: {},
      create: {
        userId,
        cvCredits: 1,
        letterCredits: 1
      }
    });

    // Get subscription status
    const subscription = await prisma.subscription.findUnique({
      where: {
        userId
      }
    });

    return NextResponse.json({
      credits,
      subscription: subscription ? {
        status: subscription.status,
        plan: subscription.plan,
        currentPeriodEnd: subscription.currentPeriodEnd
      } : null
    });
  } catch (error) {
    console.error("Error getting credits:", error);
    return NextResponse.json(
      { error: "Failed to get credits" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { type } = await request.json();

    if (!type || !['cv', 'letter'].includes(type)) {
      return NextResponse.json(
        { error: "Invalid credit type" },
        { status: 400 }
      );
    }

    const credits = await prisma.credits.findUnique({
      where: { userId }
    });

    if (!credits) {
      return NextResponse.json(
        { error: "Credits not found" },
        { status: 404 }
      );
    }

    const creditField = type === 'cv' ? 'cvCredits' : 'letterCredits';
    const currentCredits = credits[creditField];

    // Check if user has unlimited credits (-1)
    if (currentCredits === -1) {
      return NextResponse.json({ success: true, unlimited: true });
    }

    // Check if user has enough credits
    if (currentCredits <= 0) {
      return NextResponse.json(
        { error: "Insufficient credits" },
        { status: 400 }
      );
    }

    // Deduct credit
    const updatedCredits = await prisma.credits.update({
      where: { userId },
      data: {
        [creditField]: currentCredits - 1
      }
    });

    return NextResponse.json({
      success: true,
      remainingCredits: updatedCredits[creditField]
    });
  } catch (error) {
    console.error("Error using credit:", error);
    return NextResponse.json(
      { error: "Failed to use credit" },
      { status: 500 }
    );
  }
}