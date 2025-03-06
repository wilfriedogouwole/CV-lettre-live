"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useCVs } from "@/hooks/use-cvs";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Building, Clock, Euro, Loader2, MapPin, Send } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { cvs, isLoading: loadingCVs } = useCVs();
  
  const [selectedCV, setSelectedCV] = useState<string>("");
  const [coverLetter, setCoverLetter] = useState<string>("");
  const [isApplying, setIsApplying] = useState(false);

  // Mock job data - replace with actual API call
  const job = {
    id: params.id,
    title: "Développeur Full Stack",
    company: "Tech Company",
    location: "Paris",
    type: "CDI",
    salary: "45-55k€",
    description: `Nous recherchons un développeur Full Stack expérimenté pour rejoindre notre équipe.

Responsabilités :
- Développement de nouvelles fonctionnalités
- Maintenance et amélioration des applications existantes
- Participation aux choix techniques
- Collaboration avec l'équipe produit

Compétences requises :
- JavaScript/TypeScript
- React.js
- Node.js
- SQL/NoSQL
- Git

Avantages :
- Mutuelle d'entreprise
- Tickets restaurant
- RTT
- Télétravail partiel`,
    requirements: "3+ ans d'expérience en développement web",
    createdAt: new Date(),
    source: "Indeed"
  };

  const handleApply = async () => {
    if (!selectedCV) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un CV",
        variant: "destructive"
      });
      return;
    }

    setIsApplying(true);
    try {
      // Implement application logic here
      
      toast({
        title: "Candidature envoyée",
        description: "Votre candidature a été envoyée avec succès"
      });
      
      router.push("/jobs");
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de votre candidature",
        variant: "destructive"
      });
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => router.push("/jobs")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour aux offres
      </Button>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{job.title}</CardTitle>
              <CardDescription>
                <div className="flex items-center space-x-2">
                  <Building className="h-4 w-4" />
                  <span>{job.company}</span>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Euro className="h-4 w-4" />
                  <span>{job.salary}</span>
                </div>
              </div>
              <div className="prose prose-gray max-w-none">
                <h3 className="text-lg font-semibold mb-2">Description du poste</h3>
                <div className="whitespace-pre-wrap text-muted-foreground">
                  {job.description}
                </div>
                
                <h3 className="text-lg font-semibold mt-6 mb-2">Prérequis</h3>
                <p className="text-muted-foreground">{job.requirements}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Postuler</CardTitle>
              <CardDescription>
                Personnalisez votre candidature pour augmenter vos chances
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="cv" className="space-y-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="cv">CV</TabsTrigger>
                  <TabsTrigger value="letter">Lettre de motivation</TabsTrigger>
                </TabsList>
                
                <TabsContent value="cv" className="space-y-4">
                  <Select value={selectedCV} onValueChange={setSelectedCV}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un CV" />
                    </SelectTrigger>
                    <SelectContent>
                      {loadingCVs ? (
                        <SelectItem value="loading" disabled>
                          Chargement...
                        </SelectItem>
                      ) : cvs.length === 0 ? (
                        <SelectItem value="none" disabled>
                          Aucun CV disponible
                        </SelectItem>
                      ) : (
                        cvs.map((cv) => (
                          <SelectItem key={cv.id} value={cv.id}>
                            {cv.title}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </TabsContent>
                
                <TabsContent value="letter" className="space-y-4">
                  <Textarea
                    placeholder="Rédigez votre lettre de motivation..."
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    rows={10}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full"
                onClick={handleApply}
                disabled={isApplying || !selectedCV}
              >
                {isApplying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Envoyer ma candidature
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>À propos de {job.company}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Informations sur l&apos;entreprise non disponibles pour le moment.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Offres similaires</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Aucune offre similaire pour le moment.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}