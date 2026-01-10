"use client";

import React from 'react';
import { useOrchestrator } from '../orchestrator/OrchestratorContext';
import { Button, Card } from '@/components/ui/components';
import { FileText, Check, ShieldCheck, Download, Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Agent3Output } from '@/lib/agents/types';

export const ComplianceView = () => {
    const { state, setAgent3Data, nextStep, isProcessing, setIsProcessing } = useOrchestrator();

    const handleGenerate = () => {
        setIsProcessing(true);
        setTimeout(() => {
            const mockData: Agent3Output = {
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
            setAgent3Data(mockData);
            setIsProcessing(false);
        }, 3000);
    };

    const hasData = !!state.agent3;

    return (
        <div className="max-w-5xl mx-auto py-4">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="mb-10"
            >
               <div className="flex items-center gap-3 mb-4">
                   <div className="p-2.5 bg-brand-accent/10 rounded-lg text-brand-accent border border-brand-accent/20 shadow-[0_0_15px_-3px_rgba(16,185,129,0.3)]">
                       <FileText className="w-5 h-5" />
                   </div>
                   <span className="text-xs font-bold tracking-[0.2em] text-brand-accent uppercase">Agent 03 • Legal Framework</span>
               </div>
               <h1 className="text-4xl font-bold mb-4 text-white">
                   Compliance & Documentation
               </h1>
               <p className="text-gray-400 text-lg max-w-2xl font-light">
                   Automating the bureaucratic layer. Generating mandatory filings tailored to your geography.
               </p>
           </motion.div>

           {!hasData ? (
                <div className="flex flex-col items-center justify-center p-16 border border-dashed border-white/10 rounded-2xl bg-[#0B0E14]/50 backdrop-blur-sm group hover:bg-[#0B0E14]/80 transition-colors">
                    <div className="w-20 h-20 bg-brand-accent/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                        <ShieldCheck className="w-8 h-8 text-brand-accent opacity-80" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-white">Audit Legal Requirements</h3>
                    <p className="text-gray-400 text-center max-w-md mb-8 leading-relaxed">
                        I will scan federal and local regulations to build a watertight compliance checklist for your venture.
                    </p>
                    <Button onClick={handleGenerate} disabled={isProcessing} size="lg" className="bg-brand-accent hover:bg-brand-accent/90 text-white font-semibold h-12 px-8 shadow-lg shadow-brand-accent/20">
                         {isProcessing ? <><Loader2 className="w-5 h-5 mr-2 animate-spin"/> Auditing Regulatory Database...</> : "Generate Compliance Suite"}
                    </Button>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Mandatory Docs */}
                        <Card className="p-0 overflow-hidden border-brand-accent/30 bg-[#121421]/60">
                            <div className="bg-brand-accent/10 p-5 border-b border-brand-accent/20 flex items-center gap-3">
                                <ShieldCheck className="w-5 h-5 text-brand-accent" />
                                <h3 className="font-bold text-brand-accent uppercase tracking-wider text-sm">Mandatory Documents</h3>
                            </div>
                            <div className="p-5 space-y-3">
                                {state.agent3?.mandatory_documents.map((doc, i) => (
                                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-black/20 border border-white/5 hover:border-brand-accent/30 transition-colors group">
                                        <div className="mt-1 w-6 h-6 rounded-full bg-brand-accent/20 flex items-center justify-center shrink-0 border border-brand-accent/10 group-hover:bg-brand-accent group-hover:text-white transition-colors">
                                            <Check className="w-3.5 h-3.5" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm text-white">{doc.name}</p>
                                            <p className="text-xs text-gray-500 mt-1">{doc.purpose}</p>
                                        </div>
                                        <span className="ml-auto text-[10px] uppercase font-bold tracking-wider text-brand-accent border border-brand-accent/20 px-2 py-1 rounded bg-brand-accent/5">
                                            {doc.stage}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Registrations */}
                        <Card className="p-0 overflow-hidden border-white/10 bg-[#121421]/60">
                             <div className="bg-white/5 p-5 border-b border-white/10 flex items-center gap-3">
                                <FileText className="w-5 h-5 text-gray-400" />
                                <h3 className="font-bold text-gray-300 uppercase tracking-wider text-sm">Required Registrations</h3>
                            </div>
                            <div className="p-5">
                                <ul className="space-y-3">
                                    {state.agent3?.registrations_required.map((reg, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-gray-300 p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                                            <div className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_8px_orange]" />
                                            {reg}
                                        </li>
                                    ))}
                                </ul>
                                
                                <div className="mt-8 pt-6 border-t border-white/10">
                                    <h4 className="text-xs uppercase font-bold text-gray-500 mb-4 flex items-center gap-2">
                                        <Download className="w-3 h-3" />
                                        Auto-Generated Templates
                                    </h4>
                                    <div className="flex flex-wrap gap-3">
                                        {state.agent3?.generated_templates.map((tmpl, i) => (
                                             <Button key={i} variant="outline" size="sm" className="h-9 text-xs border-dashed border-white/20 bg-transparent hover:bg-brand-accent/10 hover:text-brand-accent hover:border-brand-accent/30 transition-all">
                                                <Download className="w-3 h-3 mr-2 opacity-70" />
                                                {tmpl} PDF
                                             </Button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <div className="flex justify-end pt-6">
                        <Button onClick={nextStep} variant="ghost" size="lg" className="hover:bg-brand-accent/10 hover:text-brand-accent border border-transparent hover:border-brand-accent/30">
                            Proceed to Growth Strategy <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};
