"use client";

import React, { useRef } from 'react';
import { useOrchestrator } from '@/features/orchestrator/context/OrchestratorContext';
import { Button, Card } from '@/components/ui/components';
import { AgentEngine } from '@/features/agents/utils/engine';
import { TrendingUp, Users, Target, Rocket, ArrowRight, Loader2, Megaphone } from 'lucide-react';
import { motion } from 'framer-motion';

export const GrowthView = () => {
    const { state, setAgent4Data, nextStep, isProcessing, setIsProcessing } = useOrchestrator();

    const handleDesign = async () => {
        setIsProcessing(true);
        try {
            const userContext = { 
                userInput: {
                     rawIdea: state.agent1?.solution_description || "Startup", 
                     industry: "Unknown", geography: "Global", targetUserType: state.agent1?.target_customer
                },
                agent1: state.agent1,
                agent2: state.agent2,
                agent3: state.agent3
            };
            const result = await AgentEngine.generateAgent4(state.agent3!, userContext);
            setAgent4Data(result);
            nextStep();

        } catch (error: any) {
            console.error("Agent 4 Failed:", error);
            alert(`Growth Strategy Failed: ${error.message}`);
        } finally {
            setIsProcessing(false);
        }
    };

    const hasData = !!state.agent4;

    return (
        <div className="max-w-5xl mx-auto py-4">
             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10"
            >
                <div className="flex items-center gap-3 mb-4">
                     <div className="p-2.5 bg-orange-500/10 rounded-lg text-orange-500 border border-orange-500/20 shadow-[0_0_15px_-3px_rgba(249,115,22,0.3)]">
                        <TrendingUp className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold tracking-[0.2em] text-orange-500 uppercase">Agent 04 • Growth Architecture</span>
                </div>
                <h1 className="text-4xl font-bold mb-4 text-white">
                    Market & Traction Strategy
                </h1>
                <p className="text-gray-400 text-lg max-w-2xl font-light">
                    Acquisition channels, pricing models, and your first 1,000 customers.
                </p>
            </motion.div>

             {!hasData ? (
                <div className="flex flex-col items-center justify-center p-16 border border-dashed border-white/10 rounded-2xl bg-[#0B0E14]/50 backdrop-blur-sm group hover:bg-[#0B0E14]/80 transition-colors">
                    <div className="w-20 h-20 bg-orange-500/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                        <Rocket className="w-8 h-8 text-orange-500 opacity-80" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-white">Design Growth Engine</h3>
                    <p className="text-gray-400 text-center max-w-md mb-8 leading-relaxed">
                        I will identify your Ideal Customer Profile (ICP), optimal pricing leverage, and high-ROI channels.
                    </p>
                    <Button onClick={handleDesign} disabled={isProcessing} size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold h-12 px-8 shadow-lg shadow-orange-500/20">
                         {isProcessing ? <><Loader2 className="w-5 h-5 mr-2 animate-spin"/> Architecting GTM Strategy...</> : "Build Go-To-Market Plan"}
                    </Button>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Personas */}
                        <Card className="p-6 bg-[#121421]/60 border-white/5">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                                <Users className="w-5 h-5 text-orange-500" />
                                <h3 className="font-bold uppercase tracking-wider text-sm text-gray-300">Target Personas (ICP)</h3>
                            </div>
                            <div className="space-y-3">
                                {state.agent4?.target_personas?.map((persona, i) => (
                                    <div key={i} className="p-4 bg-black/20 rounded-xl border border-white/5 hover:border-orange-500/30 transition-all flex items-center gap-4 group">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/5 text-orange-500 flex items-center justify-center text-xs font-bold border border-orange-500/10 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                            {i+1}
                                        </div>
                                        <span className="font-medium text-white">{persona}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Channels */}
                        <Card className="p-6 bg-[#121421]/60 border-white/5">
                             <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                                <Megaphone className="w-5 h-5 text-orange-500" />
                                <h3 className="font-bold uppercase tracking-wider text-sm text-gray-300">Capture Channels</h3>
                            </div>
                            <div className="flex flex-wrap gap-2.5">
                                {state.agent4?.acquisition_channels?.map((channel, i) => (
                                    <span key={i} className="px-3.5 py-2 rounded-lg bg-orange-500/5 border border-orange-500/20 text-orange-200 text-sm font-medium hover:bg-orange-500/10 cursor-default transition-colors">
                                        {channel}
                                    </span>
                                ))}
                            </div>
                            <div className="mt-8 pt-6 border-t border-white/10">
                                <span className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-2 block">Pricing Structure</span>
                                <p className="text-lg font-bold text-white tracking-tight">
                                    {typeof state.agent4?.pricing_strategy === 'object' 
                                        ? JSON.stringify(state.agent4?.pricing_strategy) 
                                        : state.agent4?.pricing_strategy}
                                </p>
                            </div>
                        </Card>

                        {/* Early Traction */}
                        <Card className="md:col-span-2 p-1 border-white/10 bg-gradient-to-r from-orange-500/10 to-transparent">
                            <div className="bg-[#121421]/80 backdrop-blur-xl p-8 rounded-lg h-full flex flex-col md:flex-row items-start md:items-center gap-6">
                                <div className="p-4 rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/20 shrink-0">
                                    <Rocket className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Alpha Traction Plan</h3>
                                    <p className="text-gray-400 leading-relaxed max-w-2xl">
                                        {state.agent4?.early_traction_plan}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <div className="flex justify-end pt-6">
                        <Button onClick={nextStep} variant="ghost" size="lg" className="hover:bg-orange-500/10 hover:text-orange-500 border border-transparent hover:border-orange-500/30">
                            Proceed to Financial Planning <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};
