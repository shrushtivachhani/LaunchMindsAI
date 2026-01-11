"use client";

import React from 'react';
import { Timeline } from '@/features/orchestrator/context/Timeline';
import { Bell, Search, Command } from 'lucide-react';
import { Button } from '../ui/components';
import { UserNav } from './UserNav';

export const Header = () => {
    return (
        <header className="h-20 border-b border-white/5 bg-[#0B0E14]/80 backdrop-blur-xl sticky top-0 z-40 flex items-center px-8 justify-between shadow-xl shadow-black/20">

            
            <div className="w-1/3 flex items-center gap-2 text-sm text-gray-500">
                <span className="hover:text-white transition-colors cursor-pointer">Dashboard</span>
                <span className="text-white/20">/</span>
                <span className="text-white font-medium">Overview</span>
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
               <div className="h-8 w-[1px] bg-white/10 mx-2" />
               <UserNav />
            </div>
        </header>
    );
};
