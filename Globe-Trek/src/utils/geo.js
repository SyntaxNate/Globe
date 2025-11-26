import { airports } from "../data/airports";

const EARTH_RADIUS_KM = 6371;


function toRad(deg) {
    return (deg * Math.PI) / 180;
}
 
export function findNearestAirport(lat, lon) {
    let closest = null;
    let closestDistance = Infinity;

    for (const ap of airports) {
        const dLat = toRad(ap.lat - lat);
        const dLon = toRad(ap.lon - lon);

        const a = 
             Math.sin(dLat / 2) * Math.sin(dLat / 2) +
             Math.cos(toRad(lat)) *
             Math.cos(toRad(ap.lat)) *
             Math.sin(dLon / 2) *
             Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distanceKm = EARTH_RADIUS_KM * c;

        if (distanceKm < closestDistance) {
            closestDistance = distanceKm;
            closest = {
                ...ap,
                distanceKm,
            };
        }
    }

        return closest;
}

{/*What this does in plain language:

- Loops through all airports
- Calculates the distance from your **city’s lat/lon** to each airport (Haversine formula)
- Keeps track of the shortest one
- Returns that airport plus the distance

--- */}