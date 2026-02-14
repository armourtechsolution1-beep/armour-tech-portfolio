'use client';

import { Suspense, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchProjects, fetchProjectPhotos, fetchProjectTechnologies } from '@/lib/mock-data';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { ProjectCardSkeleton } from '@/components/skeletons/ProjectCardSkeleton';
import { SearchFilter } from '@/components/SearchFilter';
import { Project, ProjectTechnology } from '@/lib/types';

interface ProjectWithData {
  project: Project;
  technologies: ProjectTechnology[];
  coverImage: string;
}

function ProjectsGrid({ searchQuery }: { searchQuery: string }) {
  const [projects, setProjects] = useState<ProjectWithData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredProjects, setFilteredProjects] = useState<ProjectWithData[]>([]);

  useEffect(() => {
    async function loadProjects() {
      const projectsData = await fetchProjects();
      const projectsWithData = await Promise.all(
        projectsData.map(async (project) => {
          const technologies = await fetchProjectTechnologies(project.id);
          const photos = await fetchProjectPhotos(project.id);
          const coverImage = photos[0]?.photo_url || '/placeholder.svg?height=400&width=600';
          return { project, technologies, coverImage };
        })
      );
      setProjects(projectsWithData);
      setLoading(false);
    }
    loadProjects();
  }, []);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = projects.filter(
      ({ project, technologies }) =>
        project.name.toLowerCase().includes(query) ||
        project.description?.toLowerCase().includes(query) ||
        technologies.some(t => t.technology?.name.toLowerCase().includes(query))
    );
    setFilteredProjects(filtered);
  }, [projects, searchQuery]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (filteredProjects.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-12 text-center"
      >
        <p className="text-lg text-muted-foreground">
          {searchQuery ? 'No projects found matching your search' : 'No projects found'}
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredProjects.map(({ project, technologies, coverImage }, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <ProjectCard
            project={project}
            coverImage={coverImage}
            technologies={technologies}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground">Our Projects</h1>
          <p className="mt-2 text-muted-foreground">Explore our innovative solutions and successful deliveries</p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <SearchFilter
            onSearch={setSearchQuery}
            placeholder="Search by project name, technology..."
          />
        </motion.div>

        {/* Projects Grid */}
        <Suspense fallback={<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>}>
          <ProjectsGrid searchQuery={searchQuery} />
        </Suspense>
      </div>
    </main>
  );
}
