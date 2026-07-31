"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Check, X, Loader2 } from "lucide-react";
import type { IRental } from "@/types";
import { updateBookingStatus } from "../../_action/landlord/landlordActions";
import { toast } from "sonner";

export default function LandlordRequestsTable({ initialRequests }: { initialRequests: IRental[] }) {
  const [requests, setRequests] = useState<IRental[]>(initialRequests);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const handleAction = async (id: string, newStatus: "APPROVED" | "REJECTED") => {
    setActionLoading(id);
    
    const res = await updateBookingStatus(id, newStatus);
    
    if (res.success) {
      setRequests((prev) => 
        prev.map((req) => req.id === id ? { ...req, status: newStatus } : req)
      );
      toast.success(`Request ${newStatus.toLowerCase()} successfully.`);
    } else {
      toast.error(res.message || "Failed to update status.");
    }
    
    setActionLoading(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Rental Requests</h2>
        <p className="text-muted-foreground">Manage incoming requests from tenants.</p>
      </div>

      <div className="rounded-md border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Tenant</TableHead>
              <TableHead>Move-in Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-32 text-muted-foreground">
                  No rental requests found.
                </TableCell>
              </TableRow>
            ) : (
              requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">
                    {request.property?.title || "Unknown Property"}
                  </TableCell>
                  <TableCell>{request.tenant?.name || "Unknown Tenant"}</TableCell>
                  <TableCell>{request.moveInDate ? new Date(request.moveInDate).toLocaleDateString() : "N/A"}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        request.status === "PENDING"
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                          : request.status === "APPROVED" || request.status === "ACTIVE"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {request.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {request.status === "PENDING" ? (
                      <div className="flex justify-end gap-2">
                        <Button 
                          size="sm" 
                          className="gap-1 bg-emerald-600 hover:bg-emerald-700"
                          disabled={actionLoading === request.id}
                          onClick={() => handleAction(request.id, "APPROVED")}
                        >
                          {actionLoading === request.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive" 
                          className="gap-1"
                          disabled={actionLoading === request.id}
                          onClick={() => handleAction(request.id, "REJECTED")}
                        >
                          <X className="h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground italic">Action taken</span>
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
