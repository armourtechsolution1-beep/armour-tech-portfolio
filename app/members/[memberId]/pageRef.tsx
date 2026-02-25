'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import {
  fetchMemberById,
  fetchSkills,
  fetchWorkExperiences,
  fetchContacts,
  fetchMemberProjects,
} from '@/lib/mock-data';
import { Member, Skill, WorkExperience, Contact, Project, OwnerType } from '@/lib/types';
import { MemberHero } from '@/components/members/member-hero';
import { AboutSection } from '@/components/members/about-section';
import { SkillsSection } from '@/components/members/skills-section';
import { WorkTimeline } from '@/components/members/work-timeline';
import { ContactSection } from '@/components/members/contact-section';
import { ProjectsTabs } from '@/components/members/projects-tabs';

interface MemberDetailPageProps {
  params: Promise<{ memberId: string }>;
}

export default function MemberDetailPage({ params }: MemberDetailPageProps) {
  const [member, setMember] = useState<Member | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [memberId, setMemberId] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const { memberId: id } = await params;
        if (!isMounted) return;

        setMemberId(id);

        const [memberData, skillsData, workExpData, contactsData, projectsData] =
          await Promise.all([
            fetchMemberById(id),
            fetchSkills(id, OwnerType.MEMBER),
            fetchWorkExperiences(id),
            fetchContacts(id, OwnerType.MEMBER),
            fetchMemberProjects(id),
          ]);

        if (!isMounted) return;

        setMember(memberData);
        setSkills(skillsData);
        setWorkExperiences(workExpData);
        setContacts(contactsData);
        setProjects(projectsData);
      } catch (error) {
        console.error('Error loading member data:', error);
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
        <div className="mx-auto max-w-4xl px-4">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Link
            href="/home/members"
            className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Team
          </Link>
          <div className="rounded-lg border border-border bg-card p-8 text-center">
            <p className="text-lg font-semibold text-foreground">Member not found</p>
            <p className="mt-2 text-muted-foreground">
              The member profile you're looking for doesn't exist.
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
            href="/home/members"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Team
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
            <MemberHero member={member} />
          </motion.div>

          {/* About Section */}
          <motion.div variants={itemVariants}>
            <AboutSection member={member} />
          </motion.div>

          {/* Skills Section */}
          {skills.length > 0 && (
            <motion.div variants={itemVariants}>
              <SkillsSection skills={skills} />
            </motion.div>
          )}

          {/* Work Experience */}
          {workExperiences.length > 0 && (
            <motion.div variants={itemVariants}>
              <WorkTimeline workExperiences={workExperiences} />
            </motion.div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <motion.div variants={itemVariants}>
              <ProjectsTabs allProjects={projects} memberId={memberId} />
            </motion.div>
          )}

          {/* Contact Section */}
          <motion.div variants={itemVariants}>
            <ContactSection member={member} contacts={contacts} />
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
