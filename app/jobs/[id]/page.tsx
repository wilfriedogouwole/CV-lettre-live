"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useCVs } from "@/hooks/use-cvs";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Bookmark, Building, Clock, Euro, Loader2, MapPin, Send } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary: string;
  type: string;
  url: string;
  source: string;
  createdAt: Date;
}

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { cvs, isLoading: loadingCVs } = useCVs();
  
  const [selectedCV, setSelectedCV] = useState<string>("");
  const [coverLetter, setCoverLetter] = useState<string>("");
  const [isApplying, setIsApplying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [job, setJob] = useState<Job | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const fetchJobDetails = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/jobs/${params.id}`);
      const data = await response.json();
      console.log(data);
      
      if (!response.ok) throw new Error(data.error || "Erreur de récupération");
      
      setJob(data.job);
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les détails de l'offre",
        variant: "destructive",
      });
      router.push("/jobs");
    } finally {
      setIsLoading(false);
    }
  }, [params.id, router, toast]);

  useEffect(() => {
    fetchJobDetails();
    
    // Vérifie si l'offre est déjà sauvegardée
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    setIsSaved(savedJobs.includes(params.id));
  }, [fetchJobDetails, params.id]);

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
      // Simuler un appel API pour l'envoi de candidature
      await new Promise(resolve => setTimeout(resolve, 1500));
      
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

  const handleSaveJob = () => {
    if (!job) return;
    
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    
    if (!isSaved) {
      const updatedSavedJobs = [...new Set([...savedJobs, job.id])];
      localStorage.setItem("savedJobs", JSON.stringify(updatedSavedJobs));
      setIsSaved(true);
      toast({ 
        title: "Offre sauvegardée", 
        description: "Ajoutée à vos favoris." 
      });
    } else {
      const updatedSavedJobs = savedJobs.filter((id: string) => id !== job.id);
      localStorage.setItem("savedJobs", JSON.stringify(updatedSavedJobs));
      setIsSaved(false);
      toast({ 
        title: "Offre retirée", 
        description: "Retirée de vos favoris." 
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 flex items-center justify-center min-h-[70vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Offre non trouvée</CardTitle>
            <CardDescription>L&apos;offre d&apos;emploi recherchée n&apos;existe pas ou a été supprimée.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => router.push("/jobs")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux offres
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

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
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{job.title}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center space-x-2 mt-1">
                      <Building className="h-4 w-4" />
                      <span>{job.company}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSaveJob}
                  className={isSaved ? "text-primary" : ""}
                >
                  <Bookmark className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Euro className="h-4 w-4" />
                  <span>{job.salary || "Non précisé"}</span>
                </div>
                <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                  {job.type}
                </div>
              </div>
              <div className="prose prose-gray max-w-none">
                <h3 className="text-lg font-semibold mb-2">Description du poste</h3>
                <div className="whitespace-pre-wrap text-muted-foreground">
                  {job.description}
                </div>
              
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
                      ) : cvs?.length === 0 ? (
                        <SelectItem value="none" disabled>
                          Aucun CV disponible
                        </SelectItem>
                      ) : (
                        cvs?.map((cv) => (
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
            <CardContent className="p-0">
              <div className="divide-y">
                {/* Ces offres seraient normalement chargées depuis une API */}
                {[1, 2, 3].map((item) => (
                  <div key={item} className="p-4 hover:bg-muted/50 cursor-pointer" onClick={() => router.push("/jobs/similar-job-id")}>
                    <h3 className="font-medium line-clamp-1">Poste similaire #{item}</h3>
                    <div className="flex items-center justify-between mt-1">
                      <div className="text-sm text-muted-foreground">Entreprise exemple</div>
                      <div className="text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5">CDI</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}