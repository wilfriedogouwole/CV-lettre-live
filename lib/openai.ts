"use server"

import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface GenerateLetterParams {
  jobPosition: string;
  company: string;
  candidateName: string;
  candidateExperience: string;
  candidateSkills: string;
}

export async function generateCoverLetter(params: GenerateLetterParams) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Vous devez être connecté pour générer une lettre");
  }

  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OpenAI API key is not configured");
  }

  try {
    // Vérifier les crédits
    const credits = await prisma.credits.findUnique({
      where: { userId }
    });

    if (!credits) {
      throw new Error("Crédits non trouvés");
    }

    // Si les crédits ne sont pas illimités (-1) et sont épuisés
    if (credits.letterCredits !== -1 && credits.letterCredits <= 0) {
      throw new Error("Crédits lettres de motivation insuffisants");
    }

    const { jobPosition, company, candidateName, candidateExperience, candidateSkills } = params;

    const prompt = `Write a professional cover letter in French for a ${jobPosition} position at ${company}.

Candidate Information:
- Name: ${candidateName}
- Experience: ${candidateExperience}
- Skills: ${candidateSkills}

The letter should:
- Be formal and professional
- Follow French business letter format
- Highlight relevant experience and skills
- Show enthusiasm for the role and company
- Be around 300-400 words
- Include a proper greeting and closing
- Be written in French`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are a professional cover letter writer with expertise in French business correspondence."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
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

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error generating cover letter:", error);
    if (error instanceof Error) {
      throw new Error(`Échec de la génération de la lettre: ${error.message}`);
    }
    throw new Error("Failed to generate cover letter");
  }
}

