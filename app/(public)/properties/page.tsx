import React, { Suspense } from "react";
import AllProperties from "../_components/properties/AllProperties";
import PropertiesSearchAndFilter from "../_components/properties/PropertiesSearchBar";
import PropertiesSkeleton from "../_components/properties/PropertiesSkeleton";


interface PropertiesPageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

const PropertiesPage = async ({ searchParams }: PropertiesPageProps) => {

  const resolvedSearchParams = searchParams ? await searchParams : {};

  return (
    <main className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Heading Banner */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
          Properties Collection
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
          Find Your Perfect Home
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Browse through our curated list of luxury properties, apartments, and modern homes available for rent or purchase.
        </p>
      </div>

      {/* Filter Bar */}
      <PropertiesSearchAndFilter />

      {/* Properties List with Suspense Fallback */}
      <Suspense
        key={JSON.stringify(resolvedSearchParams)}
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <PropertiesSkeleton key={index} />
            ))}
          </div>
        }
      >
        <AllProperties searchParams={resolvedSearchParams} />
      </Suspense>
    </main>
  );
};

export default PropertiesPage;