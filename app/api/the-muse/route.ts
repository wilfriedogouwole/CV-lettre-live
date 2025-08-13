import { NextResponse } from "next/server";

const THE_MUSE_API_KEY = process.env.THE_MUSE_API_KEY;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const location = searchParams.get("location") || "";
    const typeFilter = searchParams.get("typeFilter") || "";

    const params = new URLSearchParams({
      page: "1",
      ...(query && { category: query }),
      ...(location && { location }),
      ...(typeFilter && { level: typeFilter }),
    });

    const response = await fetch(
      `https://www.themuse.com/api/public/jobs?${params}`,
      {
        headers: {
          Authorization: `Bearer ${THE_MUSE_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`The Muse API error: ${response.status}`);
    }

    const data = await response.json();

       const jobs = data.results.map((job: any) => ({
      id: job.id,
      title: job.name,
      company: job.company.name,
      location: job.locations.map((loc: any) => loc.name).join(", "),
      description: job.contents, // On garde le HTML brut
      rawDescription: job.contents, // Stockage de la version brute
      salary: job.salary || "Non spécifié",
      type: job.type || "Non spécifié",
      url: job.refs.landing_page,
      source: "The Muse",
      createdAt: new Date(job.publication_date),
      publicationDate: job.publication_date,
    }));

    return NextResponse.json({ jobs });
  } catch (error) {
    console.error("❌ Error fetching The Muse jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch The Muse jobs" },
      { status: 500 }
    );
  }
}