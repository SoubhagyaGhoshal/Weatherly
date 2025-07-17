import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;

    // Use host from the request header to ensure production correctness
    const url = new URL(req.url, `http://${req.headers.get("host")}`);
    const searchParams = url.searchParams;

    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (!lat || !lon) {
      return NextResponse.json({ error: "Latitude and Longitude are required" }, { status: 400 });
    }

    // Include units=metric to get temperature in Celsius
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&appid=${apiKey}&units=metric`;

    const response = await axios.get(apiUrl);

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching weather data:", error?.response?.data ?? error.message);
    return NextResponse.json({ error: "Error fetching weather data" }, { status: 500 });
  }
}
