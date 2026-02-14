import { cn } from '@/lib/utils';

interface ProgressBarProps {
  percentage: number;
  label?: string;
  showLabel?: boolean;
  color?: string;
  className?: string;
  backgroundColor?: string;
}

export function ProgressBar({
  percentage,
  label,
  showLabel = true,
  color = 'bg-primary',
  className,
  backgroundColor = 'bg-secondary',
}: ProgressBarProps) {
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {label && showLabel && (
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-foreground">{label}</label>
          <span className="text-xs text-muted-foreground">{clampedPercentage}%</span>
        </div>
      )}
      <div className={cn('h-2 rounded-full overflow-hidden', backgroundColor)}>
        <div
          className={cn('h-full transition-all duration-300 rounded-full', color)}
          style={{ width: `${clampedPercentage}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
