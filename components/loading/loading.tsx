import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Project Info Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-12 w-2/3" />
          <Skeleton className="h-24 w-full" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
        
        {/* Project Image Skeleton */}
        <div>
          <Skeleton className="h-[460px] w-full" />
        </div>
      </div>
    </div>
  );
} 