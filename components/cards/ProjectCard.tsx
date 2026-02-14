'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Project, ProjectTechnology } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
  coverImage: string;
  technologies: ProjectTechnology[];
}

export function ProjectCard({
  project,
  coverImage,
  technologies,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -8 }}
    >
      <Link href={`/home/projects/${project.id}`}>
        <div className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-lg cursor-pointer">
          {/* Image Container */}
          <div className="relative h-48 w-full overflow-hidden bg-muted">
            <Image
              src={coverImage}
              alt={project.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/30" />
          </div>

          {/* Content */}
          <div className="space-y-3 p-4">
            {/* Title */}
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-primary line-clamp-2">
                {project.name}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {project.description}
              </p>
            </div>

            {/* Technologies */}
            {technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {technologies.slice(0, 3).map(tech => (
                  <div
                    key={tech.id}
                    className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors duration-300 group-hover:bg-primary/10 group-hover:text-primary"
                  >
                    {tech.technology?.name}
                  </div>
                ))}
                {technologies.length > 3 && (
                  <div className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                    +{technologies.length - 3}
                  </div>
                )}
              </div>
            )}

            {/* View Project Link */}
            <div className="flex items-center gap-2 pt-2 text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              View Project
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
