export function MemberCardSkeleton() {
  return (
    <div className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-md">
      {/* Image Skeleton */}
      <div className="h-48 w-full animate-pulse bg-muted" />
      
      {/* Content Skeleton */}
      <div className="space-y-3 p-4">
        {/* Name Skeleton */}
        <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />
        
        {/* Role Skeleton */}
        <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
        
        {/* Bio Skeleton */}
        <div className="space-y-2 pt-2">
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}
