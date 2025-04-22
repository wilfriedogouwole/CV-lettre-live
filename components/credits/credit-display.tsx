"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCredits } from "@/hooks/use-credits";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { FileText, Loader2, PenLine } from "lucide-react";
import Link from "next/link";

export function CreditDisplay() {
  const { credits, isLoading, isError } = useCredits();

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
        </CardContent>
      </Card>
    );
  }

  const { cvCredits, letterCredits } = credits.credits;
  const subscription = credits.subscription;

  return (
    <div className="flex justify-center w-full" >
    <Card className=" flex flex-col  justify-center items-center w-[400px] h-[400px]">
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
      <CardContent>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-primary" />
              <span>Crédits CV</span>
            </div>
            <span className="font-bold">
              {cvCredits === -1 ? "Illimité" : cvCredits}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <PenLine className="h-5 w-5 text-primary" />
              <span>Crédits lettres</span>
            </div>
            <span className="font-bold">
              {letterCredits === -1 ? "Illimité" : letterCredits}
            </span>
          </div>
          {subscription?.status !== "active" && (
            <Link href="/pricing" className="mt-4">
              <Button className="">
                Obtenir plus de crédits
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
    </div>
  );
}