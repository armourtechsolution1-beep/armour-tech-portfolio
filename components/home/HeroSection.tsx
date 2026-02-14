'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Organization } from '@/lib/types';

interface HeroSectionProps {
  organization: Organization;
}

export function HeroSection({ organization }: HeroSectionProps) {
  return (
    <section className="relative min-h-[500px] w-full overflow-hidden bg-background">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800" />

      {/* Content */}
      <div className="relative flex h-full min-h-[500px] items-center justify-center px-4 py-20">
        <motion.div
          className="max-w-2xl space-y-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Organization Name */}
          <motion.h1
            className="text-balance text-4xl font-bold text-foreground md:text-5xl lg:text-6xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {organization.name}
          </motion.h1>

          {/* Objective */}
          <motion.p
            className="text-balance text-lg text-muted-foreground md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {organization.objective}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link
              href="#projects"
              className="inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-6 font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg"
            >
              View Our Work
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
