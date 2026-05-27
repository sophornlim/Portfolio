import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import { PROMPT_KNOWLEDGE_BASE } from "./src/data";

// Load local environmental configuration if any
dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Lazy-initialize Gemini SDK to prevent crashes on startup if secret key is missing.
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required and missing in secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// API endpoint for AI Career Assistant Chatbot
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: "Invalid request payload. Expected 'messages' array." });
      return;
    }

    const ai = getGeminiClient();

    // Map message history cleanly so Gemini understands the turns.
    // The chat history format should match standard structure.
    const systemInstruction = `
You are the interactive AI Career Assistant for Sophorn Lim, an esteemed IT Lead & Data Systems Specialist with over 20 years of experience across Cambodia and the Greater Mekong Subregion.
Your goal is to help recruiters, potential employers, and collaborators understand Sophorn's rich technical qualifications, GIS expertise, DHIS2 implementations, and leadership background.

Guidelines:
1. Speak in a helpful, professional, friendly, and objective tone.
2. Rely strictly on the truth provided in the "Sophorn Lim Knowledge Base".
3. Do not invent details or lie about his contact details or experiences.
4. If asked about his contact details, provide: Email (sophornlimnpa@gmail.com) and Phones (069 767 696 / 012 964 495 / 0717 111 007).
5. If some skill or technology is not listed, reply constructively, noting his foundational IT competence enables fast learning of modern tooling.
6. Keep answers relatively concise and highly scannable, using markdown lists where helpful.

Sophorn Lim Knowledge Base:
${PROMPT_KNOWLEDGE_BASE}
`;

    // Process the last message and history
    const userMessage = messages[messages.length - 1]?.text || "Hello";

    // Prepare contents history for generation (omit system instruction as it goes to config)
    // Map previous turns properly
    const contents = messages.map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }]
    }));

    // Call Gemini API
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "I was unable to formulate a response at this time. Please try rephrasing.";
    
    res.json({ text: replyText });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({
      error: "Failed to communicate with the Gemini AI engine.",
      details: error.message || error,
    });
  }
});

// App Health Check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", current_time: "2026-05-26" });
});

// Setup Vite Dev server / static build fallback
async function boot() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode with static static assets...");
    const distPath = path.join(process.cwd(), "dist");
    
    // Serve static files from compiled output
    app.use(express.static(distPath));
    
    // SPA Wildcard fallback
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express application successfully listening on port ${PORT}`);
  });
}

boot().catch((err) => {
  console.error("Initialization failed:", err);
});
