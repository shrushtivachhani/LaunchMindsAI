"use client";

import React from 'react';
import { useOrchestrator } from './OrchestratorContext';
import { motion } from 'framer-motion';
import { Check, Brain, ShieldAlert, FileText, TrendingUp, DollarSign, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';


// Helper for generic cn (since lib/utils might not exist in default create-next-app)
// Actually we installed clsx and tailwind-merge manually, so we can define it inline or assume it exists.
// I will create lib/utils.ts next to be safe, but for now defining here to avoid error if I forgot.
// function cn(...inputs: (string | undefined | null | false)[]) {
//   return twMerge(clsx(inputs));
// }


const STEPS = [
  { id: 0, label: "Idea", icon: Brain },
  { id: 1, label: "Feasibility", icon: ShieldAlert },
  { id: 2, label: "Compliance", icon: FileText },
  { id: 3, label: "Growth", icon: TrendingUp },
  { id: 4, label: "Budget", icon: DollarSign },
  { id: 5, label: "Launch", icon: Rocket },
];

export const Timeline = () => {
  const { state, goToStep } = useOrchestrator();

  return (
    <div className="w-full py-6 px-4">
      <div className="flex items-center justify-between relative">
         {/* Background Line */}
        <div className="absolute left-0 top-1/2 w-full h-1 bg-secondary -z-10 rounded-full" />
        
        {/* Progress Line */}
        <motion.div 
            className="absolute left-0 top-1/2 h-1 bg-primary -z-0 rounded-full origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: state.currentStep / (STEPS.length - 1) }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        />

        {STEPS.map((step, index) => {
           const isActive = state.currentStep === index;
           const isCompleted = state.currentStep > index;
           const Icon = step.icon;

           return (
             <div key={index} className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => isCompleted && goToStep(index)}>
                <motion.div 
                    className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center border-4 transition-colors duration-300 bg-background",
                        isActive ? "border-primary text-primary shadow-[0_0_15px_rgba(108,92,231,0.5)]" : 
                        isCompleted ? "border-primary bg-primary text-white" : "border-muted text-muted-foreground"
                    )}
                    initial={false}
                    animate={{ scale: isActive ? 1.1 : 1 }}
                >
                    {isCompleted ? <Check className="w-6 h-6" /> : <Icon className="w-5 h-5" />}
                </motion.div>
                <span className={cn(
                    "text-xs font-semibold uppercase tracking-wider transition-colors",
                    isActive ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground"
                )}>
                    {step.label}
                </span>
             </div>
           )
        })}
      </div>
    </div>
  );
};
