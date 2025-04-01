"use server"

import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';

interface KanbanCardData {
  title: string;
  company: string;
  location?: string;
  contractType?: string;
  status: 'wishlist' | 'applied' | 'followup' | 'interview' | 'finished';
}

export async function getKanbanCards() {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  try {
    const cards = await prisma.kanbanCard.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' }
    });

    return cards;
  } catch (error) {
    console.error('Error getting kanban cards:', error);
    throw new Error('Failed to get kanban cards');
  }
}

export async function createKanbanCard(data: KanbanCardData) {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  try {
    const card = await prisma.kanbanCard.create({
      data: {
        ...data,
        userId
      }
    });

    revalidatePath('/dashboard');
    return card;
  } catch (error) {
    console.error('Error creating kanban card:', error);
    throw new Error('Failed to create kanban card');
  }
}

export async function updateKanbanCard(id: string, data: Partial<KanbanCardData>) {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  try {
    const card = await prisma.kanbanCard.update({
      where: {
        id,
        userId
      },
      data
    });

    revalidatePath('/dashboard');
    return card;
  } catch (error) {
    console.error('Error updating kanban card:', error);
    throw new Error('Failed to update kanban card');
  }
}

export async function deleteKanbanCard(id: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  try {
    await prisma.kanbanCard.delete({
      where: {
        id,
        userId
      }
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error deleting kanban card:', error);
    throw new Error('Failed to delete kanban card');
  }
}

export async function deleteAllKanbanCards(status: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  try {
    await prisma.kanbanCard.deleteMany({
      where: {
        userId,
        status
      }
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error deleting kanban cards:', error);
    throw new Error('Failed to delete kanban cards');
  }
}