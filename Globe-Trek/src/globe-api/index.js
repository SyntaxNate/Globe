import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();
console.log("AVIATIONSTACK_KEY from .env:", process.env.AVIATIONSTACK_KEY);


const app = express();

// Allow your Vite dev server to talk to this backend
app.use(
    cors({
        origin:"http://localhost:5173",
    })
);

app.use(express.json());

// Simple health check
app.get("/", (req, res) => {
    res.json({ status: "Globe API backend is running"});
});

//Get /api/flights?depIata=JFK
app.get("/api/flights", async (req, res) => {
    const depIata = req.query.depIata;

    if(!depIata) {
        return res.status(400).json({ error:"depIata query param required" })
    }

    try {
        const apiKey = process.env.AVIATIONSTACK_KEY;

        const url =
         `http://api.aviationstack.com/v1/flights` +
         `?access_key=${apiKey}` +
         `&dep_iata=${depIata}` +
         `&limit=5`;

         const flightRes = await fetch(url);

         if (!flightRes.ok) {
            return res.status(502).json({ error:"Flights API request failed" })
         }

         const data = await flightRes.json();

         if (!Array.isArray(data.data)) {
            return res.json({ flights: [] });
         }

         const flights = data.data.map((flight) => ({
                airline: flight.airline?.name,
                flightNumber: flight.flight?.iata,
                departure: flight.departure?.airport,
                departureTime: flight.departure?.scheduled,
                arrival: flight.arrival?.airport,
                arrivalTime: flight.arrival?.scheduled,
                status: flight.flight_status,
         }));

         res.json({ flights });
    } catch (err) {
        console.error("flights API error:", err);
        res.status(500).json({ error: "Server error fetching flights" })
    }
});

// GET api/rates?base=USD

app.get("/api/rates", async (req, res) => {
    const base = (req.query.base || "USD").toUpperCase();

    try {
        const url = `https://open.er-api.com/v6/latest/${base}`;
        const apiRes = await fetch(url);

        if(!apiRes.ok) {
            return res.status(502).json({ error:"Currency API request failed" })
        }

        const data = await apiRes.json();
        console.log("Currency API raw:", data);

        const rates = data.conversion_rates;

        if (!rates) {
            return res.status(500).json({ error: "Unexpected currency API response" });
        }

        res.json({ base: data.base_code || base, rates, 
        });

    }catch (err) {
        console.error("Currency API error:", err);
        res.status(500).json({ error: "Server error fetching currency rates" });
    }
});


//Routes here...

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Globe API listening on http://localhost:${PORT}`)
})
