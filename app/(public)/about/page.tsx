"use client"

import React, { useState, useEffect, JSX } from "react"
import Image from "next/image"
import {
  ShieldCheck,
  Building2,
  Rocket,
  User,
  Building,
  Share2,
  Mail,
  ChevronRight,
} from "lucide-react"

// Types
interface StatCardProps {
  number: string
  label: string
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

interface TeamMemberProps {
  name: string
  role: string
  image: string
}

export default function AboutPage(): JSX.Element {
  const [isScrolled, setIsScrolled] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background font-sans text-foreground transition-colors duration-300 selection:bg-primary selection:text-primary-foreground">
      <main className="pt-24 md:pt-28">
        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
            <div className="space-y-6 text-center lg:text-left">
              <span className="inline-block rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-primary uppercase">
                Our Vision
              </span>
              <h1 className="text-4xl leading-[1.15] font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Redefining the Way You{" "}
                <span className="text-primary">Find Home</span>
              </h1>
              <p className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
                RentNest is built on reliability and transparency. We’ve
                eliminated the friction of property rentals for both tenants and
                landlords through modern digital precision.
              </p>
              <div className="flex flex-col justify-center gap-4 pt-2 sm:flex-row lg:justify-start">
                <button className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 active:scale-95">
                  Get Started <ChevronRight size={18} />
                </button>
                <button className="rounded-2xl border border-border bg-secondary px-8 py-4 font-semibold text-secondary-foreground transition-all hover:bg-secondary/80">
                  Learn More
                </button>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute -inset-1 rounded-[32px] bg-linear-to-r from-primary to-accent opacity-30 blur transition duration-1000 group-hover:opacity-50"></div>
              <div className="group relative h-96 overflow-hidden rounded-[30px] border border-border bg-card shadow-2xl sm:h-[480px]">
                <Image
                  src="/About-house.jpg"
                  alt="Modern Apartment Living Room"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="my-12 border-y border-border bg-muted/50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
            <StatCard number="10,000+" label="Happy Tenants" />
            <StatCard number="5,000+" label="Verified Listings" />
            <StatCard number="98%" label="Satisfaction Rate" />
          </div>
        </section>

        {/* Core Values / Mission */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
              A Mission Driven by Trust
            </h2>
            <p className="text-muted-foreground">
              We provide the framework for high-stakes decision making, ensuring
              every interaction is professional, secure, and simple.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <FeatureCard
              icon={<ShieldCheck className="h-6 w-6" />}
              title="Trust & Transparency"
              description="Every property and user is verified to maintain a safe and reliable marketplace for everyone involved."
            />
            <FeatureCard
              icon={<Building2 className="h-6 w-6" />}
              title="Verified Properties"
              description="Our property photography is verified, backed by data accuracy and rigorous on-site inspection standards."
            />
            <FeatureCard
              icon={<Rocket className="h-6 w-6" />}
              title="Effortless Management"
              description="From automated rent payments to instant landlord communication, we simplify your entire home journey."
            />
          </div>
        </section>

        {/* How It Works */}
        <section className="border-y border-border bg-muted/30 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-16 text-center text-3xl font-bold text-foreground sm:text-4xl">
              How RentNest Works
            </h2>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
              {/* Tenants Column */}
              <div className="rounded-3xl border border-border bg-card p-8 shadow-sm sm:p-10">
                <div className="mb-8 flex items-center gap-3">
                  <div className="rounded-2xl border border-primary/20 bg-primary/10 p-3 text-primary">
                    <User size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-card-foreground">
                    For Tenants
                  </h3>
                </div>

                <div className="relative space-y-8 border-l-2 border-border pl-6">
                  <StepItem
                    step="1"
                    title="Search"
                    desc="Explore thousands of verified listings with high-res photography and detailed filters."
                  />
                  <StepItem
                    step="2"
                    title="Tour"
                    desc="Book physical or virtual tours instantly through our integrated scheduling system."
                  />
                  <StepItem
                    step="3"
                    title="Rent"
                    desc="Apply online, sign lease agreements digitally, and move into your new home securely."
                  />
                </div>
              </div>

              {/* Landlords Column */}
              <div className="rounded-3xl border border-border bg-card p-8 shadow-sm sm:p-10">
                <div className="mb-8 flex items-center gap-3">
                  <div className="rounded-2xl border border-primary/20 bg-primary/10 p-3 text-primary">
                    <Building size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-card-foreground">
                    For Landlords
                  </h3>
                </div>

                <div className="relative space-y-8 border-l-2 border-border pl-6">
                  <StepItem
                    step="1"
                    title="List Property"
                    desc="Post your home easily using our professional listing creation and optimization tools."
                  />
                  <StepItem
                    step="2"
                    title="Get Verified"
                    desc="Get verified to boost trust and attract 3x more qualified rental applicants."
                  />
                  <StepItem
                    step="3"
                    title="Earn & Manage"
                    desc="Manage rent collection, tenant requests, and contracts seamlessly from one dashboard."
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
              The Team Behind RentNest
            </h2>
            <p className="text-muted-foreground">
              Meet the dedicated team members working hard to make renting a
              better experience for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <TeamMember
              name="Elena Vance"
              role="Founder & CEO"
              image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
            />
            <TeamMember
              name="Marcus Thorne"
              role="Head of Product"
              image="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80"
            />
            <TeamMember
              name="Sofia Chen"
              role="Creative Director"
              image="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80"
            />
            <TeamMember
              name="David Miller"
              role="CTO"
              image="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80"
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-linear-to-r from-primary to-primary/80 p-10 text-center text-primary-foreground shadow-xl sm:p-16">
            <div className="relative z-10 mx-auto max-w-2xl space-y-6">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
                Ready to Find Your Next Home?
              </h2>
              <p className="text-base opacity-90 sm:text-lg">
                Join thousands of happy tenants and landlords today on the most
                trusted property rental platform.
              </p>
              <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
                <button className="rounded-2xl bg-background px-8 py-4 font-bold text-foreground shadow-md transition-all hover:bg-background/90 active:scale-95">
                  Explore Properties
                </button>
                <button className="rounded-2xl border border-primary-foreground/30 bg-primary-foreground/10 px-8 py-4 font-bold text-primary-foreground transition-all hover:bg-primary-foreground/20 active:scale-95">
                  List Your Property
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

// Subcomponents
function StatCard({ number, label }: StatCardProps): JSX.Element {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
      <div className="mb-2 text-4xl font-extrabold text-primary sm:text-5xl">
        {number}
      </div>
      <div className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
        {label}
      </div>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps): JSX.Element {
  return (
    <div className="rounded-3xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-md">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="mb-3 text-xl font-bold text-card-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  )
}

function StepItem({
  step,
  title,
  desc,
}: {
  step: string
  title: string
  desc: string
}): JSX.Element {
  return (
    <div className="relative">
      <div className="absolute top-0.5 -left-[37px] flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
        {step}
      </div>
      <h4 className="mb-1 text-lg font-bold text-card-foreground">{title}</h4>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  )
}

function TeamMember({ name, role, image }: TeamMemberProps): JSX.Element {
  return (
    <div className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all hover:border-primary/50 hover:shadow-md">
      <div className="h-64 overflow-hidden">
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
      <div className="p-6">
        <h4 className="text-lg font-bold text-card-foreground">{name}</h4>
        <p className="mb-4 text-sm font-semibold text-primary">{role}</p>
        <div className="flex gap-2">
          <button className="rounded-full border border-border bg-muted p-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary">
            <Share2 size={16} />
          </button>
          <button className="rounded-full border border-border bg-muted p-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary">
            <Mail size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
