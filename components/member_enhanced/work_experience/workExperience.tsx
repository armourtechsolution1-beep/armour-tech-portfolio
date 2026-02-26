'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  Filter, 
  Calendar,
  Building,
  MapPin,
  Layers,
  TrendingUp,
  Clock,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

import { workExperienceData } from '@/data/workExperienceData';
import { WorkExperienceCard } from './workExperienceCard';

export default function WorkExperienceSection() {
  const [filter, setFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showAll, setShowAll] = useState(false);

  // Get unique companies for filter
  const companies = ['all', ...new Set(workExperienceData.map(exp => exp.company_name))];

  // Filter and sort experiences
  const filteredExperiences = useMemo(() => {
    let filtered = workExperienceData;
    
    if (filter !== 'all') {
      filtered = filtered.filter(exp => exp.company_name === filter);
    }

    // Sort by date
    return filtered.sort((a, b) => {
      const dateA = new Date(a.date_started).getTime();
      const dateB = new Date(b.date_started).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });
  }, [filter, sortOrder]);

  // Calculate statistics
  const stats = {
    total: workExperienceData.length,
    current: workExperienceData.filter(exp => exp.is_current).length,
    companies: new Set(workExperienceData.map(exp => exp.company_name)).size,
    totalYears: workExperienceData.reduce((acc, exp) => {
      const start = new Date(exp.date_started);
      const end = exp.is_current ? new Date() : new Date(exp.date_completed!);
      const years = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365);
      return acc + years;
    }, 0).toFixed(1)
  };

  // Display limited items if not showing all
  const displayExperiences = showAll ? filteredExperiences : filteredExperiences.slice(0, 3);

  return (
    <section id="experience" className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-amber-500/20 rounded-2xl">
              <Briefcase className="w-8 h-8 text-amber-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Professional <span className="text-amber-400">Journey</span>
            </h2>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            A timeline of professional growth, achievements, and impactful contributions
          </p>
        </motion.div>

        {/* Statistics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <Briefcase className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider">Total Roles</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.total}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider">Current</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.current}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2 text-purple-400 mb-1">
              <Building className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider">Companies</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.companies}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2 text-blue-400 mb-1">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider">Experience</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.totalYears} years</p>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8"
        >
          {/* Company Filter */}
          <div className="flex gap-2 p-1 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 overflow-x-auto max-w-[99%]">
            {companies.slice(0, 5).map((company) => (
              <button
                key={company}
                onClick={() => setFilter(company)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md capitalize whitespace-nowrap transition-all duration-300 ${
                  filter === company
                    ? 'bg-amber-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {company === 'all' ? <Layers size={16} /> : <Building size={16} />}
                <span>{company === 'all' ? 'All Companies' : company}</span>
              </button>
            ))}
          </div>

          {/* Sort Toggle */}
          <button
            onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 text-gray-300 hover:text-white hover:border-amber-500/30 transition-all duration-300"
          >
            <Calendar className="w-4 h-4" />
            <span>{sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}</span>
            {sortOrder === 'desc' ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </motion.div>

        {/* Timeline */}
        <div className="relative space-y-8">
          {/* Main Timeline Line */}
          <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-amber-500 via-amber-400 to-amber-500 hidden md:block" />

          <AnimatePresence mode="wait">
            {displayExperiences.length > 0 ? (
              <motion.div
                key="experiences"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                {displayExperiences.map((experience, index) => (
                  <WorkExperienceCard
                    key={experience.id}
                    experience={experience}
                    index={index}
                    isLast={index === displayExperiences.length - 1 && !showAll}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-20 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
              >
                <Briefcase className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">No experiences found for this filter</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Show More/Less Button */}
          {filteredExperiences.length > 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center mt-8"
            >
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-gray-300 hover:text-white hover:border-amber-500/30 hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
              >
                <span>{showAll ? 'Show Less' : `Show ${filteredExperiences.length - 3} More`}</span>
                {showAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </motion.div>
          )}
        </div>

        {/* Summary Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 text-sm">
            A journey of continuous growth, spanning {stats.totalYears} years across {stats.companies} organizations
          </p>
        </motion.div>
      </div>
    </section>
  );
}