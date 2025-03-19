import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.POLE_EMPLOI_CLIENT_ID!;
const API_SECRET = process.env.POLE_EMPLOI_CLIENT_SECRET!;

// Exemple avec appel API France Travail (ou depuis ta base si tu stockes localement)
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const jobId = params.id;
  
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

  try {
    // → Ici, soit tu récupères depuis ton DB locale, soit tu fais un appel direct API France Travail :
    const apiUrl = ` https://api.francetravail.io/partenaire/offresdemploi/v2/offres/${jobId}`;
   
    const response = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${accessToken}`,
      }
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Offre non trouvée" }, { status: 404 });
    }

    const data = await response.json();

    const job = {
      id: data.id,
      title: data.intitule,
      company: data.entreprise?.nom || "Non précisé",
      location: data.lieuTravail?.libelle || "Non précisé",
      description: data.description,
      salary: data.salaire?.libelle || "Non précisé",
      type: data.typeContratLibelle,
      url: `/jobs/${data.id}`,
      source: "France Travail",
      createdAt: new Date(data.dateCreation),
    };

    return NextResponse.json({ job });
  } catch (error) {
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}
