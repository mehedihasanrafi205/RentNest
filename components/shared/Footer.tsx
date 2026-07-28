import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  Home,
  Info,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Shield,
  FileText,
  HelpCircle,
} from "lucide-react";

/* ─── Brand SVG Icons (lucide doesn't include social brand icons) ─── */
function IconFacebook({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function IconTwitter({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function IconInstagram({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="17.5" cy="6.5" r="1" />
    </svg>
  );
}
function IconLinkedin({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
function IconYoutube({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
    </svg>
  );
}

/* ─── Logo: real SVG + wordmark ─── */
function RentNestLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-end gap-2 ${className}`}>
      <Image
        src="/logo-icon.svg"
        alt="RentNest icon"
        width={40}
        height={40}
        className="h-10 w-10 object-contain"
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

/* ─── Data ─── */
const QUICK_LINKS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Properties", href: "/properties", icon: Building2 },
  { label: "About Us", href: "/about", icon: Info },
  { label: "Contact", href: "/contact", icon: Mail },
];

const TENANT_LINKS = [
  { label: "Browse Listings", href: "/properties" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Rental Requests", href: "/dashboard/tenant" },
  { label: "Payment History", href: "/dashboard/tenant/payments" },
  { label: "Leave a Review", href: "/dashboard/tenant/reviews" },
];

const LANDLORD_LINKS = [
  { label: "List a Property", href: "/dashboard/landlord/properties/new" },
  { label: "Manage Listings", href: "/dashboard/landlord/properties" },
  { label: "Rental Requests", href: "/dashboard/landlord/requests" },
  { label: "Tenant History", href: "/dashboard/landlord/tenants" },
  { label: "Earnings", href: "/dashboard/landlord/earnings" },
];

const SOCIAL_LINKS = [
  { icon: IconFacebook, href: "#", label: "Facebook" },
  { icon: IconTwitter, href: "#", label: "Twitter / X" },
  { icon: IconInstagram, href: "#", label: "Instagram" },
  { icon: IconLinkedin, href: "#", label: "LinkedIn" },
  { icon: IconYoutube, href: "#", label: "YouTube" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy", icon: Shield },
  { label: "Terms of Service", href: "/terms", icon: FileText },
  { label: "Help Center", href: "/help", icon: HelpCircle },
];

/* ─── Footer column heading ─── */
function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-semibold text-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
      <span className="inline-block w-4 h-0.5 bg-primary rounded-full" />
      {children}
    </h3>
  );
}

/* ─── Animated footer link ─── */
function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="
          group flex items-center gap-1.5 text-sm text-muted-foreground
          hover:text-primary transition-colors duration-200
        "
      >
        <ArrowRight
          size={12}
          className="shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
        />
        {children}
      </Link>
    </li>
  );
}

/* ───────────────────────────────────────────────────────── */
export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 mt-auto">
      {/* ── Top gradient strip ── */}
      <div
        className="h-1 w-full"
        style={{
          background:
            "linear-gradient(90deg, #00a17f 0%, #74ba85 50%, #bad694 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Main content ── */}
      <div className="container mx-auto px-4 lg:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* ── Column 1: Brand ── */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-4">
            <Link href="/" id="footer-logo" className="inline-block">
              <RentNestLogo className="h-9 w-auto text-foreground" />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Bangladesh&apos;s most trusted rental marketplace. Find your
              perfect home or list your property with ease.
            </p>

            {/* Contact info */}
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin size={15} className="mt-0.5 shrink-0 text-primary" />
                <span>Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone size={15} className="shrink-0 text-primary" />
                <a
                  href="tel:+8801700000000"
                  className="hover:text-primary transition-colors"
                >
                  +880 1700-000000
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail size={15} className="shrink-0 text-primary" />
                <a
                  href="mailto:support@rentnest.com"
                  className="hover:text-primary transition-colors"
                >
                  support@rentnest.com
                </a>
              </li>
            </ul>

            {/* Social links */}
            <div className="flex items-center gap-2 pt-1">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex items-center justify-center w-8 h-8 rounded-lg
                    border border-border text-muted-foreground
                    hover:text-primary hover:border-primary/50 hover:bg-primary/8
                    transition-all duration-200
                  "
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Column 2: Quick Links ── */}
          <div>
            <FooterHeading>Quick Links</FooterHeading>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map(({ label, href, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="
                      group flex items-center gap-2 text-sm text-muted-foreground
                      hover:text-primary transition-colors duration-200
                    "
                  >
                    <Icon
                      size={14}
                      className="shrink-0 text-primary/60 group-hover:text-primary transition-colors"
                    />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 3: For Tenants ── */}
          <div>
            <FooterHeading>For Tenants</FooterHeading>
            <ul className="space-y-2.5">
              {TENANT_LINKS.map(({ label, href }) => (
                <FooterLink key={href} href={href}>
                  {label}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* ── Column 4: For Landlords ── */}
          <div>
            <FooterHeading>For Landlords</FooterHeading>
            <ul className="space-y-2.5">
              {LANDLORD_LINKS.map(({ label, href }) => (
                <FooterLink key={href} href={href}>
                  {label}
                </FooterLink>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 lg:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Copyright */}
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-foreground">RentNest</span>. All
            rights reserved. Made with{" "}
            <span className="text-primary" aria-hidden="true">
              ♥
            </span>{" "}
            in Bangladesh.
          </p>

          {/* Legal links */}
          <div className="flex items-center gap-4">
            {LEGAL_LINKS.map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="
                  flex items-center gap-1 text-xs text-muted-foreground
                  hover:text-primary transition-colors duration-200
                "
              >
                <Icon size={12} />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}