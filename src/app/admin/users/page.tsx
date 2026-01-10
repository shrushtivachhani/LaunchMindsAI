"use client";

import React from 'react';
import { Card, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Badge, Avatar, AvatarFallback, AvatarImage, Button, Input } from '@/components/ui/components';
import { Search, MoreHorizontal, Shield, User } from 'lucide-react';

const USERS = [
    { name: "Sarah Connor", email: "sarah@skynet.com", role: "Admin", status: "Active", projects: 12 },
    { name: "John Doe", email: "john@doe.com", role: "User", status: "Active", projects: 3 },
    { name: "Alice Smith", email: "alice@wonder.com", role: "User", status: "Suspended", projects: 0 },
    { name: "Bob Martin", email: "bob@builder.com", role: "User", status: "Active", projects: 5 },
    { name: "Elena Fisher", email: "elena@uncharted.com", role: "Admin", status: "Active", projects: 8 },
];

export default function UserManagementPage() {
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
                        <TableHead className="text-gray-400">Status</TableHead>
                        <TableHead className="text-gray-400">Projects</TableHead>
                        <TableHead className="text-right text-gray-400">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {USERS.map((user, i) => (
                        <TableRow key={i} className="border-white/5 hover:bg-white/5">
                            <TableCell className="font-medium text-white">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-9 w-9 border border-white/10">
                                        <AvatarFallback className="bg-brand-primary/20 text-brand-primary">{user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{user.name}</p>
                                        <p className="text-xs text-gray-500">{user.email}</p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline" className={`border-white/10 ${user.role === 'Admin' ? 'bg-brand-primary/10 text-brand-primary' : 'text-gray-400'}`}>
                                    {user.role === 'Admin' ? <Shield className="w-3 h-3 mr-1" /> : <User className="w-3 h-3 mr-1" />}
                                    {user.role}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Badge variant={user.status === 'Active' ? 'success' : 'destructive'}>
                                    {user.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-gray-400">{user.projects}</TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="icon" className="hover:bg-white/10 text-gray-400">
                                    <MoreHorizontal className="w-4 h-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    </div>
  );
}
