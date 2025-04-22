"use server"

import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';

interface CVData {
  title: string;
  templateId: string;
  jobPosition?: string;
  company?: string;
  content: any;
}

interface CVUpdateData {
  title?: string;
  jobPosition?: string;
  company?: string;
  content?: any;
}

export async function createCV(data: CVData) {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Vous devez être connecté pour créer un CV');
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
    if (credits.cvCredits !== -1 && credits.cvCredits <= 0) {
      throw new Error('Crédits CV insuffisants');
    }

    // Créer le CV
    const cv = await prisma.cV.create({
      data: {
        title: data.title,
        templateId: data.templateId,
        jobPosition: data.jobPosition || null,
        company: data.company || null,
        content: data.content,
        userId
      }
    });

    // Décrémenter les crédits si pas illimités
    if (credits.cvCredits !== -1) {
      await prisma.credits.update({
        where: { userId },
        data: {
          cvCredits: credits.cvCredits - 1
        }
      });
    }

    revalidatePath('/dashboard/cv');
    return cv;
  } catch (error) {
    console.error('Error creating CV:', error);
    if (error instanceof Error) {
      throw new Error(`Échec de la création du CV: ${error.message}`);
    } else {
      throw new Error('Échec de la création du CV');
    }
  }
}

export async function getCV(id: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  try {
    const cv = await prisma.cV.findUnique({
      where: {
        id,
        userId
      }
    });

    if (!cv) {
      throw new Error('CV not found');
    }

    return cv;
  } catch (error) {
    console.error('Error getting CV:', error);
    throw new Error('Failed to get CV');
  }
}

export async function updateCV(id: string, data: CVUpdateData) {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  try {
    const cv = await prisma.cV.update({
      where: {
        id,
        userId
      },
      data
    });

    revalidatePath(`/dashboard/cv/${id}`);
    return cv;
  } catch (error) {
    console.error('Error updating CV:', error);
    throw new Error('Failed to update CV');
  }
}

export async function deleteCV(id: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  try {
    await prisma.cV.delete({
      where: {
        id,
        userId
      }
    });

    revalidatePath('/dashboard/cv');
    return { success: true };
  } catch (error) {
    console.error('Error deleting CV:', error);
    throw new Error('Failed to delete CV');
  }
}

export async function getCVs() {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  try {
    const cvs = await prisma.cV.findMany({
      where: {
        userId
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });

    return cvs;
  } catch (error) {
    console.error('Error getting CVs:', error);
    throw new Error('Failed to get CVs');
  }
}