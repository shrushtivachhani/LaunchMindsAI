"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Input, Label } from '@/components/ui/components';
import { Loader2, ArrowRight, CheckCircle2, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
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
    <div className="min-h-screen bg-[#0B0E14] lg:grid lg:grid-cols-2">
      {/* Left: Brand Panel */}
      <div className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden bg-[#121421]">
         <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]" />
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
                 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center font-bold text-white shadow-lg shadow-brand-primary/20">LM</div>
                 <span className="text-xl font-bold text-white">LaunchMinds<span className="text-brand-secondary">AI</span></span>
            </div>
            
            <h1 className="text-5xl font-bold text-white mb-6 leading-[1.1]">
                Build Smarter. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">Launch Faster.</span>
            </h1>
            <p className="text-xl text-gray-400 font-light max-w-md leading-relaxed">
                Your autonomous AI co-founder for startup execution. Validate, plan, and launch with executive-grade intelligence.
            </p>
        </div>

        <div className="relative z-10 space-y-4">
             <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
                <div className="p-2 rounded-full bg-brand-primary/20 text-brand-primary">
                    <Star className="w-5 h-5 fill-current" />
                </div>
                <div>
                    <p className="text-white font-medium">Enterprise-Grade Security</p>
                    <p className="text-sm text-gray-500">SOC2 Compliant Architecture</p>
                </div>
             </div>
             <p className="text-sm text-gray-500">© 2026 LaunchMindsAI Inc.</p>
        </div>
      </div>

      {/* Right: Signup Form */}
      <div className="flex items-center justify-center p-6 sm:p-12 relative">
        <div className="w-full max-w-md space-y-8">
             <div className="text-center lg:text-left">
                <h2 className="text-2xl font-bold text-white mb-2">Create your account</h2>
                <p className="text-gray-400">Join 10,000+ founders building the future.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="Elon" required className="bg-black/20 border-white/10" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Musk" required className="bg-black/20 border-white/10" />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="founder@startup.com" required className="bg-black/20 border-white/10" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Min. 8 characters" required className="bg-black/20 border-white/10" />
                    <div className="flex gap-1 mt-2">
                        <div className="h-1 flex-1 rounded-full bg-red-500/50" />
                        <div className="h-1 flex-1 rounded-full bg-orange-500/50" />
                        <div className="h-1 flex-1 rounded-full bg-gray-700" />
                        <div className="h-1 flex-1 rounded-full bg-gray-700" />
                    </div>
                </div>

                <Button type="submit" variant="premium" className="w-full h-11 text-base shadow-brand-primary/25" disabled={isLoading}>
                    {isLoading ? (
                        <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Creating Account...</>
                    ) : (
                        <>Start Building <ArrowRight className="w-4 h-4 ml-2" /></>
                    )}
                </Button>
            </form>

             <div className="pt-6 border-t border-white/5 text-center text-sm">
                <span className="text-gray-500">Already have an account? </span>
                <Link href="/auth/login" className="text-brand-primary hover:text-brand-secondary font-medium transition-colors">
                    Log in
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
}
