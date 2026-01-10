"use client";

import React from 'react';
import { useOrchestrator } from '@/components/orchestrator/OrchestratorContext';
import { motion, AnimatePresence } from 'framer-motion';

// Import Views
import { IdeaArchitectView } from '@/components/agents/IdeaArchitectView';
import { FeasibilityView } from '@/components/agents/FeasibilityView';
import { ComplianceView } from '@/components/agents/ComplianceView';
import { GrowthView } from '@/components/agents/GrowthView';
import { FinanceView } from '@/components/agents/FinanceView';
import { LaunchBlueprintView } from '@/components/agents/LaunchBlueprintView';

export default function DashboardPage() {
  const { state } = useOrchestrator();

  const renderView = () => {
    switch (state.currentStep) {
      case 0: return <IdeaArchitectView />;
      case 1: return <FeasibilityView />;
      case 2: return <ComplianceView />;
      case 3: return <GrowthView />;
      case 4: return <FinanceView />;
      case 5: return <LaunchBlueprintView />;
      default: return <IdeaArchitectView />;
    }
  };

  return (
    <div className="container max-w-7xl mx-auto min-h-full">
      <AnimatePresence mode='wait'>
        <motion.div
          key={state.currentStep}
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="h-full"
        >
          {renderView()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
