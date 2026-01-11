
import { geminiModel } from "@/lib/gemini/client";
import { MASTER_SYSTEM_PROMPT } from "./prompts/master";
import { buildAgentContext, UserInputContext } from "./contextBuilder";
import { Agent1Output, Agent2Output, Agent3Output, Agent4Output, Agent5Output } from "../types/types";
import { AGENT_PROMPTS } from "./prompts";

export class AgentEngine {

    private static async generateResponse<T>(
        systemPrompt: string,
        userPrompt: string,
        context: string
    ): Promise<T> {
        try {
            // Call Server Action
            const { generateAIResponse } = await import('../actions/groqActions');
            // Append timestamp to prevent caching
            const dynamicContext = context + `\n\n[System Timestamp: ${Date.now()}]`;
            return await generateAIResponse(systemPrompt, userPrompt, dynamicContext) as T;
        } catch (error) {
            console.error("Gemini Generation Error:", error);
            throw new Error(`Failed to generate AI response: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    static async generateAgent1(input: UserInputContext): Promise<Agent1Output> {
        const context = buildAgentContext(1, input, {});
        return this.generateResponse<Agent1Output>(
            "AGENT_1",
            `Define startup concept for idea: "${input.rawIdea}"`,
            context
        );
    }

    static async generateAgent2(input: Agent1Output, userInput: UserInputContext): Promise<Agent2Output> {
        const context = buildAgentContext(2, userInput, { agent1: input });
        return this.generateResponse<Agent2Output>(
            "AGENT_2",
            "Evaluate feasibility based on the defined concept.",
            context
        );
    }

    static async generateAgent3(input: Agent2Output, userContext: any): Promise<Agent3Output> {
        // Use userContext containing previous outputs + user input
        const context = buildAgentContext(3, userContext.userInput, {
            agent1: userContext.agent1,
            agent2: input
        });
        return this.generateResponse<Agent3Output>(
            "AGENT_3",
            "Identify compliance and legal requirements.",
            context
        );
    }

    static async generateAgent4(input: Agent3Output, userContext: any): Promise<Agent4Output> {
        const context = buildAgentContext(4, userContext.userInput, {
            agent1: userContext.agent1,
            agent2: userContext.agent2,
            agent3: input
        });
        return this.generateResponse<Agent4Output>(
            "AGENT_4",
            "Develop growth and marketing strategy.",
            context
        );
    }

    static async generateAgent5(input: Agent4Output, userContext: any): Promise<Agent5Output> {
        const context = buildAgentContext(5, userContext.userInput, {
            agent1: userContext.agent1,
            agent2: userContext.agent2,
            agent3: userContext.agent3,
            agent4: input
        });
        return this.generateResponse<Agent5Output>(
            "AGENT_5",
            "Create financial plan and projections.",
            context
        );
    }
}

function getAgentSpecificPrompt(agentId: string): string {
    // Mapping from string key to AGENT_PROMPTS
    switch (agentId) {
        case "AGENT_1": return AGENT_PROMPTS.AGENT_1;
        case "AGENT_2": return AGENT_PROMPTS.AGENT_2;
        case "AGENT_3": return AGENT_PROMPTS.AGENT_3;
        case "AGENT_4": return AGENT_PROMPTS.AGENT_4;
        case "AGENT_5": return AGENT_PROMPTS.AGENT_5;
        default: return "";
    }
}
