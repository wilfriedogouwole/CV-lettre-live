import { prisma } from "@/lib/prisma";
import axios from "axios";
import { NextResponse } from "next/server";

const API_KEY = process.env.POLE_EMPLOI_CLIENT_ID!;
const API_SECRET = process.env.POLE_EMPLOI_CLIENT_SECRET!;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const location = searchParams.get("location") || "";

    // 🔐 1. Récupération du token OAuth2
    const tokenRes = await axios.post(
      "https://entreprise.pole-emploi.fr/connexion/oauth2/access_token?realm=/partenaire",
      `grant_type=client_credentials&client_id=${API_KEY}&client_secret=${API_SECRET}&scope=api_offresdemploiv2 o2dsoffre`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const accessToken = tokenRes.data.access_token;

    // 🌐 2. Appel à l’API France Travail
    const apiUrl = new URL("https://api.pole-emploi.io/partenaire/offresdemploi/v2/offres/search");

    if (query) {
      apiUrl.searchParams.append("motsCles", query);
    }
    if (location) {
      apiUrl.searchParams.append("commune", location);
    }

    apiUrl.searchParams.append("range", "0-19");
    apiUrl.searchParams.append("tri", "1");

    const response = await fetch(apiUrl.toString(), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`France Travail API error: ${response.status}`);
    }

    const data = await response.json();

    const jobs = data.resultats.map((job: any) => ({
      id: job.id,
      title: job.intitule,
      company: job.entreprise?.nom || "Entreprise confidentielle",
      location: job.lieuTravail?.libelle || "Non spécifié",
      description: job.description || "",
      salary: job.salaire?.libelle || "Non spécifié",
      type: job.typeContrat || "Non spécifié",
      url: job.origineOffre?.urlOrigine || "",
      source: "France Travail",
      createdAt: new Date(job.dateCreation),
    }));

    await prisma.job.createMany({
      data: jobs,
      skipDuplicates: true,
    });

    return NextResponse.json({ jobs });
  } catch (error) {
    console.error("❌ Error fetching jobs:", error);
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}
