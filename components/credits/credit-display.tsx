'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCredits } from '@/hooks/useCredits';
import { CreditCard, FileText, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

export default function CreditsDisplay() {
  const { credits, subscription, isLoading, error } = useCredits();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Chargement des crédits...</span>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-red-500">Erreur: {error}</p>
        </CardContent>
      </Card>
    );
  }

  const isUnlimited = (value: number) => value >= 999;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Crédits CV</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isUnlimited(credits?.cvCredits || 0) ? '∞' : credits?.cvCredits || 0}
          </div>
          <p className="text-xs text-muted-foreground">
            {isUnlimited(credits?.cvCredits || 0) ? 'Illimité' : 'Crédits restants'}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Crédits Lettres</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isUnlimited(credits?.letterCredits || 0) ? '∞' : credits?.letterCredits || 0}
          </div>
          <p className="text-xs text-muted-foreground">
            {isUnlimited(credits?.letterCredits || 0) ? 'Illimité' : 'Crédits restants'}
          </p>
        </CardContent>
      </Card>

      {subscription && (
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Abonnement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="capitalize font-medium">{subscription.plan}</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                subscription.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {subscription.status === 'active' ? 'Actif' : 'Inactif'}
              </span>
            </div>
          </CardContent>
        </Card>
      )}


<Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Recharge</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
          <Link href="/pricing">
                  <Button variant="outline" size="sm">
                    Recharger
                  </Button>
                </Link>
          </div>
          
        </CardContent>
      </Card>
    </div>
  );
}