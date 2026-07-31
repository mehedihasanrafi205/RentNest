"use client"

import React from "react";
import Link from "next/link";
import { Home, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function RoleCtaSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-20 bg-muted/40 border-y border-border px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Renter Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-primary text-primary-foreground p-8 sm:p-12 rounded-3xl relative overflow-hidden group shadow-lg flex flex-col justify-between min-h-80"
        >
          <div className="relative z-10 max-w-md">
            <h2 className="text-2xl sm:text-4xl font-extrabold mb-4">
              Looking to Rent?
            </h2>
            <p className="text-primary-foreground/80 text-sm sm:text-base mb-8">
              Access thousands of verified listings with smart filters and instant tour booking options.
            </p>
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="font-bold rounded-xl shadow-md"
            >
              <Link href="/properties">Browse Homes</Link>
            </Button>
          </div>
          <Home className="absolute -bottom-10 -right-10 w-64 h-64 opacity-10 rotate-12 group-hover:scale-110 transition-transform duration-500 pointer-events-none" />
        </motion.div>

        {/* Property Owner Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card text-card-foreground border border-border p-8 sm:p-12 rounded-3xl relative overflow-hidden group shadow-lg flex flex-col justify-between min-h-80"
        >
          <div className="relative z-10 max-w-md">
            <h2 className="text-2xl sm:text-4xl font-extrabold mb-4 text-foreground">
              Have a Property?
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mb-8">
              List your property today and reach millions of qualified renters with our easy-to-use platform.
            </p>
            <Button
              asChild
              size="lg"
              className="font-bold rounded-xl shadow-md"
            >
              <Link href="/dashboard/landlord/properties">List Your Home</Link>
            </Button>
          </div>
          <Building2 className="absolute -bottom-10 -right-10 w-64 h-64 text-foreground opacity-5 -rotate-12 group-hover:scale-110 transition-transform duration-500 pointer-events-none" />
        </motion.div>

      </div>
    </motion.section>
  );
}
