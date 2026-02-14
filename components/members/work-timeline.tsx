import { WorkExperience } from '@/lib/types';
import { Timeline, TimelineItem } from '@/components/ui/timeline';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface WorkTimelineProps {
  workExperiences: WorkExperience[];
  className?: string;
}

function formatDateRange(startDate: Date, endDate: Date | null): string {
  const start = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
  }).format(startDate);

  if (!endDate) {
    return `${start} – Present`;
  }

  const end = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
  }).format(endDate);

  return `${start} – ${end}`;
}

export function WorkTimeline({ workExperiences, className }: WorkTimelineProps) {
  if (workExperiences.length === 0) {
    return null;
  }

  // Sort by start date, most recent first
  const sorted = [...workExperiences].sort(
    (a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
  );

  return (
    <section className={cn('space-y-8', className)}>
      <div>
        <h2 className="text-2xl font-bold text-foreground">Work Experience</h2>
        <p className="text-muted-foreground mt-1">Professional journey and roles</p>
      </div>

      <Timeline>
        {sorted.map(experience => (
          <TimelineItem
            key={experience.id}
            title={experience.job_title}
            subtitle={experience.company_name}
            description={experience.description}
            date={formatDateRange(experience.start_date, experience.end_date)}
            isCurrent={experience.is_current}
          />
        ))}
      </Timeline>
    </section>
  );
}

export default WorkTimeline;
