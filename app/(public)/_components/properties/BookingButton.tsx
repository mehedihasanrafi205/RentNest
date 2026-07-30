"use client";

import React, { useState } from "react";
import { Loader2, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createBookingAction } from "@/app/(public)/_action/createBookingAction";
import { toast } from "sonner";


interface BookingButtonProps {
  propertyId: string;
}

export default function BookingButton({ propertyId }: BookingButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    setLoading(true);
    try {
      const response = await createBookingAction(propertyId);

      if (response.success) {
        toast.success(response.message || "Property booked successfully!");
      } else {
        toast.error(response.message || "Failed to book property.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleBooking}
      disabled={loading}
      className="h-11 w-full gap-2 rounded-2xl font-medium shadow-md transition-all hover:shadow-lg"
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Booking...
        </>
      ) : (
        <>
          <CalendarCheck className="h-4 w-4" />
          Book Property Now
        </>
      )}
    </Button>
  );
}