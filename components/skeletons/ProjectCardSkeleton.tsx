export function ProjectCardSkeleton() {
  return (
    <div className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-md">
      {/* Image Skeleton */}
      <div className="h-48 w-full animate-pulse bg-muted" />
      
      {/* Content Skeleton */}
      <div className="space-y-3 p-4">
        {/* Title Skeleton */}
        <div className="h-6 w-2/3 animate-pulse rounded bg-muted" />
        
        {/* Description Skeleton */}
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
        </div>
        
        {/* Tech Tags Skeleton */}
        <div className="flex flex-wrap gap-2 pt-2">
          <div className="h-6 w-16 animate-pulse rounded-full bg-muted" />
          <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
          <div className="h-6 w-14 animate-pulse rounded-full bg-muted" />
        </div>
      </div>
    </div>
  );
}
