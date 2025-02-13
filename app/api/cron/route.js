import { NextResponse } from 'next/server';

export async function GET() {
  const API_URL = "https://api.vayaturismo.com/packages";

  // Hacer la solicitud a la API externa
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    console.log("API Response:", data);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching API:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
