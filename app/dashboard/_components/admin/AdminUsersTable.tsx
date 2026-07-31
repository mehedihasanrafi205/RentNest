"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Shield, ShieldAlert, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import type { IUser } from "@/types";
import { toggleUserBanStatus } from "../../_action/admin/adminActions";

export default function AdminUsersTable({ initialUsers }: { initialUsers: IUser[] }) {
  const [users, setUsers] = useState<IUser[]>(initialUsers);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleToggleBan = async (id: string, currentStatus: boolean | undefined) => {
    setLoadingId(id);
    const newStatus = !currentStatus;
    
    const res = await toggleUserBanStatus(id, newStatus);
    
    if (res.success) {
      setUsers((prev) => 
        prev.map((u) => u.id === id ? { ...u, isBanned: newStatus } : u)
      );
      toast.success(newStatus ? "User banned successfully." : "User unbanned successfully.");
    } else {
      toast.error(res.message || "Failed to update user status.");
    }
    setLoadingId(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">User Management</h2>
        <p className="text-muted-foreground">View and manage all registered users.</p>
      </div>

      <div className="rounded-md border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center h-32 text-muted-foreground">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.image || ""} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{user.name}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary">
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        user.isBanned
                          ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                          : "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                      }`}
                    >
                      {user.isBanned ? "Banned" : "Active"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {user.role !== "ADMIN" && (
                      <Button
                        variant={user.isBanned ? "outline" : "destructive"}
                        size="sm"
                        className="gap-2"
                        disabled={loadingId === user.id}
                        onClick={() => handleToggleBan(user.id, user.isBanned)}
                      >
                        {loadingId === user.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : user.isBanned ? (
                          <Shield className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <ShieldAlert className="h-4 w-4" />
                        )}
                        {user.isBanned ? "Unban" : "Ban"}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
