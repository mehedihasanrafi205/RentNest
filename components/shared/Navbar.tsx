"use client"

import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
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
  LayoutDashboard,
  LogOut,
  User,
  ChevronRight,
  Contact,
} from "lucide-react"

import type { IUser } from "@/types"
import { logoutAction } from "@/app/(auth)/_action/auth"

// Shadcn UI Imports
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function RentNestLogo({ className = "" }: { className?: string }) {
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
  )
}

/* ─── Nav links config ─── */
const NAV_LINKS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Properties", href: "/properties", icon: Building2 },
  { label: "About", href: "/about", icon: Info },
  { label: "Contact", href: "/contact", icon: Contact },
]

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState<IUser | null>(null)
  const [loading, setLoading] = useState(true)

  /* Fetch Logged-in User Info */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me");
        if (!res.ok) {
          setUser(null);
          return;
        }
        const data = await res.json();
        setUser(data?.success ? data.data : null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [pathname]);

  /* navbar shadow on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  /* close mobile menu on resize ≥ md & lock body scroll */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false)
    }
    window.addEventListener("resize", onResize)

    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      window.removeEventListener("resize", onResize)
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  const toggleTheme = () =>
    setTheme(resolvedTheme === "dark" ? "light" : "dark")

  const handleLogout = async () => {
    await logoutAction()
    setUser(null)
    setMobileOpen(false)
    router.push("/login")
    router.refresh()
  }

  const userDashboardHref = `/dashboard/${user?.role?.toLowerCase() || "user"}`

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-border/60 bg-background/90 shadow-sm backdrop-blur-md"
            : "bg-background/80 backdrop-blur-sm"
        }`}
      >
        <nav className="container mx-auto px-4 lg:px-6">
          <div className="flex h-16 items-center justify-between">
            {/* ── Logo ── */}
            <Link
              href="/"
              className="group flex shrink-0 items-center gap-2"
              id="navbar-logo"
            >
              <RentNestLogo className="transition-transform duration-300 group-hover:scale-105" />
            </Link>

            {/* ── Desktop Nav Links ── */}
            <ul className="hidden items-center gap-1 md:flex">
              {NAV_LINKS.map(({ label, href, icon: Icon }) => {
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className="group relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-primary/8 hover:text-foreground"
                    >
                      <Icon size={15} className="shrink-0" />
                      {label}

                      <span className="absolute right-3 bottom-0 left-3 h-0.5 origin-left scale-x-0 rounded-full bg-primary transition-transform duration-200 group-hover:scale-x-100" />
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* ── Desktop Right Side ── */}
            <div className="flex items-center gap-2">
              {/* Desktop Theme toggle */}
              <button
                id="navbar-theme-toggle"
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
                className="hidden rounded-lg border border-transparent p-2 text-muted-foreground transition-all duration-200 hover:border-border hover:bg-muted hover:text-foreground md:flex"
              >
                <Sun size={18} className="hidden dark:block" />
                <Moon size={18} className="block dark:hidden" />
              </button>

              {/* Desktop Auth section */}
              {loading ? (
                <div className="hidden h-9 w-9 animate-pulse rounded-full bg-muted md:block" />
              ) : user ? (
                <div className="hidden md:block">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="relative size-9 cursor-pointer rounded-full p-0 ring-offset-background hover:opacity-90 focus-visible:outline-none"
                      >
                        <Avatar className="size-9 border border-border">
                          <AvatarFallback className="bg-primary/10 font-semibold text-primary">
                            <User className="size-4" />
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="mt-1 w-56">
                      <DropdownMenuGroup>
                        <DropdownMenuLabel className="font-normal">
                          <div className="flex flex-col space-y-1">
                            <p className="text-sm leading-none font-medium text-foreground">
                              {user.name}
                            </p>
                            <p className="truncate text-xs leading-none text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </DropdownMenuLabel>
                      </DropdownMenuGroup>

                      <DropdownMenuSeparator />

                      <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                          <Link
                            href={userDashboardHref}
                            className="flex cursor-pointer items-center gap-2 py-2"
                          >
                            <LayoutDashboard className="size-4 text-muted-foreground" />
                            <span>Dashboard</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/profile"
                            className="flex cursor-pointer items-center gap-2 py-2"
                          >
                            <User className="size-4 text-muted-foreground" />
                            <span>Profile</span>
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        className="flex cursor-pointer items-center gap-2 py-2 text-destructive focus:bg-destructive/10 focus:text-destructive"
                        onClick={handleLogout}
                      >
                        <LogOut className="size-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="hidden items-center gap-2 md:flex">
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      size="lg"
                      className="cursor-pointer"
                    >
                      <LogIn size={15} className="mr-1.5" />
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button
                      size="lg"
                      className="cursor-pointer bg-[#00a17f] text-white shadow-sm hover:bg-[#00876a]"
                    >
                      <UserPlus size={15} className="mr-1.5" />
                      Register
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile hamburger button */}
              <button
                id="navbar-mobile-menu-btn"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle mobile menu"
                aria-expanded={mobileOpen}
                className="relative z-50 rounded-lg p-2 text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground md:hidden"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* ── Modern Mobile Off-Canvas Drawer Overlay ── */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity duration-300 md:hidden ${
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* ── Drawer Panel ── */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-40 flex w-[82vw] max-w-sm flex-col border-l border-border bg-background shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Top Header inside Drawer */}
        <div className="flex items-center justify-between border-b border-border/60 px-5 pt-5 pb-4">
          <RentNestLogo />
        </div>

        {/* Scrollable Content Container */}
        <div className="flex-1 space-y-6 overflow-y-auto px-4 py-4">
          {/* User Section (If Logged In) */}
          {user ? (
            <div className="space-y-3 rounded-2xl border border-border/80 bg-muted/30 p-3.5">
              <div className="flex items-center gap-3">
                <Avatar className="size-10 border border-border">
                  <AvatarFallback className="bg-[#00a17f]/10 font-semibold text-[#00a17f]">
                    {user.name ? (
                      user.name.charAt(0).toUpperCase()
                    ) : (
                      <User size={18} />
                    )}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {user.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  href={userDashboardHref}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-background px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <LayoutDashboard size={14} className="text-[#00a17f]" />
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-background px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <User size={14} className="text-[#00a17f]" />
                  Profile
                </Link>
              </div>
            </div>
          ) : null}

          {/* Nav Links List */}
          <div className="space-y-1">
            <p className="mb-2 px-3 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
              Menu
            </p>
            {NAV_LINKS.map(({ label, href, icon: Icon }) => {
              const isActive = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[#00a17f]/10 text-[#00a17f]"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      size={18}
                      className={
                        isActive ? "text-[#00a17f]" : "text-muted-foreground"
                      }
                    />
                    {label}
                  </div>
                  <ChevronRight
                    size={15}
                    className="text-muted-foreground/50"
                  />
                </Link>
              )
            })}
          </div>

          {/* Theme Quick Switcher inside Drawer */}
          <div className="space-y-1 border-t border-border/60 pt-2">
            <p className="mb-2 px-3 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
              Preferences
            </p>
            <button
              onClick={toggleTheme}
              className="flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <div className="flex items-center gap-3">
                {resolvedTheme === "dark" ? (
                  <Sun size={18} className="text-amber-400" />
                ) : (
                  <Moon size={18} className="text-indigo-400" />
                )}
                <span>Appearance</span>
              </div>
              <span className="rounded-md border border-border bg-muted px-2 py-0.5 text-xs text-muted-foreground capitalize">
                {resolvedTheme || "light"}
              </span>
            </button>
          </div>
        </div>

        {/* Drawer Bottom Actions (Auth Buttons / Sign Out) */}
        <div className="border-t border-border/60 bg-muted/20 p-4">
          {user ? (
            <button
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/20"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-muted"
              >
                <LogIn size={16} />
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#00a17f] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-[#00876a]"
              >
                <UserPlus size={16} />
                Register
              </Link>
            </div>
          )}
        </div>
      </aside>

      {/* Spacer so page content doesn't hide under fixed navbar */}
      <div className="h-16" aria-hidden="true" />
    </>
  )
}
