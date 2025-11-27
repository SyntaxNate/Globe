// src/api/backend.js

const BASE_URL = "http://localhost:5000"; // your Node backend

export async function fetchFlightsForAirport(depIata) {
  const res = await fetch(`${BASE_URL}/api/flights?depIata=${depIata}`);

  if (!res.ok) {
    throw new Error("Failed to fetch flights");
  }

  const data = await res.json();

  // Ensure we always return an array
  return Array.isArray(data.flights) ? data.flights : [];
}
