"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FAQPage() {
  const faqs = [
    {
      question: "Comment créer mon premier CV ?",
      answer: "Pour créer votre premier CV, suivez ces étapes simples :\n1. Inscrivez-vous ou connectez-vous à votre compte\n2. Cliquez sur &apos;Nouveau CV&apos; dans votre tableau de bord\n3. Choisissez un modèle qui vous correspond\n4. Remplissez vos informations personnelles et professionnelles\n5. Personnalisez le design selon vos préférences\n6. Téléchargez votre CV au format PDF"
    },
    {
      question: "Quels formats de fichiers sont disponibles pour le téléchargement ?",
      answer: "Actuellement, tous les CV et lettres de motivation peuvent être téléchargés au format PDF, qui est le format le plus largement accepté par les recruteurs et qui garantit que votre mise en page reste intacte."
    },
    {
      question: "Puis-je modifier mon CV après l&apos;avoir créé ?",
      answer: "Oui, vous pouvez modifier vos CV à tout moment. Il vous suffit d&apos;aller dans la section &apos;Mes CV&apos; de votre tableau de bord, de sélectionner le CV que vous souhaitez modifier, et d&apos;effectuer les changements nécessaires. Toutes les modifications sont sauvegardées automatiquement."
    },
    {
      question: "Comment choisir le bon modèle de CV ?",
      answer: "Le choix du modèle dépend de votre secteur d&apos;activité et de votre expérience. Les modèles classiques conviennent bien aux secteurs traditionnels, tandis que les designs créatifs peuvent être plus appropriés pour les métiers créatifs. Nous proposons différents styles pour répondre à tous les besoins professionnels."
    },
    {
      question: "Mes données sont-elles sécurisées ?",
      answer: "Oui, la sécurité de vos données est notre priorité. Nous utilisons des protocoles de sécurité avancés pour protéger vos informations personnelles. Vos données sont stockées de manière sécurisée et ne sont jamais partagées avec des tiers sans votre consentement."
    },
    {
      question: "Comment créer une lettre de motivation ?",
      answer: "La création d&apos;une lettre de motivation suit un processus similaire à celui du CV :\n1. Cliquez sur &apos;Nouvelle lettre&apos; dans votre tableau de bord\n2. Remplissez les informations de base (poste visé, entreprise)\n3. Rédigez votre contenu ou utilisez notre générateur automatique\n4. Personnalisez le format selon vos besoins\n5. Téléchargez votre lettre au format PDF"
    },
    {
      question: "Puis-je utiliser le service gratuitement ?",
      answer: "Oui, vous pouvez créer des CV et des lettres de motivation gratuitement. Notre version gratuite vous donne accès à des fonctionnalités essentielles pour créer des documents professionnels de qualité."
    },
    {
      question: "Comment obtenir de l&apos;aide supplémentaire ?",
      answer: "Si vous avez besoin d&apos;aide, vous pouvez :\n1. Consulter notre section Conseils pour des guides détaillés\n2. Contacter notre support via le formulaire de contact\n3. Consulter nos tutoriels vidéo disponibles dans la section Ressources"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Questions fréquentes</h1>
          <p className="text-muted-foreground text-lg">
            Trouvez rapidement des réponses à vos questions sur l&apos;utilisation de notre plateforme.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="bg-primary/10 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Besoin d&apos;aide supplémentaire ?</h2>
              <p className="text-muted-foreground mb-4">
                Notre équipe est là pour vous aider à créer des documents professionnels qui font la différence.
              </p>
              <Link href="/contact">
                <Button>Contactez-nous</Button>
              </Link>
            </div>

            <div className="bg-card rounded-lg p-6 border">
              <h2 className="text-xl font-semibold mb-2">Ressources utiles</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/conseils" className="text-primary hover:underline">
                    Guide de rédaction de CV
                  </Link>
                </li>
                <li>
                  <Link href="/conseils" className="text-primary hover:underline">
                    Conseils pour les entretiens
                  </Link>
                </li>
                <li>
                  <Link href="/conseils" className="text-primary hover:underline">
                    Exemples de lettres de motivation
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-card rounded-lg p-6 border">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer.split('\n').map((line, i) => (
                      <p key={i} className="mb-2">{line}</p>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}