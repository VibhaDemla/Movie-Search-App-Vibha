import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "ed9ae331"; // Replace with your actual OMDb API key

app.get("/search", async (req, res) => {
    const { query } = req.query;
    try {
        const response = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch movies" });
    }
});

app.get("/movie", async (req, res) => {
    const { id } = req.query;
    try {
        const response = await axios.get(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch movie details" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
