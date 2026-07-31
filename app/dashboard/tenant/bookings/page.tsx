import React from "react"
import { getMyBookingsAction } from "../../_action/tenant/myBookingsAction"
import { getMyPaymentsAction } from "../../_action/tenant/paymentActions"
import { BookingsView } from "../../_components/tenant/BookingsView"

export default async function TenantBookingsPage() {
  const [bookingsRes, paymentsRes] = await Promise.all([
    getMyBookingsAction(),
    getMyPaymentsAction(),
  ])

  const bookings = bookingsRes.success ? bookingsRes.data : []
  const payments = paymentsRes.success ? paymentsRes.data : []

  return <BookingsView initialBookings={bookings} />
}
