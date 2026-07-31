"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, MapPin, Bed, Bath, Square, ArrowRight, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { getAllPropertiesAction } from "../../_action/getAllProperties"
import { Skeleton } from "@/components/ui/skeleton"

interface Property {
  _id?: string
  id?: string
  title: string
  price: number
  location: string
  bedrooms?: number
  bathrooms?: number
  areaSqFt?: number
  images?: string[]
  isFeatured?: boolean
  propertyType?: string
  status?: string
}

export function FeaturedProperties() {
  const [favorites, setFavorites] = useState<string[]>([])
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllPropertiesAction({ limit: "6" }).then((res) => {
      if (res.success && Array.isArray(res.data)) {
        setProperties(res.data.slice(0, 6))
      }
      setLoading(false)
    })
  }, [])

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 flex flex-col items-start justify-between gap-4 border-b border-border pb-6 md:flex-row md:items-end"
      >
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
            Featured Properties
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Handpicked listings selected for quality and value.
          </p>
        </div>
        <Button
          asChild
          variant="ghost"
          className="gap-2 font-semibold text-primary hover:bg-primary/10 hover:text-primary"
        >
          <Link href="/properties">
            <span>View all listings</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </motion.div>

      {/* Skeleton Loading */}
      {loading && (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden border border-border">
              <Skeleton className="h-64 w-full" />
              <div className="p-6 space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-10 w-full mt-4" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && properties.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border p-16 text-center">
          <Building2 className="h-12 w-12 text-muted-foreground/40 mb-3" />
          <p className="text-muted-foreground font-medium">No properties found.</p>
        </div>
      )}

      {/* Cards Grid */}
      {!loading && properties.length > 0 && (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property, index) => {
            const propertyId = property._id || property.id
            const imageUrl = property.images?.[0] || "/About-house.jpg"
            const isFav = favorites.includes(propertyId || "")

            return (
              <motion.div
                key={propertyId}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group flex flex-col overflow-hidden rounded-2xl border-border p-0 shadow-sm transition-all duration-300 hover:shadow-xl">
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden bg-muted">
                    <div className="relative h-full w-full overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={property.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <Badge className="absolute top-4 left-4 bg-primary px-3 py-1 text-sm font-bold text-primary-foreground shadow-md hover:bg-primary">
                      ${property.price?.toLocaleString()}/mo
                    </Badge>
                    <button
                      onClick={() => toggleFavorite(propertyId || "")}
                      aria-label="Toggle favorite"
                      className={`absolute top-4 right-4 rounded-full p-2 backdrop-blur-md transition-all duration-200 ${
                        isFav
                          ? "bg-red-500 text-white"
                          : "bg-black/30 text-white hover:bg-white hover:text-red-500"
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${isFav ? "fill-current" : ""}`} />
                    </button>
                  </div>

                  {/* Card Details */}
                  <CardContent className="flex flex-1 flex-col p-6 pb-4">
                    <h3 className="mb-2 text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                      {property.title}
                    </h3>
                    <div className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 shrink-0 text-primary" />
                      <span className="line-clamp-1">{property.location}</span>
                    </div>

                    {/* Specs */}
                    <div className="grid grid-cols-3 gap-2 border-t border-b border-border py-4 text-xs font-medium text-muted-foreground sm:text-sm">
                      <div className="flex items-center gap-1.5">
                        <Bed className="h-4 w-4 text-primary" />
                        <span>{property.bedrooms ?? "N/A"} Bed</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Bath className="h-4 w-4 text-primary" />
                        <span>{property.bathrooms ?? "N/A"} Bath</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Square className="h-4 w-4 text-primary" />
                        <span>{property.areaSqFt ?? "N/A"} sqft</span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="mt-auto p-6 pt-0">
                    <Button
                      asChild
                      variant="outline"
                      className="h-11 w-full rounded-xl border-2 border-primary font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <Link href={`/properties/${propertyId}`}>View Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )
          })}
        </div>
      )}
    </section>
  )
}
