import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck, CreditCard, Star, Building2 } from "lucide-react";
import { getMyBookingsAction } from "../_action/tenant/myBookingsAction";
import { getMyPaymentsAction } from "../_action/tenant/paymentActions";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function TenantDashboardPage() {
  const [bookingsRes, paymentsRes] = await Promise.all([
    getMyBookingsAction(),
    getMyPaymentsAction(),
  ]);

  const bookings = bookingsRes.success ? bookingsRes.data : [];
  const payments = paymentsRes.success ? paymentsRes.data : [];

  const pendingCount = bookings.filter((b: { status: string }) => b.status === "PENDING").length;
  const approvedCount = bookings.filter((b: { status: string }) => b.status === "APPROVED").length;
  const paidCount = payments.length;

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tenant Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Overview of your bookings and payments.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bookings.length}</div>
            <p className="text-xs text-muted-foreground">All time requests</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <CalendarCheck className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CalendarCheck className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedCount}</div>
            <p className="text-xs text-muted-foreground">Ready to pay</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payments Made</CardTitle>
            <CreditCard className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{paidCount}</div>
            <p className="text-xs text-muted-foreground">Completed transactions</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <Button asChild className="bg-[#00a17f] hover:bg-[#00a17f]/90">
          <Link href="/properties">Browse Properties</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/dashboard/tenant/bookings">My Bookings</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/dashboard/tenant/reviews">
            <Star className="h-4 w-4 mr-1" /> Write Review
          </Link>
        </Button>
      </div>
    </div>
  );
}