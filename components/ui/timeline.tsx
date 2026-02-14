import { cn } from '@/lib/utils';

interface TimelineProps {
  children: React.ReactNode;
  className?: string;
}

interface TimelineItemProps {
  title: string;
  subtitle?: string;
  description?: string;
  date?: string;
  isCurrent?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function Timeline({ children, className }: TimelineProps) {
  return (
    <div className={cn('relative space-y-0', className)}>
      {children}
    </div>
  );
}

export function TimelineItem({
  title,
  subtitle,
  description,
  date,
  isCurrent,
  className,
}: TimelineItemProps) {
  return (
    <div className={cn('relative pb-8 pl-8', className)}>
      {/* Timeline dot */}
      <div className="absolute left-0 top-2 h-4 w-4 rounded-full bg-primary ring-2 ring-background" />

      {/* Timeline line */}
      <div className="absolute left-1.5 top-8 h-[calc(100%-24px)] w-0.5 bg-border" />

      {/* Content */}
      <div className="space-y-1">
        <div className="flex items-baseline gap-2">
          <h3 className="font-semibold text-foreground">{title}</h3>
          {isCurrent && (
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              Current
            </span>
          )}
        </div>

        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}

        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}

        {date && (
          <p className="text-xs text-muted-foreground/60 mt-2">{date}</p>
        )}
      </div>
    </div>
  );
}

export default Timeline;
