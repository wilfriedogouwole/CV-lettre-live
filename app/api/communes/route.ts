// app/api/communes/route.ts
import axios from "axios";
import { NextResponse } from "next/server";

const API_KEY = process.env.POLE_EMPLOI_CLIENT_ID!;
const API_SECRET = process.env.POLE_EMPLOI_CLIENT_SECRET!;

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
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

    // 🌐 2. Appel à l’API France Travail pour récupérer les communes
    const response = await axios.get(
      "https://api.francetravail.io/partenaire/offresdemploi/v2/referentiel/communes",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      }
    );

    // 📦 3. Retourner les communes
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("❌ Error fetching communes:", error);
    return NextResponse.json(
      { error: "Failed to fetch communes" },
      { status: 500 }
    );
  }
}