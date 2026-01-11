"use client";

import React, { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Button, Input, Card } from '@/components/ui/components';
import { ShieldCheck, Lock, AlertTriangle, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // MOCK AUTHENTICATION - NO DATABASE REQUIRED
    setTimeout(() => {
        if (email.toLowerCase() === 'admin@launchminds.ai' && password === 'admin123') {
            // Set simple cookie for middleware to read
            document.cookie = "mock_session=admin; path=/";
            document.cookie = "mock_user_email=" + email + "; path=/";
            document.cookie = "mock_user_role=admin; path=/";
            
            router.push('/admin/dashboard');
            router.refresh();
        } else {
            setError("Invalid Admin Credentials. try: admin@launchminds.ai / admin123");
            setIsLoading(false);
        }
    }, 1000); 
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/10 via-[#050505] to-[#050505]" />

        <Card className="w-full max-w-md bg-[#0A0A0A] border-red-900/30 p-8 shadow-2xl relative z-10">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-red-500/10 text-red-500 mb-4 border border-red-500/20">
                    <ShieldCheck className="w-6 h-6" />
                </div>
                <h1 className="text-2xl font-bold text-white tracking-tight">System Admin</h1>
                <p className="text-xs text-red-400 mt-2 font-mono uppercase tracking-widest">Restricted Access Protocol</p>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-6">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Operator ID</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                            <Input 
                                type="email" 
                                placeholder="admin@system.internal"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pl-10 bg-black/40 border-white/5 focus:border-red-500/50"
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                         <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Passkey</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                            <Input 
                                type="password" 
                                placeholder="••••••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pl-10 bg-black/40 border-white/5 focus:border-red-500/50"
                                required
                            />
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-3">
                        <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                        <p className="text-xs text-red-400 font-medium">{error}</p>
                    </div>
                )}

                <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-medium h-11"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Verifying Credentials...
                        </>
                    ) : (
                        "Authenticate"
                    )}
                </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/5 text-center">
                 <Link href="/auth/login" className="text-xs text-gray-600 hover:text-white transition-colors">
                    ← Return to Standard Access
                </Link>
            </div>
        </Card>
    </div>
  );
}
