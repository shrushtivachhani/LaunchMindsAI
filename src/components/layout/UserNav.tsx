"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage, Button } from "@/components/ui/components";
import { createClient } from "@/lib/supabase/client";
import { LogOut, User, Settings, Database, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function UserNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
             // Fetch role from profiles if needed, or just use metadata
             const { data: profile } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', user.id)
                .single();
             
             setUser({
                 ...user,
                 role: profile?.role || 'user'
             });
        }
        setIsLoading(false);
    };
    getUser();
  }, [supabase]);

  const handleLogout = async () => {
      // Clear local draft to prevent data leakage between users
      localStorage.removeItem('local_project_draft');
      
      await supabase.auth.signOut();
      router.push('/auth/login');
      router.refresh(); 
  };

  if (isLoading) return <div className="w-9 h-9 rounded-full bg-white/5 animate-pulse" />;

  if (!user) {
      return (
          <div className="flex items-center gap-2">
              <Link href="/auth/login">
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white border border-transparent hover:border-white/10 hover:bg-white/5">Log in</Button>
              </Link>
              <Link href="/auth/register">
                  <Button variant="premium" size="sm" className="h-8 text-xs px-3">Start Building</Button>
              </Link>
          </div>
      )
  }

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative group outline-none"
      >
        <Avatar className="h-9 w-9 border-2 border-white/10 transition-all group-hover:border-brand-primary/50 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.3)]">
            <AvatarFallback className="bg-gradient-to-br from-brand-primary to-brand-secondary text-white text-xs font-bold">
                {user.user_metadata?.full_name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
        </Avatar>
      </button>

      <AnimatePresence>
        {isOpen && (
            <>
                <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-12 w-64 p-2 rounded-xl bg-[#121421] border border-white/10 shadow-2xl z-50 backdrop-blur-xl"
                >
                    <div className="flex flex-col space-y-1 p-2 mb-2 border-b border-white/5">
                        <p className="text-sm font-medium text-white line-clamp-1">
                            {user.user_metadata?.full_name || "User"}
                        </p>
                        <p className="text-xs text-gray-500 line-clamp-1">
                            {user.email}
                        </p>
                    </div>

                    <div className="space-y-1">
                        <Link href="/profile" onClick={() => setIsOpen(false)}>
                            <button className="w-full flex items-center gap-2 px-2 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-left">
                                <User className="w-4 h-4" />
                                My Profile
                            </button>
                        </Link>
                        
                        {user.role === 'admin' && (
                            <Link href="/admin/dashboard" onClick={() => setIsOpen(false)}>
                                <button className="w-full flex items-center gap-2 px-2 py-2 text-sm text-brand-secondary hover:text-white hover:bg-white/5 rounded-lg transition-colors text-left font-medium">
                                    <Database className="w-4 h-4" />
                                    Admin Panel
                                </button>
                            </Link>
                        )}

                        <button className="w-full flex items-center gap-2 px-2 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-left">
                            <Settings className="w-4 h-4" />
                            Settings
                        </button>
                    </div>

                    <div className="mt-2 pt-2 border-t border-white/5">
                        <button 
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 px-2 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors text-left"
                        >
                            <LogOut className="w-4 h-4" />
                            Log out
                        </button>
                    </div>
                </motion.div>
            </>
        )}
      </AnimatePresence>
    </div>
  );
}
