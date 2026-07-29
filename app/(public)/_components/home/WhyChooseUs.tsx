import React from "react";
import { ShieldCheck, CalendarCheck2, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: "Verified Listings",
    description:
      "Every property on our platform goes through a rigorous verification process to ensure your safety.",
  },
  {
    icon: <CalendarCheck2 className="w-8 h-8 text-primary" />,
    title: "Instant Booking",
    description:
      "Schedule viewings or reserve your next home instantly with our integrated calendar system.",
  },
  {
    icon: <Lock className="w-8 h-8 text-primary" />,
    title: "Secure Payments",
    description:
      "Our end-to-end encrypted payment gateway ensures your financial transactions are always protected.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          Why RentNest?
        </h2>
        <p className="text-muted-foreground mt-3 text-base">
          We offer the safest, fastest, and most modern renting experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {FEATURES.map((feature, index) => (
          <Card
            key={index}
            className="border-border/60 hover:border-border shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl"
          >
            <CardContent className="flex flex-col items-center p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 shrink-0">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}