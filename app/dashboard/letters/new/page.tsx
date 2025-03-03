"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { createCoverLetter } from '@/lib/cover-letter-actions';
import { generateCoverLetter } from '@/lib/openai';
import { ArrowLeft, Loader2, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewCoverLetterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [company, setCompany] = useState("");
  const [content, setContent] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("manual");
  
  // Champs pour la génération automatique
  const [candidateName, setCandidateName] = useState("");
  const [candidateExperience, setCandidateExperience] = useState("");
  const [candidateSkills, setCandidateSkills] = useState("");

  const handleCreateLetter = async () => {
    if (!title) {
      toast({
        title: "Erreur",
        description: "Veuillez donner un titre à votre lettre de motivation",
        variant: "destructive"
      });
      return;
    }

    if (!content) {
      toast({
        title: "Erreur",
        description: "Veuillez rédiger le contenu de votre lettre de motivation",
        variant: "destructive"
      });
      return;
    }

    setIsCreating(true);

    try {
      const letter = await createCoverLetter({
        title,
        jobPosition,
        company,
        content
      });

      toast({
        title: "Lettre créée avec succès",
        description: "Vous pouvez maintenant éditer votre lettre de motivation"
      });

      router.push(`/dashboard/letters/${letter.id}`);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création de la lettre",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleGenerateLetter = async () => {
    if (!jobPosition) {
      toast({
        title: "Erreur",
        description: "Veuillez indiquer le poste visé",
        variant: "destructive"
      });
      return;
    }

    if (!company) {
      toast({
        title: "Erreur",
        description: "Veuillez indiquer l'entreprise",
        variant: "destructive"
      });
      return;
    }

    if (!candidateName) {
      toast({
        title: "Erreur",
        description: "Veuillez indiquer votre nom",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    try {
      const generatedContent = await generateCoverLetter({
        jobPosition,
        company,
        candidateName,
        candidateExperience,
        candidateSkills
      });

      if (!generatedContent) {
        throw new Error("Aucun contenu n'a été généré");
      }

      setContent(generatedContent);
      
      if (!title) {
        setTitle(`Lettre de motivation - ${jobPosition} chez ${company}`);
      }

      toast({
        title: "Lettre générée avec succès",
        description: "Vous pouvez maintenant modifier et personnaliser votre lettre"
      });
      
      setActiveTab("manual");
    } catch (error) {
      console.error("Erreur lors de la génération:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la génération de la lettre. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.push('/dashboard/letters')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Nouvelle lettre de motivation</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informations de la lettre</CardTitle>
            <CardDescription>
              Entrez les informations de base pour votre lettre de motivation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titre de la lettre *</Label>
              <Input 
                id="title" 
                placeholder="Ex: Lettre de motivation - Développeur Web" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contenu de la lettre</CardTitle>
            <CardDescription>
              Rédigez ou générez automatiquement le contenu de votre lettre
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="manual">Rédaction manuelle</TabsTrigger>
                <TabsTrigger value="auto">Génération automatique</TabsTrigger>
              </TabsList>
              
              <TabsContent value="manual" className="space-y-4">
                <Textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Rédigez votre lettre de motivation ici..."
                  className="min-h-[300px]"
                />
              </TabsContent>
              
              <TabsContent value="auto" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="candidateName">Votre nom complet</Label>
                    <Input 
                      id="candidateName" 
                      placeholder="Ex: Jean Dupont" 
                      value={candidateName}
                      onChange={(e) => setCandidateName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="candidateExperience">Votre expérience professionnelle</Label>
                    <Textarea 
                      id="candidateExperience" 
                      placeholder="Décrivez brièvement votre expérience professionnelle pertinente pour ce poste" 
                      value={candidateExperience}
                      onChange={(e) => setCandidateExperience(e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="candidateSkills">Vos compétences</Label>
                    <Textarea 
                      id="candidateSkills" 
                      placeholder="Listez vos principales compétences pertinentes pour ce poste" 
                      value={candidateSkills}
                      onChange={(e) => setCandidateSkills(e.target.value)}
                      rows={3}
                    />
                  </div>
                  <Button 
                    onClick={handleGenerateLetter} 
                    disabled={isGenerating}
                    className="w-full"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Génération en cours...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Générer une lettre
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleCreateLetter} 
              disabled={!title || !content || isCreating}
              className="w-full"
            >
              {isCreating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Création en cours...
                </>
              ) : (
                "Créer ma lettre de motivation"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}