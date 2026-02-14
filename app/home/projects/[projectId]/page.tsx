'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import {
  fetchProjectById,
  fetchProjectTechnologies,
  fetchProjectPhotos,
  fetchProjectTeam,
  fetchProjectReviewsWithStats,
} from '@/lib/mock-data';
import { Project, ProjectTechnology, ProjectPhoto, Member, Review } from '@/lib/types';
import { ProjectHero } from '@/components/projects/project-hero';
import { PhotoGallery } from '@/components/projects/photo-gallery';
import { TechStack } from '@/components/projects/tech-stack';
import { TeamSection } from '@/components/projects/team-section';
import { ReviewsSection } from '@/components/projects/reviews-section';

interface ProjectDetailPageProps {
  params: Promise<{ projectId: string }>;
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const [project, setProject] = useState<Project | null>(null);
  const [technologies, setTechnologies] = useState<ProjectTechnology[]>([]);
  const [photos, setPhotos] = useState<ProjectPhoto[]>([]);
  const [teamMembers, setTeamMembers] = useState<Member[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const { projectId: id } = await params;
        if (!isMounted) return;

        const projectData = await fetchProjectById(id);
        if (!isMounted) return;

        if (projectData) {
          setProject(projectData);

          const [techsData, photosData, teamData, reviewsData] = await Promise.all([
            fetchProjectTechnologies(id),
            fetchProjectPhotos(id),
            fetchProjectTeam(id),
            fetchProjectReviewsWithStats(id),
          ]);

          if (!isMounted) return;

          setTechnologies(techsData);
          setPhotos(photosData);
          setTeamMembers(teamData);
          setReviews(reviewsData.reviews);
          setAverageRating(reviewsData.averageRating);
        }
      } catch (error) {
        console.error('Error loading project data:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Link
            href="/home/projects"
            className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Projects
          </Link>
          <div className="rounded-lg border border-border bg-card p-8 text-center">
            <p className="text-lg font-semibold text-foreground">Project not found</p>
            <p className="mt-2 text-muted-foreground">
              The project you're looking for doesn't exist.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
          <Link
            href="/home/projects"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Projects
          </Link>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-16"
        >
          {/* Hero Section */}
          <motion.div variants={itemVariants}>
            <ProjectHero project={project} />
          </motion.div>

          {/* Gallery */}
          {photos.length > 0 && (
            <motion.div variants={itemVariants}>
              <PhotoGallery photos={photos} />
            </motion.div>
          )}

          {/* Technologies */}
          {technologies.length > 0 && (
            <motion.div variants={itemVariants}>
              <TechStack technologies={technologies} />
            </motion.div>
          )}

          {/* Team */}
          {teamMembers.length > 0 && (
            <motion.div variants={itemVariants}>
              <TeamSection teamMembers={teamMembers} />
            </motion.div>
          )}

          {/* Reviews */}
          {reviews.length > 0 && (
            <motion.div variants={itemVariants}>
              <ReviewsSection
                reviews={reviews}
                averageRating={averageRating}
              />
            </motion.div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
