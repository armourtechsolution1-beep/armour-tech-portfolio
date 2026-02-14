import { Project } from '@/lib/types';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface ProjectHeroProps {
  project: Project;
  className?: string;
}

export function ProjectHero({ project, className }: ProjectHeroProps) {
  const statusColors: Record<string, string> = {
    ACTIVE: 'bg-green-500/20 text-green-700 dark:text-green-400',
    COMPLETED: 'bg-blue-500/20 text-blue-700 dark:text-blue-400',
    ARCHIVED: 'bg-gray-500/20 text-gray-700 dark:text-gray-400',
  };

  const typeColors: Record<string, string> = {
    WEB: 'bg-blue-500/20 text-blue-700 dark:text-blue-400',
    MOBILE: 'bg-purple-500/20 text-purple-700 dark:text-purple-400',
    DESIGN: 'bg-pink-500/20 text-pink-700 dark:text-pink-400',
    OTHER: 'bg-gray-500/20 text-gray-700 dark:text-gray-400',
  };

  return (
    <div className={cn('relative', className)}>
      {/* Hero image */}
      <div className="relative w-full h-64 md:h-96 bg-gradient-to-b from-primary/10 to-background overflow-hidden rounded-lg">
        {project.media_url && (
          <Image
            src={project.media_url}
            alt={project.name}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
      </div>

      {/* Project info */}
      <div className="space-y-4 mt-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-foreground text-balance">
              {project.name}
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              {project.description}
            </p>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className={statusColors[project.status]}>
              {project.status}
            </Badge>
            <Badge variant="outline" className={typeColors[project.project_type]}>
              {project.project_type}
            </Badge>
          </div>
        </div>

        {/* Links and dates */}
        <div className="flex flex-wrap gap-4 text-sm">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              View on GitHub
            </a>
          )}
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              Live Demo
            </a>
          )}
          {project.start_date && (
            <span className="text-muted-foreground">
              Started {formatDistanceToNow(new Date(project.start_date), { addSuffix: true })}
            </span>
          )}
          {project.end_date && (
            <span className="text-muted-foreground">
              Completed {formatDistanceToNow(new Date(project.end_date), { addSuffix: true })}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectHero;
