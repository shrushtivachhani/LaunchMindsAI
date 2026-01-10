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

  useEffect(() => {
    const loadProject = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsLoadingProject(false);
        return;
      }

      // Try to load the most recent project
      const { data: projects } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(1);

      if (projects && projects.length > 0) {
        // Hydrate state
        const project = projects[0];
        setProjectId(project.id);
        setState(prev => ({ 
            ...prev, 
            ...project.data, 
            currentStep: project.current_step 
        }));
      } else {
        // No project found, we will create one on the first save
      }
      setIsLoadingProject(false);
    };

    loadProject();
  }, []);

  const saveProject = async (newState?: Partial<ProjectState>) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        console.warn("saveProject: No authenticated user found.");
        return;
    }

    const dataToSave = newState ? { ...state, ...newState } : state;
    // Don't save processing state
    const { isProcessing, ...persistentData } = dataToSave;

    try {
        if (projectId) {
            console.log("Saving update for project:", projectId);
            const { error } = await supabase
              .from('projects')
              .update({
                data: persistentData,
                current_step: dataToSave.currentStep,
                updated_at: new Date().toISOString()
              })
              .eq('id', projectId);
            
            if (error) console.error("Error updating project:", error);
        } else {
            console.log("Creating new project for user:", user.id);
            // Create new project
            const { data, error } = await supabase
              .from('projects')
              .insert({
                 user_id: user.id,
                 name: persistentData.agent1?.solution_description?.substring(0, 50) || "Untitled Idea",
                 data: persistentData,
                 current_step: dataToSave.currentStep,
                 status: 'draft'
              })
              .select()
              .single();
            
            if (error) {
                console.error("Error creating project:", error);
                // Check if profile exists, if foreign key error:
                if (error.code === '23503') { // Foreign Key Violation
                    console.error("Profile missing! Attempting to fix...");
                    // Try to repair profile
                    await supabase.from('profiles').insert({
                         id: user.id,
                         email: user.email!,
                         full_name: user.user_metadata?.full_name || "User",
                         role: 'user'
                    });
                    // Retry save (recursive once)
                    // For now just alert
                }
            }
            if (data) {
                console.log("Project created:", data.id);
                setProjectId(data.id);
            }
        }
    } catch (err) {
        console.error("Unexpected error in saveProject:", err);
    }
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
