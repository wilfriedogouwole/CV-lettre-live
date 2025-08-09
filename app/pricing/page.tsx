"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const plans = [
  {
    id: "free",
    name: "Gratuit",
    description: "Pour commencer votre recherche d'emploi",
    price: "0€",
    features: [
      "1 crédit CV",
      "1 crédit lettre de motivation",
      "Modèles de base",
      "Export PDF",
    ],
    buttonText: "Commencer gratuitement",
    buttonVariant: "outline" as const,
    popular: false
  },
  {
    id: "standard",
    name: "Standard",
    description: "Pour une recherche active",
    price: "9.99€",
    period: "/mois",
    features: [
      "5 crédits CV par mois",
      "5 crédits lettres de motivation par mois",
      "Tous les modèles",
      "Export PDF",
      "Génération IA illimitée",
      "Support prioritaire"
    ],
    buttonText: "S'abonner",
    buttonVariant: "default" as const,
    popular: true
  },
  {
    id: "premium",
    name: "Premium",
    description: "Pour les professionnels",
    price: "19.99€",
    period: "/mois",
    features: [
      "Crédits CV illimités",
      "Crédits lettres de motivation illimités",
      "Tous les modèles premium",
      "Export PDF personnalisé",
      "Génération IA avancée",
      "Support prioritaire 24/7",
      "Statistiques avancées"
    ],
    buttonText: "S'abonner",
    buttonVariant: "default" as const,
    popular: false
  }
];

export default function PricingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleSubscribe = async (planId: string) => {
    if (planId === "free") {
      router.push("/dashboard");
      return;
    }

    setIsLoading(planId);
    try {
      console.log(`Tentative d'abonnement au plan: ${planId}`);
      
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planId, // Envoyer planId au lieu de priceId
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erreur API:', errorData);
        throw new Error(errorData.error || 'Erreur lors de la création de la session');
      }

      const data = await response.json();
      console.log('Réponse API:', data);

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('URL de session manquante');
      }
    } catch (error) {
      console.error("Erreur lors de l'abonnement:", error);
      // Vous pourriez afficher une notification d'erreur ici
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Choisissez votre plan</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Des solutions adaptées à tous les besoins, de la recherche d&apos;emploi occasionnelle à la gestion de carrière professionnelle.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative ${plan.popular ? 'border-primary shadow-lg' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full">
                    Le plus populaire
                  </span>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted-foreground">{plan.period}</span>
                  )}
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <SignedIn>
                  <Button 
                    className="w-full"
                    variant={plan.buttonVariant}
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={isLoading === plan.id}
                  >
                    {isLoading === plan.id ? (
                      <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    {plan.buttonText}
                  </Button>
                </SignedIn>
                <SignedOut>
                  <Link href="/sign-up" className="w-full">
                    <Button className="w-full" variant={plan.buttonVariant}>
                      {plan.buttonText}
                    </Button>
                  </Link>
                </SignedOut>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            Tous les prix sont en euros (EUR) et incluent la TVA.
            <br />
            Annulez à tout moment. Pas d&apos;engagement.
          </p>
        </div>
      </div>
    </div>
  );
}