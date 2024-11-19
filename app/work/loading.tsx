 import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-primary">
      <div className="container mx-auto px-4 py-16">
        {/* Header Skeleton */}
        <div className="mb-16 text-center">
          <Skeleton className="h-12 w-[200px] mx-auto mb-4" />
          <Skeleton className="h-6 w-[300px] mx-auto" />
        </div>

        {/* Projects Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-[#27272C] rounded-lg p-6 space-y-4">
              {/* Project Image Skeleton */}
              <Skeleton className="w-full aspect-video rounded-lg" />
              
              {/* Project Title Skeleton */}
              <Skeleton className="h-8 w-3/4" />
              
              {/* Project Description Skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
              
              {/* Tags Skeleton */}
              <div className="flex gap-2">
                {Array.from({ length: 3 }).map((_, j) => (
                  <Skeleton key={j} className="h-6 w-16 rounded-full" />
                ))}
              </div>
              
              {/* Links Skeleton */}
              <div className="flex gap-4">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}