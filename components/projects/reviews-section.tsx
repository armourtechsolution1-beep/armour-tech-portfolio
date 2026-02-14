import { Review } from '@/lib/types';
import { StarRating } from '@/components/ui/star-rating';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface ReviewsSectionProps {
  reviews: Review[];
  averageRating: number;
  className?: string;
}

export function ReviewsSection({
  reviews,
  averageRating,
  className,
}: ReviewsSectionProps) {
  if (reviews.length === 0) {
    return null;
  }

  return (
    <section className={cn('space-y-6', className)}>
      <div>
        <h2 className="text-2xl font-bold text-foreground">Reviews</h2>
        <p className="text-muted-foreground mt-1">Feedback from clients and collaborators</p>
      </div>

      {/* Average rating */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Average Rating</p>
            <p className="text-3xl font-bold text-foreground">{averageRating}</p>
            <p className="text-sm text-muted-foreground mt-1">
              Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
            </p>
          </div>
          <StarRating
            rating={averageRating}
            maxRating={5}
            size={32}
            fillColor="text-yellow-400"
          />
        </div>
      </Card>

      {/* Individual reviews */}
      <div className="space-y-4">
        {reviews.map(review => (
          <Card key={review.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-foreground">{review.reviewer_name}</h4>
                <p className="text-sm text-muted-foreground">
                  {review.reviewer_role}
                  {review.reviewer_company && ` at ${review.reviewer_company}`}
                </p>
              </div>
              <StarRating
                rating={review.rating}
                maxRating={5}
                size={16}
                fillColor="text-yellow-400"
              />
            </div>
            <p className="text-sm text-foreground leading-relaxed">{review.comment}</p>
            <p className="text-xs text-muted-foreground mt-3">
              {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default ReviewsSection;
