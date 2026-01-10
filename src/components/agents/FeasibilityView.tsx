"use client";

import React from 'react';
import { useOrchestrator } from '../orchestrator/OrchestratorContext';
import { Button, Card } from '@/components/ui/components';
import { ShieldAlert, CheckCircle2, AlertTriangle, XCircle, ArrowRight, Loader2, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Agent2Output } from '@/lib/agents/types';

export const FeasibilityView = () => {
    const { state, setAgent2Data, nextStep, isProcessing, setIsProcessing } = useOrchestrator();

    const handleAnalyze = () => {
        setIsProcessing(true);
        setTimeout(() => {
            const mockData: Agent2Output = {
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
            setAgent2Data(mockData);
            setIsProcessing(false);
        }, 2500);
    };

    const hasData = !!state.agent2;

    return (
        <div className="max-w-5xl mx-auto py-4">
             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 bg-brand-secondary/10 rounded-lg text-brand-secondary border border-brand-secondary/20 shadow-[0_0_15px_-3px_rgba(0,206,201,0.3)]">
                        <ShieldAlert className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold tracking-[0.2em] text-brand-secondary uppercase">Agent 02 • Risk Analysis</span>
                </div>
                <h1 className="text-4xl font-bold mb-4 text-white">
                    Feasibility & Risk Audit
                </h1>
                <p className="text-gray-400 text-lg max-w-2xl font-light">
                    Stress-testing your concept against live market data, technical bottlenecks, and regulatory frameworks.
                </p>
            </motion.div>

            {!hasData ? (
                <div className="flex flex-col items-center justify-center p-16 border border-dashed border-white/10 rounded-2xl bg-[#0B0E14]/50 backdrop-blur-sm group hover:bg-[#0B0E14]/80 transition-colors">
                    <div className="w-20 h-20 bg-brand-secondary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                        <BarChart2 className="w-8 h-8 text-brand-secondary opacity-80" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-white">Ready to Stress Test?</h3>
                    <p className="text-gray-400 text-center max-w-lg mb-10 leading-relaxed">
                        I will now ingest your idea from Step 1 and run it against 150+ data points to calculate a viability score.
                    </p>
                    <Button onClick={handleAnalyze} disabled={isProcessing} size="lg" variant="default" className="bg-brand-secondary hover:bg-brand-secondary/90 text-black font-semibold h-12 px-8">
                         {isProcessing ? <><Loader2 className="w-5 h-5 mr-2 animate-spin"/> Running Monte Carlo Simulations...</> : "Initialize Feasibility Check"}
                    </Button>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Score Card */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="p-8 border-brand-secondary/30 bg-brand-secondary/5 col-span-2 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-32 bg-brand-secondary/10 rounded-full blur-[80px] -z-10 group-hover:bg-brand-secondary/15 transition-colors" />
                            
                            <h3 className="text-sm font-bold uppercase tracking-widest text-brand-secondary mb-6">Viability Score</h3>
                            <div className="flex items-end gap-6 mb-6">
                                <span className="text-7xl font-bold text-white tracking-tighter">{state.agent2.feasibility_score}<span className="text-2xl text-gray-500 font-normal">/100</span></span>
                                <span className="px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-bold mb-3 uppercase tracking-wider flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4" />
                                    {state.agent2.recommendation} - Proceed
                                </span>
                            </div>
                            <div className="w-full bg-gray-800/50 h-3 rounded-full mt-2 overflow-hidden border border-white/5">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${state.agent2.feasibility_score}%` }}
                                    className="h-full bg-gradient-to-r from-brand-secondary to-green-400 shadow-[0_0_15px_rgba(0,206,201,0.5)]"
                                />
                            </div>
                        </Card>
                        
                         <Card className="p-6 border-red-500/30 bg-red-500/5 backdrop-blur-sm">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-red-400 mb-6 flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4" />
                                Critical Risks
                            </h3>
                            <ul className="space-y-4">
                                {state.agent2.top_risks.map((risk, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-red-200/90 leading-relaxed bg-red-500/10 p-3 rounded-lg border border-red-500/10">
                                        <XCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                                        {risk}
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </div>

                    {/* Detailed Analysis */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="p-6 bg-[#121421]/60 border-white/5">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6 border-b border-white/5 pb-2">Market Intelligence</h3>
                            <div className="space-y-6">
                                <div>
                                    <span className="text-xs text-brand-secondary block mb-1">Demand Velocity</span>
                                    <p className="font-medium text-lg text-white">{state.agent2.market.demand}</p>
                                </div>
                                <div>
                                    <span className="text-xs text-brand-secondary block mb-1">Competitive Landscape</span>
                                    <p className="font-medium text-lg text-white">{state.agent2.market.competition}</p>
                                </div>
                            </div>
                        </Card>
                        <Card className="p-6 bg-[#121421]/60 border-white/5">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6 border-b border-white/5 pb-2">Execution Constraints</h3>
                            <div className="space-y-6">
                                <div>
                                    <span className="text-xs text-orange-400 block mb-1">Technical Complexity</span>
                                    <p className="font-medium text-lg text-white">{state.agent2.technical.complexity}</p>
                                </div>
                                <div>
                                    <span className="text-xs text-red-400 block mb-1">Compliance Barrier</span>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2.5 h-2.5 rounded-full ${state.agent2.legal.risk_level === 'High' ? 'bg-red-500 shadow-[0_0_10px_red]' : 'bg-yellow-500 shadow-[0_0_10px_orange]'}`} />
                                        <p className="font-medium text-lg text-white">{state.agent2.legal.risk_level}</p>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2 italic">{state.agent2.legal.notes}</p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <div className="flex justify-end pt-6">
                        <Button onClick={nextStep} variant="ghost" size="lg" className="hover:bg-brand-secondary/10 hover:text-brand-secondary border border-transparent hover:border-brand-secondary/30">
                            Proceed to Compliance <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};
