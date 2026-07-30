"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal, RotateCcw, Loader2 } from "lucide-react";

const PROPERTY_TYPES = [
  "All Types",
  "Apartment",
  "House",
  "Villa",
  "Commercial",
  "Studio",
];

const PropertiesSearchAndFilter = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  // Local state initialized from URL search params
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("searchTerm") || ""
  );
  const [propertyType, setPropertyType] = useState(
    searchParams.get("propertyType") || "All Types"
  );
  const [minPrice, setMinPrice] = useState(
    searchParams.get("minPrice") || ""
  );
  const [maxPrice, setMaxPrice] = useState(
    searchParams.get("maxPrice") || ""
  );

  // Helper to apply filters by updating URL params
  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (searchTerm.trim()) {
      params.set("searchTerm", searchTerm.trim());
    } else {
      params.delete("searchTerm");
    }

    if (propertyType && propertyType !== "All Types") {
      params.set("propertyType", propertyType);
    } else {
      params.delete("propertyType");
    }

    if (minPrice) {
      params.set("minPrice", minPrice);
    } else {
      params.delete("minPrice");
    }

    if (maxPrice) {
      params.set("maxPrice", maxPrice);
    } else {
      params.delete("maxPrice");
    }

    // Reset pagination to page 1 if applicable
    params.delete("page");

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  // Clear all filters
  const handleReset = () => {
    setSearchTerm("");
    setPropertyType("All Types");
    setMinPrice("");
    setMaxPrice("");

    startTransition(() => {
      replace(pathname);
    });
  };

  return (
    <div className="w-full bg-card/80 backdrop-blur-xl border border-border/80 rounded-3xl p-4 sm:p-6 shadow-lg mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 items-center">
        
        {/* Search Input */}
        <div className="lg:col-span-4 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by title, location, city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleApplyFilters()}
            className="pl-10 h-11 rounded-2xl bg-background/50 border-border/60 focus:bg-background transition-colors"
          />
        </div>

        {/* Property Type Dropdown */}
        <div className="lg:col-span-3">
          <Select
            value={propertyType}
            onValueChange={(value) => setPropertyType(value)}
          >
            <SelectTrigger className="h-11 rounded-2xl bg-background/50 border-border/60 focus:bg-background">
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl">
              {PROPERTY_TYPES.map((type) => (
                <SelectItem key={type} value={type} className="rounded-xl">
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Inputs */}
        <div className="lg:col-span-3 grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="h-11 rounded-2xl bg-background/50 border-border/60 focus:bg-background"
          />
          <Input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="h-11 rounded-2xl bg-background/50 border-border/60 focus:bg-background"
          />
        </div>

        {/* Filter Action Buttons */}
        <div className="lg:col-span-2 flex items-center gap-2">
          <Button
            onClick={handleApplyFilters}
            disabled={isPending}
            className="flex-1 h-11 rounded-2xl gap-2 font-medium shadow-md"
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <SlidersHorizontal className="w-4 h-4" />
            )}
            Filter
          </Button>

          <Button
            onClick={handleReset}
            variant="outline"
            size="icon"
            className="h-11 w-11 shrink-0 rounded-2xl border-border/60"
            title="Reset Filters"
          >
            <RotateCcw className="w-4 h-4 text-muted-foreground" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertiesSearchAndFilter;