'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Users, User, Grid3x3, LayoutGrid } from 'lucide-react';
import { projectsData } from '@/data/projectsData';
import { ProjectCard } from './projectsCard';


export default function ProjectsSection() {
  const [filter, setFilter] = useState<'all' | 'group' | 'personal'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');

  // Filter projects based on category and search
  const filteredProjects = useMemo(() => {
    return projectsData.filter(project => {
      // Category filter
      if (filter !== 'all' && project.category !== filter) return false;
      
      // Search filter
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        return (
          project.project_name.toLowerCase().includes(term) ||
          project.project_description.toLowerCase().includes(term) ||
          project.technologies.some(tech => tech.toLowerCase().includes(term))
        );
      }
      
      return true;
    });
  }, [filter, searchTerm]);

  // Separate into group and personal projects for display
  const groupProjects = filteredProjects.filter(p => p.category === 'group');
  const personalProjects = filteredProjects.filter(p => p.category === 'personal');

  return (
    <section id="projects" className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured <span className="text-amber-400">Projects</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            A showcase of collaborative team efforts and personal innovations
          </p>
        </motion.div>

        {/* Controls Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8"
        >
          {/* Category Filters */}
          <div className="flex gap-2 p-1 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
            <button
              onClick={() => setFilter('all')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300 ${
                filter === 'all'
                  ? 'bg-amber-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <LayoutGrid size={16} />
              <span>All Projects</span>
            </button>
            <button
              onClick={() => setFilter('group')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300 ${
                filter === 'group'
                  ? 'bg-amber-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Users size={16} />
              <span>Group</span>
            </button>
            <button
              onClick={() => setFilter('personal')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300 ${
                filter === 'personal'
                  ? 'bg-amber-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <User size={16} />
              <span>Personal</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search projects or technologies..."
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

        {/* Projects Display */}
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <motion.div
              key="projects"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              {/* Group Projects Section */}
              {(filter === 'all' || filter === 'group') && groupProjects.length > 0 && (
                <div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 mb-6"
                  >
                    <div className="p-2 bg-amber-500/20 rounded-lg">
                      <Users className="w-5 h-5 text-amber-400" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white">
                      Group Projects
                    </h3>
                    <span className="text-sm text-gray-400 ml-auto">
                      {groupProjects.length} projects
                    </span>
                  </motion.div>
                  
                  <div className={`grid ${
                    viewMode === 'grid' 
                      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
                  }`}>
                    {groupProjects.map((project, index) => (
                      <ProjectCard
                        key={project.id} 
                        project={project} 
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Personal Projects Section */}
              {(filter === 'all' || filter === 'personal') && personalProjects.length > 0 && (
                <div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 mb-6"
                  >
                    <div className="p-2 bg-amber-500/20 rounded-lg">
                      <User className="w-5 h-5 text-amber-400" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white">
                      Personal Projects
                    </h3>
                    <span className="text-sm text-gray-400 ml-auto">
                      {personalProjects.length} projects
                    </span>
                  </motion.div>
                  
                  <div className={`grid ${
                    viewMode === 'grid' 
                      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
                  }`}>
                    {personalProjects.map((project, index) => (
                      <ProjectCard 
                        key={project.id} 
                        project={project} 
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-20"
            >
              <p className="text-gray-400 text-lg">
                No projects found matching "{searchTerm}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Projects Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8 text-gray-400 text-sm"
        >
          Showing {filteredProjects.length} of {projectsData.length} projects
        </motion.div>
      </div>
    </section>
  );
}