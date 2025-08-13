import { NextResponse } from "next/server";
import axios from "axios";
import { adzunaCache } from "../jobs/[source]/[id]/route"; // on importe le cache

const ADZUNA_APP_ID = process.env.ADZUNA_APP_ID!;
const ADZUNA_APP_KEY = process.env.ADZUNA_APP_KEY!;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "developer";
  const location = searchParams.get("location") || "France";

  try {
    const response = await axios.get(
      `https://api.adzuna.com/v1/api/jobs/fr/search/1`,
      {
        params: {
          app_id: ADZUNA_APP_ID,
          app_key: ADZUNA_APP_KEY,
          results_per_page: 20,
          what: query,
          where: location,
        },
      }
    );

    const jobs = response.data.results.map((job: any) => {
      const formattedJob = {
        id: job.id,
        title: job.title,
        company: job.company?.display_name || "Non précisé",
        location: job.location?.display_name || "Non précisé",
        description: job.description,
        salary: job.salary_min
          ? `${job.salary_min} - ${job.salary_max} ${job.salary_currency}`
          : "Non précisé",
        type: job.contract_type || "Non précisé",
        url: job.redirect_url,
        source: "Adzuna",
        createdAt: new Date(job.created),
      };

      // On stocke dans le cache
      adzunaCache[job.id] = formattedJob;

      return formattedJob;
    });

    return NextResponse.json({ jobs });

  } catch (error) {
    console.error("Erreur Adzuna:", error);
    return NextResponse.json(
      { error: "Impossible de récupérer les offres Adzuna" },
      { status: 500 }
    );
  }
}
