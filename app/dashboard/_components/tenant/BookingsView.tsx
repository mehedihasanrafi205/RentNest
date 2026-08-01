"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Booking } from "@/types";
import { BookingCard } from "./BookingCard";


interface BookingsViewProps {
  initialBookings: Booking[];
  paidBookingIds?: string[];
}

export function BookingsView({ initialBookings, paidBookingIds = [] }: BookingsViewProps) {
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  const filteredBookings = initialBookings.filter((booking) => {
    if (filterStatus === "ALL") return true;
    return booking.status === filterStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header & Filter Tabs */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">My Bookings</h1>
          <p className="text-sm text-muted-foreground">
            Manage and track all your rental property booking requests.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 bg-card p-1.5 rounded-xl border border-border">
          {["ALL", "PENDING", "APPROVED", "ACTIVE", "COMPLETED", "REJECTED"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                filterStatus === status
                  ? "bg-[#00a17f] text-white shadow-xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {status.charAt(0) + status.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredBookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#00a17f]/10 text-[#00a17f] mb-4">
            <Building2 className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">No Bookings Found</h3>
          <p className="text-sm text-muted-foreground max-w-sm mt-1 mb-6">
            {filterStatus === "ALL"
              ? "You haven't requested any property bookings yet."
              : `No ${filterStatus.toLowerCase()} booking requests available.`}
          </p>
          <Button asChild className="bg-[#00a17f] hover:bg-[#00a17f]/90 text-white rounded-xl">
            <Link href="/properties">Browse Properties</Link>
          </Button>
        </div>
      ) : (
        /* Bookings List */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} paidBookingIds={paidBookingIds} />
          ))}
        </div>
      )}
    </div>
  );
}