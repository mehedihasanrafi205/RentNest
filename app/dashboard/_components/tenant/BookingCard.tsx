"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  MapPin, 
  CheckCircle2, 
  ExternalLink, 
  CreditCard, 
  Loader2 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Booking } from "@/types";
import { createCheckoutSessionAction } from "../../_action/tenant/paymentActions";


interface BookingCardProps {
  booking: Booking;
  paidBookingIds?: string[]; 
}

export function BookingCard({ booking, paidBookingIds = [] }: BookingCardProps) {
  const [loading, setLoading] = useState(false);

  const isAlreadyPaid = paidBookingIds.includes(booking.id);

  const handlePayment = async () => {
    setLoading(true);
    const res = await createCheckoutSessionAction(booking.id);
    if (res.success && res.url) {
      window.location.href = res.url;
    } else {
      alert(res.message || "Could not initiate payment");
      setLoading(false);
    }
  };

  return (
    <div className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:border-[#00a17f]/40 hover:shadow-md">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-lg text-foreground line-clamp-1 group-hover:text-[#00a17f] transition-colors">
            {booking.property?.title || "Untitled Property"}
          </h3>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
            {booking.status}
          </span>
        </div>

        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin size={14} className="shrink-0 text-[#00a17f]" />
          <span className="truncate">{booking.property?.location}</span>
        </p>

        <div className="grid grid-cols-2 gap-2 text-xs bg-muted/40 p-3 rounded-xl border border-border/50">
          <div>
            <span className="text-muted-foreground block mb-0.5">Rent Price</span>
            <span className="font-medium text-foreground">৳{booking.property?.price?.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-muted-foreground block mb-0.5">Total Amount</span>
            <span className="font-bold text-[#00a17f]">৳{booking.totalCost?.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border pt-4 mt-4">
        <span className="text-[11px] text-muted-foreground">
          {new Date(booking.createdAt).toLocaleDateString()}
        </span>

        <div className="flex items-center gap-2">
          {booking.status === "APPROVED" && !isAlreadyPaid && (
            <Button
              onClick={handlePayment}
              disabled={loading}
              size="sm"
              className="h-8 bg-[#00a17f] hover:bg-[#00a17f]/90 text-white rounded-lg gap-1.5 text-xs"
            >
              {loading ? <Loader2 size={13} className="animate-spin" /> : <CreditCard size={13} />}
              Pay Now
            </Button>
          )}

          {isAlreadyPaid && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
              <CheckCircle2 size={13} /> Paid
            </span>
          )}

          <Button asChild variant="ghost" size="sm" className="h-8 rounded-lg text-xs text-muted-foreground">
            <Link href={`/properties/${booking.propertyId}`}>
              Details <ExternalLink size={12} />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}