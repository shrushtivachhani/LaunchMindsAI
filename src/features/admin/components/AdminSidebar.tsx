"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  FolderKanban, 
  Cpu, 
  Activity, 
  Settings, 
  LogOut,
  ShieldCheck
} from 'lucide-react';

const ADMIN_NAV_ITEMS = [
  { title: "Overview", icon: LayoutDashboard, href: "/admin/dashboard" },
  { title: "User Management", icon: Users, href: "/admin/users" },
  { title: "Projects", icon: FolderKanban, href: "/admin/projects" },
  { title: "AI Agents", icon: Cpu, href: "/admin/agents" },
  { title: "System Logs", icon: Activity, href: "/admin/logs" },
  { title: "Settings", icon: Settings, href: "/admin/settings" },
];

export const AdminSidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="w-64 h-screen border-r border-white/5 bg-[#0B0E14] fixed left-0 top-0 flex flex-col z-50">
             {/* Admin Brand Header */}
             <div className="h-16 flex items-center gap-3 px-6 border-b border-white/5 bg-red-500/5">
                <div className="p-1.5 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20">
                    <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                    <h1 className="text-sm font-bold tracking-tight text-white">
                        Admin Protocol
                    </h1>
                    <p className="text-[10px] text-red-400 tracking-wider uppercase">Restricted Access</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
                {ADMIN_NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link 
                            key={item.href} 
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                isActive 
                                    ? "bg-white/10 text-white" 
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <item.icon className={cn("w-4 h-4", isActive ? "text-red-400" : "text-gray-500")} />
                            {item.title}
                        </Link>
                    )
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/5">
                <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                    <LogOut className="w-4 h-4" />
                    Exit to App
                </Link>
            </div>
        </aside>
    );
};
