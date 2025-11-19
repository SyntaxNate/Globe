import React, { useState } from "react";
import { Box, Stack, TextField, Button, Paper, Typography } from "@mui/material";
import { Routes, Route } from "react-router-dom";



function GlobePage() {

    const [query, setQuery] = useState("")

function handleSearch() {
    console.log("Search for:", query);

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
        />
        <Button variant="contained" onClick={handleSearch}>
          Go
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
          🌍 Globe
        </Box>

        {/* Info Panel */}
        <Paper sx={{ p: 3, minWidth: 280 }}>
          <Typography variant="body1">
            Search for a city to display information here.
          </Typography>
        </Paper>
      </Stack>
    </Box>
    
    )
}

export default GlobePage;