"use client"

import React, { useState } from "react"
import { Search, MapPin, Home as HomeIcon, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function HeroSection() {
  const [location, setLocation] = useState("")
  const [propertyType, setPropertyType] = useState("apartment")
  const [priceRange, setPriceRange] = useState("500-1500")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ location, propertyType, priceRange })
  }

  return (
    <section className="relative flex h-auto min-h-[85vh] items-center justify-center overflow-hidden px-4 py-20 text-center sm:px-8">
      {/* Background Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="h-full w-full scale-105 bg-cover bg-center transition-transform duration-1000"
          style={{
            backgroundImage: "url('/Hero-bg.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-black/70" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 text-center">
        <h1 className="mb-4 text-3xl leading-tight font-extrabold tracking-tight text-white drop-shadow-sm sm:text-5xl md:text-6xl">
          Find Your Next Dream Home Effortlessly
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed font-normal text-white/90 sm:text-lg md:text-xl">
          Discover the perfect rental with verified listings and secure booking.
        </p>

        {/* Search Bar Container */}
        <form
          onSubmit={handleSearch}
          className="mx-auto flex w-full max-w-4xl flex-col items-center gap-2 rounded-2xl border border-border/80 bg-card/95 p-2 text-card-foreground shadow-2xl backdrop-blur-md transition-all duration-200 md:flex-row md:rounded-full"
        >
          <div className="grid w-full flex-1 grid-cols-1 divide-y divide-border/60 md:grid-cols-3 md:divide-x md:divide-y-0">
            {/* Location Field */}
            <div className="flex items-center gap-3 rounded-xl px-5 py-2.5 text-left transition-colors hover:bg-muted/50 md:rounded-l-full">
              <MapPin className="h-5 w-5 shrink-0 text-primary" />
              <div className="w-full min-w-0">
                <label className="mb-0.5 block text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                  Location
                </label>
                <Input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Where are you going?"
                  className="h-6 border-0 bg-transparent p-2 text-sm font-medium shadow-none placeholder:text-muted-foreground/60 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            </div>

            {/* Property Type Field */}
            <div className="flex items-center gap-3 px-5 py-2.5 text-left transition-colors hover:bg-muted/50">
              <HomeIcon className="h-5 w-5 shrink-0 text-primary" />
              <div className="w-full min-w-0">
                <label className="mb-0.5 block text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                  Property Type
                </label>
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger className="h-6 border-0 bg-transparent p-3 text-sm font-medium shadow-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 [&>svg]:ml-auto [&>svg]:opacity-50">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">Family House</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                    <SelectItem value="loft">Loft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Price Range Field */}
            <div className="flex items-center gap-3 rounded-xl px-5 py-2.5 text-left transition-colors hover:bg-muted/50 md:rounded-r-none">
              <DollarSign className="h-5 w-5 shrink-0 text-primary" />
              <div className="w-full min-w-0">
                <label className="mb-0.5 block text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                  Price Range
                </label>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="h-6 border-0 bg-transparent p-3 text-sm font-medium shadow-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 [&>svg]:ml-auto [&>svg]:opacity-50">
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="500-1500">$500 - $1,500</SelectItem>
                    <SelectItem value="1500-3000">$1,500 - $3,000</SelectItem>
                    <SelectItem value="3000+">$3,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-xl px-7 font-semibold shadow-md transition-all active:scale-[0.98] md:w-auto md:rounded-full"
          >
            <Search className="h-4 w-4" />
            <span>Search</span>
          </Button>
        </form>
      </div>
    </section>
  )
}
