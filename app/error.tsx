"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { AlertOctagon, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("App Error:", error);
  }, [error]);

  const handleReset = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#00a17f", "#74ba85", "#ffffff"],
    });
    reset();
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="max-w-md w-full text-center flex flex-col items-center gap-6"
      >
        {/* Icon */}
        <motion.div
          animate={{ rotate: [-4, 4, -4, 4, 0] }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center"
        >
          <AlertOctagon className="w-10 h-10 text-destructive" />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-col gap-2"
        >
          <h1 className="text-2xl font-bold text-foreground">
            Something went wrong
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
            We hit an unexpected error. Try refreshing or head back to the homepage.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="flex flex-col sm:flex-row gap-3 w-full max-w-xs"
        >
          <Button
            onClick={handleReset}
            className="flex-1 h-11 gap-2 bg-[#00a17f] hover:bg-[#00876a] text-white rounded-xl"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </Button>
          <Button
            variant="outline"
            asChild
            className="flex-1 h-11 gap-2 rounded-xl"
          >
            <Link href="/">
              <Home className="w-4 h-4" />
              Go Home
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
