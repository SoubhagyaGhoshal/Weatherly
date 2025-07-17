import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;

    // Use fallback host in case req.headers.get("host") is undefined (e.g., in Vercel)
    const { searchParams } = new URL(req.url, 'http://localhost');

    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (!lat || !lon) {
      return NextResponse.json({ error: "Latitude and Longitude are required" }, { status: 400 });
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&appid=${apiKey}`;

    const res = await axios.get(apiUrl);

    return NextResponse.json(res.data);
  } catch (error) {
    console.error("Error fetching pollution data:", error);
    return NextResponse.json({ error: "Failed to fetch pollution data" }, { status: 500 });
  }
}
