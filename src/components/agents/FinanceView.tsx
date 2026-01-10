"use client";

import React from 'react';
import { useOrchestrator } from '../orchestrator/OrchestratorContext';
import { Button, Card } from '@/components/ui/components';
import { DollarSign, PieChart, TrendingDown, Wallet, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Agent5Output } from '@/lib/agents/types';

const MoneyCard = ({ label, value, subtext }: { label: string, value: string, subtext?: string }) => (
    <Card className="p-6 border-white/5 bg-[#121421]/60 hover:bg-[#121421]/80 transition-colors group">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{label}</span>
        <div className="text-3xl font-bold text-white mt-3 tracking-tight group-hover:text-purple-400 transition-colors">{value}</div>
        {subtext && <div className="text-xs font-medium text-gray-500 mt-2">{subtext}</div>}
    </Card>
)

export const FinanceView = () => {
    const { state, setAgent5Data, nextStep, isProcessing, setIsProcessing } = useOrchestrator();

    const handleBudget = () => {
        setIsProcessing(true);
        setTimeout(() => {
             const mockData: Agent5Output = {
                startup_costs: {
                    "Incoperation": 500,
                    "Branding & UI": 1500,
                    "Tech Infrastructure": 1000,
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
                financial_risks: ["High CPA on Paid Channels", "API Cost scaling"],
                financial_health: "Strong"
             };
            setAgent5Data(mockData);
            setIsProcessing(false);
        }, 2500);
    };

    const hasData = !!state.agent5;

    return (
        <div className="max-w-5xl mx-auto py-4">
             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10"
            >
                <div className="flex items-center gap-3 mb-4">
                     <div className="p-2.5 bg-purple-500/10 rounded-lg text-purple-400 border border-purple-500/20 shadow-[0_0_15px_-3px_rgba(168,85,247,0.3)]">
                        <DollarSign className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold tracking-[0.2em] text-purple-400 uppercase">Agent 05 • Financial Modeling</span>
                </div>
                <h1 className="text-4xl font-bold mb-4 text-white">
                    Financial Planning (CFO)
                </h1>
                <p className="text-gray-400 text-lg max-w-2xl font-light">
                    Real numbers. Real runway. A defensible budget for your first year of operations.
                </p>
            </motion.div>

             {!hasData ? (
                <div className="flex flex-col items-center justify-center p-16 border border-dashed border-white/10 rounded-2xl bg-[#0B0E14]/50 backdrop-blur-sm group hover:bg-[#0B0E14]/80 transition-colors">
                    <div className="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                        <PieChart className="w-8 h-8 text-purple-400 opacity-80" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-white">Execute Financial Model</h3>
                    <p className="text-gray-400 text-center max-w-md mb-8 leading-relaxed">
                        I will calculate your initial capital requirements, monthly burn rate, and runway based on 12 months of survival.
                    </p>
                    <Button onClick={handleBudget} disabled={isProcessing} size="lg" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold h-12 px-8 shadow-lg shadow-purple-600/20">
                         {isProcessing ? <><Loader2 className="w-5 h-5 mr-2 animate-spin"/> Crunching Numbers...</> : "Generate Financial Projection"}
                    </Button>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* KPI Ribbon */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <MoneyCard 
                            label="Startup Capital" 
                            value={`$${state.agent5 ? Object.values(state.agent5.startup_costs).reduce((a, b) => a + b, 0).toLocaleString() : 0}`} 
                        />
                        <MoneyCard 
                            label="Monthly Burn" 
                            value={`$${state.agent5?.monthly_burn_rate.toLocaleString()}`} 
                            subtext="Fixed + Variable"
                        />
                         <MoneyCard 
                            label="Runway" 
                            value={`${state.agent5?.runway_months} Mo`} 
                            subtext={`Survival Runway`}
                        />
                         <MoneyCard 
                            label="Health Score" 
                            value={state.agent5?.financial_health || "N/A"} 
                            subtext={`Contingency: ${state.agent5?.contingency_percentage}`}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Costs Breakdown */}
                        <Card className="p-8 bg-[#121421]/60 border-white/5">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                                <Wallet className="w-4 h-4" /> Startup Costs (One-time)
                            </h3>
                            <div className="space-y-3">
                                {state.agent5 && Object.entries(state.agent5.startup_costs).map(([key, val]) => (
                                    <div key={key} className="flex justify-between items-center text-sm border-b border-white/5 pb-3">
                                        <span className="text-gray-300">{key}</span>
                                        <span className="font-mono text-purple-200 font-medium">${val.toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>

                         <Card className="p-8 bg-[#121421]/60 border-white/5">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                                <TrendingDown className="w-4 h-4" /> Operational Expenses (Monthly)
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <span className="text-xs text-purple-400 font-bold mb-3 block">Fixed Costs</span>
                                    <div className="space-y-2">
                                         {state.agent5 && Object.entries(state.agent5.fixed_costs).map(([key, val]) => (
                                            <div key={key} className="flex justify-between items-center text-sm">
                                                <span className="text-gray-400">{key}</span>
                                                <span className="font-mono text-white">${val.toLocaleString()}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-white/5">
                                    <span className="text-xs text-purple-400 font-bold mb-3 block">Variable Costs (Est.)</span>
                                     <div className="space-y-2">
                                         {state.agent5 && Object.entries(state.agent5.variable_costs).map(([key, val]) => (
                                            <div key={key} className="flex justify-between items-center text-sm">
                                                <span className="text-gray-400">{key}</span>
                                                <span className="font-mono text-white">${val.toLocaleString()}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Risks Alert */}
                    <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/10 flex gap-4 text-orange-200 items-start">
                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-orange-400" />
                        <div>
                            <h4 className="font-bold text-sm text-orange-400">Financial Risk Assessment</h4>
                            <ul className="list-disc list-inside text-sm text-gray-400 mt-2 space-y-1">
                                {state.agent5?.financial_risks.map((risk, i) => <li key={i}>{risk}</li>)}
                            </ul>
                        </div>
                    </div>

                    <div className="flex justify-end pt-6">
                        <Button onClick={nextStep} variant="premium" size="lg" className="shadow-brand-primary/20">
                            Finalize Blueprint <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};
