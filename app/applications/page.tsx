"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Loader2, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

interface Application {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  appliedAt: string;
  pdfUrl: string;
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const userId = "user-123"; // ⚠️ Remplacer avec l'ID réel de l'utilisateur connecté

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch(`/api/applications?userId=${userId}`);
        const data = await res.json();
        setApplications(data.applications || []);
      } catch (err) {
        console.error("Erreur de chargement", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="animate-spin h-6 w-6" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Mes candidatures</h1>
      {applications.length === 0 ? (
        <p>Aucune candidature enregistrée.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {applications.map((app) => (
            <Card key={app.id}>
              <CardHeader>
                <CardTitle>{app.jobTitle}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p><strong>Entreprise :</strong> {app.company}</p>
                <p className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {app.location}</p>
                <p className="text-xs mt-2">📅 {new Date(app.appliedAt).toLocaleDateString()}</p>
                {app.pdfUrl && (
                  <Button variant="link" size="sm" className="mt-2" asChild>
                    <a href={app.pdfUrl} target="_blank" rel="noopener noreferrer">
                      <FileText className="w-4 h-4 mr-1" /> Voir le PDF
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
