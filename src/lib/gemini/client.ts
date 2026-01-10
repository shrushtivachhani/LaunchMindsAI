
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.warn("Missing GEMINI_API_KEY in environment variables. AI features will fail.");
}

const genAI = new GoogleGenerativeAI(apiKey || "mock-key");

export const geminiModel = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.7,
    }
});
