"use server"

import { prisma } from '@/lib/prisma';

interface UserData {
  id: string;
  email: string;
  name?: string;
}

export async function createUser(userData: UserData) {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userData.id }
    });

    if (existingUser) {
      // Update user information if it exists
      return await prisma.user.update({
        where: { id: userData.id },
        data: {
          email: userData.email,
          name: userData.name
        }
      });
    }

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        id: userData.id,
        email: userData.email,
        name: userData.name
      }
    });

    return newUser;
  } catch (error) {
    console.error('Error creating/updating user:', error);
    throw new Error('Failed to create/update user');
  }
}