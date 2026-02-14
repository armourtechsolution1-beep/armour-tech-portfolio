'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Member } from '@/lib/types';
import { MemberCard } from '@/components/cards/MemberCard';

interface TeamSectionProps {
  members: Member[];
}

export function TeamSection({ members }: TeamSectionProps) {
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
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 flex items-end justify-between"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground">
              Talented professionals dedicated to excellence
            </p>
          </div>
          <Link
            href="/home/members"
            className="hidden text-sm font-medium text-primary transition-colors duration-300 hover:text-primary/80 md:block"
          >
            View All
          </Link>
        </motion.div>

        {/* Members Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {members.map((member) => (
            <motion.div key={member.id} variants={itemVariants}>
              <MemberCard member={member} />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 flex justify-center md:hidden"
        >
          <Link
            href="/home/members"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-4 font-medium text-foreground transition-all duration-300 hover:bg-muted"
          >
            View All Members
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
