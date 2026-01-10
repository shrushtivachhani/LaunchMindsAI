import Link from "next/link";
import { Button } from "@/components/ui/components";
import { ArrowRight, Brain, Rocket, Shield, TrendingUp, CheckCircle2, Zap, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0B0E14] text-white selection:bg-brand-primary/30 selection:text-white overflow-x-hidden font-sans">
      {/* Navbar */}
      <header className="px-6 h-20 flex items-center justify-between border-b border-white/5 sticky top-0 bg-[#0B0E14]/80 backdrop-blur-xl z-50 transition-all duration-300">
        <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center font-bold shadow-lg shadow-brand-primary/20 group-hover:scale-105 transition-transform">LM</div>
            <span className="text-lg font-bold tracking-tight text-white group-hover:opacity-90 transition-opacity">LaunchMinds<span className="text-brand-secondary">AI</span></span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#features" className="hover:text-white transition-colors relative group">
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all group-hover:w-full" />
            </a>
            <a href="#agents" className="hover:text-white transition-colors relative group">
                Agents
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all group-hover:w-full" />
            </a>
            <a href="#pricing" className="hover:text-white transition-colors relative group">
                Pricing
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all group-hover:w-full" />
            </a>
        </nav>
        <div className="flex items-center gap-4">
            <Link href="/auth/register">
                <Button variant="ghost" className="hidden md:inline-flex text-gray-400 hover:text-white hover:bg-white/5">Register</Button>
            </Link>
            <Link href="/auth/login">
                <Button variant="premium" className="shadow-brand-primary/20">Login <ArrowRight className="w-4 h-4 ml-2" /></Button>
            </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 pb-32 px-6 text-center overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand-primary/10 rounded-full blur-[120px] -z-10 opacity-60" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-secondary/10 rounded-full blur-[100px] -z-10 opacity-40" />
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-semibold text-brand-secondary mb-8 animate-fade-in-up backdrop-blur-md shadow-lg shadow-black/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-secondary"></span>
                </span>
                <span className="tracking-wide uppercase">System Operational: v2.4</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 max-w-5xl mx-auto leading-[1.1] md:leading-[1.1]">
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500">Autonomous Execution</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary mt-2">For Visionary Founders</span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
                Not just another chatbot. An executive-grade AI team that architect, validate, and blueprint your startup in real-time.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                <Link href="/dashboard">
                    <Button size="lg" variant="premium" className="h-14 px-10 text-lg w-full sm:w-auto font-semibold tracking-wide">
                        <Rocket className="w-5 h-5 mr-2" /> Initialize Launch
                    </Button>
                </Link>
                <Button size="lg" variant="outline" className="h-14 px-10 text-lg border-white/10 bg-transparent hover:bg-white/5 text-white w-full sm:w-auto font-medium">
                    View Architecture
                </Button>
            </div>
            
            {/* UI Preview */}
            <div className="mt-24 mx-auto max-w-6xl rounded-2xl border border-white/10 bg-[#121421]/60 backdrop-blur-md shadow-2xl relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-transparent to-transparent z-10" />
                
                {/* Mock UI Header */}
                <div className="h-12 border-b border-white/5 flex items-center px-4 gap-2 bg-white/5">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                    </div>
                    <div className="ml-auto flex gap-2">
                         <div className="w-20 h-2 rounded-full bg-white/10" />
                         <div className="w-10 h-2 rounded-full bg-white/10" />
                    </div>
                </div>

                <div className="p-12 min-h-[400px] flex items-center justify-center relative">
                     <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]" />
                     <div className="text-center z-20">
                         <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-secondary mx-auto mb-6 flex items-center justify-center shadow-lg shadow-brand-primary/30">
                            <Zap className="w-10 h-10 text-white" />
                         </div>
                         <h3 className="text-2xl font-bold text-white mb-2">Ready to Architect</h3>
                         <p className="text-gray-400">Initialize the Idea Architect to begin.</p>
                     </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40 backdrop-blur-sm">
                     <Link href="/dashboard">
                        <Button size="lg" variant="premium" className="rounded-full px-10 shadow-2xl">Enter Command Center</Button>
                     </Link>
                </div>
            </div>
        </section>

        {/* Feature Grid */}
        <section id="features" className="py-32 px-6 bg-[#0B0E14] relative">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">The Executive Suite</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">Five specialist agents configured for high-stakes decision making.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard 
                        icon={Brain}
                        title="Idea Architect"
                        desc="Structures unstructured thoughts into a defensible business canvas using deep market context."
                        color="text-brand-primary"
                        gradient="from-brand-primary/20 to-transparent"
                    />
                     <FeatureCard 
                        icon={Shield}
                        title="Risk Analyst"
                        desc="Brutal feasibility checks against real-world market data, regulatory frameworks, and technical constraints."
                        color="text-brand-secondary"
                        gradient="from-brand-secondary/20 to-transparent"
                    />
                     <FeatureCard 
                        icon={TrendingUp}
                        title="Growth Strategist"
                        desc="Go-to-market architecture that prioritizes traction channels over vanity metrics."
                        color="text-brand-accent"
                        gradient="from-brand-accent/20 to-transparent" 
                    />
                </div>
            </div>
        </section>
        
        {/* Stats / trust */}
        <section className="py-20 border-y border-white/5 bg-white/[0.02]">
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                 <div>
                     <h3 className="text-4xl font-bold text-white mb-2">2.4s</h3>
                     <p className="text-sm text-gray-500 uppercase tracking-widest">Analysis Speed</p>
                 </div>
                 <div>
                     <h3 className="text-4xl font-bold text-white mb-2">5+</h3>
                     <p className="text-sm text-gray-500 uppercase tracking-widest">Specialist Agents</p>
                 </div>
                 <div>
                     <h3 className="text-4xl font-bold text-white mb-2">100%</h3>
                     <p className="text-sm text-gray-500 uppercase tracking-widest">Private & Secure</p>
                 </div>
                 <div>
                     <h3 className="text-4xl font-bold text-white mb-2">Zero</h3>
                     <p className="text-sm text-gray-500 uppercase tracking-widest">Hallucinations</p>
                 </div>
            </div>
        </section>
      </main>

      <footer className="py-12 px-6 border-t border-white/10 text-center text-sm text-gray-600 bg-[#0B0E14]">
        <div className="flex items-center justify-center gap-2 mb-8 opacity-50">
             <div className="w-6 h-6 rounded-md bg-white/10" />
             <span className="font-semibold text-white">LaunchMindsAI</span>
        </div>
        <p>© 2026 LaunchMindsAI. Built for founders, by agents.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc, color, gradient }: { icon: any, title: string, desc: string, color: string, gradient: string }) {
    return (
        <div className="p-8 rounded-2xl bg-[#121421] border border-white/5 hover:border-brand-primary/30 transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity`} />
            
            <div className={`w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 ${color} border border-white/5 group-hover:scale-110 transition-transform`}>
                <Icon className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
            <p className="text-gray-400 leading-relaxed text-sm">{desc}</p>
        </div>
    )
}
