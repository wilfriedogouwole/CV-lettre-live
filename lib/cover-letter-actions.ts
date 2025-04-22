"use server"

import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';

interface CoverLetterData {
  title: string;
  jobPosition?: string;
  company?: string;
  content: string;
  templateId?: string;
}

interface CoverLetterUpdateData {
  title?: string;
  jobPosition?: string;
  company?: string;
  content?: string;
  templateId?: string;
}

export async function createCoverLetter(data: CoverLetterData) {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Vous devez être connecté pour créer une lettre de motivation');
  }

  try {
    // Vérifier les crédits
    const credits = await prisma.credits.findUnique({
      where: { userId }
    });

    if (!credits) {
      throw new Error('Crédits non trouvés');
    }

    // Si les crédits ne sont pas illimités (-1) et sont épuisés
    if (credits.letterCredits !== -1 && credits.letterCredits <= 0) {
      throw new Error('Crédits lettres de motivation insuffisants');
    }

    // Créer la lettre
    const letter = await prisma.coverLetter.create({
      data: {
        title: data.title,
        jobPosition: data.jobPosition || null,
        company: data.company || null,
        content: data.content,
        templateId: data.templateId || 'template1',
        userId
      }
    });

    // Décrémenter les crédits si pas illimités
    if (credits.letterCredits !== -1) {
      await prisma.credits.update({
        where: { userId },
        data: {
          letterCredits: credits.letterCredits - 1
        }
      });
    }

    revalidatePath('/dashboard/letters');
    return letter;
  } catch (error) {
    console.error('Error creating cover letter:', error);
    if (error instanceof Error) {
      throw new Error(`Échec de la création de la lettre: ${error.message}`);
    } else {
      throw new Error('Échec de la création de la lettre de motivation');
    }
  }
}

export async function getCoverLetter(id: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  try {
    const letter = await prisma.coverLetter.findUnique({
      where: {
        id,
        userId
      }
    });

    if (!letter) {
      throw new Error('Cover letter not found');
    }

    return letter;
  } catch (error) {
    console.error('Error getting cover letter:', error);
    throw new Error('Failed to get cover letter');
  }
}

export async function updateCoverLetter(id: string, data: CoverLetterUpdateData) {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  try {
    const letter = await prisma.coverLetter.update({
      where: {
        id,
        userId
      },
      data
    });

    revalidatePath(`/dashboard/letters/${id}`);
    return letter;
  } catch (error) {
    console.error('Error updating cover letter:', error);
    throw new Error('Failed to update cover letter');
  }
}

export async function deleteCoverLetter(id: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  try {
    await prisma.coverLetter.delete({
      where: {
        id,
        userId
      }
    });

    revalidatePath('/dashboard/letters');
    return { success: true };
  } catch (error) {
    console.error('Error deleting cover letter:', error);
    throw new Error('Failed to delete cover letter');
  }
}

export async function getCoverLetters() {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  try {
    const letters = await prisma.coverLetter.findMany({
      where: {
        userId
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });

    return letters;
  } catch (error) {
    console.error('Error getting cover letters:', error);
    throw new Error('Failed to get cover letters');
  }
}