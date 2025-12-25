import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/generate', async (req, res) => {
    try {
        const { content } = req.body;
        const API_KEY = process.env.GEMINI_API_KEY; // Ambil dari Vercel env
        const GEMINI_MODEL = "gemini-2.5-flash-preview-09-2025";
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${API_KEY}`;

        const prompt = `Analyze this note and return ONLY a JSON object:
        { "summary": "string", "keyPoints": ["string"], "tags": ["string"] }
        Content: ${content}`;

        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });

        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
});

export default app;
