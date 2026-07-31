import Link from "next/link";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-card border border-border rounded-3xl p-8 text-center space-y-5 shadow-lg">
        <div className="w-16 h-16 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mx-auto">
          <XCircle size={36} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Payment Cancelled</h2>
          <p className="text-sm text-muted-foreground">
            The payment process was cancelled or failed. You can try paying again from your bookings page.
          </p>
        </div>
        <div className="pt-2">
          <Button asChild className="bg-[#00a17f] hover:bg-[#00a17f]/90 text-white rounded-xl w-full">
            <Link href="/dashboard/tenant/bookings">Return to Bookings</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}