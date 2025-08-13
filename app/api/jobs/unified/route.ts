import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary: string;
  type: string;
  url: string;
  source: string;
  createdAt: Date;
}

export async function GET(request: NextRequest) {
  try {
    const [ftJobs, adzunaJobs] = await Promise.all([
      fetchFranceTravailJobs(request),
      fetchAdzunaJobs(request)
    ]);
    
    const combinedJobs = [...ftJobs, ...adzunaJobs]
      .sort(() => Math.random() - 0.5)
      .filter(job => job !== null); // Filtrer les jobs null

    return NextResponse.json({ jobs: combinedJobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

async function fetchFranceTravailJobs(request: NextRequest): Promise<Job[]> {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    
    // Implémentation réelle de l'appel API
    const response = await fetch(`/api/jobs/france-travail?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    
    return data.jobs || [];
  } catch (error) {
    console.error("Error fetching France Travail jobs:", error);
    return [];
  }
}

async function fetchAdzunaJobs(request: NextRequest): Promise<Job[]> {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const location = searchParams.get("location") || "fr";
    
    // Implémentation réelle de l'appel API
    const response = await fetch(`/api/jobs/adzuna?q=${encodeURIComponent(query)}&location=${location}`);
    const data = await response.json();
    
    return data.jobs || [];
  } catch (error) {
    console.error("Error fetching Adzuna jobs:", error);
    return [];
  }
}

export const dynamic = "force-dynamic";