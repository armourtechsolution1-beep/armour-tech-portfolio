'use client';

import { Suspense, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchMembers } from '@/lib/mock-data';
import { MemberCard } from '@/components/cards/MemberCard';
import { MemberCardSkeleton } from '@/components/skeletons/MemberCardSkeleton';
import { SearchFilter } from '@/components/SearchFilter';
import { Member } from '@/lib/types';

function MembersGrid({ searchQuery }: { searchQuery: string }) {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);

  useEffect(() => {
    fetchMembers().then(data => {
      setMembers(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = members.filter(
      member =>
        member.name.toLowerCase().includes(query) ||
        member.bio?.toLowerCase().includes(query) ||
        member.role?.toLowerCase().includes(query)
    );
    setFilteredMembers(filtered);
  }, [members, searchQuery]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <MemberCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (filteredMembers.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-12 text-center"
      >
        <p className="text-lg text-muted-foreground">
          {searchQuery ? 'No members found matching your search' : 'No members found'}
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {filteredMembers.map((member, index) => (
        <motion.div
          key={member.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <MemberCard member={member} />
        </motion.div>
      ))}
    </div>
  );
}

export default function MembersPage() {
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
          <h1 className="text-4xl font-bold text-foreground">Our Team</h1>
          <p className="mt-2 text-muted-foreground">Meet our talented professionals</p>
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
            placeholder="Search by name, role, or skills..."
          />
        </motion.div>

        {/* Members Grid */}
        <Suspense fallback={<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <MemberCardSkeleton key={i} />
          ))}
        </div>}>
          <MembersGrid searchQuery={searchQuery} />
        </Suspense>
      </div>
    </main>
  );
}
