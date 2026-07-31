import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-card border border-border rounded-3xl p-8 text-center space-y-5 shadow-lg">
        <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 size={36} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Payment Successful!</h2>
          <p className="text-sm text-muted-foreground">
            Your payment has been processed successfully. You can check your transaction history now.
          </p>
        </div>
        <div className="pt-2 flex flex-col gap-2">
          <Button asChild className="bg-[#00a17f] hover:bg-[#00a17f]/90 text-white rounded-xl w-full">
            <Link href="/dashboard/tenant/payments">View My Payments</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-xl w-full">
            <Link href="/dashboard/tenant/bookings">Back to Bookings</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}