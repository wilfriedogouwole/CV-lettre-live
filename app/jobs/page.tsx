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

import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import {
  Bookmark,
  Building, Clock, Euro,
  Eye,
  Loader2, MapPin
} from "lucide-react";
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
  const [typeFilter, setTypeFilter] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [page, setPage] = useState(1);

// Utilisation de useCallback pour mémoriser la fonction fetchJobs
const fetchJobs = useCallback(async () => {
  setIsLoading(true);
  try {
    const params = new URLSearchParams({
      q: searchTerm,
      location,
      type: typeFilter !== "tous" ? typeFilter : "",
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
}, [searchTerm, location, typeFilter, page,toast]);  // Dépendances de la fonction

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
            <Input
              placeholder="Ville ou code postal"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Type de contrat" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tous">Tous</SelectItem>
                <SelectItem value="CDI">CDI</SelectItem>
                <SelectItem value="CDD">CDD</SelectItem>
                <SelectItem value="Stage">Stage</SelectItem>
                <SelectItem value="Alternance">Alternance</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin h-4 w-4" /> : "Rechercher"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
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
                <div className="flex items-center gap-1">
                  <Euro className="h-4 w-4" /> {job.salary}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" /> {job.type}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <span className="text-xs text-muted-foreground">{job.source}</span>
              <div className="flex gap-2">
              {/*<Button onClick={() => router.push(`/jobs/${job.url}`)}>*/}
              <Button onClick={() => router.push(`${job.url}`)}>

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
        ))}
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