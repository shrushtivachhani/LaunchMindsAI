"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { 
  ProjectState, 
  Agent1Output, Agent2Output, Agent3Output, Agent4Output, Agent5Output 
} from '@/features/agents/types/types';
import { createClient } from '@/lib/supabase/client';

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
  saveProject: () => Promise<void>;
  isLoadingProject: boolean;
}

const OrchestratorContext = createContext<OrchestratorContextType | undefined>(undefined);

export const OrchestratorProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<ProjectState>({
    currentStep: 0,
    isProcessing: false,
  });
  const [projectId, setProjectId] = useState<string | null>(null);
  const [isLoadingProject, setIsLoadingProject] = useState(true);
  const supabase = createClient();

  // MOCK PERSISTENCE
  useEffect(() => {
    const loadProject = async () => {
      // Allow UI to settle
      await new Promise(r => setTimeout(r, 500));
      
      const saved = localStorage.getItem('mock_project_data');
      if (saved) {
          try {
              const parsed = JSON.parse(saved);
              setState(prev => ({ 
                  ...prev, 
                  ...parsed,
                  currentStep: parsed.currentStep || 0
              }));
              setProjectId('mock-project-id');
          } catch (e) {
              console.error("Failed to load mock data", e);
          }
      }
      setIsLoadingProject(false);
    };

    loadProject();
  }, []);

  const saveProject = async (newState?: Partial<ProjectState>) => {
    const dataToSave = newState ? { ...state, ...newState } : state;
    const { isProcessing, ...persistentData } = dataToSave;
    
    // Save to LocalStorage for persistence during mock mode
    localStorage.setItem('mock_project_data', JSON.stringify({
        ...persistentData,
        currentStep: dataToSave.currentStep
    }));
    
    console.log("Mock Saved Project State:", persistentData);
  };

  // State Updates Wrapper (Auto-Save on critical updates)
  const updateAndSave = (update: Partial<ProjectState>) => {
      setState(prev => {
          const next = { ...prev, ...update };
          saveProject(next); // Fire and forget save
          return next;
      });
  };

  const nextStep = () => updateAndSave({ currentStep: Math.min(state.currentStep + 1, 5) });
  const prevStep = () => updateAndSave({ currentStep: Math.max(state.currentStep - 1, 0) });
  const goToStep = (step: number) => updateAndSave({ currentStep: step });
  const setIsProcessing = (loading: boolean) => setState(prev => ({...prev, isProcessing: loading}));

  const setAgent1Data = (data: Agent1Output) => updateAndSave({ agent1: data });
  const setAgent2Data = (data: Agent2Output) => updateAndSave({ agent2: data });
  const setAgent3Data = (data: Agent3Output) => updateAndSave({ agent3: data });
  const setAgent4Data = (data: Agent4Output) => updateAndSave({ agent4: data });
  const setAgent5Data = (data: Agent5Output) => updateAndSave({ agent5: data });

  return (
    <OrchestratorContext.Provider value={{
      state,
      setAgent1Data, setAgent2Data, setAgent3Data, setAgent4Data, setAgent5Data,
      nextStep, prevStep, goToStep,
      isProcessing: state.isProcessing, setIsProcessing,
      saveProject: async () => { await saveProject() },
      isLoadingProject
    }}>
      {children}
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
