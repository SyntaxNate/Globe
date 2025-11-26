import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();

// Allow yout Vite dev server to talk to this backend
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

//Routes here...

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Globe API listening on http://localhost:${PORT}`)
})
