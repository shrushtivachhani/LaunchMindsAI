"use client";

import React from 'react';
import { Card, Badge, Button } from '@/components/ui/components';
import { Users, FolderKanban, Cpu, AlertTriangle, ArrowUpRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const STATS = [
    { title: "Total Users", value: "2,543", change: "+12.5%", icon: Users, color: "text-brand-primary" },
    { title: "Active Projects", value: "856", change: "+5.2%", icon: FolderKanban, color: "text-brand-secondary" },
    { title: "Agent Runs", value: "14.2k", change: "+24%", icon: Cpu, color: "text-brand-accent" },
    { title: "Error Rate", value: "0.04%", change: "-0.01%", icon: AlertTriangle, color: "text-red-500", negative: true },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
        <div>
            <h1 className="text-2xl font-bold text-white mb-2">Overview</h1>
            <p className="text-gray-400">Real-time system telemetry and user activity.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
                <Card key={i} className="p-6 border-white/5 bg-[#121421]/50 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className={`p-2.5 rounded-lg bg-white/5 ${stat.color}`}>
                            <stat.icon className="w-5 h-5" />
                        </div>
                        <Badge variant="outline" className={`border-white/10 ${stat.negative ? 'text-green-500' : 'text-green-500'}`}>
                            {stat.change}
                        </Badge>
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-3xl font-bold text-white tracking-tight">{stat.value}</h3>
                        <p className="text-sm text-gray-500">{stat.title}</p>
                    </div>
                </Card>
            ))}
        </div>

        {/* Activity & System Health */}
        <div className="grid grid-cols-3 gap-6">
            <Card className="col-span-2 p-6 border-white/5 bg-[#121421]/50">
                 <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-white flex items-center gap-2">
                        <Activity className="w-4 h-4 text-brand-secondary" />
                        Recent Agent Activity
                    </h3>
                    <Button variant="outline" size="sm" className="h-8 text-xs border-white/10">View All Log</Button>
                </div>
                <div className="space-y-4">
                    {[1,2,3,4].map((_, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_lime]" />
                                <div>
                                    <p className="text-sm font-medium text-white">Market Analysis Completed</p>
                                    <p className="text-xs text-gray-500">Project: SolarSaaS • Agent: Feasibility</p>
                                </div>
                            </div>
                            <span className="text-xs text-gray-500 font-mono">14ms ago</span>
                        </div>
                    ))}
                </div>
            </Card>

            <Card className="p-6 border-white/5 bg-[#121421]/50">
                <h3 className="font-bold text-white mb-6">System Health</h3>
                <div className="space-y-6">
                    <HealthItem label="API Latency" value="45ms" status="good" />
                    <HealthItem label="Database Load" value="12%" status="good" />
                    <HealthItem label="Agent Queue" value="Idle" status="good" />
                    <HealthItem label="Error Rate" value="0.01%" status="good" />
                </div>
                
                 <div className="mt-8 pt-6 border-t border-white/10">
                    <Button variant="destructive" className="w-full">
                        Initiate Emergency Stop
                    </Button>
                 </div>
            </Card>
        </div>
    </div>
  );
}

function HealthItem({ label, value, status }: { label: string, value: string, status: 'good' | 'warning' | 'critical' }) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">{label}</span>
            <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">{value}</span>
                <div className="w-2 h-2 rounded-full bg-green-500" />
            </div>
        </div>
    )
}
