'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, 
  Filter, 
  Search, 
  Grid3x3, 
  LayoutGrid,
  TrendingUp,
  Star,
  BookOpen,
  Sparkles,
  CheckCircle
} from 'lucide-react';
import { certificatesData } from '@/data/certificatesData';
import { CertificateCard } from './certificateCard';


export default function CertificatesSection() {
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');

  // Get unique levels for filter
  const levels = ['all', ...new Set(certificatesData.map(c => c.level))];

  // Filter certificates
  const filteredCertificates = useMemo(() => {
    return certificatesData.filter(cert => {
      if (filter !== 'all' && cert.level !== filter) return false;
      
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        return (
          cert.cert_name.toLowerCase().includes(term) ||
          cert.cert_description.toLowerCase().includes(term) ||
          cert.cert_provider.toLowerCase().includes(term) ||
          cert.skills_covered.some(skill => skill.toLowerCase().includes(term))
        );
      }
      
      return true;
    });
  }, [filter, searchTerm]);

  // Statistics
  const stats = {
    total: certificatesData.length,
    expert: certificatesData.filter(c => c.level === 'expert').length,
    advanced: certificatesData.filter(c => c.level === 'advanced').length,
    valid: certificatesData.filter(c => c.is_valid).length
  };

  return (
    <section id="certificates" className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-amber-500/20 rounded-2xl">
              <Award className="w-8 h-8 text-amber-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Professional <span className="text-amber-400">Certifications</span>
            </h2>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Industry-recognized credentials validating expertise and commitment to excellence
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <Award className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider">Total</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.total}</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2 text-purple-400 mb-1">
              <Star className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider">Expert</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.expert}</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2 text-blue-400 mb-1">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider">Advanced</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.advanced}</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2 text-green-400 mb-1">
              <CheckCircle className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider">Active</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.valid}</p>
          </div>
        </motion.div>

        {/* Controls Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8"
        >
          {/* Level Filters */}
          <div className="flex gap-2 p-1 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 overflow-x-auto">
            {levels.map((level) => (
              <button
                key={level}
                onClick={() => setFilter(level)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md capitalize whitespace-nowrap transition-all duration-300 ${
                  filter === level
                    ? 'bg-amber-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {level === 'all' ? <Filter size={16} /> : <Sparkles size={16} />}
                <span>{level}</span>
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search certificates or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors"
            />
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

        {/* Certificates Grid */}
        <AnimatePresence mode="wait">
          {filteredCertificates.length > 0 ? (
            <motion.div
              key="certificates"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`grid ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
              }`}
            >
              {filteredCertificates.map((certificate, index) => (
                <CertificateCard
                  key={certificate.id}
                  certificate={certificate}
                  index={index}
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
              <Award className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">
                No certificates found matching "{searchTerm}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Certificates Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8 text-gray-400 text-sm"
        >
          Showing {filteredCertificates.length} of {certificatesData.length} certificates
        </motion.div>
      </div>
    </section>
  );
}