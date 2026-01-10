"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Input, Label, Card } from '@/components/ui/components';
import { Lock, ArrowRight, Loader2, Rocket } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate auth delay
    setTimeout(() => {
      setIsLoading(false);
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] flex items-center justify-center relative overflow-hidden p-6">
       {/* Background Effects */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-[120px] -z-10" />
       <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] pointer-events-none" />

      <Card className="w-full max-w-md p-8 bg-[#121421]/80 backdrop-blur-xl border-white/10 shadow-2xl">
        <div className="flex flex-col items-center mb-8 text-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-brand-primary/20 mb-6">
                LM
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400 text-sm">Enter your credentials to access the command center.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="founder@startup.com" required className="bg-black/20 border-white/10 focus:border-brand-primary/50" />
            </div>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="#" className="text-xs text-brand-primary hover:text-brand-secondary transition-colors">Forgot password?</Link>
                </div>
                <Input id="password" type="password" placeholder="••••••••" required className="bg-black/20 border-white/10 focus:border-brand-primary/50" />
            </div>

            <Button type="submit" variant="premium" className="w-full h-11 text-base shadow-brand-primary/25" disabled={isLoading}>
                {isLoading ? (
                    <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Authenticating...
                    </>
                ) : (
                    "Initialize Session"
                )}
            </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-sm text-gray-500">
                Don't have an account?{' '}
                <Link href="/auth/register" className="text-brand-primary hover:text-brand-secondary font-medium transition-colors">
                    Apply for Access
                </Link>
            </p>
        </div>
        
        <div className="mt-8 flex items-center justify-center gap-2 text-[10px] text-gray-600 uppercase tracking-widest">
            <Lock className="w-3 h-3" />
            Secure Encrypted Connection
        </div>
      </Card>
    </div>
  );
}
