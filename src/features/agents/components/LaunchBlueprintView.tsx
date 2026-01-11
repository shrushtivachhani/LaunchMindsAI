"use client";

import React from 'react';
import { useOrchestrator } from '@/features/orchestrator/context/OrchestratorContext';
import { Button, Card } from '@/components/ui/components';
import { Rocket, Download, Share2, CheckCircle2, AlertTriangle, FileText, DollarSign, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

export const LaunchBlueprintView = () => {
    const { state } = useOrchestrator();

    // In a real app, we would validate that all agent data exists.
    // Assuming mock flow populated everything.

    return (
        <div className="max-w-6xl mx-auto py-4">
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="mb-10 text-center"
            >
               <div className="inline-flex items-center justify-center p-5 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-2xl shadow-2xl shadow-brand-primary/20 mb-6">
                   <Layers className="w-10 h-10 text-white" />
               </div>
               <h1 className="text-5xl font-bold mb-4 text-white tracking-tight">
                   Mission Ready.
               </h1>
               <p className="text-xl text-gray-400 font-light">
                   Your comprehensive startup blueprint is generated and ready for execution.
               </p>
           </motion.div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                {/* Executive Summary Card */}
                <Card className="col-span-1 md:col-span-2 p-10 bg-gradient-to-br from-[#121421]/80 to-[#121421]/40 border-white/5 relative overflow-hidden group">
                    <div className="absolute -top-10 -right-10 p-4 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                        <FileText className="w-64 h-64 text-white" />
                    </div>
                    
                    <h2 className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-8 border-b border-white/5 pb-4">Executive Summary</h2>
                    
                    <div className="space-y-8 relative z-10">
                        <div>
                            <span className="text-sm font-medium text-gray-500 block mb-2">The Concept</span>
                            <p className="text-2xl font-medium text-white leading-relaxed">{state.agent1?.solution_description || "Pending..."}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <span className="text-sm font-medium text-gray-500 block mb-2">Target Market</span>
                                <p className="font-medium text-white text-lg">{state.agent1?.target_customer || "Pending..."}</p>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-gray-500 block mb-2">Business Model</span>
                                <p className="font-medium text-white text-lg">{state.agent1?.business_model || "Pending..."}</p>
                            </div>
                        </div>
                         <div>
                            <span className="text-sm font-medium text-gray-500 block mb-2">Value Proposition</span>
                            <p className="font-medium text-gray-300 italic">"{state.agent1?.value_proposition || "Pending..."}"</p>
                        </div>
                    </div>
                </Card>

                {/* Score & Risk */}
                <div className="space-y-6">
                    <Card className={`p-8 border-l-4 ${state.agent5?.financial_health === 'Strong' ? 'border-l-green-500' : 'border-l-brand-secondary'} bg-[#121421]/60`}>
                        <h3 className="font-bold text-gray-500 uppercase text-xs tracking-widest">Readiness Score</h3>
                        <div className="text-6xl font-bold text-white mt-4 tracking-tighter">
                            {state.agent2?.feasibility_score || 0}<span className="text-2xl text-gray-500 font-normal">/100</span>
                        </div>
                        <div className="mt-4 text-sm font-bold text-green-400 flex items-center gap-2 bg-green-500/10 py-1.5 px-3 rounded-full w-fit uppercase text-[10px] tracking-wider">
                            <CheckCircle2 className="w-3.5 h-3.5" /> {state.agent2?.recommendation || "Pending"} for Launch
                        </div>
                    </Card>

                    <Card className="p-8 bg-red-500/5 border-red-500/20 backdrop-blur-sm">
                         <h3 className="font-bold text-red-400 uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
                             <AlertTriangle className="w-4 h-4" /> Crucial Risks
                         </h3>
                         <ul className="space-y-3">
                             {(state.agent2?.top_risks || []).slice(0, 2).map((risk, i) => (
                                 <li key={i} className="text-xs text-red-200/90 flex items-start gap-2 leading-relaxed">
                                     <span className="w-1 h-1 rounded-full bg-red-400 mt-1.5 shrink-0" />
                                     {risk}
                                 </li>
                             ))}
                             {(state.agent5?.financial_risks || []).slice(0, 1).map((risk, i) => (
                                 <li key={i+2} className="text-xs text-red-200/90 flex items-start gap-2 leading-relaxed">
                                     <span className="w-1 h-1 rounded-full bg-red-400 mt-1.5 shrink-0" />
                                     {risk}
                                 </li>
                             ))}
                         </ul>
                    </Card>
                </div>
           </div>

           {/* Metrics Grid */}
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
               <Card className="p-6 bg-[#121421]/40 border-white/5 text-center hover:bg-[#121421]/60 transition-colors group">
                   <div className="text-xs text-gray-500 uppercase tracking-widest mb-2 group-hover:text-purple-400 transition-colors">Capital Need</div>
                   <div className="text-2xl font-bold text-white">
                       ${state.agent5 ? Object.values(state.agent5.startup_costs || {}).reduce((a,b)=>a+b,0).toLocaleString() : 'N/A'}
                   </div>
               </Card>
               <Card className="p-6 bg-[#121421]/40 border-white/5 text-center hover:bg-[#121421]/60 transition-colors group">
                   <div className="text-xs text-gray-500 uppercase tracking-widest mb-2 group-hover:text-green-400 transition-colors">Profit Potential</div>
                   <div className="text-xl font-bold text-white">
                       {state.agent2?.financial?.profit_potential || 'N/A'}
                   </div>
               </Card>
               <Card className="p-6 bg-[#121421]/40 border-white/5 text-center hover:bg-[#121421]/60 transition-colors group">
                   <div className="text-xs text-gray-500 uppercase tracking-widest mb-2 group-hover:text-brand-accent transition-colors">Compliance</div>
                   <div className="text-2xl font-bold text-white">
                       {state.agent3?.mandatory_documents?.length || 0} <span className="text-sm font-normal text-gray-500">Docs</span>
                   </div>
               </Card>
               <Card className="p-6 bg-[#121421]/40 border-white/5 text-center hover:bg-[#121421]/60 transition-colors group">
                   <div className="text-xs text-gray-500 uppercase tracking-widest mb-2 group-hover:text-orange-400 transition-colors">Growth Channels</div>
                   <div className="text-2xl font-bold text-white">
                       {state.agent4?.acquisition_channels?.length || 0} <span className="text-sm font-normal text-gray-500">Active</span>
                   </div>
               </Card>
           </div>

           <div className="flex justify-center gap-6">
               <Button size="lg" variant="premium" className="px-10 h-12 text-base font-semibold shadow-2xl shadow-brand-primary/20" onClick={() => window.print()}>
                   <Download className="w-5 h-5 mr-2" /> Download Executive Brief (PDF)
               </Button>
               <Button size="lg" variant="outline" className="px-10 h-12 text-base font-medium border-white/10 text-white bg-transparent hover:bg-white/5">
                   <Share2 className="w-5 h-5 mr-2" /> Share with Board
               </Button>
           </div>
        </div>
    );
};
