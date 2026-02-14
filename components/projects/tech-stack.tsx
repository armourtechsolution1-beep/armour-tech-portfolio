import { ProjectTechnology } from '@/lib/types';
import { ProgressBar } from '@/components/ui/progress-bar';
import { cn } from '@/lib/utils';

interface TechStackProps {
  technologies: ProjectTechnology[];
  className?: string;
}

export function TechStack({ technologies, className }: TechStackProps) {
  if (technologies.length === 0) {
    return null;
  }

  // Sort by percentage used, descending
  const sorted = [...technologies].sort(
    (a, b) => b.percentage_used - a.percentage_used
  );

  return (
    <section className={cn('space-y-6', className)}>
      <div>
        <h2 className="text-2xl font-bold text-foreground">Tech Stack</h2>
        <p className="text-muted-foreground mt-1">Technologies and tools used</p>
      </div>

      <div className="space-y-6">
        {sorted.map(tech => (
          <div
            key={tech.id}
            className="flex items-start gap-3"
          >
            {/* Tech icon */}
            <div className="flex-shrink-0">
              {tech.technology?.icon_url ? (
                <img
                  src={tech.technology.icon_url}
                  alt={tech.technology.name}
                  className="w-8 h-8 rounded object-contain"
                />
              ) : (
                <div className="w-8 h-8 rounded bg-secondary flex items-center justify-center text-xs font-semibold text-foreground">
                  {tech.technology?.name.charAt(0)}
                </div>
              )}
            </div>

            {/* Tech info */}
            <div className="flex-1">
              <ProgressBar
                label={tech.technology?.name || 'Unknown'}
                percentage={tech.percentage_used}
                showLabel={true}
                color="bg-primary"
              />
              {tech.technology?.category && (
                <p className="text-xs text-muted-foreground mt-1">
                  {tech.technology.category}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TechStack;
