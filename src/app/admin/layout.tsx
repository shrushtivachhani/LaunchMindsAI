import React from 'react';
import { AdminSidebar } from '@/features/admin/components/AdminSidebar';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
      redirect('/admin/login');
  }

  // Strict Role Check on Server Side
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== 'admin') {
      redirect('/dashboard'); // Kick non-admins out
  }

  return (
    <div className="flex min-h-screen bg-[#0B0E14] text-white font-sans selection:bg-red-500/30">
      <AdminSidebar />
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
          {/* Header */}
          <header className="h-16 border-b border-white/5 bg-[#0B0E14]/80 backdrop-blur-xl sticky top-0 z-40 px-8 flex items-center justify-between">
               <h2 className="text-sm font-medium text-gray-400">System Command Center</h2>
               <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs text-green-500 font-bold uppercase tracking-wider">System Healthy</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-800 border border-white/10" />
               </div>
          </header>
          
          <main className="flex-1 p-8 overflow-y-auto">
            {children}
          </main>
      </div>
    </div>
  );
}
