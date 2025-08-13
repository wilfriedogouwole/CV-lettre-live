"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCoverLetters } from "@/hooks/use-cover-letters";
import { useCVs } from "@/hooks/use-cvs";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Bookmark,
  Building,
  Calendar,
  Loader2,
  MapPin,
  Send,
} from "lucide-react";
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
  salary_min?: number;
  salary_max?: number;
  publicationDate?: Date;
}
"use client";

// ... (imports existants)

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { cvs, isLoading: loadingCVs } = useCVs();
  const { coverLetters, isLoading: loadingCoverLetters } = useCoverLetters();

  const [selectedCV, setSelectedCV] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [job, setJob] = useState<Job | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [similarJobs, setSimilarJobs] = useState<Job[]>([]);

  const fetchJobDetails = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/jobs/${params.source}/${params.id}`);
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || "Erreur de récupération");

      setJob(data.job);
      setIsSaved(localStorage.getItem("savedJobs")?.includes(data.job.id) || false);

      // Charger des offres similaires
      if (data.job) {
        const similarResponse = await fetch(`/api/jobs?q=${encodeURIComponent(data.job.title.split(' ')[0])}&limit=5`);
        const similarData = await similarResponse.json();
        setSimilarJobs(similarData.jobs.filter((j: Job) => j.id !== data.job.id));
      }
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
  }, [params.source, params.id, router, toast]);

  useEffect(() => {
    fetchJobDetails();
  }, [fetchJobDetails]);

  const handleApply = async () => {
    if (!selectedCV || !selectedLetter) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un CV et une lettre de motivation",
        variant: "destructive",
      });
      return;
    }

    setIsApplying(true);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: job?.id,
          jobTitle: job?.title,
          company: job?.company,
          location: job?.location,
          source: job?.source,
          selectedCV,
          selectedLetter,
        }),
      });

      if (!res.ok) throw new Error("Erreur lors de la candidature");

      toast({
        title: "Candidature envoyée",
        description: "Votre candidature a bien été envoyée",
      });

      router.push("/applications");
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue pendant l'envoi",
        variant: "destructive",
      });
    } finally {
      setIsApplying(false);
    }
  };

  const handleSaveJob = () => {
    if (!job) return;
    
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    const jobKey = `${job.source}-${job.id}`;

    if (!isSaved) {
      const updated = [...new Set([...savedJobs, jobKey])];
      localStorage.setItem("savedJobs", JSON.stringify(updated));
      setIsSaved(true);
      toast({ title: "Offre sauvegardée", duration: 2000 });
    } else {
      const updated = savedJobs.filter((id: string) => id !== jobKey);
      localStorage.setItem("savedJobs", JSON.stringify(updated));
      setIsSaved(false);
      toast({ title: "Offre retirée des favoris", duration: 2000 });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="p-10">
        <Card>
          <CardHeader>
            <CardTitle>Offre introuvable</CardTitle>
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
        onClick={() => router.push("/jobs")} 
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour aux offres
      </Button>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{job.title}</CardTitle>
                  <CardDescription className="flex flex-col space-y-1 mt-2">
                    <span className="flex items-center">
                      <Building className="h-4 w-4 mr-2" /> 
                      {job.company}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" /> 
                      {job.location}
                    </span>
                  </CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleSaveJob}
                >
                  <Bookmark className={`h-5 w-5 ${isSaved ? "text-primary fill-primary" : ""}`} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4 text-sm">
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" /> 
                  {job.publicationDate ? new Date(job.publicationDate).toLocaleDateString() : new Date(job.createdAt).toLocaleDateString()}
                </span>
                <span className="flex items-center">
                  💰 {job.salary || (job.salary_min && job.salary_max 
                    ? `${job.salary_min}€ - ${job.salary_max}€` 
                    : "Non précisé")}
                </span>
                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                  💼 {job.type}
                </span>
              </div>
              
              <div className="prose max-w-none whitespace-pre-wrap text-muted-foreground">
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  Description du poste
                </h3>
                {job.description}
              </div>

              {job.url && (
                <div className="mt-6">
                  <Button asChild>
                    <a 
                      href={job.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      Voir l'offre originale
                    </a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Postuler</CardTitle>
              <CardDescription>
                Sélectionnez vos documents de candidature
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-2">
                  Sélection du CV
                </label>
                <Select 
                  value={selectedCV} 
                  onValueChange={setSelectedCV}
                  disabled={loadingCVs}
                >
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
                      cvs.map((cv) => (
                        <SelectItem key={cv.id} value={cv.id}>
                          {cv.title}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">
                  Lettre de motivation
                </label>
                <Select
                  value={selectedLetter}
                  onValueChange={setSelectedLetter}
                  disabled={loadingCoverLetters}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une lettre" />
                  </SelectTrigger>
                  <SelectContent>
                    {loadingCoverLetters ? (
                      <SelectItem value="loading" disabled>
                        Chargement...
                      </SelectItem>
                    ) : coverLetters?.length === 0 ? (
                      <SelectItem value="none" disabled>
                        Aucune lettre disponible
                      </SelectItem>
                    ) : (
                      coverLetters.map((letter) => (
                        <SelectItem key={letter.id} value={letter.id}>
                          {letter.title}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                disabled={isApplying || !selectedCV || !selectedLetter}
                onClick={handleApply}
              >
                {isApplying ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Envoi...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
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
              <CardTitle>Source</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Plateforme :</span>
                <span className="text-sm text-muted-foreground">
                  {job.source}
                </span>
              </div>
              {job.url && (
                <div className="mt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    asChild
                  >
                    <a 
                      href={job.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Voir sur {job.source}
                    </a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {similarJobs.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Offres similaires</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {similarJobs.map((similar) => (
                    <div
                      key={similar.id}
                      className="p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => router.push(`/jobs/${similar.source.toLowerCase().replace(' ', '-')}/${similar.id}`)}
                    >
                      <h3 className="font-medium line-clamp-1">{similar.title}</h3>
                      <div className="text-sm text-muted-foreground line-clamp-1">
                        {similar.company}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {similar.source}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}