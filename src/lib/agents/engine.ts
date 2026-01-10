import { AGENT_PROMPTS } from "./prompts";
import { Agent1Output, Agent2Output, Agent3Output, Agent4Output, Agent5Output } from "./types";

// Simulation delay helper
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class AgentEngine {

    // In a real app, this would call OpenAI/Anthropic
    static async generateAgent1(input: any): Promise<Agent1Output> {
        await delay(2000); // Simulate thinking
        return {
            problem_statement: "Small businesses struggle to manage actionable financial planning without an expensive CFO.",
            target_customer: input.targetUserType || "SMB Owners",
            solution_description: "An AI-powered co-founder that automates financial strategy and operational planning.",
            value_proposition: "Fractional CFO intelligence at the cost of a Netflix subscription.",
            business_model: "B2B SaaS Subscription",
            revenue_streams: ["Monthly Subscription ($49/mo)", "Enterprise API Access"],
            key_assumptions: ["Users trust AI with financial data", "SMBs are willing to pay for automated advice"]
        };
    }

    static async generateAgent2(input: Agent1Output): Promise<Agent2Output> {
        await delay(2500);
        return {
            market: {
                demand: "High - Growing at 15% CAGR",
                competition: "Moderate - Few incumbents, no direct AI competitor",
                gap: "Lack of affordable CFO solutions for small teams"
            },
            technical: {
                complexity: "Medium - Requires advanced LLM integration",
                risk: "Dependency on 3rd party AI models"
            },
            financial: {
                capital_intensity: "Low - SaaS Model",
                profit_potential: "High - High gross margins (>80%)"
            },
            operational: {
                scalability: "High - Cloud native",
                constraints: "Customer Support load at scale"
            },
            legal: {
                risk_level: "Medium",
                notes: "Financial advice regulations (fintech compliance)"
            },
            feasibility_score: 85,
            recommendation: "GO",
            top_risks: ["Regulatory changes in AI", "API Cost spikes"]
        };
    }

    static async generateAgent3(input: Agent2Output): Promise<Agent3Output> {
        await delay(3000);
        return {
            mandatory_documents: [
                { name: "Certificate of Incorporation", purpose: "Legal existence", stage: "Pre-launch" },
                { name: "Founders Agreement", purpose: "Equity split & vesting", stage: "Pre-launch" },
                { name: "Privacy Policy", purpose: "Data protection (GDPR/DPDP)", stage: "Pre-launch" }
            ],
            optional_documents: [
                { name: "Trademark Filing", purpose: "Brand protection" },
                { name: "Advisor Agreement", purpose: "Equity for advisors" }
            ],
            registrations_required: ["GST Registration", "MSME Registration (Udyam)"],
            compliance_risks: ["Data Localization Variance"],
            generated_templates: ["Privacy Policy", "Founders Agreement"]
        };
    }

    static async generateAgent4(input: Agent3Output): Promise<Agent4Output> {
        await delay(2000);
        return {
            target_personas: ["Small Business Owners (Revenue < $1M)", "Freelance Contractors"],
            pricing_strategy: "Freemium to Pro Subscription",
            go_to_market_plan: ["Pilot with 50 beta users", "Content Marketing on LinkedIn", "Partnerships with Accounting Firms"],
            acquisition_channels: ["LinkedIn Ads", "SEO (Keyword: 'Virtual CFO')", "Direct Outreach"],
            early_traction_plan: "Offer free financial health checkup for first 100 users."
        };
    }

    static async generateAgent5(input: Agent4Output): Promise<Agent5Output> {
        await delay(2500);
        return {
            startup_costs: {
                "Incoperation": 500,
                "Branding & UI": 1500,
                "Tech Setup": 1000,
                "Legal Retainer": 2000
            },
            fixed_costs: {
                "Cloud Hosting": 200,
                "SaaS Subscriptions": 300,
                "Founder Salaries": 0, // Bootstrapped
                "Office/Remote": 0
            },
            variable_costs: {
                "CAC (Marketing)": 1000,
                "Payment Processing": 50
            },
            monthly_burn_rate: 1550,
            runway_months: 12,
            contingency_percentage: "20%",
            financial_risks: ["High CPA on LinkedIn", "Server costs scaling linearly"],
            financial_health: "Strong"
        };
    }
}
