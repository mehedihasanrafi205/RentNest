"use client";

import React, { useState,  } from "react";
import { Bell, User, Menu, X} from "lucide-react";

import { Button } from "@/components/ui/button";
import { RentNestLogo, SidebarContent } from "./_components/Sidebar";
import { ThemeToggle } from "./_components/ThemeToggle";

interface DashboardLayoutProps {
  children: React.ReactNode;
}



const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const userRole: "TENANT" | "LANDLORD" | "ADMIN" = "TENANT";

  return (
    <div className="flex h-screen bg-background antialiased">
      {/* 1. Desktop Sidebar (Hidden on Mobile) */}
      <aside className="hidden lg:block w-64 shrink-0">
        <SidebarContent userRole={userRole} />
      </aside>

      {/* 2. Mobile Sidebar Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 transition-opacity" 
            onClick={() => setMobileMenuOpen(false)} 
          />
          
          {/* Drawer Content */}
          <div className="fixed inset-y-0 left-0 w-72 bg-card shadow-xl z-50">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute right-4 top-4 rounded-lg p-1 text-muted-foreground hover:bg-accent"
            >
              <X className="h-5 w-5" />
            </button>
            <SidebarContent userRole={userRole} onClose={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* 3. Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navbar Header */}
        <header className="flex h-16 items-center justify-between border-b border-border bg-card px-4 md:px-6">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Button */}
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden rounded-xl h-9 w-9"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            {/* Mobile Logo View */}
            <div className="lg:hidden">
              <RentNestLogo />
            </div>

            {/* Desktop Dashboard Title */}
            <h2 className="hidden lg:block text-lg font-semibold text-foreground capitalize">
              {userRole.toLowerCase()} Dashboard
            </h2>
          </div>

          {/* User Profile & Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            
            <ThemeToggle />

            <Button variant="ghost" size="icon" className="rounded-full relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#00a17f]" />
            </Button>

            <div className="flex items-center gap-3 border-l border-border pl-3 md:pl-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#00a17f]/10 text-[#00a17f] font-bold text-sm">
                <User className="h-5 w-5" />
              </div>
              <div className="hidden text-left sm:block">
                <p className="text-sm font-medium text-foreground">John Doe</p>
                <p className="text-xs text-muted-foreground capitalize">{userRole.toLowerCase()}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto bg-muted/30 p-4 md:p-8">
          <div className="mx-auto ">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;