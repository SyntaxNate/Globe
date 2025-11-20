import React, { useState } from "react";
import { Box, Stack, TextField, Button, Paper, Typography } from "@mui/material";
import { Routes, Route } from "react-router-dom";



function GlobePage() {

    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);


    function handleSearch() {
    setLoading(true);
    setResult(null);

    // Simulate API delay
    setTimeout(() => {
      setResult({
        city: query,
        info: `Sample info about ${query}.`,
        temp: "-",
        country:"-",
      });

      setLoading(false);
    }, 1000);
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
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "bold",
            fontSize: 18,
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
            ) : result ? (
              <>
                <Typography variant="h6" gutterBottom>
                  {result.city}
                </Typography>
                <Typography variant="body2">
                  <strong>Country:</strong> {result.country}
                </Typography>
                <Typography variant="body2">
                  <strong>Temperature:</strong> {result.temp}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {result.info}
                </Typography>
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