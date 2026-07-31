import React from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  Building2,
  MapPin,
  Bed,
  Bath,
  Square,
  ArrowLeft,
  CheckCircle2,
  PhoneCall,
  Mail,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { getIndividualPropertyAction } from "../../_action/getIndividualProperty"
import BookingButton from "../../_components/properties/BookingButton"

interface PropertyDetailPageProps {
  params: Promise<{ id: string }>
}

const IndividualPropertyPage = async ({ params }: PropertyDetailPageProps) => {
  const { id } = await params

  const response = await getIndividualPropertyAction(id)

  if (!response?.success || !response?.data) {
    notFound()
  }

  const property = response.data
  const targetPropertyId = property._id || property.id || id

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button
          variant="ghost"
          asChild
          className="gap-2 rounded-xl text-muted-foreground hover:text-foreground"
        >
          <Link href="/properties">
            <ArrowLeft className="h-4 w-4" /> Back to Properties
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Media & Details */}
        <div className="space-y-8 lg:col-span-8">
          {/* Header Info */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wider text-primary uppercase">
                {property.propertyType || "Property"}
              </span>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold tracking-wider text-emerald-600 uppercase">
                {property.status || "For Rent"}
              </span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              {property.title}
            </h1>

            <div className="flex items-center gap-2 text-sm text-muted-foreground sm:text-base">
              <MapPin className="h-4 w-4 shrink-0 text-primary" />
              <span>
                {property.location ||
                  property.address ||
                  "Location not specified"}
              </span>
            </div>
          </div>

          {/* Main Image Container */}
          <div className="relative h-87.5 w-full overflow-hidden rounded-3xl border border-border bg-muted sm:h-120">
            {property.images?.[0] || property.image ? (
              <Image
                src={property.images?.[0] || property.image}
                alt={property.title || "Property Image"}
                fill
                priority
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center text-muted-foreground">
                <Building2 className="mb-2 h-12 w-12" />
                <span>No Image Available</span>
              </div>
            )}
          </div>

          {/* Key Features / Specs Bar */}
          <div className="grid grid-cols-3 gap-4 rounded-2xl border border-border/80 bg-card p-4 shadow-xs sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Bed className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Bedrooms
                </p>
                <p className="text-base font-bold text-foreground">
                  {property.bedrooms || property.beds || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Bath className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Bathrooms
                </p>
                <p className="text-base font-bold text-foreground">
                  {property.bathrooms || property.baths || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Square className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Area
                </p>
                <p className="text-base font-bold text-foreground">
                  {property.area ? `${property.area} sqft` : "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">
              About this property
            </h2>
            <p className="text-sm leading-relaxed whitespace-pre-line text-muted-foreground sm:text-base">
              {property.description ||
                "No description provided for this property."}
            </p>
          </div>

          {/* Amenities / Features List */}
          {property.amenities && property.amenities.length > 0 && (
            <div className="space-y-4 border-t border-border pt-4">
              <h2 className="text-xl font-bold text-foreground">
                Amenities & Features
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {property.amenities.map((item: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Pricing & Contact Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 space-y-6 rounded-3xl border border-border/80 bg-card p-6 shadow-lg">
            <div>
              <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                Price
              </span>
              <div className="mt-1 text-3xl font-black text-primary">
                ${property.price?.toLocaleString()}
                <span className="text-sm font-normal text-muted-foreground">
                  {" "}
                  / month
                </span>
              </div>
            </div>

            <hr className="border-border/60" />

            {/* Agent / Contact & Booking Actions */}
            <div className="space-y-4">
              <h3 className="font-bold text-foreground">
                Interested in this property?
              </h3>
              <p className="text-xs text-muted-foreground">
                Book directly now or contact us for further inspection.
              </p>

              <div className="space-y-2.5">
                {/* 1. New Dynamic Booking Button */}
                <BookingButton propertyId={targetPropertyId} />

                {/* 2. Secondary Contact Options */}
                <Button variant="outline" className="h-11 w-full gap-2 rounded-2xl border-border/80 font-medium">
                  <PhoneCall className="h-4 w-4" /> Contact Agent
                </Button>
                <Button
                  variant="ghost"
                  className="h-11 w-full gap-2 rounded-2xl font-medium"
                >
                  <Mail className="h-4 w-4" /> Send Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default IndividualPropertyPage