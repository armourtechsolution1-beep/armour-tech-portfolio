'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Member } from '@/lib/types';

interface MemberCardProps {
  member: Member;
}

export function MemberCard({ member }: MemberCardProps) {
  const photoUrl = member.display_photo_url || '/placeholder.svg?height=300&width=300';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -8 }}
    >
      <Link href={`/home/members/${member.id}`}>
        <div className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-lg cursor-pointer">
          {/* Image Container */}
          <div className="relative h-48 w-full overflow-hidden bg-muted">
            <Image
              src={photoUrl}
              alt={member.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/30" />
          </div>

          {/* Content */}
          <div className="space-y-2 p-4">
            {/* Name */}
            <div>
              <h3 className="text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-primary line-clamp-1">
                {member.name}
              </h3>
              <p className="text-sm font-medium text-muted-foreground">
                {member.role}
              </p>
            </div>

            {/* Bio */}
            {member.bio && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {member.bio}
              </p>
            )}

            {/* View Profile Link */}
            <div className="flex items-center gap-2 pt-2 text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              View Profile
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
