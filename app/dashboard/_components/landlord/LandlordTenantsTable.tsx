"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { IRental } from "@/types";

export default function LandlordTenantsTable({ initialRentals }: { initialRentals: IRental[] }) {
  const [rentals] = useState<IRental[]>(initialRentals);

  // Filter only approved/active rentals to show as tenant history
  const activeTenants = rentals.filter(r => r.status === "APPROVED" || r.status === "ACTIVE" || r.status === "COMPLETED");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Tenant History</h2>
        <p className="text-muted-foreground">View your past and current tenants.</p>
      </div>

      <div className="rounded-md border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tenant</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Move-in Date</TableHead>
              <TableHead className="text-right">Contact</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activeTenants.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-32 text-muted-foreground">
                  No tenant history found.
                </TableCell>
              </TableRow>
            ) : (
              activeTenants.map((rental) => (
                <TableRow key={rental.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={rental.tenant?.image || ""} alt={rental.tenant?.name || "Tenant"} />
                        <AvatarFallback>{rental.tenant?.name?.charAt(0) || "T"}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{rental.tenant?.name || "Unknown Tenant"}</span>
                        <span className="text-xs text-muted-foreground">{rental.tenant?.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-primary">
                    {rental.property?.title || "Unknown Property"}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        rental.status === "ACTIVE"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                      }`}
                    >
                      {rental.status}
                    </span>
                  </TableCell>
                  <TableCell>{rental.moveInDate ? new Date(rental.moveInDate).toLocaleDateString() : "N/A"}</TableCell>
                  <TableCell className="text-right">
                    <a href={`mailto:${rental.tenant?.email}`} className="text-sm font-medium hover:underline text-primary">
                      Email
                    </a>
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
