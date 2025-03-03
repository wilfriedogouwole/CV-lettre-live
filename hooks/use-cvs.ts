"use client"

import { useState, useEffect } from 'react';
import { getCVs } from '@/lib/cv-actions';

export function useCVs() {
  const [cvs, setCVs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCVs() {
      try {
        const data = await getCVs();
        setCVs(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchCVs();
  }, []);

  return { cvs, isLoading, error };
}