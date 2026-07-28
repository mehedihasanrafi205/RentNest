'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Building2, ShieldCheck, Zap } from 'lucide-react';

interface HeroSectionProps {
  title?: string;
  description?: string;
}

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
        className="text-xl font-bold tracking-tight text-white"
        style={{ fontFamily: "var(--font-sans, system-ui, sans-serif)" }}
      >
        Rent<span style={{ color: "#00a17f" }}>Nest</span>
      </span>
    </span>
  );
}

const features = [
  {
    icon: Zap,
    title: 'Quick & Smart Search',
    description: 'Find your desired rental property in seconds with modern filters.',
  },
  {
    icon: ShieldCheck,
    title: 'Verified Listings',
    description: 'All properties and landlords are thoroughly verified.',
  },
  {
    icon: Building2,
    title: 'Direct Connection',
    description: 'Seamless interaction between tenants and house owners.',
  },
];

export function HeroSection({
  title = 'Find Your Dream Space with RentNest',
  description = 'Join thousands of tenants and landlords managing rental properties effortlessly and securely.',
}: HeroSectionProps) {
  return (
    <div className="hidden lg:flex w-full lg:w-1/2 xl:w-5/12 flex-col justify-between p-10 lg:p-12 bg-[#0c1913] text-slate-100 border-r border-emerald-950/60 relative overflow-hidden">
      
      {/* Brand Color Ambient Glows */}
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full blur-[100px] pointer-events-none bg-[#00a17f]/20" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full blur-[100px] pointer-events-none bg-[#74ba85]/15" />

      {/* Header / Logo */}
      <div className="z-10">
        <Link href="/" className="inline-block transition-transform hover:scale-105">
          <RentNestLogo />
        </Link>
      </div>

      {/* Main Pitch & Features */}
      <div className="my-auto py-12 z-10 max-w-lg">
        <h2 className="text-3xl xl:text-4xl font-extrabold leading-tight mb-4 text-white text-balance">
          {title}
        </h2>
        <p className="text-base xl:text-lg text-slate-300 mb-10 leading-relaxed">
          {description}
        </p>

        {/* Feature List Cards */}
        <div className="space-y-4">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div 
                key={idx} 
                className="flex items-start gap-4 p-3.5 rounded-xl bg-white/4 border border-white/10 backdrop-blur-sm transition-all hover:bg-white/[0.07]"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-[#00a17f]/20 text-[#00a17f] border border-[#00a17f]/30">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-base">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-300/80 leading-snug">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer copyright */}
      <div className="text-xs text-slate-400 z-10">
        <p>© {new Date().getFullYear()} RentNest Platform. All rights reserved.</p>
      </div>
    </div>
  );
}