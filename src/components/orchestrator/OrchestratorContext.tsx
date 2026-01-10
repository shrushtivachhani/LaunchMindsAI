"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  ProjectState, 
  Agent1Output, Agent2Output, Agent3Output, Agent4Output, Agent5Output 
} from '@/lib/agents/types';

interface OrchestratorContextType {
  state: ProjectState;
  setAgent1Data: (data: Agent1Output) => void;
  setAgent2Data: (data: Agent2Output) => void;
  setAgent3Data: (data: Agent3Output) => void;
  setAgent4Data: (data: Agent4Output) => void;
  setAgent5Data: (data: Agent5Output) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  isProcessing: boolean;
  setIsProcessing: (loading: boolean) => void;
}

const OrchestratorContext = createContext<OrchestratorContextType | undefined>(undefined);

export const OrchestratorProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<ProjectState>({
    currentStep: 0,
    isProcessing: false,
  });

  const nextStep = () => setState(prev => ({ ...prev, currentStep: Math.min(prev.currentStep + 1, 5) }));
  const prevStep = () => setState(prev => ({ ...prev, currentStep: Math.max(prev.currentStep - 1, 0) }));
  const goToStep = (step: number) => setState(prev => ({ ...prev, currentStep: step }));
  const setIsProcessing = (loading: boolean) => setState(prev => ({...prev, isProcessing: loading}));

  const setAgent1Data = (data: Agent1Output) => setState(prev => ({ ...prev, agent1: data }));
  const setAgent2Data = (data: Agent2Output) => setState(prev => ({ ...prev, agent2: data }));
  const setAgent3Data = (data: Agent3Output) => setState(prev => ({ ...prev, agent3: data }));
  const setAgent4Data = (data: Agent4Output) => setState(prev => ({ ...prev, agent4: data }));
  const setAgent5Data = (data: Agent5Output) => setState(prev => ({ ...prev, agent5: data }));

  return (
    <OrchestratorContext.Provider value={{
      state,
      setAgent1Data, setAgent2Data, setAgent3Data, setAgent4Data, setAgent5Data,
      nextStep, prevStep, goToStep,
      isProcessing: state.isProcessing, setIsProcessing
    }}>
      {children} // No wrappers here, layout handles it
    </OrchestratorContext.Provider>
  );
};

export const useOrchestrator = () => {
  const context = useContext(OrchestratorContext);
  if (!context) {
    throw new Error('useOrchestrator must be used within an OrchestratorProvider');
  }
  return context;
};
