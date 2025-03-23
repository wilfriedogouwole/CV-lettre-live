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
  description: string;
  salary: string;
  type: string;
  url: string;
  source: string;
  createdAt: Date;
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
          setFilteredCommunes(data); // Initialiser les communes filtrées
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

  // Utilisation de useCallback pour mémoriser la fonction fetchJobs
  const fetchJobs = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        q: searchTerm,
        location,
        typeFilter: typeFilter !== "tous" ? typeFilter : "",
        page: page.toString(),
      });
      const response = await fetch(`/api/jobs?${params}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Erreur de récupération");
      setJobs(data.jobs);
      if (data.jobs.length === 0) {
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
  }, [searchTerm, location, typeFilter, page, toast]);

  // Charger les offres d'emploi au montage ou lorsque les filtres changent
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchJobs();
  };

  const handleSaveJob = (jobId: string) => {
    setSavedJobs((prev) => [...new Set([...prev, jobId])]);
    toast({ title: "Offre sauvegardée", description: "Ajoutée à vos favoris." });
  };

  // Filtrer les communes en fonction de la saisie
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

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Offres d&apos;emploi</h1>
        <p className="text-muted-foreground">Trouvez votre prochain poste dès maintenant.</p>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Mot-clé, entreprise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="relative">
              <Input
                placeholder="Ville ou code postal"
                value={location}
                onChange={handleLocationChange}
                list="communes-list"
                className="min-w-[200px]" // Largeur minimale de 200px

              />
              <datalist id="communes-list">
                {filteredCommunes.map((commune) => (
                  <option key={commune.code} value={`${commune.libelle} (${commune.codePostal})`}>
                    {commune.libelle} ({commune.codePostal})
                  </option>
                ))}
              </datalist>
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Type de contrat" />
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
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin h-4 w-4" /> : "Rechercher"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          // Affichage des Skeletons pendant le chargement
          Array.from({ length: 6 }).map((_, idx) => (
            <Card key={idx} className="relative">
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
        ) : (
          jobs.map((job) => (
            <Card key={job.id} className="relative">
              <CardHeader>
                <CardTitle className="line-clamp-2">{job.title}</CardTitle>
                <CardDescription>
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    {job.company}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {job.description}
                </p>
                <div className="flex justify-between mt-4 text-sm">
                  <div className="flex items-center gap-1">💰 {job.salary}</div>
                  <div className="flex items-center gap-1">💼 {job.type}</div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <span className="text-xs text-muted-foreground">{job.source}</span>
                <div className="flex gap-2">
                  <Button onClick={() => router.push(`/jobs/${job.id}`)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleSaveJob(job.id)}
                    disabled={savedJobs.includes(job.id)}
                  >
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))
        )}
      </motion.div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 gap-4">
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Précédent
        </Button>
        <span className="self-center text-sm">Page {page}</span>
        <Button onClick={() => setPage(page + 1)}>Suivant</Button>
      </div>
    </div>
  );
}