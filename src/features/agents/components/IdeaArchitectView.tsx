"use client";

import React, { useState } from 'react';
import { useOrchestrator } from '@/features/orchestrator/context/OrchestratorContext';
import { Button, Input, Textarea, Label, Card } from '@/components/ui/components';
import { Agent1Input } from '@/features/agents/types/types';
import { AgentEngine } from '@/features/agents/utils/engine';
import { Brain, Sparkles, ArrowRight, Loader2, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

export const IdeaArchitectView = () => {
    const { setAgent1Data, nextStep, isProcessing, setIsProcessing } = useOrchestrator();
    const [formData, setFormData] = useState<Agent1Input>({
        rawIdea: "",
        industry: "",
        geography: "",
        targetUserType: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            // REAL GEMINI CALL
            const result = await AgentEngine.generateAgent1({
                rawIdea: formData.rawIdea,
                industry: formData.industry,
                geography: formData.geography,
                targetUserType: formData.targetUserType
            });

            console.log("Agent 1 Result:", result);
            setAgent1Data(result);
            nextStep();
        } catch (error: any) {
            console.error("Agent 1 Failed:", error);
            // Show REAL error to user for debugging
            alert(`Error: ${error.message}`);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 bg-brand-primary/10 rounded-lg text-brand-primary border border-brand-primary/20 shadow-[0_0_15px_-3px_rgba(108,92,231,0.3)]">
                        <Brain className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold tracking-[0.2em] text-brand-primary uppercase">Agent 01 • Architecture Phase</span>
                </div>
                <h1 className="text-5xl font-bold mb-4 text-white tracking-tight">
                    Business Idea Architect
                </h1>
                <p className="text-gray-400 text-lg max-w-2xl font-light leading-relaxed">
                    Input your raw concept. I will structure it into a defensible startup canvas using real-time market patterns.
                </p>
            </motion.div>

            <Card className="p-8 border-white/10 bg-[#121421]/60 shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-3">
                        <Label htmlFor="rawIdea" className="text-base font-semibold text-white flex items-center gap-2">
                            <Lightbulb className="w-4 h-4 text-yellow-500" />
                            What is your core business concept?
                        </Label>
                        <Textarea 
                            id="rawIdea" 
                            name="rawIdea" 
                            placeholder="Describe your idea in detail... e.g. An AI-powered platform that connects rural artisans directly with global buyers, handling logistics and translation automatically." 
                            className="min-h-[160px] text-base resize-none"
                            value={formData.rawIdea}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-3">
                            <Label htmlFor="industry" className="text-white font-medium">Industry / Sector</Label>
                            <Input 
                                id="industry" 
                                name="industry" 
                                placeholder="e.g. Fintech, Edtech" 
                                value={formData.industry}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="geography" className="text-white font-medium">Target Geography</Label>
                            <Input 
                                id="geography" 
                                name="geography" 
                                placeholder="e.g. India, South East Asia" 
                                value={formData.geography}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="targetUserType" className="text-white font-medium">Primary User</Label>
                            <Input 
                                id="targetUserType" 
                                name="targetUserType" 
                                placeholder="e.g. College Students, SMBs" 
                                value={formData.targetUserType}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                        <p className="text-xs text-gray-500 italic">
                            * AI will analyze market viability in the next step.
                        </p>
                        <Button 
                            type="submit" 
                            size="lg" 
                            variant="premium" 
                            disabled={isProcessing}
                            className="min-w-[240px] shadow-brand-primary/25"
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Architecting Startup...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5 mr-2" />
                                    Initialize Architecture
                                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};
