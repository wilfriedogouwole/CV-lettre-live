"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCredits } from "@/hooks/use-credits";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { FileText, Loader2, PenLine } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function CreditDisplay() {
  const { credits, isLoading, isError, mutate } = useCredits();
  const [lastRefreshed, setLastRefreshed] = useState(new Date());

  // Rafraîchir les données toutes les 30 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      mutate();
      setLastRefreshed(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, [mutate]);

  // État de chargement
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Vos crédits</CardTitle>
          <CardDescription>Chargement de vos crédits...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-6">
          <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  // État d'erreur
  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Vos crédits</CardTitle>
          <CardDescription>Une erreur est survenue</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Impossible de charger vos crédits. Veuillez réessayer plus tard.
          </p>
          <Button 
            onClick={() => mutate()} 
            variant="outline" 
            size="sm" 
            className="mt-4"
          >
            Réessayer
          </Button>
        </CardContent>
      </Card>
    );
  }

  // S'assurer que les données sont structurées correctement
  if (!credits || !credits.credits) {
    console.error("Structure de crédits invalide:", credits);
    return (
      <Card>
        <CardHeader>
          <CardTitle>Vos crédits</CardTitle>
          <CardDescription>Données incorrectes</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Impossible dafficher vos crédits. Format de données incorrect.
          </p>
          <Button 
            onClick={() => mutate()} 
            variant="outline" 
            size="sm" 
            className="mt-4"
          >
            Actualiser
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Extraction des données
  const { cvCredits, letterCredits } = credits.credits;
  const subscription = credits.subscription;
  
  // Vérifier que les valeurs sont numériques
  const displayCvCredits = typeof cvCredits === 'number' ? cvCredits : 0;
  const displayLetterCredits = typeof letterCredits === 'number' ? letterCredits : 0;

  return (
    <div className="flex justify-center w-full">
      <Card className="flex flex-col justify-center items-center w-96 h-96">
        <CardHeader>
          <CardTitle>Vos crédits</CardTitle>
          <CardDescription className="text-center">
            {subscription?.status === "active" ? (
              `Abonnement ${subscription.plan} - Renouvellement ${formatDistanceToNow(new Date(subscription.currentPeriodEnd), { addSuffix: true, locale: fr })}`
            ) : (
              "Plan gratuit"
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-primary" />
                <span>Crédits CV</span>
              </div>
              <span className="font-bold">
                {displayCvCredits === -1 ? "Illimité" : displayCvCredits}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <PenLine className="h-5 w-5 text-primary" />
                <span>Crédits lettres</span>
              </div>
              <span className="font-bold">
                {displayLetterCredits === -1 ? "Illimité" : displayLetterCredits}
              </span>
            </div>
            {subscription?.status !== "active" && (
              <Link href="/pricing" className="mt-4 block">
                <Button className="w-full">
                  Obtenir plus de crédits
                </Button>
              </Link>
            )}
            <Button 
              onClick={() => mutate()} 
              variant="ghost" 
              size="sm" 
              className="mt-2"
            >
              Actualiser les crédits
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}