"use client";

import React from 'react';
import { OrchestratorProvider } from '@/features/orchestrator/context/OrchestratorContext';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OrchestratorProvider>
      <div className="flex min-h-screen bg-brand-dark text-foreground overflow-hidden font-sans selection:bg-brand-primary/30">
        <Sidebar />
        <div className="flex-1 flex flex-col ml-72 relative transition-all duration-300">
             {/* Deep Space Background Effects */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-primary/10 via-brand-dark to-brand-dark" />
            <div className="absolute top-0 left-0 w-full h-[500px] bg-brand-primary/5 blur-[100px] -z-10 pointer-events-none" />
            
            <Header />
            <main className="flex-1 overflow-y-auto overflow-x-hidden p-8 relative">
                 {/* Grid Overlay */}
                 <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-[0.03] pointer-events-none" />
                {children}
            </main>
        </div>
      </div>
    </OrchestratorProvider>
  );
}
