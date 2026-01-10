"use client";

import React, { useEffect, useState } from 'react';
import { Card, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Badge, Avatar, AvatarFallback, AvatarImage, Button, Input } from '@/components/ui/components';
import { Search, MoreHorizontal, Shield, User, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function UserManagementPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchUsers = async () => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (data) setUsers(data);
        setIsLoading(false);
    };

    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <div>
                 <h1 className="text-2xl font-bold text-white mb-2">User Management</h1>
                 <p className="text-gray-400">Manage access and permissions.</p>
            </div>
            <Button variant="premium">Export User Data</Button>
        </div>

        <Card className="p-6 border-white/5 bg-[#121421]/50">
            <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                    <Input placeholder="Search users by name or email..." className="pl-9 bg-black/20 border-white/10" />
                </div>
                <div className="ml-auto flex gap-2">
                     <Button variant="outline" size="sm" className="border-white/10">Filter</Button>
                     <Button variant="outline" size="sm" className="border-white/10">Columns</Button>
                </div>
            </div>

            <Table>
                <TableHeader className="border-white/5">
                    <TableRow className="border-white/5 hover:bg-transparent">
                        <TableHead className="text-gray-400">User</TableHead>
                        <TableHead className="text-gray-400">Role</TableHead>
                        <TableHead className="text-gray-400">Joined</TableHead>
                        <TableHead className="text-right text-gray-400">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={4} className="h-24 text-center text-gray-500">
                                <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                            </TableCell>
                        </TableRow>
                    ) : users.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="h-24 text-center text-gray-500">
                                No users found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        users.map((user) => (
                        <TableRow key={user.id} className="border-white/5 hover:bg-white/5">
                            <TableCell className="font-medium text-white">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-9 w-9 border border-white/10">
                                        <AvatarFallback className="bg-brand-primary/20 text-brand-primary">{(user.full_name || user.email).charAt(0).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{user.full_name || "Unknown"}</p>
                                        <p className="text-xs text-gray-500">{user.email}</p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline" className={`border-white/10 ${user.role === 'admin' ? 'bg-brand-primary/10 text-brand-primary' : 'text-gray-400'}`}>
                                    {user.role === 'admin' ? <Shield className="w-3 h-3 mr-1" /> : <User className="w-3 h-3 mr-1" />}
                                    {user.role}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-gray-400">
                                {new Date(user.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="icon" className="hover:bg-white/10 text-gray-400">
                                    <MoreHorizontal className="w-4 h-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    )))}
                </TableBody>
            </Table>
        </Card>
    </div>
  );
}
