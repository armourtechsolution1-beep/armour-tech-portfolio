'use client';

import { motion } from 'framer-motion';
import { Organization, Member, Project } from '@/lib/types';

interface AboutSectionProps {
  organization: Organization;
  memberCount: number;
  projectCount: number;
  technologyCount: number;
}

export function AboutSection({
  organization,
  memberCount,
  projectCount,
  technologyCount,
}: AboutSectionProps) {
  const stats = [
    { label: 'Team Members', value: memberCount },
    { label: 'Projects Completed', value: projectCount },
    { label: 'Technologies Used', value: technologyCount },
  ];

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* About Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 space-y-4"
        >
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            About Us
          </h2>
          <p className="text-balance text-lg text-muted-foreground">
            {organization.about}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-lg border border-border bg-card p-6 text-center"
            >
              <div className="text-4xl font-bold text-primary md:text-5xl">
                {stat.value}
              </div>
              <div className="mt-2 text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
