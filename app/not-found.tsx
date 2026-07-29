"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center flex flex-col items-center gap-6">

        {/* 404 number */}
        <div className="flex flex-col items-center gap-2">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-[120px] font-black leading-none select-none"
            style={{ color: "#00a17f" }}
          >
            404
          </motion.span>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="w-16 h-1 rounded-full bg-[#00a17f]/40"
          />
        </div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="flex flex-col gap-2"
        >
          <h1 className="text-2xl font-bold text-foreground">
            Page Not Found
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-3 w-full max-w-xs"
        >
          <Button
            variant="outline"
            className="flex-1 h-11 gap-2 rounded-xl cursor-pointer"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
          <Button
            asChild
            className="flex-1 h-11 gap-2 bg-[#00a17f] hover:bg-[#00876a] text-white rounded-xl"
          >
            <Link href="/">
              <Home className="w-4 h-4" />
              Home Page
            </Link>
          </Button>
        </motion.div>

      </div>
    </div>
  );
}
