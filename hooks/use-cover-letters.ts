"use client"

import { useState, useEffect } from 'react';
import { getCoverLetters } from '@/lib/cover-letter-actions';

export function useCoverLetters() {
  const [coverLetters, setCoverLetters] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCoverLetters() {
      try {
        const data = await getCoverLetters();
        setCoverLetters(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchCoverLetters();
  }, []);

  return { coverLetters, isLoading, error };
}