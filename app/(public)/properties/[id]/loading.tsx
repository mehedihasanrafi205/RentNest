import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const IndividualHousePageLoading = () => {
  return (
    <main className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-pulse">
      {/* Back Button Skeleton */}
      <div className="mb-6">
        <Skeleton className="h-10 w-40 rounded-xl" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Media & Details */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Header Info Skeleton */}
          <div className="space-y-3">
            <div className="flex gap-2">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <Skeleton className="h-10 w-3/4 sm:w-2/3 rounded-xl" />
            <Skeleton className="h-5 w-1/2 rounded-lg" />
          </div>

          {/* Main Image Container Skeleton */}
          <Skeleton className="w-full h-87.5 sm:h-120 rounded-3xl" />

          {/* Key Features / Specs Bar Skeleton */}
          <div className="grid grid-cols-3 gap-4 p-4 sm:p-6 bg-card/50 border border-border/80 rounded-2xl">
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
              <div className="space-y-1.5 w-full">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-5 w-8" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
              <div className="space-y-1.5 w-full">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-5 w-8" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
              <div className="space-y-1.5 w-full">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-5 w-16" />
              </div>
            </div>
          </div>

          {/* Description Section Skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-7 w-48 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-11/12 rounded" />
              <Skeleton className="h-4 w-4/5 rounded" />
            </div>
          </div>

          {/* Amenities Skeleton */}
          <div className="space-y-4 pt-4 border-t border-border/60">
            <Skeleton className="h-7 w-52 rounded-lg" />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-6 w-full rounded-lg" />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Pricing & Contact Sidebar Skeleton */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 bg-card/50 border border-border/80 rounded-3xl p-6 space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-9 w-32 rounded-xl" />
            </div>

            <hr className="border-border/60" />

            {/* Agent / Contact Card Skeleton */}
            <div className="space-y-4">
              <Skeleton className="h-6 w-48 rounded-lg" />
              <Skeleton className="h-4 w-full rounded" />

              <div className="space-y-2 pt-2">
                <Skeleton className="h-11 w-full rounded-2xl" />
                <Skeleton className="h-11 w-full rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default IndividualHousePageLoading;