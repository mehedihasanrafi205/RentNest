"use client";

import React, { useState } from "react";
import { Heart, MapPin, Bed, Bath, Maximize2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  beds: number;
  baths: number;
  sqft: string;
  image: string;
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
];

export function FeaturedProperties() {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4 border-b border-border pb-6">
        <div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
            Featured Properties
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-2">
            Handpicked luxury listings selected for quality and value.
          </p>
        </div>
        <Button variant="ghost" className="text-primary font-semibold gap-2 hover:bg-primary/10 hover:text-primary">
          <span>View all listings</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {FEATURED_PROPERTIES.map((property) => {
          const isFav = favorites.includes(property.id);
          return (
            <Card
              key={property.id}
              className="rounded-2xl border-border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col p-0"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden bg-muted">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground font-bold px-3 py-1 text-sm shadow-md hover:bg-primary">
                  {property.price}
                </Badge>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => toggleFavorite(property.id)}
                  aria-label="Add to favorites"
                  className={`absolute top-4 right-4 rounded-full backdrop-blur-md transition-all duration-200 ${
                    isFav
                      ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      : "bg-black/30 text-white hover:bg-white hover:text-destructive"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFav ? "fill-current" : ""}`} />
                </Button>
              </div>

              {/* Card Details */}
              <CardContent className="p-6 flex flex-col flex-1 pb-4">
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {property.title}
                </h3>
                <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-6">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <span>{property.location}</span>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-border text-xs sm:text-sm text-muted-foreground font-medium">
                  <div className="flex items-center gap-1.5">
                    <Bed className="w-4 h-4 text-primary" />
                    <span>{property.beds} Bed</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Bath className="w-4 h-4 text-primary" />
                    <span>{property.baths} Bath</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Maximize2 className="w-4 h-4 text-primary" />
                    <span>{property.sqft} sqft</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0 mt-auto">
                <Button
                  variant="outline"
                  className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold rounded-xl h-11"
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
}   