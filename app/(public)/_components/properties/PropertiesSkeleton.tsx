import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const PropertiesSkeleton = () => {
  return (
    <Card className="h-full flex flex-col overflow-hidden rounded-3xl border-border/60 bg-card shadow-sm">
      {/* Image Skeleton */}
      <Skeleton className="h-60 w-full rounded-none" />

      <CardContent className="p-5 flex flex-col gap-4">
        {/* Title & Location Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4 rounded-lg" />
          <Skeleton className="h-4 w-1/2 rounded-lg" />
        </div>

        {/* Features Skeleton */}
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border/50">
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-full rounded" />
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0">
        <Skeleton className="h-10 w-full rounded-xl" />
      </CardFooter>
    </Card>
  );
};

export default PropertiesSkeleton;