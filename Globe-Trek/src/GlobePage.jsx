import React, { useState } from "react";
import { Box, Stack, TextField, Button, Paper, Typography } from "@mui/material";




 async function getCoordinates(city) {
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`

      const res = await fetch(url);
      const data = await res.json();

      if (!data.results || data.results.length === 0) {
        return null; // city not found
      }

      const place = data.results[0];

      return {
        name: place.name,
        country: place.country,
        lat: place.latitude,
        lon: place.longitude
      };
    }

    // Helper: get weather for given lat/lon
      async function getWeather(lat, lon) {
        const url = `https://api.open-meteo.com/v1/forecast`+
                    `?latitude=${lat}`+
                    `&longitude=${lon}`+
                    `&current_weather=true`+
                    `&temperature_unit=fahrenheit`+
                    `&windspeed_unit=mph`;

          console.log("Weather URL:", url);

        const res = await fetch(url);
        const data = await res.json();

        console.log("Weather res:", data);

        return data.current_weather;
      }

      function getCityExtras(city, country) {
          return {
            airport:`Nearest Airport, ${country} (demo data).`,
            event: `Sample upcoming event in ${city} – concerts, festivals, etc. (demo).`,
            funFact: `${city} is known for its unique culture and landmarks.`,
          }
            
      }

function GlobePage() {

    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

// NOTE: We use asyn because we use await inside
async function handleSearch() {

  const trimmed = query.trim();
  if (!trimmed) return;

    setLoading(true);
    setResult(null);

    try {
      // 1) Get coordinates from city name
      const location = await getCoordinates(query);

      if (!location) {
        setResult({ error: "City not found" });
        setLoading(false);

        return;
      }

    
      // 2) Get live weather using coordinates
      const weather = await getWeather(location.lat, location.lon);
     
      const extras = getCityExtras(location.name, location.country)

      const tempF = Math.round(weather.temperature); 
      const windMph = weather.windspeed;
      const windKmh = Math.round(windMph * 1.60934);

      
      // 3) Update state for UI
      setResult({
        city: location.name, 
        country: location.country,
        tempF,
        windMph,
        windKmh,
        extras,     
      });

    } catch (err) {
      console.error(err)
      setResult({ error: "Something went wrong fetching the data" });
    }

      setLoading(false);
}

     return (
    <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
                Globe Explorer (Prototype)
            </Typography>

      {/* Search Bar */}
      <Stack direction="row" spacing={2} sx={{ mb: 4, maxWidth: 500 }}>
        <TextField
          label="Search for a city"
          variant="outlined"
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
          }}
        />
        <Button variant="contained" onClick={handleSearch}
                disabled={!query.trim() || loading}>
          {loading ? "Searching..." : "Go"}
        </Button>
      </Stack>

      {/* Layout: Globe left, info right */}
      <Stack direction="row" spacing={4}>
        
        {/* Placeholder Globe */}
        <Box
          sx={{
            width: 260,
            height: 260,
            borderRadius: "50%",
            background: "radial-gradient(circle at 30% 30%, #4fc3f7, #01579b)",
            boxShadow: "0 0 25px rgba(0,0,0,0.35)",
            display: "flex",
            flexDirection:"column",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "bold",
            fontSize: 18,
            gap:"1",
          }}
        >

          {result ? (
            <>
            <div>🌍</div>
            <div>{result.city}</div>
            </>
          ) : (
            <>
              <div>🌍Globe</div>
              <div style={{ fontSize: 14 }}>Waiting for Search</div>
            </>
          )}
        </Box>

        
        {/* Info Panel */}
        <Paper sx={{ p: 3, minWidth: 260 }}>
                  {loading ? (
              <Typography>Loading...</Typography>
            ) : result?.error ? (
              <Typography color="error">{result.error}</Typography> 
              ) :result ? (
            <>
  
                <Typography variant="h6" gutterBottom>
                  {result.city} {result.country}
                </Typography>

                {/* Temp Line */}
                <Typography variant="h4" gutterBottom>
                  {result.tempF}°F
                </Typography>

                {/* Wind in mph + km.h */}
                <Typography variant="body2">
                   Wind: {result.windMph} mph ({result.windKmh} km/h)
                </Typography>

                {/* Extra 'flights / events / misc info' */}
                {result.extras &&  (
                  <>
                    <Typography variant="body2" sx={{ mt: 2 }}>
                    {result.extras.airport}
                    </Typography> 
                     <Typography variant="body2" sx={{ mt: 1 }}>
                    {result.extras.event}
                    </Typography> 
                     <Typography variant="body2" sx={{ mt: 1 }}>
                    {result.extras.funFact}
                    </Typography> 
                  </>
                
                )}
            </>
            ) : (
              <Typography variant="body1">
                Search for a city to display details here.
              </Typography>
            )}
          </Paper>

      </Stack>
    </Box>
    
    )
}

export default GlobePage;