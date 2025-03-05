"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { createCV } from '@/lib/cv-actions';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const templates = [
  {
    id: "template1",
    name: "Élégant",
    description: "Un design épuré avec une mise en page moderne et élégante",
    thumbnail: "/images/cv1.jpg"
  },
  {
    id: "template2",
    name: "Créatif",
    description: "Un design contemporain avec des éléments graphiques modernes",
    thumbnail: "/images/cv3.jpg"
  },
  {
    id: "template3",
    name: "Minimaliste",
    description: "Un design simple et efficace qui met en valeur votre contenu",
    thumbnail: "/images/cv5.jpg"
  },
  {
    id: "template4",
    name: "Professionnel",
    description: "Un design structuré idéal pour les profils expérimentés",
    thumbnail: "/images/cv2.jpg"
  },
  {
    id: "template5",
    name: "Moderne",
    description: "Un design audacieux avec une mise en page originale",
    thumbnail: "/images/cv4.jpg"
  }
];

export default function CVTemplatesPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [cvTitle, setCvTitle] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [company, setCompany] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateCV = async () => {
    if (!selectedTemplate) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un modèle",
        variant: "destructive"
      });
      return;
    }

    if (!cvTitle) {
      toast({
        title: "Erreur",
        description: "Veuillez donner un titre à votre CV",
        variant: "destructive"
      });
      return;
    }

    setIsCreating(true);

    try {
      const cv = await createCV({
        title: cvTitle,
        templateId: selectedTemplate,
        jobPosition,
        company,
        content: {
          personalInfo: {
            name: "",
            email: "",
            phone: "",
            address: "",
            title: ""
          },
          education: [],
          experience: [],
          skills: [],
          languages: [],
          interests: []
        }
      });

      toast({
        title: "CV créé avec succès",
        description: "Vous pouvez maintenant éditer votre CV"
      });

      router.push(`/dashboard/cv/${cv.id}`);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création du CV",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Choisir un modèle de CV</h1>
        <p className="text-muted-foreground mt-1">
          Sélectionnez un modèle pour commencer à créer votre CV
        </p>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {templates.map((template) => (
          <motion.div key={template.id} variants={item}>
            <Card 
              className={`cursor-pointer transition-all ${
                selectedTemplate === template.id 
                  ? "ring-2 ring-primary" 
                  : "hover:shadow-md"
              }`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              <CardHeader className="pb-2">
                <CardTitle>{template.name}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-[3/4] overflow-hidden rounded-md">
                  <Image
                    src={template.thumbnail} 
                    alt={template.name} 
                    width={250}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant={selectedTemplate === template.id ? "default" : "outline"}
                  className="w-full"
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  {selectedTemplate === template.id ? "Sélectionné" : "Sélectionner"}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle>Informations du CV</CardTitle>
          <CardDescription>
            Entrez les informations de base pour votre CV
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titre du CV *</Label>
            <Input 
              id="title" 
              placeholder="Ex: CV Développeur Web" 
              value={cvTitle}
              onChange={(e) => setCvTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="position">Poste visé</Label>
            <Input 
              id="position" 
              placeholder="Ex: Développeur Frontend" 
              value={jobPosition}
              onChange={(e) => setJobPosition(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Entreprise</Label>
            <Input 
              id="company" 
              placeholder="Ex: Acme Inc." 
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleCreateCV} 
            disabled={!selectedTemplate || !cvTitle || isCreating}
            className="w-full"
          >
            {isCreating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Création en cours...
              </>
            ) : (
              "Créer mon CV"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}