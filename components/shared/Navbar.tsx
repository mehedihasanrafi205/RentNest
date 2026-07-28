"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
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
} from "lucide-react";

import type { IUser } from "@/types";
import { getMe } from "@/service/getme";
import { logoutAction } from "@/app/(auth)/_action/auth";

// Shadcn UI Imports
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  /* Fetch Logged-in User Info */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getMe();
        setUser(currentUser);
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

  const handleLogout = async () => {
    await logoutAction();
    setUser(null);
    setMobileOpen(false);
    router.push("/login");
    router.refresh();
  };

  // Dynamic user menu items array based on user role
  const userMenuGroups = [
    [
      {
        label: "Dashboard",
        href: `/dashboard/${user?.role?.toLowerCase() || "user"}`,
        icon: LayoutDashboard,
      },
      {
        label: "Profile",
        href: "/profile",
        icon: User,
      },
    ],
  ];

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
              {loading ? (
                <div className="h-9 w-9 bg-muted/50 animate-pulse rounded-full hidden md:block" />
              ) : user ? (
                /* ── Logged-in Avatar Dropdown (Shadcn UI) ── */
                <div className="hidden md:block">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="relative size-9 rounded-full p-0 cursor-pointer"
                      >
                        <Avatar className="size-9">
                          <AvatarImage src={user?.image || ""} alt={user.name} />
                          <AvatarFallback className="bg-[#00a17f] text-white font-bold">
                            {user.name ? user.name[0].toUpperCase() : "U"}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>
                          <div className="flex flex-col gap-0.5">
                            <span className="text-sm font-medium text-foreground truncate">
                              {user.name}
                            </span>
                            <span className="text-xs font-normal text-muted-foreground truncate">
                              {user.email}
                            </span>
                          </div>
                        </DropdownMenuLabel>
                      </DropdownMenuGroup>

                      <DropdownMenuSeparator />

                      {userMenuGroups.map((group, groupIndex) => (
                        <div key={groupIndex}>
                          <DropdownMenuGroup>
                            {group.map((item) => (
                              <DropdownMenuItem key={item.label} asChild>
                                <Link href={item.href} className="flex items-center gap-2 cursor-pointer">
                                  <item.icon className="size-4 text-muted-foreground" />
                                  <span>{item.label}</span>
                                </Link>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuGroup>
                          <DropdownMenuSeparator />
                        </div>
                      ))}

                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive cursor-pointer flex items-center gap-2"
                        onClick={handleLogout}
                      >
                        <LogOut className="size-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                /* ── Guest Login/Register buttons ── */
                <div className="hidden md:flex items-center gap-2">
                  <Link href="/login">
                    <Button variant="outline" size="sm" className="cursor-pointer">
                      <LogIn size={15} className="mr-1.5" />
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button
                      size="sm"
                      className="bg-[#00a17f] hover:bg-[#00876a] text-white cursor-pointer"
                    >
                      <UserPlus size={15} className="mr-1.5" />
                      Register
                    </Button>
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

            {/* Auth section for Mobile */}
            {user ? (
              <>
                <div className="px-4 py-2 bg-muted/40 rounded-xl mb-1">
                  <p className="text-xs text-muted-foreground">Signed in as</p>
                  <p className="text-sm font-semibold">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <Link
                  href={`/dashboard/${user.role?.toLowerCase() || "user"}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-primary/8 transition-colors"
                >
                  <LayoutDashboard size={17} className="text-primary" />
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-primary/8 transition-colors"
                >
                  <User size={17} className="text-primary" />
                  Profile
                </Link>
                <button
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/8 transition-colors w-full text-left"
                  onClick={handleLogout}
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
                    bg-[#00a17f] text-white hover:bg-[#00876a] transition-all duration-200
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
    </>
  );
}