"use client"

import { getCVs } from '@/lib/cv-actions';
import { useEffect, useState } from 'react';

export function useCVs() {
  const [cvs, setCVs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchCVs();
  }, []);

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

  const mutate = (newData?: any[] | ((current: any[]) => any[])) => {
    if (typeof newData === 'function') {
      setCVs(newData(cvs));
    } else if (newData) {
      setCVs(newData);
    } else {
      fetchCVs();
    }
  };

  return { cvs, isLoading, error, mutate };
}