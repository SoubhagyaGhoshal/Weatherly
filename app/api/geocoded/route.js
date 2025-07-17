import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;

    // Use a fallback base for URL parsing (host header may be undefined on Vercel)
    const { searchParams } = new URL(req.url, 'http://localhost');

    const city = searchParams.get("search");

    if (!city) {
      return NextResponse.json({ error: "City is required" }, { status: 400 });
    }

    const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=5&appid=${apiKey}`;

    const res = await axios.get(apiUrl);

    return NextResponse.json(res.data);
  } catch (error) {
    console.error("Error fetching geocoded data:", error);
    return NextResponse.json({ error: "Failed to fetch geocoded data" }, { status: 500 });
  }
}
