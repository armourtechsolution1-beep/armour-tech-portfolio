'use server';

import { Suspense } from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { AboutSection } from '@/components/home/AboutSection';
import { FeaturedProjectsSection } from '@/components/home/FeaturedProjectsSection';
import { TeamSection } from '@/components/home/TeamSection';
import {
  fetchOrganization,
  fetchMembers,
  fetchProjects,
  fetchTechnologies,
} from '@/lib/mock-data';

export default async function HomePage() {
  const [organization, members, projects, technologies] = await Promise.all([
    fetchOrganization(),
    fetchMembers(),
    fetchProjects(),
    fetchTechnologies(),
  ]);

  // Get featured projects (first 6)
  const featuredProjects = projects.slice(0, 6);

  // Get team members (first 4)
  const teamMembers = members.slice(0, 4);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <HeroSection organization={organization} />

      {/* About Section */}
      <AboutSection
        organization={organization}
        memberCount={members.length}
        projectCount={projects.length}
        technologyCount={technologies.length}
      />

      {/* Featured Projects Section */}
      <Suspense fallback={<div className="py-24" />}>
        <FeaturedProjectsSection projects={featuredProjects} />
      </Suspense>

      {/* Team Section */}
      <Suspense fallback={<div className="py-24" />}>
        <TeamSection members={teamMembers} />
      </Suspense>
    </div>
  );
}
