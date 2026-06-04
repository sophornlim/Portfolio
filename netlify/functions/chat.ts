import { Config, Context } from "@netlify/functions";
import { GoogleGenAI } from "@google/genai";
import { PROMPT_KNOWLEDGE_BASE } from "../../src/data";

export default async (req: Request, context: Context) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid request payload. Expected 'messages' array." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "GEMINI_API_KEY environment variable is missing." }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

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

    const contents = messages.map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "I was unable to formulate a response at this time. Please try rephrasing.";
    
    return new Response(JSON.stringify({ text: replyText }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return new Response(JSON.stringify({
      error: "Failed to communicate with the Gemini AI engine.",
      details: error.message || error,
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

export const config: Config = {
  path: "/api/chat"
};
