"use client";

import React from 'react';
import { useOrchestrator } from '../orchestrator/OrchestratorContext';
import { Brain, ShieldAlert, FileText, TrendingUp, DollarSign, Rocket, Layers, CheckCircle, CircleDashed, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const AGENTS = [
  { step: 0, title: "Idea Architect", role: "Agent 01", icon: Brain },
  { step: 1, title: "Feasibility Analyst", role: "Agent 02", icon: ShieldAlert },
  { step: 2, title: "Compliance Lead", role: "Agent 03", icon: FileText },
  { step: 3, title: "Growth Strategist", role: "Agent 04", icon: TrendingUp },
  { step: 4, title: "Financial Planner", role: "Agent 05", icon: DollarSign },
  { step: 5, title: "Blueprint Compiler", role: "Orchestrator", icon: Layers },
];

export const Sidebar = () => {
    const { state, goToStep } = useOrchestrator();

    return (
        <aside className="w-72 h-screen border-r border-white/5 bg-[#0B0E14] fixed left-0 top-0 flex flex-col z-50 shadow-2xl shadow-black/50">
            {/* Brand Header */}
            <div className="h-20 flex items-center gap-3 px-6 border-b border-white/5 bg-white/[0.02]">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-white font-bold shadow-lg shadow-brand-primary/20">
                    LM
                </div>
                <div>
                    <h1 className="text-lg font-bold tracking-tight text-white">
                        LaunchMinds<span className="text-brand-secondary">AI</span>
                    </h1>
                    <p className="text-[10px] text-muted-foreground tracking-wider uppercase">Enterprise Edition</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-1 p-4 flex-1 overflow-y-auto custom-scrollbar">
                <div className="px-2 mb-4 mt-2">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Autonomous Team</p>
                </div>

                {AGENTS.map((agent) => {
                    const isActive = state.currentStep === agent.step;
                    const isPassed = state.currentStep > agent.step;
                    const isPending = state.currentStep < agent.step;
                    
                    return (
                        <button
                            key={agent.step}
                            onClick={() => agent.step <= Math.max(state.currentStep, 0) && goToStep(agent.step)}
                            disabled={agent.step > state.currentStep}
                            className={cn(
                                "flex items-center gap-3 p-3.5 rounded-lg transition-all duration-200 text-sm font-medium text-left border border-transparent group relative overflow-hidden",
                                isActive 
                                    ? "bg-brand-primary/10 text-white border-brand-primary/20 shadow-[0_0_20px_-5px_rgba(108,92,231,0.3)]" 
                                    : isPassed 
                                        ? "text-gray-400 hover:text-white hover:bg-white/5" 
                                        : "text-gray-600 cursor-not-allowed opacity-60"
                            )}
                        >
                            {/* Active Indicator Line */}
                            {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-primary rounded-l-lg" />}

                            <div className={cn(
                                "p-1.5 rounded-md transition-colors",
                                isActive ? "bg-brand-primary/20 text-brand-primary" : "bg-white/5 text-gray-500 group-hover:text-gray-300"
                            )}>
                                <agent.icon className="w-4 h-4" />
                            </div>

                            <div className="flex flex-col flex-1">
                                <span className={cn(isActive ? "font-semibold text-white" : "")}>{agent.title}</span>
                                <span className="text-[10px] opacity-70 uppercase tracking-wider">{agent.role}</span>
                            </div>
                            
                            {/* Status Icons */}
                            {isActive && <Loader2 className="w-4 h-4 text-brand-primary animate-spin" />}
                            {isPassed && <CheckCircle className="w-4 h-4 text-brand-accent/80" />}
                            {isPending && <CircleDashed className="w-4 h-4 text-gray-700" />}
                        </button>
                    )
                })}
            </nav>

            {/* User Profile / System Status */}
            <div className="p-4 border-t border-white/5 bg-white/[0.02]">
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#1A1D26] to-black border border-white/5 flex items-center gap-3">
                   <div className="relative">
                        <div className="w-9 h-9 rounded-full bg-brand-primary/20 flex items-center justify-center border border-brand-primary/10">
                            <Rocket className="w-4 h-4 text-brand-secondary" />
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-brand-accent rounded-full border-2 border-[#1A1D26] animate-pulse" />
                   </div>
                   <div>
                       <p className="text-xs font-medium text-white">System Operational</p>
                       <p className="text-[10px] text-gray-500">v2.4.0 • Stable</p>
                   </div>
                </div>
            </div>
        </aside>
    );
};
