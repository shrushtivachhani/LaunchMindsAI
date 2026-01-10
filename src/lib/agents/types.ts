export type AgentId = 'AGENT_1' | 'AGENT_2' | 'AGENT_3' | 'AGENT_4' | 'AGENT_5';

export interface Agent1Input {
  rawIdea: string;
  industry: string;
  geography: string;
  targetUserType: string;
}

export interface Agent1Output {
  problem_statement: string;
  target_customer: string;
  solution_description: string;
  value_proposition: string;
  business_model: string;
  revenue_streams: string[];
  key_assumptions: string[];
}

export interface Agent2Output {
  market: {
    demand: string;
    competition: string;
    gap: string;
  };
  technical: {
    complexity: string;
    risk: string;
  };
  financial: {
    capital_intensity: string;
    profit_potential: string;
  };
  operational: {
    scalability: string;
    constraints: string;
  };
  legal: {
    risk_level: string;
    notes: string;
  };
  feasibility_score: number;
  recommendation: 'GO' | 'MODIFY' | 'NO-GO';
  top_risks: string[];
}

export interface Agent3Output {
  mandatory_documents: Array<{ name: string; purpose: string; stage: string }>;
  optional_documents: Array<{ name: string; purpose: string }>;
  registrations_required: string[];
  compliance_risks: string[];
  generated_templates: string[];
}

export interface Agent4Output {
  target_personas: string[];
  pricing_strategy: string;
  go_to_market_plan: string[];
  acquisition_channels: string[];
  early_traction_plan: string;
}

export interface Agent5Output {
  startup_costs: Record<string, number>;
  fixed_costs: Record<string, number>;
  variable_costs: Record<string, number>;
  monthly_burn_rate: number;
  runway_months: number;
  contingency_percentage: string;
  financial_risks: string[];
  financial_health: 'Strong' | 'Moderate' | 'Weak';
}

export interface ProjectState {
  currentStep: number; // 0 to 5
  agent1?: Agent1Output;
  agent2?: Agent2Output;
  agent3?: Agent3Output;
  agent4?: Agent4Output;
  agent5?: Agent5Output;
  isProcessing: boolean;
}
