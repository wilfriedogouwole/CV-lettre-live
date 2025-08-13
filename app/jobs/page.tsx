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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Bookmark, Building, Eye, Loader2, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string | TrustedHTML; // Modifié pour accepter du HTML
  salary: string;
  type: string;
  url: string;
  source: "France Travail" | "Adzuna" | "The Muse";
  createdAt: Date;
  salary_min?: number;
  salary_max?: number;
  contractType?: string;
  publicationDate?: string;
  sourceUrl?: string; // URL de la source si disponible
  sourceId?: string; // ID de la source si disponible
  logoUrl?: string; // URL du logo de l'entreprise si disponible
  [key: string]: any; // Pour permettre d'autres propriétés dynamiques  
  rawDescription?: string; // Ajouté pour le stockage brut
}

export default function JobsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [typeFilter, setTypeFilter] = useState("tous");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [contractTypes, setContractTypes] = useState<{ code: string; libelle: string }[]>([]);
  const [communes, setCommunes] = useState<{ code: string; libelle: string; codePostal: string }[]>([]);
  const [filteredCommunes, setFilteredCommunes] = useState<{ code: string; libelle: string; codePostal: string }[]>([]);
  const [activeSources, setActiveSources] = useState({
    franceTravail: true,
    adzuna: true,
    theMuse: true
  });

  // Récupérer les types de contrats disponibles
  useEffect(() => {
    const fetchContractTypes = async () => {
      try {
        const response = await fetch("/api/contract-types");
        const data = await response.json();
        if (response.ok) {
          setContractTypes(data);
        } else {
          throw new Error(data.error || "Erreur de récupération des types de contrats");
        }
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger les types de contrats",
          variant: "destructive",
        });
      }
    };

    fetchContractTypes();
  }, [toast]);

  // Récupérer les communes disponibles
  useEffect(() => {
    const fetchCommunes = async () => {
      try {
        const response = await fetch("/api/communes");
        const data = await response.json();
        if (response.ok) {
          setCommunes(data);
          setFilteredCommunes(data);
        } else {
          throw new Error(data.error || "Erreur de récupération des communes");
        }
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger les communes",
          variant: "destructive",
        });
      }
    };

    fetchCommunes();
  }, [toast]);

  // Charger les jobs sauvegardés depuis le localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    setSavedJobs(saved);
  }, []);

  const fetchJobs = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = {
        q: searchTerm,
        location,
        typeFilter: typeFilter !== "tous" ? typeFilter : "",
        page: page.toString(),
      };

      const fetchPromises = [];
      
      if (activeSources.franceTravail) {
        fetchPromises.push(
          fetch(`/api/jobs?${new URLSearchParams(params)}`).then(res => res.json())
        );
      }
      
      if (activeSources.adzuna) {
        fetchPromises.push(
          fetch(`/api/adzuna?${new URLSearchParams(params)}`).then(res => res.json())
        );
      }

      if (activeSources.theMuse) {
        fetchPromises.push(
          fetch(`/api/the-muse?${new URLSearchParams(params)}`).then(res => res.json())
        );
      }

      const results = await Promise.all(fetchPromises);
      
      const allJobs = results.flatMap(result => result?.jobs || [])
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      setJobs(allJobs);

      if (allJobs.length === 0) {
        toast({
          title: "Aucun résultat",
          description: "Aucune offre ne correspond à vos critères",
        });
      }
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les offres",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, location, typeFilter, page, activeSources, toast]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchJobs();
  };

  const handleSaveJob = (jobId: string) => {
    const updatedSavedJobs = [...new Set([...savedJobs, jobId])];
    setSavedJobs(updatedSavedJobs);
    localStorage.setItem("savedJobs", JSON.stringify(updatedSavedJobs));
    toast({ 
      title: "Offre sauvegardée", 
      description: "Ajoutée à vos favoris.",
      duration: 2000
    });
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);
    const filtered = communes.filter(
      (commune) =>
        commune.libelle.toLowerCase().includes(value.toLowerCase()) ||
        commune.codePostal.includes(value)
    );
    setFilteredCommunes(filtered);
  };

  const toggleSource = (source: keyof typeof activeSources) => {
    setActiveSources(prev => ({
      ...prev,
      [source]: !prev[source]
    }));
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Offres d&apos;emploi</h1>
        <p className="text-muted-foreground">Trouvez votre prochain poste dès maintenant.</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant={activeSources.franceTravail ? "default" : "outline"}
          onClick={() => toggleSource("franceTravail")}
          size="sm"
        >
          France Travail
        </Button>
        <Button
          variant={activeSources.adzuna ? "default" : "outline"}
          onClick={() => toggleSource("adzuna")}
          size="sm"
        >
          Adzuna
        </Button>
        <Button
          variant={activeSources.theMuse ? "default" : "outline"}
          onClick={() => toggleSource("theMuse")}
          size="sm"
        >
          The Muse
        </Button>
      </div>

    {/* Carte de recherche avec styles améliorés */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="flex flex-col gap-4 md:flex-row md:items-end">
            {/* Conteneur flex pour les champs principaux */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Champ Mot-clé */}
              <div className="space-y-1">
                <label htmlFor="search-term" className="text-sm font-medium text-muted-foreground">
                  Mot-clé ou entreprise
                </label>
                <Input
                  id="search-term"
                  placeholder="Développeur, Designer, Marketing..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Champ Localisation */}
              <div className="space-y-1">
                <label htmlFor="location" className="text-sm font-medium text-muted-foreground">
                  Localisation
                </label>
                <div className="relative">
                  <Input
                    id="location"
                    placeholder="Paris, Lyon, 75000..."
                    value={location}
                    onChange={handleLocationChange}
                    list="communes-list"
                    className="w-full"
                  />
                  <datalist id="communes-list">
                    {filteredCommunes.map((commune) => (
                      <option key={commune.code} value={`${commune.libelle} (${commune.codePostal})`}>
                        {commune.libelle} ({commune.codePostal})
                      </option>
                    ))}
                  </datalist>
                </div>
              </div>
            </div>

            {/* Conteneur flex pour les filtres et bouton */}
            <div className="flex flex-col md:flex-row gap-4 md:items-end">
              {/* Sélecteur de type de contrat */}
              <div className="space-y-1 min-w-[200px]">
                <label className="text-sm font-medium text-muted-foreground">
                  Type de contrat
                </label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tous">Tous</SelectItem>
                    {contractTypes.map((type) => (
                      <SelectItem key={type.code} value={type.code}>
                        {type.libelle}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Bouton de recherche */}
              <Button 
                type="submit" 
                disabled={isLoading} 
                className="h-10 md:h-auto md:min-h-[40px]"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin h-4 w-4" />
                ) : (
                  "Rechercher"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <motion.div 
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {isLoading ? (
          Array.from({ length: 6 }).map((_, idx) => (
            <Card key={idx} className="relative h-full">
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-6 w-3/4" />
                </CardTitle>
                <CardDescription className="space-y-2 mt-2">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
                <div className="flex justify-between mt-4">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Skeleton className="h-4 w-1/4" />
                <div className="flex gap-2">
                  <Skeleton className="h-10 w-10 rounded-md" />
                  <Skeleton className="h-10 w-10 rounded-md" />
                </div>
              </CardFooter>
            </Card>
          ))
        ) : jobs.length > 0 ? (
          jobs.map((job) => (
            <Card key={`${job.source}-${job.id}`} className="relative h-full flex flex-col">
              <CardHeader>
                <CardTitle className="line-clamp-2">{job.title}</CardTitle>
                <CardDescription className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    <span className="line-clamp-1">{job.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span className="line-clamp-1">{job.location}</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {job.description}
                </p>
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-1">
                    💰 {job.salary || 
                      (job.salary_min && job.salary_max 
                        ? `${job.salary_min}€ - ${job.salary_max}€` 
                        : "Non spécifié")}
                  </div>
                  <div className="flex items-center gap-1">
                    💼 {job.type || job.contractType || "Non spécifié"}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <span className="text-xs text-muted-foreground">{job.source}</span>
                <div className="flex gap-2">
                  <Button 
                    size="icon" 
                    onClick={() => router.push(`/jobs/${job.source.toLowerCase().replace(' ', '-')}/${job.id}`)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleSaveJob(`${job.source}-${job.id}`)}
                    disabled={savedJobs.includes(`${job.source}-${job.id}`)}
                  >
                    <Bookmark className={`h-4 w-4 ${
                      savedJobs.includes(`${job.source}-${job.id}`) ? "text-primary fill-primary" : ""
                    }`} />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-muted-foreground">Aucune offre trouvée. Essayez de modifier vos critères de recherche.</p>
          </div>
        )}
      </motion.div>

      {jobs.length > 0 && (
        <div className="flex justify-center mt-10 gap-4">
          <Button 
            variant="outline" 
            disabled={page === 1} 
            onClick={() => setPage(page - 1)}
          >
            Précédent
          </Button>
          <span className="flex items-center px-4 text-sm">Page {page}</span>
          <Button 
            variant="outline" 
            onClick={() => setPage(page + 1)}
          >
            Suivant
          </Button>
        </div>
      )}
    </div>
  );
}