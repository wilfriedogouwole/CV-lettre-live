import { NextResponse } from "next/server";

// app/api/jobs/unified/route.ts
export async function GET(request: Request) {
  try {
    const [ftJobs, adzunaJobs] = await Promise.all([
      fetchFranceTravailJobs(request),
      fetchAdzunaJobs(request)
    ]);
    
    return NextResponse.json({
      jobs: [...ftJobs, ...adzunaJobs].sort(() => Math.random() - 0.5)
    });
  } catch (error) {
    // Gestion erreur
  }
}

function fetchFranceTravailJobs(request: Request): any {
    throw new Error("Function not implemented.");
}

function fetchAdzunaJobs(request: Request): any {
    throw new Error("Function not implemented.");
}
