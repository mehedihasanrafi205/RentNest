import React from "react";
import { BookingsView } from "../../_components/tenant/BookingsView";
import { getMyBookingsAction } from "../../_action/tenant/myBookingsAction";

export default async function TenantBookingsPage() {
  const response = await getMyBookingsAction();
  const bookings = response.success ? response.data : [];

  return <BookingsView initialBookings={bookings} />;
}