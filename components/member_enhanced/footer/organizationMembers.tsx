'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Search,
  ChevronDown,
  ChevronUp,
  Grid3x3,
  LayoutGrid
} from 'lucide-react';
import { organizationMembers } from '@/data/organizationMembers';
import { ContactCard } from './contactCard';

export function OrganizationMembersGrid() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');
  const [expertiseFilter, setExpertiseFilter] = useState<string>('all');

  // Get unique expertise areas
  const expertiseAreas = ['all', ...new Set(
    organizationMembers.flatMap(m => m.expertise_areas)
  )];

  // Filter members
  const filteredMembers = organizationMembers.filter(member => {
    if (expertiseFilter !== 'all' && !member.expertise_areas.includes(expertiseFilter)) {
      return false;
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        member.first_name.toLowerCase().includes(term) ||
        member.last_name.toLowerCase().includes(term) ||
        member.member_title.toLowerCase().includes(term) ||
        member.expertise_areas.some(area => area.toLowerCase().includes(term))
      );
    }

    return true;
  });

  // Separate primary member (first one) from others
  const primaryMember = filteredMembers[0];
  const otherMembers = filteredMembers.slice(1);

  // Display limited other members if not showing all
  const displayedOtherMembers = showAll ? otherMembers : otherMembers.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-amber-500/20 rounded-2xl">
            <Users className="w-8 h-8 text-amber-400" />
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-white">
            Organization <span className="text-amber-400">Members</span>
          </h3>
        </div>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Connect with other talented professionals in our organization
        </p>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="flex flex-col md:flex-row gap-4 items-center justify-between"
      >
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search members by name, title, or expertise..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>

        {/* Expertise Filter */}
        <div className="flex gap-2 p-1 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 overflow-x-auto max-w-[99%]">
          {expertiseAreas.slice(0, 5).map((area) => (
            <button
              key={area}
              onClick={() => setExpertiseFilter(area)}
              className={`px-3 py-1.5 rounded-md text-sm whitespace-nowrap transition-all duration-300 ${
                expertiseFilter === area
                  ? 'bg-amber-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {area === 'all' ? 'All Members' : area}
            </button>
          ))}
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 p-1 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-all duration-300 ${
              viewMode === 'grid'
                ? 'bg-amber-500 text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Grid3x3 size={16} />
          </button>
          <button
            onClick={() => setViewMode('compact')}
            className={`p-2 rounded-md transition-all duration-300 ${
              viewMode === 'compact'
                ? 'bg-amber-500 text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <LayoutGrid size={16} />
          </button>
        </div>
      </motion.div>

      {/* Members Display */}
      <AnimatePresence mode="wait">
        {filteredMembers.length > 0 ? (
          <motion.div
            key="members"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            {/* Primary Member */}
            {primaryMember && (
              <div className="max-w-2xl mx-auto">
                <ContactCard member={primaryMember} isPrimary />
              </div>
            )}

            {/* Other Members */}
            {displayedOtherMembers.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-amber-400" />
                  Team Members
                </h4>
                <div className={`grid ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
                }`}>
                  {displayedOtherMembers.map((member, index) => (
                    <ContactCard key={member.id} member={member} />
                  ))}
                </div>
              </div>
            )}

            {/* Show More/Less Button */}
            {otherMembers.length > 3 && (
              <div className="flex justify-center">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-gray-300 hover:text-white hover:border-amber-500/30 hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
                >
                  <span>
                    {showAll ? 'Show Less' : `Show ${otherMembers.length - 3} More Members`}
                  </span>
                  {showAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-20 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
          >
            <Users className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No members found matching your criteria</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Members Counter */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center text-gray-400 text-sm"
      >
        Showing {filteredMembers.length} of {organizationMembers.length} members
      </motion.div>
    </div>
  );
}