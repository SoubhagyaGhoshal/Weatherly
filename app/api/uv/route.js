import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url, 'http://localhost');

    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (!lat || !lon) {
      return NextResponse.json({ error: "Latitude and Longitude are required" }, { status: 400 });
    }

    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(lat)}&longitude=${encodeURIComponent(lon)}&daily=uv_index_max,uv_index_clear_sky_max&timezone=auto&forecast_days=1`;

    const res = await fetch(apiUrl, {
      next: { revalidate: 900 }, // Cache for 15 minutes
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch UV data: ${res.statusText}`);
    }

    const uvData = await res.json();

    return NextResponse.json(uvData);
  } catch (error) {
    console.error("Error Getting UV Data:", error);
    return NextResponse.json({ error: "Error getting UV Data" }, { status: 500 });
  }
}
