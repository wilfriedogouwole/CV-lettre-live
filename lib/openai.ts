// Fonction de génération de lettre de motivation sans utiliser l'API OpenAI
// Utilise des modèles prédéfinis à la place
/*
export async function generateCoverLetter(params: {
  jobPosition: string;
  company: string;
  candidateName: string;
  candidateExperience: string;
  candidateSkills: string;
}) {
  try {
    const { jobPosition, company, candidateName, candidateExperience, candidateSkills } = params;
    
    // Date actuelle formatée
    const today = new Date().toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Extraire les compétences clés (jusqu'à 3)
    const skills = candidateSkills
      .split(/[,;.]/)
      .filter(skill => skill.trim().length > 0)
      .slice(0, 3)
      .map(skill => skill.trim());

    // Générer une introduction basée sur le poste et l'entreprise
    let introduction = '';
    if (jobPosition.toLowerCase().includes('développeur') || jobPosition.toLowerCase().includes('developer')) {
      introduction = `Passionné(e) par le développement informatique et particulièrement intéressé(e) par les activités de ${company} dans le domaine technologique, je vous soumets ma candidature pour le poste de ${jobPosition}.`;
    } else if (jobPosition.toLowerCase().includes('design')) {
      introduction = `Créatif(ve) et rigoureux(se), je suis vivement intéressé(e) par le poste de ${jobPosition} au sein de ${company}, entreprise dont je suis l'évolution avec attention.`;
    } else if (jobPosition.toLowerCase().includes('market')) {
      introduction = `Attiré(e) par les défis du marketing moderne et admiratif(ve) de la stratégie de ${company}, je souhaite vous proposer ma candidature au poste de ${jobPosition}.`;
    } else {
      introduction = `Suite à votre offre d'emploi pour le poste de ${jobPosition}, je me permets de vous adresser ma candidature. Particulièrement intéressé(e) par les activités de ${company}, je souhaite mettre mes compétences et mon expérience à votre service.`;
    }

    // Générer un paragraphe sur l'expérience
    let experienceParagraph = '';
    if (candidateExperience.length > 10) {
      experienceParagraph = `Au cours de mon parcours professionnel, ${candidateExperience}. Ces expériences m'ont permis de développer une solide expertise dans ce domaine.`;
    } else {
      experienceParagraph = `Fort(e) de plusieurs années d'expérience dans ce secteur, j'ai pu développer des compétences essentielles qui correspondent parfaitement aux exigences du poste que vous proposez.`;
    }

    // Générer un paragraphe sur les compétences
    let skillsParagraph = '';
    if (skills.length > 0) {
      skillsParagraph = `Je maîtrise particulièrement ${skills.join(', ')}, compétences qui me permettront d'être rapidement opérationnel(le) au sein de votre équipe.`;
    } else {
      skillsParagraph = `Mes compétences techniques et relationnelles me permettront de m'intégrer efficacement dans votre environnement de travail et de contribuer activement à vos projets.`;
    }

    // Générer un paragraphe sur la motivation
    const motivationParagraph = `Travailler pour ${company} représente pour moi une opportunité exceptionnelle de mettre à profit mes connaissances dans un environnement stimulant et innovant. Votre entreprise jouit d'une excellente réputation dans le secteur, et je serais honoré(e) de rejoindre vos équipes pour contribuer à vos succès futurs.`;

    // Générer la conclusion
    const conclusion = `Je me tiens à votre disposition pour un entretien qui me permettrait de vous exposer plus en détail mes motivations et la façon dont je conçois ma contribution au sein de ${company}. Dans l'attente de votre réponse, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.`;

    // Assembler la lettre complète
    const coverLetter = `
${today}

Responsable des Ressources Humaines
${company}

Objet: Candidature au poste de ${jobPosition}

Madame, Monsieur,

${introduction}

${experienceParagraph}

${skillsParagraph}

${motivationParagraph}

${conclusion}

${candidateName}
`;

    return coverLetter.trim();
  } catch (error) {
    console.error("Erreur lors de la génération de la lettre de motivation:", error);
    throw new Error("Impossible de générer la lettre de motivation. Veuillez réessayer plus tard.");
  }
}*/
"use server"

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
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OpenAI API key is not configured");
  }

  const { jobPosition, company, candidateName, candidateExperience, candidateSkills } = params;

  try {
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
      /*model: "gpt-4-turbo-preview",*/
      model:"gpt-4o-mini",

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

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error generating cover letter:", error);
    throw new Error("Failed to generate cover letter");
  }
}