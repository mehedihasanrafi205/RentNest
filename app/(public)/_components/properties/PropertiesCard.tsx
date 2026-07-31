"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Bath, Square, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export interface Property {
  _id?: string;
  id?: string | number;
  title: string;
  description?: string;
  price: number;
  location: string;
  propertyType?: string;
  bedrooms?: number;
  bathrooms?: number;
  areaSqFt?: number;
  images?: string[];
  isFeatured?: boolean;
}

interface PropertiesCardProps {
  property: Property;
}

const PropertiesCard = ({ property }: PropertiesCardProps) => {
  const propertyId = property._id || property.id;
  const imageUrl =
    property.images && property.images.length > 0
      ? property.images[0]
      : "/About-house.jpg"; // Fallback Image from public directory

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="group h-full flex flex-col overflow-hidden rounded-3xl border-border/60 bg-card shadow-md hover:shadow-xl transition-all duration-300">
        {/* Image Container */}
        <div className="relative h-60 w-full overflow-hidden bg-muted">
          <Image
            src={imageUrl}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-80" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {property.propertyType && (
              <Badge className="bg-background/80 text-foreground backdrop-blur-md hover:bg-background border-none font-medium text-xs px-3 py-1 rounded-full">
                {property.propertyType}
              </Badge>
            )}
            {property.isFeatured && (
              <Badge variant="default" className="bg-primary text-primary-foreground font-medium text-xs px-3 py-1 rounded-full">
                Featured
              </Badge>
            )}
          </div>

          {/* Price Overlay */}
          <div className="absolute bottom-4 left-4 text-white">
            <span className="text-2xl font-black tracking-tight">
              ${property.price ? property.price.toLocaleString() : "N/A"}
            </span>
            <span className="text-xs text-white/80 font-normal"> / month</span>
          </div>
        </div>

        {/* Content */}
        <CardContent className="flex-1 p-5 flex flex-col justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
              {property.title}
            </h3>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
              <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="line-clamp-1">{property.location || "Location not specified"}</span>
            </p>
          </div>

          {/* Property Features */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border/50 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-primary/80" />
              <span>{property.bedrooms ?? 3} Beds</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-primary/80" />
              <span>{property.bathrooms ?? 2} Baths</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Square className="w-4 h-4 text-primary/80" />
              <span>{property.areaSqFt ?? 1200} sqft</span>
            </div>
          </div>
        </CardContent>

        {/* Footer */}
        <CardFooter className="p-5 pt-0">
          <Button asChild className="w-full rounded-xl gap-2 shadow-sm font-medium">
            <Link href={`/properties/${propertyId}`}>
              View Details
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PropertiesCard;