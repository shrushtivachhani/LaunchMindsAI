'use server';

import { GoogleGenerativeAI } from "@google/generative-ai";
import { MASTER_SYSTEM_PROMPT } from "@/features/agents/utils/prompts/master";
import { AGENT_PROMPTS } from "@/features/agents/utils/prompts";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error("❌ SERVER SIDE: Missing GEMINI_API_KEY");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash", // Upgraded to 2.5 Flash (2026 Standard)
    generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.7,
    }
});

function getAgentSpecificPrompt(agentId: string): string {
    switch (agentId) {
        case "AGENT_1": return AGENT_PROMPTS.AGENT_1;
        case "AGENT_2": return AGENT_PROMPTS.AGENT_2;
        case "AGENT_3": return AGENT_PROMPTS.AGENT_3;
        case "AGENT_4": return AGENT_PROMPTS.AGENT_4;
        case "AGENT_5": return AGENT_PROMPTS.AGENT_5;
        default: return "";
    }
}

export async function generateAIResponse(
    systemPromptId: string,
    userPrompt: string,
    context: string
) {
    if (!apiKey) throw new Error("API Key configuration missing on server.");

    try {
        const fullPrompt = `
${MASTER_SYSTEM_PROMPT}

${context}

TASK SPECIFIC INSTRUCTIONS:
${getAgentSpecificPrompt(systemPromptId)}

USER TASK:
${userPrompt}

OUTPUT FORMAT:
Ensure valid JSON output matching the interface structure.
`;

        console.log(`🤖 Generative AI Call: ${systemPromptId}`);
        const result = await model.generateContent(fullPrompt);
        const response = result.response;
        const text = response.text();

        // Clean markdown code blocks if present
        const cleanJson = text.replace(/```json\n?|\n?```/g, "").trim();

        return JSON.parse(cleanJson);
    } catch (error: any) {
        console.error("Gemini Server Action Error:", error);
        throw new Error(`AI Generation Failed: ${error.message}`);
    }
}
