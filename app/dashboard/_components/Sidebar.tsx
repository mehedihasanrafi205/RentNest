"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { 
  LayoutDashboard, 
  Building2, 
  CalendarCheck, 
  Users, 
  Settings, 
  LogOut, 
  Home 
} from "lucide-react";
import { cn } from "@/lib/utils";

export function RentNestLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/logo-icon.svg"
        alt="RentNest icon"
        width={36}
        height={36}
        priority
        className="h-8 w-8 object-contain"
      />
      <span
        className="text-xl font-bold tracking-tight text-foreground"
        style={{ fontFamily: "var(--font-sans, system-ui, sans-serif)" }}
      >
        Rent<span style={{ color: "#00a17f" }}>Nest</span>
      </span>
    </span>
  );
}

interface SidebarProps {
  userRole?: "TENANT" | "LANDLORD" | "ADMIN";
  onClose?: () => void;
}

export function SidebarContent({ userRole = "TENANT", onClose }: SidebarProps) {
  const pathname = usePathname();

  const navItems = {
    TENANT: [
      { label: "Overview", href: "/dashboard/tenant", icon: LayoutDashboard },
      { label: "My Bookings", href: "/dashboard/tenant/bookings", icon: CalendarCheck },
      { label: "Saved Properties", href: "/dashboard/tenant/saved", icon: Building2 },
    ],
    LANDLORD: [
      { label: "Overview", href: "/dashboard/landlord", icon: LayoutDashboard },
      { label: "My Properties", href: "/dashboard/landlord/properties", icon: Building2 },
      { label: "Booking Requests", href: "/dashboard/landlord/requests", icon: CalendarCheck },
    ],
    ADMIN: [
      { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
      { label: "Manage Properties", href: "/dashboard/admin/properties", icon: Building2 },
      { label: "Manage Users", href: "/dashboard/admin/users", icon: Users },
    ],
  };

  const currentNav = navItems[userRole] || navItems.TENANT;

  return (
    <div className="flex h-full flex-col border-r border-border bg-card text-card-foreground">
      {/* RentNest Logo Header */}
      <div className="flex h-16 items-center px-6 border-b border-border">
        <Link href="/" onClick={onClose}>
          <RentNestLogo />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
        <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
          Menu
        </p>
        {currentNav.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-[#00a17f] text-white shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Footer Navigation */}
      <div className="p-4 border-t border-border space-y-1">
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </Link>
        <Link
          href="/dashboard/settings"
          onClick={onClose}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
        <button
          onClick={() => {
            /* Logout Logic */
            if (onClose) onClose();
          }}
          className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
}