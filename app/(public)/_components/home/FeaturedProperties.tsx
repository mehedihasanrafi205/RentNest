"use client"

import React, { useState } from "react"
import { Heart, MapPin, Bed, Bath, Maximize2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { motion } from "framer-motion"

interface Property {
  id: string
  title: string
  price: string
  location: string
  beds: number
  baths: number
  sqft: string
  image: string
}

const FEATURED_PROPERTIES: Property[] = [
  {
    id: "1",
    title: "Modern Suburban Villa",
    price: "$2,400/mo",
    location: "Oak Ridge Estates, CA",
    beds: 4,
    baths: 3,
    sqft: "2,800",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA8cdpkmiPkG0WzaB8ykabYuvvXMuHdAwxRLtoNTG7iCVpMknQuLIgGf2GIxotHr3ZvBocgIinmvDFrg9vNHJD7mutdb_SZoCjnyS1O2cSJJSVr7icZ0kV1ViOnhDpIFOr2heThVaIdQyVdQEBgrd0iflpB6h4nKcmnw27dsexBWkKfGnl1YD2EAG4IOCPTVn8d0lvcZEYWoFkWwCJ2TsIpw5JU_wkaZ8WnddkwX43UhLQEGqoLo9lt",
  },
  {
    id: "2",
    title: "Industrial Chic Loft",
    price: "$3,200/mo",
    location: "Downtown District, NY",
    beds: 2,
    baths: 2,
    sqft: "1,500",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDBH01toLRUMJzGQVuHRqiVBkgmpXljmjYwboXt5kk0AMTaJZu4CDNGDTP3CjB1dxtmEPPpvbnQUXG50IQTQgRlyBSuaOhBdzn0VDRUGg_cs2ChT8pT3tWg4uVnh9DxLRA9KwxSAf36aOjKmnpD0DuIo0eDBwDVQ40KH8PsGo42xzehGSGD8o5jOGq_NcBZNnxOUWp_3CTjx9IbnqJ6O_lv4AEROtjK0ZElyQpa4zN8g6FAwUZRwKkn",
  },
  {
    id: "3",
    title: "Urban Sky Studio",
    price: "$1,850/mo",
    location: "Skyline Heights, IL",
    beds: 1,
    baths: 1,
    sqft: "650",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDIy8OUku5hwcd_napB2gQ6CMpytpeDkzl2F-pKnws0nTBDIFAO9H-9GRN-8syhwSOx9L4SlvRE3gxpwDxmrVz4JLF7KJdOZVVGqCaqv6SiSh0P4EnzPiyorjCbYzi5Ln5QrhANvo9_3dsCzeloSwENvOkjglh5xlPhUZbjmH5KemGkleFmzNVjAgaYiiu0DlNf_Gap2e8T99EyYzs51Qo2sLdWVlee2Hk6oLhvrcsalptDchCDXpSW",
  },
]

export function FeaturedProperties() {
  const [favorites, setFavorites] = useState<string[]>([])

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
            Handpicked luxury listings selected for quality and value.
          </p>
        </div>
        <Button
          variant="ghost"
          className="gap-2 font-semibold text-primary hover:bg-primary/10 hover:text-primary"
        >
          <span>View all listings</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {FEATURED_PROPERTIES.map((property, index) => {
          const isFav = favorites.includes(property.id)
          return (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
            <Card
              className="group flex flex-col overflow-hidden rounded-2xl border-border p-0 shadow-sm transition-all duration-300 hover:shadow-xl"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden bg-muted">
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <Badge className="absolute top-4 left-4 bg-primary px-3 py-1 text-sm font-bold text-primary-foreground shadow-md hover:bg-primary">
                  {property.price}
                </Badge>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => toggleFavorite(property.id)}
                  aria-label="Add to favorites"
                  className={`absolute top-4 right-4 rounded-full backdrop-blur-md transition-all duration-200 ${
                    isFav
                      ? "text-destructive-foreground bg-destructive hover:bg-destructive/90"
                      : "bg-black/30 text-white hover:bg-white hover:text-destructive"
                  }`}
                >
                  <Heart className={`h-4 w-4 ${isFav ? "fill-current" : ""}`} />
                </Button>
              </div>

              {/* Card Details */}
              <CardContent className="flex flex-1 flex-col p-6 pb-4">
                <h3 className="mb-2 text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                  {property.title}
                </h3>
                <div className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0 text-primary" />
                  <span>{property.location}</span>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-2 border-t border-b border-border py-4 text-xs font-medium text-muted-foreground sm:text-sm">
                  <div className="flex items-center gap-1.5">
                    <Bed className="h-4 w-4 text-primary" />
                    <span>{property.beds} Bed</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Bath className="h-4 w-4 text-primary" />
                    <span>{property.baths} Bath</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Maximize2 className="h-4 w-4 text-primary" />
                    <span>{property.sqft} sqft</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="mt-auto p-6 pt-0">
                <Button
                  variant="outline"
                  className="h-11 w-full rounded-xl border-2 border-primary font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
