"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, PenLine, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CoverLettersPage() {
  const templates = [
    {
      title: "Lettre Classique",
      description: "Un format traditionnel adapté à tous les secteurs",
      features: ["Structure claire", "Mise en page professionnelle", "Facile à personnaliser"],
      image: "/images/lettre3.jpg"
    },
    {
      title: "Lettre Moderne",
      description: "Un design contemporain pour se démarquer",
      features: ["Design épuré", "Mise en page dynamique", "Sections bien définies"],
      image: "/images/lettre5.jpg"
    },
    {
      title: "Lettre Créative",
      description: "Pour les secteurs créatifs et innovants",
      features: ["Design unique", "Mise en page originale", "Personnalisation avancée"],
      image: "/images/lettre2.jpg"
    },
    {
      title: "Lettre pro",
      description: "Pour les secteurs créatifs et innovants",
      features: ["Design unique", "Mise en page originale", "Personnalisation avancée"],
      image: "/images/lettre4.jpg"
    },
   
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10">
        <div className="mb-8">
        
          <h1 className="text-4xl font-bold mb-4">Modèles de lettres de motivation</h1>
          <p className="text-muted-foreground text-lg">
            Choisissez parmi nos modèles professionnels pour créer une lettre de motivation qui vous ressemble.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {templates.map((template, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-[3/4] relative overflow-hidden">
                <Image
                  src={template.image}
                  alt={template.title}
                  width={250}
                  height={150}
                  className="object-cover w-full h-full"
                />
              </div>
              <CardHeader>
                <CardTitle>{template.title}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  {template.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-muted-foreground">
                      <FileText className="h-4 w-4 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/sign-up">
                  <Button className="w-full">Utiliser ce modèle</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-primary/10">
            <CardHeader>
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <PenLine className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Rédaction assistée</CardTitle>
              <CardDescription>
                Notre assistant vous aide à rédiger une lettre de motivation percutante.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-primary/10">
            <CardHeader>
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Personnalisation facile</CardTitle>
              <CardDescription>
                Adaptez facilement votre lettre selon le poste et l&apos;entreprise visés.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-primary/10">
            <CardHeader>
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Export PDF professionnel</CardTitle>
              <CardDescription>
                Téléchargez votre lettre au format PDF, prête à être envoyée.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}