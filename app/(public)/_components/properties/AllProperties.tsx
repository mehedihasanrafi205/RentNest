import React from "react";
import { Building2 } from "lucide-react";

import PropertiesCard, { Property } from "./PropertiesCard";
import { getAllPropertiesAction } from "../../_action/getAllProperties";

interface AllPropertiesProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const AllProperties = async ({ searchParams }: AllPropertiesProps) => {
  const response = await getAllPropertiesAction(
    searchParams as Record<string, string>
  );

  const properties: Property[] =
    response?.success && Array.isArray(response.data) ? response.data : [];

  return (
    <section className="py-8">
      {properties.length === 0 ? (
        <div className="min-h-75 flex flex-col items-center justify-center p-8 text-center border border-dashed border-border rounded-3xl bg-muted/30">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
            <Building2 className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-foreground">
            No Properties Found
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm mt-1">
            We couldn&apos;t find any properties matching your criteria at the moment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {properties.map((property) => (
            <PropertiesCard
              key={property._id || property.id}
              property={property}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default AllProperties;