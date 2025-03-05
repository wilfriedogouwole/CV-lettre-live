"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Layout, Sparkles, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CVTemplatesPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const templates = [
    {
      title: "Template Élégant",
      description: "Un design épuré avec une mise en page moderne et élégante",
      features: ["Design professionnel", "Mise en page claire", "Sections bien structurées"],
      image: "/images/cv1.jpg"
    },
    {
      title: "Template Créatif",
      description: "Un design contemporain avec des éléments graphiques modernes",
      features: ["Design unique", "Mise en page créative", "Sections personnalisables"],
      image: "/images/cv3.jpg"
    },
    {
      title: "Template Minimaliste",
      description: "Un design simple et efficace qui met en valeur votre contenu",
      features: ["Design minimaliste", "Mise en page épurée", "Focus sur le contenu"],
      image: "/images/cv5.jpg"
    },
    {
      title: "Template Professionnel",
      description: "Un design structuré idéal pour les profils expérimentés",
      features: ["Design classique", "Mise en page traditionnelle", "Sections complètes"],
      image: "/images/cv2.jpg"
    },
    {
      title: "Template Moderne",
      description: "Un design audacieux avec une mise en page originale",
      features: ["Design moderne", "Mise en page innovante", "Sections dynamiques"],
      image: "/images/cv4.jpg"
    }
  ];

  const openImageModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="aspect-[3/4] bg-background">
      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 overflow-auto"
          onClick={closeImageModal}
        >
          <div 
            className="relative bg-white rounded-lg p-4 max-w-[90%] max-h-[90%] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={closeImageModal} 
              className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 shadow-lg hover:bg-gray-100"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
            <div className="flex items-center justify-center w-full h-full">
              <Image
                src={selectedImage}
                alt="CV Template Full View"
                width={450}
                height={400}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Modèles de CV</h1>
          <p className="text-muted-foreground text-lg">
            Choisissez parmi nos modèles professionnels pour créer un CV qui vous ressemble.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {templates.map((template, index) => (
            <Card key={index} className="overflow-hidden h-full">
              <div 
                className="relative overflow-hidden aspect-[3/4] cursor-pointer group"
                onClick={() => openImageModal(template.image)}
              >
                <Image
                  src={template.image}
                  alt={template.title}
                  width={250}
                  height={150}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-sm">Agrandir</span>
                </div>
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
                <Link href="/dashboard/cv">
                  <Button className="w-full">Utiliser ce modèle</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="bg-primary/10">
            <CardHeader>
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Layout className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Mise en page professionnelle</CardTitle>
              <CardDescription>
                Des templates conçus pour mettre en valeur votre parcours.
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
                Adaptez les couleurs et la mise en page selon vos préférences.
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
                Téléchargez votre CV au format PDF, prêt à être envoyé.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}