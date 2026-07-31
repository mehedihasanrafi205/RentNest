"use client";

import React from "react";
import { Receipt } from "lucide-react";

import { PaymentCard } from "./PaymentCard";
import { PaymentHistoryItem } from "@/types";

export function PaymentsView({ payments }: { payments: PaymentHistoryItem[] }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Payment History</h1>
        <p className="text-sm text-muted-foreground">View and manage all your completed rental transactions.</p>
      </div>

      {payments.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#00a17f]/10 text-[#00a17f] mb-4">
            <Receipt className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">No Payments Found</h3>
          <p className="text-sm text-muted-foreground max-w-sm mt-1">
            You haven&apos;t made any payment transactions yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {payments.map((payment) => (
            <PaymentCard key={payment.id} payment={payment} />
          ))}
        </div>
      )}
    </div>
  );
}