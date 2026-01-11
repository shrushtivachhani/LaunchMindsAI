
import { Agent1Output } from "../types/types";

export interface UserInputContext {
    industry?: string;
    targetUserType?: string;
    location?: string;
    geography?: string; // Added to fix build error
    budget?: string;
    teamSize?: string;
    rawIdea: string;
}

export function buildAgentContext(step: number, userInput: UserInputContext, previousOutputs: any) {
    const baseContext = `
PROJECT CONTEXT:
- Industry: ${userInput.industry || "Unspecified"}
- Target Market: ${userInput.location || "Global"}
- Budget Range: ${userInput.budget || "Unspecified"}
- Team Size: ${userInput.teamSize || "1"}
- Original Idea: "${userInput.rawIdea}"
`;

    if (step === 1) return baseContext;

    // For subsequent steps, inject previous agent outputs
    let extendedContext = baseContext + "\nPREVIOUS AGENT OUTPUTS:\n";

    if (previousOutputs.agent1) {
        extendedContext += `[Agent 1 - Idea Architect]:\n${JSON.stringify(previousOutputs.agent1, null, 2)}\n`;
    }
    if (previousOutputs.agent2) {
        extendedContext += `[Agent 2 - Feasibility]:\n${JSON.stringify(previousOutputs.agent2, null, 2)}\n`;
    }
    if (previousOutputs.agent3) {
        extendedContext += `[Agent 3 - Compliance]:\n${JSON.stringify(previousOutputs.agent3, null, 2)}\n`;
    }
    if (previousOutputs.agent4) {
        extendedContext += `[Agent 4 - Growth]:\n${JSON.stringify(previousOutputs.agent4, null, 2)}\n`;
    }

    return extendedContext;
}
