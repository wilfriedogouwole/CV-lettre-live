"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Building, Euro, Loader2, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function JobsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [source, setSource] = useState("all");
  const [jobs, setJobs] = useState<any[]>([]);

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

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const params = new URLSearchParams({
        q: searchTerm,
        location: location,
        source: source
      });

      const response = await fetch(`/api/jobs?${params}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch jobs");
      }

      setJobs(data.jobs);

      if (data.jobs.length === 0) {
        toast({
          title: "Aucun résultat",
          description: "Aucune offre ne correspond à vos critères de recherche",
        });
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la recherche",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Offres d&apos;emploi</h1>
        <p className="text-muted-foreground text-lg">
          Trouvez votre prochain emploi parmi des milliers d&apos;offres
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Poste, entreprise, mots-clés..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <Input
                placeholder="Ville ou code postal"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <Select value={source} onValueChange={setSource}>
                <SelectTrigger>
                  <SelectValue placeholder="Source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les sources</SelectItem>
                  <SelectItem value="indeed">Indeed</SelectItem>
                  <SelectItem value="pole-emploi">Pôle Emploi</SelectItem>
                  <SelectItem value="hellowork">HelloWork</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Recherche...
                </>
              ) : (
                "Rechercher"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {jobs.map((job) => (
          <motion.div key={job.id} variants={item}>
            <Card className="h-full cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="line-clamp-2">{job.title}</CardTitle>
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
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {job.description}
                </p>
                {job.salary && (
                  <div className="flex items-center mt-4">
                    <Euro className="h-4 w-4 mr-2" />
                    <span className="text-sm">{job.salary}</span>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <span className="text-xs text-muted-foreground">{job.source}</span>
                <Button variant="outline" onClick={() => router.push(`/jobs/${job.id}`)}>
                  Voir l&apos;offre
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {jobs.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Utilisez la recherche ci-dessus pour trouver des offres d&apos;emploi
          </p>
        </div>
      )}
    </div>
  );
}