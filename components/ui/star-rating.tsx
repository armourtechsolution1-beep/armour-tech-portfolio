'use client';

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  showLabel?: boolean;
  className?: string;
  fillColor?: string;
  emptyColor?: string;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = 16,
  showLabel = false,
  className,
  fillColor = 'text-yellow-400',
  emptyColor = 'text-muted-foreground',
}: StarRatingProps) {
  const clampedRating = Math.min(Math.max(rating, 0), maxRating);
  const fullStars = Math.floor(clampedRating);
  const hasHalfStar = clampedRating % 1 !== 0;

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="flex gap-0.5">
        {Array.from({ length: maxRating }).map((_, index) => {
          const isFilled = index < fullStars;
          const isHalf = index === fullStars && hasHalfStar;

          return (
            <div key={index} className="relative">
              {/* Empty star background */}
              <Star
                size={size}
                className={cn('fill-current', emptyColor)}
              />
              {/* Filled star overlay */}
              {(isFilled || isHalf) && (
                <div
                  className="absolute top-0 left-0 overflow-hidden"
                  style={{ width: isHalf ? '50%' : '100%' }}
                >
                  <Star
                    size={size}
                    className={cn('fill-current', fillColor)}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {showLabel && (
        <span className="text-sm font-medium text-foreground">
          {clampedRating.toFixed(1)}
        </span>
      )}
    </div>
  );
}

export default StarRating;
