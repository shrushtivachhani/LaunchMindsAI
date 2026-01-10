"use client";

import React from 'react';
import { Timeline } from '../orchestrator/Timeline';
import { Bell, Search, Command } from 'lucide-react';
import { Button } from '../ui/components';

export const Header = () => {
    return (
        <header className="h-20 border-b border-white/5 bg-[#0B0E14]/80 backdrop-blur-xl sticky top-0 z-40 flex items-center px-8 justify-between shadow-xl shadow-black/20">
            <div className="w-1/3 flex items-center gap-4">
                 <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-muted-foreground text-xs">
                    <Command className="w-3.5 h-3.5" />
                    <span>Cmd + K</span>
                 </div>
                 <div className="h-4 w-[1px] bg-white/10" />
                 <span className="text-sm text-gray-400 font-medium">New Venture Protocol</span>
            </div>
            
            <div className="flex-1 flex justify-center">
                <Timeline />
            </div>

            <div className="w-1/3 flex justify-end items-center gap-4">
               <button className="p-2.5 rounded-full hover:bg-white/5 transition-colors text-gray-400 hover:text-white">
                    <Search className="w-4 h-4" />
               </button>
               <button className="p-2.5 rounded-full hover:bg-white/5 transition-colors text-gray-400 hover:text-white relative">
                    <Bell className="w-4 h-4" />
                    <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
               </button>
               <div className="w-9 h-9 rounded-full bg-gradient-to-r from-brand-secondary to-blue-500 border-2 border-white/10 cursor-pointer hover:scale-105 transition-transform shadow-lg shadow-brand-secondary/20" />
            </div>
        </header>
    );
};
