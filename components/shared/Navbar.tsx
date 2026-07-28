"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import {
  Sun,
  Moon,
  Menu,
  X,
  Home,
  Building2,
  Info,
  LogIn,
  UserPlus,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  User,
} from "lucide-react";

/* ─── Logo: real SVG file + wordmark ─── */
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
        className="text-xl font-bold tracking-tight text-foreground"
        style={{ fontFamily: "var(--font-sans, system-ui, sans-serif)" }}
      >
        Rent<span style={{ color: "#00a17f" }}>Nest</span>
      </span>
    </span>
  );
}

/* ─── Nav links config ─── */
const NAV_LINKS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Properties", href: "/properties", icon: Building2 },
  { label: "About", href: "/about", icon: Info },
];

/* ─── Fake auth state (replace with real session later) ─── */
// const mockUser = null;          // logged out
// const mockUser = { name: "Rahim", role: "tenant" };
// const mockUser = { name: "Karim Landlord", role: "landlord" };
// const mockUser = { name: "Admin", role: "admin" };
const mockUser: { name: string; role: string } | null = null;

/* ─────────────────────────────────────────────── */
export default function Navbar() {
  const { resolvedTheme, setTheme } = useTheme(); // resolvedTheme used in toggleTheme
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  /* navbar shadow on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* close mobile menu on resize ≥ md */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const toggleTheme = () =>
    setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300
          ${
            scrolled
              ? "bg-background/95 backdrop-blur-md shadow-lg shadow-primary/5 border-b border-border"
              : "bg-background/80 backdrop-blur-sm"
          }
        `}
      >
        <nav className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* ── Logo ── */}
            <Link
              href="/"
              className="flex items-center gap-2 group shrink-0"
              id="navbar-logo"
            >
              <RentNestLogo className="h-8 w-auto text-foreground transition-transform duration-300 group-hover:scale-105" />
            </Link>

            {/* ── Desktop Nav Links ── */}
            <ul className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(({ label, href, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="
                      flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium
                      text-muted-foreground hover:text-foreground
                      hover:bg-primary/8
                      transition-all duration-200
                      relative group
                    "
                  >
                    <Icon size={15} className="shrink-0" />
                    {label}
                    {/* underline accent */}
                    <span
                      className="
                        absolute bottom-0 left-3 right-3 h-0.5 rounded-full
                        bg-primary scale-x-0 group-hover:scale-x-100
                        transition-transform duration-200 origin-left
                      "
                    />
                  </Link>
                </li>
              ))}
            </ul>

            {/* ── Right side ── */}
            <div className="flex items-center gap-2">
              {/* Theme toggle */}
              <button
                id="navbar-theme-toggle"
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
                className="
                  p-2 rounded-lg text-muted-foreground hover:text-foreground
                  hover:bg-primary/8 transition-all duration-200
                  border border-transparent hover:border-border
                "
              >
                {/* Show both icons; CSS dark: class hides/shows the right one */}
                <Sun
                  size={18}
                  className="hidden dark:block"
                  aria-hidden="true"
                />
                <Moon
                  size={18}
                  className="block dark:hidden"
                  aria-hidden="true"
                />
              </button>

              {/* Auth section */}
              {mockUser ? (
                /* ── Logged-in user menu ── */
                <div className="relative hidden md:block">
                  <button
                    id="navbar-user-menu-btn"
                    onClick={() => setUserMenuOpen((v) => !v)}
                    className="
                      flex items-center gap-2 px-3 py-1.5 rounded-lg
                      border border-border hover:border-primary/50
                      text-sm font-medium transition-all duration-200
                      hover:bg-primary/8
                    "
                  >
                    <span
                      className="
                        flex items-center justify-center w-7 h-7 rounded-full
                        bg-primary text-primary-foreground text-xs font-bold
                      "
                    >
                      {mockUser.name[0]}
                    </span>
                    <span className="max-w-25 truncate">{mockUser.name}</span>
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* dropdown */}
                  {userMenuOpen && (
                    <div
                      className="
                        absolute right-0 top-full mt-2 w-52
                        bg-popover border border-border rounded-xl shadow-xl shadow-black/10
                        py-1.5 z-50
                        animate-in fade-in slide-in-from-top-2 duration-150
                      "
                    >
                      <div className="px-3 py-2 border-b border-border mb-1">
                        <p className="text-xs text-muted-foreground">Signed in as</p>
                        <p className="text-sm font-semibold truncate">{mockUser.name}</p>
                        <span
                          className="
                            inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium
                            bg-primary/15 text-primary capitalize
                          "
                        >
                          {mockUser.role}
                        </span>
                      </div>
                      <Link
                        href={`/dashboard/${mockUser.role}`}
                        className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-primary/8 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <LayoutDashboard size={15} />
                        Dashboard
                      </Link>
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-primary/8 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <User size={15} />
                        Profile
                      </Link>
                      <hr className="border-border my-1" />
                      <button
                        className="flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/8 transition-colors w-full"
                        onClick={() => {
                          setUserMenuOpen(false);
                          /* call signOut here */
                        }}
                      >
                        <LogOut size={15} />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* ── Guest buttons ── */
                <div className="hidden md:flex items-center gap-2">
                  <Link
                    id="navbar-login-btn"
                    href="/login"
                    className="
                      flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium
                      text-foreground border border-border
                      hover:border-primary/60 hover:bg-primary/8
                      transition-all duration-200
                    "
                  >
                    <LogIn size={15} />
                    Login
                  </Link>
                  <Link
                    id="navbar-register-btn"
                    href="/register"
                    className="
                      flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium
                      bg-primary text-primary-foreground
                      hover:bg-primary/90 hover:shadow-md hover:shadow-primary/25
                      transition-all duration-200
                      active:scale-95
                    "
                  >
                    <UserPlus size={15} />
                    Register
                  </Link>
                </div>
              )}

              {/* Mobile hamburger */}
              <button
                id="navbar-mobile-menu-btn"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle mobile menu"
                aria-expanded={mobileOpen}
                className="
                  md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground
                  hover:bg-primary/8 transition-all duration-200
                "
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </nav>

        {/* ── Mobile Menu ── */}
        <div
          className={`
            md:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}
            bg-background/98 backdrop-blur-md border-t border-border
          `}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {/* Nav links */}
            {NAV_LINKS.map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="
                  flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                  text-muted-foreground hover:text-foreground hover:bg-primary/8
                  transition-all duration-200
                "
              >
                <Icon size={17} className="text-primary" />
                {label}
              </Link>
            ))}

            <hr className="border-border my-2" />

            {/* Auth mobile */}
            {mockUser ? (
              <>
                <Link
                  href={`/dashboard/${mockUser.role}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-primary/8 transition-colors"
                >
                  <LayoutDashboard size={17} className="text-primary" />
                  Dashboard
                </Link>
                <button
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/8 transition-colors w-full"
                  onClick={() => {
                    setMobileOpen(false);
                    /* call signOut here */
                  }}
                >
                  <LogOut size={17} />
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-1 pb-2">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="
                    flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium
                    border border-border hover:border-primary/60 hover:bg-primary/8
                    transition-all duration-200
                  "
                >
                  <LogIn size={17} />
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="
                    flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium
                    bg-primary text-primary-foreground
                    hover:bg-primary/90 transition-all duration-200
                  "
                >
                  <UserPlus size={17} />
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Spacer so content doesn't hide under fixed navbar */}
      <div className="h-16" aria-hidden="true" />

      {/* Click-outside overlay for user dropdown */}
      {userMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setUserMenuOpen(false)}
        />
      )}
    </>
  );
}
