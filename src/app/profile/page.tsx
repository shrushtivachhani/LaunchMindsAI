"use client";

import React, { useEffect, useState } from 'react';
import { Card, Button, Badge, Avatar, AvatarFallback, AvatarImage } from '@/components/ui/components';
import { User, Mail, Calendar, FolderKanban, Clock, Settings, LogOut, ChevronRight, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'projects'>('overview');
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            router.push('/auth/login');
            return;
        }

        // Fetch Profile
        const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
        
        // Fetch Projects
        const { data: projectsData } = await supabase
            .from('projects')
            .select('*')
            .eq('user_id', user.id)
            .order('updated_at', { ascending: false });

        setProfile({ ...profileData, email: user.email });
        setProjects(projectsData || []);
        setIsLoading(false);
    };

    fetchData();
  }, [router]);

  if (isLoading) {
      return (
          <div className="min-h-screen bg-[#0B0E14] flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-brand-primary animate-spin" />
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-[#0B0E14] p-8">
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Header Section */}
            <div className="relative p-8 rounded-3xl overflow-hidden border border-white/5 bg-[#121421]">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                
                <div className="relative z-10 flex items-start gap-8">
                    <Avatar className="w-24 h-24 border-4 border-[#0B0E14] shadow-2xl">
                        <AvatarFallback className="text-3xl bg-gradient-to-br from-brand-primary to-brand-secondary text-white">
                            {profile?.full_name?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 pt-2">
                        <div className="flex items-center justify-between mb-2">
                            <h1 className="text-3xl font-bold text-white">{profile?.full_name || "User"}</h1>
                            <Link href="/admin/settings">
                                <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5">
                                    <Settings className="w-4 h-4 mr-2" />
                                    Edit Profile
                                </Button>
                            </Link>
                        </div>
                        <div className="flex items-center gap-6 text-gray-400 text-sm">
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                {profile?.email}
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                Member since {new Date(profile?.created_at).toLocaleDateString()}
                            </div>
                            <Badge variant="outline" className="border-white/10 bg-brand-primary/10 text-brand-primary">
                                {profile?.role?.toUpperCase() || "USER"}
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Tabs */}
            <div className="space-y-6">
                <div className="flex items-center gap-1 border-b border-white/5">
                    <button 
                        onClick={() => setActiveTab('overview')}
                        className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'overview' ? 'border-brand-primary text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
                    >
                        Overview
                    </button>
                    <button 
                        onClick={() => setActiveTab('projects')}
                        className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'projects' ? 'border-brand-primary text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
                    >
                        My Projects
                    </button>
                </div>

                {activeTab === 'overview' ? (
                     <div className="grid grid-cols-3 gap-6">
                        <Card className="p-6 border-white/5 bg-[#121421]/50">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-xl bg-brand-secondary/10 text-brand-secondary">
                                    <FolderKanban className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Total Projects</p>
                                    <p className="text-2xl font-bold text-white">{projects.length}</p>
                                </div>
                            </div>
                        </Card>
                        <Card className="p-6 border-white/5 bg-[#121421]/50">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-xl bg-green-500/10 text-green-500">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Active Sessions</p>
                                    <p className="text-2xl font-bold text-white">1</p>
                                </div>
                            </div>
                        </Card>
                     </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                         {projects.map((project) => (
                             <Link key={project.id} href="/dashboard">
                                <Card className="group p-6 border-white/5 bg-[#121421]/50 hover:bg-[#121421] transition-all cursor-pointer hover:scale-[1.02] hover:shadow-xl hover:shadow-brand-primary/5">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="p-2 rounded-lg bg-white/5 text-gray-400 group-hover:text-white transition-colors">
                                            <FolderKanban className="w-5 h-5" />
                                        </div>
                                        <Badge variant="outline" className={`border-white/10 ${project.status === 'ready' ? 'text-green-500' : 'text-yellow-500'}`}>
                                            {project.status}
                                        </Badge>
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-primary transition-colors">
                                        {project.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                                        {project.data?.agent1?.solution_description || "No description available."}
                                    </p>
                                    <div className="flex items-center justify-between text-xs text-gray-600">
                                        <span>Last active {new Date(project.updated_at).toLocaleDateString()}</span>
                                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Card>
                             </Link>
                         ))}
                         {projects.length === 0 && (
                             <div className="col-span-full py-12 text-center text-gray-500">
                                 No projects found. time to launch something new.
                             </div>
                         )}
                    </div>
                )}
            </div>
        </div>
    </div>
  );
}
