"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center p-4">
      <div className="flex flex-col items-center gap-8">

        {/* Spinner with logo */}
        <div className="relative flex items-center justify-center">
          {/* Outer ping */}
          <motion.span
            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute inline-flex h-20 w-20 rounded-full bg-[#00a17f]/25"
          />
          {/* Spinning ring */}
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.4, ease: "linear" }}
            className="inline-flex h-16 w-16 rounded-full border-4 border-[#00a17f]/20 border-t-[#00a17f]"
          />
          {/* Logo in center */}
          <div className="absolute">
            <Image
              src="/logo-icon.svg"
              alt="RentNest"
              width={28}
              height={28}
              priority
            />
          </div>
        </div>

        {/* Brand + message */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col items-center gap-1 text-center"
        >
          <span className="text-xl font-bold tracking-tight text-foreground">
            Rent<span style={{ color: "#00a17f" }}>Nest</span>
          </span>
          <span className="text-sm text-muted-foreground">
            Loading, please wait…
          </span>
        </motion.div>

        {/* Progress bar */}
        <div className="w-48 h-1 rounded-full bg-muted overflow-hidden">
          <motion.div
            animate={{ x: ["-100%", "250%"] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
            className="w-1/3 h-full rounded-full bg-[#00a17f]"
          />
        </div>

      </div>
    </div>
  );
}
