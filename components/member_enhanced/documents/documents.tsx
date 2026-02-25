'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Filter, 
  Search,
  Grid3x3,
  LayoutGrid,
  FolderOpen,
  Download,
  Lock,
  Globe,
  Eye,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

import { DocumentType } from '@/types/documents';
import { documentsData } from '@/data/documentsData';
import { DocumentCard } from './documentCard';

export default function DocumentsSection() {
  const [filter, setFilter] = useState<DocumentType | 'all'>('all');
  const [privacyFilter, setPrivacyFilter] = useState<'all' | 'public' | 'private' | 'read_only'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');
  const [showAll, setShowAll] = useState(false);

  // Get unique document types for filter
  const documentTypes = ['all', ...new Set(documentsData.map(doc => doc.document_type))] as const;

  // Filter documents
  const filteredDocuments = useMemo(() => {
    return documentsData.filter(doc => {
      if (filter !== 'all' && doc.document_type !== filter) return false;
      if (privacyFilter !== 'all' && doc.document_privacy !== privacyFilter) return false;
      
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        return (
          doc.document_name.toLowerCase().includes(term) ||
          doc.description?.toLowerCase().includes(term) ||
          doc.tags.some(tag => tag.toLowerCase().includes(term)) ||
          doc.file_name.toLowerCase().includes(term)
        );
      }
      
      return true;
    });
  }, [filter, privacyFilter, searchTerm]);

  // Calculate statistics
  const stats = {
    total: documentsData.length,
    public: documentsData.filter(d => d.document_privacy === 'public').length,
    private: documentsData.filter(d => d.document_privacy === 'private').length,
    readOnly: documentsData.filter(d => d.document_privacy === 'read_only').length,
    featured: documentsData.filter(d => d.is_featured).length,
    totalDownloads: documentsData.reduce((acc, doc) => acc + doc.download_count, 0)
  };

  // Display limited items if not showing all
  const displayDocuments = showAll ? filteredDocuments : filteredDocuments.slice(0, 6);

  return (
    <section id="documents" className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-16 px-4 md:px-8">
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
              <FileText className="w-8 h-8 text-amber-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Professional <span className="text-amber-400">Documents</span>
            </h2>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Access my professional portfolio of certifications, publications, and technical documents
          </p>
        </motion.div>

        {/* Statistics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <FileText className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider">Total</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.total}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2 text-green-400 mb-1">
              <Globe className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider">Public</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.public}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <Lock className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider">Private</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.private}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2 text-blue-400 mb-1">
              <Eye className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider">Read Only</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.readOnly}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2 text-purple-400 mb-1">
              <Download className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider">Downloads</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.totalDownloads}</p>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-4 mb-8"
        >
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search documents by name, description, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Document Type Filters */}
            <div className="flex gap-2 p-1 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 overflow-x-auto">
              {documentTypes.slice(0, 5).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md capitalize whitespace-nowrap transition-all duration-300 ${
                    filter === type
                      ? 'bg-amber-500 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {type === 'all' ? <Filter size={16} /> : <FileText size={16} />}
                  <span>{type === 'all' ? 'All Types' : type}</span>
                </button>
              ))}
            </div>

            {/* Privacy Filters */}
            <div className="flex gap-2 p-1 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
              {[
                { value: 'all', label: 'All', icon: Filter },
                { value: 'public', label: 'Public', icon: Globe },
                { value: 'private', label: 'Private', icon: Lock },
                { value: 'read_only', label: 'Read Only', icon: Eye }
              ].map((p) => (
                <button
                  key={p.value}
                  onClick={() => setPrivacyFilter(p.value as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md capitalize whitespace-nowrap transition-all duration-300 ${
                    privacyFilter === p.value
                      ? 'bg-amber-500 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <p.icon size={16} />
                  <span>{p.label}</span>
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
          </div>
        </motion.div>

        {/* Documents Grid */}
        <AnimatePresence mode="wait">
          {displayDocuments.length > 0 ? (
            <motion.div
              key="documents"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`grid ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
              }`}
            >
              {displayDocuments.map((document, index) => (
                <DocumentCard
                  key={document.id}
                  document={document}
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
              <FolderOpen className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No documents found matching your criteria</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Show More/Less Button */}
        {filteredDocuments.length > 6 && (
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
              <span>{showAll ? 'Show Less' : `Show ${filteredDocuments.length - 6} More Documents`}</span>
              {showAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </motion.div>
        )}

        {/* Documents Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8 text-gray-400 text-sm"
        >
          Showing {displayDocuments.length} of {filteredDocuments.length} documents
          {filteredDocuments.length !== documentsData.length && 
            ` (filtered from ${documentsData.length} total)`}
        </motion.div>
      </div>
    </section>
  );
}