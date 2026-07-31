import { getMyBookingsAction } from "../../_action/tenant/bookingActions";
import { ReviewsView } from "../../_components/tenant/ReviewsView";

export default async function TenantReviewsPage() {
  const bookingsRes = await getMyBookingsAction();
  const bookings = bookingsRes.success && bookingsRes.data ? bookingsRes.data : [];

  // Filter to only include bookings that might be eligible for review (e.g. APPROVED or paid)
  // Assuming a tenant can review any property they've successfully booked.
  const approvedBookings = bookings.filter((b: any) => b.status === "APPROVED");

  return (
    <div className="max-w-6xl mx-auto">
      <ReviewsView bookings={approvedBookings} />
    </div>
  );
}
