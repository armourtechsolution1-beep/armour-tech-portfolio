'use client';

import { Project } from '@/lib/types';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectsGridProps {
  projects: Project[];
  className?: string;
}

export function ProjectsGrid({ projects, className }: ProjectsGridProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No projects found</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
        className
      )}
    >
      {projects.map(project => (
        <Link
          key={project.id}
          href={`/home/projects/${project.id}`}
          className="group"
        >
          <Card className="h-full p-4 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {project.name}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {project.description}
              </p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-medium text-primary">
                  {project.status}
                </span>
                <ArrowRight
                  size={16}
                  className="text-muted-foreground group-hover:text-primary transition-colors translate-x-0 group-hover:translate-x-1 transition-transform"
                />
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default ProjectsGrid;
