import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';  // enables dynamic route rendering

export async function GET(req) {
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;

    // Create a URL object from the full request URL
    const { searchParams } = new URL(req.url, 'http://localhost');  // Fallback base for parsing

    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (!lat || !lon) {
      return NextResponse.json({ error: "Latitude and longitude are required" }, { status: 400 });
    }

    const dailyUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const dailyRes = await fetch(dailyUrl, { next: { revalidate: 3600 } });

    if (!dailyRes.ok) {
      console.error("OpenWeatherMap API error:", await dailyRes.text());
      return NextResponse.json({ error: "Failed to fetch weather data" }, { status: dailyRes.status });
    }

    const dailyData = await dailyRes.json();
    return NextResponse.json(dailyData);

  } catch (error) {
    console.error("Error in getting daily data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
