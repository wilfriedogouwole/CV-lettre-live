/*"use client";

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
  Send
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
}

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { cvs, isLoading: loadingCVs } = useCVs();
  const { coverLetters, isLoading: loadingCoverLetters } = useCoverLetters();

  const [selectedCV, setSelectedCV] = useState<string>("");
  const [selectedLetter, setSelectedLetter] = useState<string>("");
  const [isApplying, setIsApplying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [job, setJob] = useState<Job | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [similarJobs, setSimilarJobs] = useState<Job[]>([]);

  const fetchSimilarJobs = useCallback(async (jobTitle: string, currentJobId: string) => {
    try {
      const response = await fetch("/api/jobs");
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Erreur de récupération");
      
      // 1. Normalisation du titre actuel
      const normalizedJobTitle = jobTitle.toLowerCase().trim();
      console.log("Titre normalisé:", normalizedJobTitle);
      
      // 2. Filtrage des offres avec le même titre exact
      const exactMatchJobs = data.jobs.filter((item: Job) => {
        // Exclusion de l'offre actuelle
        if (item.id === currentJobId) return false;
        
        // Normalisation du titre de l'offre à comparer
        const normalizedItemTitle = item.title.toLowerCase().trim();
        console.log(`Comparaison: "${normalizedItemTitle}" avec "${normalizedJobTitle}"`);
        
        // Vérification de l'égalité exacte
        return normalizedItemTitle === normalizedJobTitle;
      });
      
      console.log("Offres avec titre identique:", exactMatchJobs);
      
      // 3. Si aucune correspondance exacte, utiliser la méthode par mots-clés
      let sameTitleJobs = exactMatchJobs;
      if (exactMatchJobs.length === 0) {
        console.log("Aucune correspondance exacte, recherche par mots-clés");
        const keywords = normalizedJobTitle.split(/\s+/).filter(word => word.length > 3);
        sameTitleJobs = data.jobs.filter((item: Job) => {
          if (item.id === currentJobId) return false;
          const itemTitle = item.title.toLowerCase();
          return keywords.some(keyword => itemTitle.includes(keyword));
        });
      }
      
      // 4. Mélange et limitation à 7 offres
      const shuffled = sameTitleJobs.sort(() => 0.5 - Math.random()).slice(0, 7);
      setSimilarJobs(shuffled);
      
    } catch (err) {
      console.error("Erreur chargement des offres similaires :", err);
    }
  }, []);

  const fetchJobDetails = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/jobs/${params.id}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Erreur de récupération");

      setJob(data.job);

      // Charger les offres similaires après avoir défini le job
      fetchSimilarJobs(data.job.title, data.job.id);

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
  }, [params.id, router, toast, fetchSimilarJobs]);

  useEffect(() => {
    fetchJobDetails();
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    setIsSaved(savedJobs.includes(params.id));
  }, [fetchJobDetails, params.id]);

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

    if (!isSaved) {
      const updated = [...new Set([...savedJobs, job.id])];
      localStorage.setItem("savedJobs", JSON.stringify(updated));
      setIsSaved(true);
      toast({ title: "Offre sauvegardée" });
    } else {
      const updated = savedJobs.filter((id: string) => id !== job.id);
      localStorage.setItem("savedJobs", JSON.stringify(updated));
      setIsSaved(false);
      toast({ title: "Offre retirée des favoris" });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin h-6 w-6" />
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
      <Button variant="ghost" onClick={() => router.push("/jobs")} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour aux offres
      </Button>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between">
                <div>
                  <CardTitle>{job.title}</CardTitle>
                  <CardDescription className="flex flex-col space-y-1 mt-2">
                    <span className="flex items-center"><Building className="h-4 w-4 mr-2" /> {job.company}</span>
                    <span className="flex items-center"><MapPin className="h-4 w-4 mr-2" /> {job.location}</span>
                  </CardDescription>
                </div>
                <Button variant="ghost" size="icon" onClick={handleSaveJob}>
                  <Bookmark className={`h-5 w-5 ${isSaved ? "text-primary" : ""}`} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4 text-sm">
                <span className="flex items-center"><Calendar className="h-4 w-4 mr-1" /> {new Date(job.createdAt).toLocaleDateString()}</span>
                <span className="flex items-center">💰 {job.salary || "Non précisé"}</span>
                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">💼 {job.type}</span>
              </div>
              <div className="prose max-w-none whitespace-pre-wrap text-muted-foreground">
                <h3 className="text-lg font-semibold mb-2">Description du poste</h3>
                {job.description}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Postuler</CardTitle>
              <CardDescription>Sélectionnez vos documents de candidature</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Sélection du CV</label>
                <Select value={selectedCV} onValueChange={setSelectedCV}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un CV" />
                  </SelectTrigger>
                  <SelectContent>
                    {loadingCVs ? (
                      <SelectItem value="loading" disabled>Chargement...</SelectItem>
                    ) : cvs?.length === 0 ? (
                      <SelectItem value="none" disabled>Aucun CV disponible</SelectItem>
                    ) : cvs.map((cv) => (
                      <SelectItem key={cv.id} value={cv.id}>{cv.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Lettre de motivation</label>
                <Select value={selectedLetter} onValueChange={setSelectedLetter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une lettre de motivation" />
                  </SelectTrigger>
                  <SelectContent>
                    {loadingCoverLetters ? (
                      <SelectItem value="loading" disabled>Chargement...</SelectItem>
                    ) : coverLetters?.length === 0 ? (
                      <SelectItem value="none" disabled>Aucune lettre disponible</SelectItem>
                    ) : coverLetters.map((letter) => (
                      <SelectItem key={letter.id} value={letter.id}>{letter.title}</SelectItem>
                    ))}
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
              <CardTitle>👨‍💼 {job.company}</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Autres Offres</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
             
                {similarJobs.length > 0 ? (
                  similarJobs.map((similar) => (
                    <div
                      key={similar.id}
                      className="p-4 hover:bg-muted/50 cursor-pointer"
                      onClick={() => router.push(`/jobs/${similar.id}`)}
                    >
                      <h3 className="font-medium">{similar.title}</h3>
                      <div className="text-sm text-muted-foreground">{similar.company}</div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-sm text-muted-foreground">Aucune offre similaire trouvée.</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
*/