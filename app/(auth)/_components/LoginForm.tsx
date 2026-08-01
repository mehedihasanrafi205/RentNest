"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Lock, Mail, Eye, EyeOff } from "lucide-react";
import { loginAction } from "../_action/auth";


function RentNestLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-end gap-2 ${className}`}>
      <Image
        src="/logo-icon.svg"
        alt="RentNest icon"
        width={36}
        height={36}
        priority
        className="h-9 w-9 object-contain"
      />
      <span
        className="text-2xl font-bold tracking-tight text-foreground"
        style={{ fontFamily: "var(--font-sans, system-ui, sans-serif)" }}
      >
        Rent<span style={{ color: "#00a17f" }}>Nest</span>
      </span>
    </span>
  );
}

export default function LoginForm() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(loginAction, null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Login successful!");
      router.push("/dashboard");
    } else {
      toast.error(state.message || "Invalid credentials!");
    }
  }, [state, router]);

  return (
    <Card className="w-full max-w-xl border-border/60 shadow-xl p-4 sm:p-6">
      <div className="flex justify-center pt-4 pb-2 lg:hidden">
        <Link href="/" className="inline-block transition-transform hover:scale-105">
          <RentNestLogo />
        </Link>
      </div>

      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-3xl font-extrabold tracking-tight">
          Welcome back
        </CardTitle>
        <CardDescription className="text-base">
          Enter your credentials to access your RentNest account
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-2">
        <form action={formAction} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold">
              Email address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                className="pl-11 h-12 text-base"
                required
              />
            </div>
          </div>

          {/* Password Field with Eye Toggle */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-semibold">
                Password
              </Label>
              <span className="text-sm text-muted-foreground">
                Forgot password?
              </span>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pl-11 pr-11 h-12 text-base"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3.5 top-3.5 text-muted-foreground hover:text-foreground focus:outline-none transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={pending}
            className="w-full h-12 text-base bg-[#00a17f] hover:bg-[#00876a] text-white font-semibold transition-colors shadow-md"
          >
            {pending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>

          {/* Bottom link */}
          <div className="text-center text-base text-muted-foreground pt-2">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-primary hover:underline"
            >
              Create account
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}