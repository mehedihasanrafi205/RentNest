"use client";

import React from "react";
import { CheckCircle2, MapPin, Receipt, Calendar } from "lucide-react";
import { PaymentHistoryItem } from "@/types";


export function PaymentCard({ payment }: { payment: PaymentHistoryItem }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:shadow-sm space-y-4">
      <div className="flex items-start justify-between border-b border-border/60 pb-3">
        <div>
          <span className="text-[11px] font-mono text-muted-foreground uppercase block">Transaction ID</span>
          <span className="text-xs font-semibold text-foreground truncate max-w-[200px] block">
            {payment.transactionId}
          </span>
        </div>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
          <CheckCircle2 size={13} /> {payment.status}
        </span>
      </div>

      <div>
        <h4 className="font-semibold text-base text-foreground line-clamp-1">
          {payment.booking?.property?.title || "Rental Property"}
        </h4>
        <p className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
          <MapPin size={13} className="text-[#00a17f]" />
          <span>{payment.booking?.property?.location}</span>
        </p>
      </div>

      <div className="flex items-center justify-between bg-muted/30 p-3 rounded-xl border border-border/50 text-xs">
        <div>
          <span className="text-muted-foreground block text-[11px]">Payment Date</span>
          <span className="font-medium text-foreground flex items-center gap-1 mt-0.5">
            <Calendar size={12} /> {new Date(payment.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="text-right">
          <span className="text-muted-foreground block text-[11px]">Amount Paid</span>
          <span className="font-bold text-base text-[#00a17f]">৳{payment.amount?.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}