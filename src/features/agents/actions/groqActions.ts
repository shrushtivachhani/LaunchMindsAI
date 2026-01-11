'use server';

import Groq from "groq-sdk";
import { MASTER_SYSTEM_PROMPT } from "@/features/agents/utils/prompts/master";
import { AGENT_PROMPTS } from "@/features/agents/utils/prompts";

const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
    console.error("❌ SERVER SIDE: Missing GROQ_API_KEY");
}

const groq = new Groq({ apiKey: apiKey || "" });

const MODEL_NAME = "llama-3.3-70b-versatile";

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
    if (!apiKey) throw new Error("API Key configuration missing on server (GROQ_API_KEY).");

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
IMPORTANT: Return ONLY the JSON object. Do not include any markdown formatting or explanation.
`;

        console.log(`🤖 Groq AI Call: ${systemPromptId} using ${MODEL_NAME}`);

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: fullPrompt,
                },
            ],
            model: MODEL_NAME,
            temperature: 0.7,
            response_format: { type: "json_object" }, // Groq supports JSON mode
        });

        const text = chatCompletion.choices[0]?.message?.content || "{}";

        // Clean markdown code blocks if present (just in case, though json_object mode helps)
        const cleanJson = text.replace(/```json\n?|\n?```/g, "").trim();

        return JSON.parse(cleanJson);
    } catch (error: any) {
        console.error("Groq Server Action Error:", error);
        throw new Error(`AI Generation Failed: ${error.message}`);
    }
}
