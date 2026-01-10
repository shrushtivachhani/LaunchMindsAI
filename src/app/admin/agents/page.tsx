"use client";

import React from 'react';
import { Card, Badge, Button } from '@/components/ui/components';
import { Brain, ShieldAlert, FileText, TrendingUp, DollarSign, Activity, Power, RefreshCw } from 'lucide-react';

const AGENTS = [
  { id: 1, name: "Idea Architect", icon: Brain, status: "Idle", performance: "98%", latency: "2.4s", color: "text-brand-primary" },
  { id: 2, name: "Feasibility Analyst", icon: ShieldAlert, status: "Processing", performance: "95%", latency: "4.1s", color: "text-brand-secondary" },
  { id: 3, name: "Compliance Lead", icon: FileText, status: "Idle", performance: "99%", latency: "1.2s", color: "text-brand-accent" },
  { id: 4, name: "Growth Strategist", icon: TrendingUp, status: "Idle", performance: "97%", latency: "3.5s", color: "text-orange-500" },
  { id: 5, name: "Financial Planner", icon: DollarSign, status: "Error", performance: "92%", latency: "5.6s", color: "text-purple-500" },
];

export default function AgentMonitoringPage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-2xl font-bold text-white mb-2">Agent Neural Interfaces</h1>
            <p className="text-gray-400">Monitor status and control individual agent instances.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {AGENTS.map((agent) => (
                <Card key={agent.id} className="p-6 border-white/5 bg-[#121421]/50 relative overflow-hidden group">
                     {agent.status === 'Processing' && (
                        <div className="absolute top-0 right-0 w-1 h-full bg-brand-secondary animate-pulse" />
                     )}
                     
                    <div className="flex items-start justify-between mb-6">
                        <div className={`p-3 rounded-xl bg-white/5 border border-white/5 ${agent.color}`}>
                            <agent.icon className="w-8 h-8" />
                        </div>
                        <Badge variant={agent.status === 'Error' ? 'destructive' : agent.status === 'Processing' ? 'brand' : 'outline'} className="border-white/10 uppercase tracking-wider text-[10px]">
                            {agent.status}
                        </Badge>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-white mb-1">{agent.name}</h3>
                        <p className="text-xs text-gray-500 font-mono">ID: AGENT-0{agent.id}-VX</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6 p-4 rounded-lg bg-black/20 border border-white/5">
                        <div>
                            <span className="text-xs text-gray-500 block">Performance</span>
                            <span className="text-lg font-bold text-white">{agent.performance}</span>
                        </div>
                        <div>
                             <span className="text-xs text-gray-500 block">Avg Latency</span>
                             <span className="text-lg font-bold text-white">{agent.latency}</span>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button variant="outline" className="flex-1 border-white/10 hover:bg-white/5">
                            <RefreshCw className="w-4 h-4 mr-2" /> Restart
                        </Button>
                        <Button variant="outline" className="flex-1 border-white/10 hover:bg-white/5 text-red-400 hover:text-red-500">
                            <Power className="w-4 h-4 mr-2" /> Disable
                        </Button>
                    </div>
                </Card>
            ))}
        </div>
    </div>
  );
}
