import { cn } from '@/lib/utils';

interface TimelineItemProps {
  title: string;
  subtitle?: string;
  description?: string;
  date?: string;
  isCurrent?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function TimelineItem({
  title,
  subtitle,
  description,
  date,
  isCurrent = false,
  children,
  className,
}: TimelineItemProps) {
  return (
    <div className={cn('flex gap-4 pb-8 last:pb-0', className)}>
      {/* Timeline dot and line */}
      <div className="relative flex flex-col items-center">
        {/* Dot */}
        <div
          className={cn(
            'w-3 h-3 rounded-full mt-1.5',
            isCurrent ? 'bg-primary' : 'bg-muted-foreground'
          )}
        />
        {/* Vertical line */}
        <div className="absolute top-6 bottom-0 w-px bg-border" />
      </div>

      {/* Content */}
      <div className="flex-1 pt-0.5">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-semibold text-foreground">{title}</h4>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {isCurrent && (
            <span className="ml-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs font-medium rounded-full whitespace-nowrap">
              Current
            </span>
          )}
        </div>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
        {date && (
          <p className="text-xs text-muted-foreground mt-2">{date}</p>
        )}
        {children}
      </div>
    </div>
  );
}

export default TimelineItem;
