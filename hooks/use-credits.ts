"use client"

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useCredits() {
  const { data, error, mutate } = useSWR('/api/credits', fetcher);

  return {
    credits: data,
    isLoading: !error && !data,
    isError: error,
    mutate
  };
}