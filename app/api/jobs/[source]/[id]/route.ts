import { NextResponse } from "next/server";
import axios from "axios";

// 🔹 Cache temporaire en mémoire (sera rempli par /api/adzuna)
type CacheItem = { data: any; expires: number };
export const adzunaCache: Record<string, any> = {};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const API_KEY = process.env.POLE_EMPLOI_CLIENT_ID!;
const API_SECRET = process.env.POLE_EMPLOI_CLIENT_SECRET!;


// 📌 Fonction pour récupérer un token France Travail
async function getFranceTravailToken() {
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append("client_id", API_KEY);
  params.append("client_secret", API_SECRET);
  params.append("scope", "api_offresdemploiv2 o2dsoffre");

  const tokenResponse = await axios.post(
    "https://entreprise.pole-emploi.fr/connexion/oauth2/access_token?realm=/partenaire",
    params,
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );

  return tokenResponse.data.access_token;
}

export async function GET(
  request: Request,
  { params }: { params: { source: string; id: string } }
) {
  try {
    if (params.source === "france-travail") {
      // --------------------
      // FRANCE TRAVAIL
      // --------------------
      const token = await getFranceTravailToken();
      const response = await axios.get(
        `https://api.francetravail.io/partenaire/offresdemploi/v2/offres/${params.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const jobData = response.data;
      const job = {
        id: jobData.id,
        title: jobData.intitule,
        company: jobData.entreprise?.nom || "Non précisé",
        location: jobData.lieuTravail?.libelle || "Non précisé",
        description: jobData.description,
        salary: jobData.salaire?.libelle || "Non précisé",
        type: jobData.typeContratLibelle || "Non précisé",
        url: jobData.origineOffre?.urlOrigine || "",
        source: "France Travail",
        createdAt: new Date(jobData.dateCreation),
      };

      return NextResponse.json({ job });
    } else if (params.source === "adzuna") {
      // --------------------
      // ADZUNA (via cache interne)
      // --------------------
      const job = adzunaCache[params.id];
      if (!job) {
        return NextResponse.json(
          { error: "Offre Adzuna non trouvée dans le cache" },
          { status: 404 }
        );
      }
      return NextResponse.json({ job });

    } else if (params.source === "the-muse") {
      // --------------------
      // THE MUSE
      // --------------------
      const response = await axios.get(`https://www.themuse.com/api/public/jobs/${params.id}`);
      const jobData = response.data;

      const job = {
        id: jobData.id,
        title: jobData.name,
        company: jobData.company?.name || "Non précisé",
        location: jobData.locations?.[0]?.name || "Non précisé",
        description: jobData.contents,
        salary: "Non précisé",
        type: jobData.type || "Non précisé",
        url: jobData.refs?.landing_page || "",
        source: "The Muse",
        createdAt: jobData.publication_date
          ? new Date(jobData.publication_date)
          : null,
      };

      return NextResponse.json({ job });

    } else {
      return NextResponse.json(
        { error: "Source non reconnue" },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error("Erreur GET Job:", error);
    return NextResponse.json(
      { error: "Impossible de récupérer l'offre" },
      { status: 500 }
    );
  }
}
