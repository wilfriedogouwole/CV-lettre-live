

import { useEffect, useState } from 'react';

interface Credits {
  id: string;
  userId: string;
  cvCredits: number;
  letterCredits: number;
  createdAt: string;
  updatedAt: string;
}

interface Subscription {
  plan: string;
  status: string;
}

interface UseCreditsReturn {
  credits: Credits | null;
  subscription: Subscription | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  useCredit: (type: 'cv' | 'letter') => Promise<boolean>;
}

export function useCredits(): UseCreditsReturn {
  const [credits, setCredits] = useState<Credits | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCredits = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/user/credits');
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des crédits');
      }
      
      const data = await response.json();
      setCredits(data.credits);
      setSubscription(data.subscription);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      console.error('Erreur lors de la récupération des crédits:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const useCredit = async (type: 'cv' | 'letter'): Promise<boolean> => {
    try {
      const response = await fetch('/api/user/credits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'utilisation du crédit');
      }

      // Mettre à jour les crédits localement
      if (data.updatedCredits) {
        setCredits(data.updatedCredits);
      }

      return true;
    } catch (err) {
      console.error('Erreur lors de l\'utilisation du crédit:', err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      return false;
    }
  };

  useEffect(() => {
    fetchCredits();
  }, []);

  return {
    credits,
    subscription,
    isLoading,
    error,
    refetch: fetchCredits,
    useCredit,
  };
}