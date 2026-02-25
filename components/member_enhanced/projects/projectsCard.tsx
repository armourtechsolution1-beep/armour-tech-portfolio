'use client';

import { motion } from 'framer-motion';
import { 
  Github, 
  ExternalLink, 
  Calendar, 
  Users, 
  Code2,
  Smartphone,
  Globe,
  Gamepad2,
  Terminal,
  Library,
  Box,
  Users2,
  User,
  Medal,
  Clock,
  ChevronRight,
  Layers
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { StaticProject, ProjectType } from '@/types/projects';

// Map project types to icons
const ProjectTypeIcon: Record<ProjectType, any> = {
  web: Globe,
  android: Smartphone,
  ios: Smartphone,
  windows: Box,
  cross_platform: Smartphone,
  command_line: Terminal,
  gaming: Gamepad2,
  library: Library
};

interface ProjectCardProps {
  project: StaticProject;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const TypeIcon = ProjectTypeIcon[project.project_type] || Code2;
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  return (
    <motion.div
      className="relative group w-full max-w-sm mx-auto overflow-hidden cursor-pointer"
      style={{
        borderRadius: 30,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      {/* Card Container */}
      <div className="relative h-[380px] w-full overflow-hidden">
        {/* Background Image */}
        <Image
          src={project.display_photo_url}
          alt={project.project_name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30" />
        
        {/* Category Badge - UPDATED: Replaced emojis with icons */}
        <div className="absolute top-4 right-4 z-10">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm ${
            project.category === 'group' 
              ? 'bg-amber-500/90 text-white' 
              : 'bg-purple-500/90 text-white'
          }`}>
            {project.category === 'group' ? (
              <Users2 className="w-3.5 h-3.5" />
            ) : (
              <User className="w-3.5 h-3.5" />
            )}
            <span>{project.category === 'group' ? 'Group Project' : 'Personal Project'}</span>
          </div>
        </div>

        {/* Contribution Badge - IMPROVED: Better styling */}
        {project.category === 'group' && (
          <div className="absolute top-4 left-4 z-10">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/90 backdrop-blur-sm rounded-full text-xs font-medium text-white">
              <Medal className="w-3.5 h-3.5" />
              <span>{project.contribution_percentage}% Contribution</span>
            </div>
          </div>
        )}

        

        {/* Content */}
        <div className="absolute inset-0 p-5 flex flex-col justify-end">
          {/* Project Type Icon & Name */}
          <motion.div 
            className="flex items-center gap-2 mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="p-1.5 bg-white/10 backdrop-blur-sm rounded-lg">
              <TypeIcon className="w-4 h-4 text-amber-400" />
            </div>
            <span className="text-xs text-white/70 uppercase tracking-wider">
              {project.project_type.replace('_', ' ')}
            </span>
          </motion.div>

          {/* Project Name */}
          <motion.h3 
            className="text-2xl font-bold text-white mb-2 line-clamp-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {project.project_name}
          </motion.h3>

          {/* Description */}
          <motion.p 
            className="text-sm text-white/80 mb-3 line-clamp-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {project.project_description}
          </motion.p>

          {/* Technologies */}
          <motion.div 
            className="flex flex-wrap gap-1.5 mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {project.technologies.slice(0, 3).map((tech) => (
              <span 
                key={tech}
                className="px-2 py-0.5 bg-white/10 backdrop-blur-sm rounded-md text-xs text-white/90 border border-white/10"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-0.5 bg-white/10 backdrop-blur-sm rounded-md text-xs text-white/90 flex items-center gap-1 border border-white/10">
                <Layers className="w-3 h-3" />
                <span>+{project.technologies.length - 3}</span>
              </span>
            )}
          </motion.div>

          {/* Metadata */}
          <motion.div 
            className="flex items-center gap-3 mb-3 text-xs text-white/60"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(project.date_started)}</span>
            </div>
            {project.team_members && (
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>{project.team_members.length} members</span>
              </div>
            )}
            {/* Status Badge (New) - Shows if project is ongoing or completed */}
        <div className="   z-10">
          <div className={`flex items-center gap-1 px-1 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
            project.date_completed 
              ? 'bg-emerald-500/90 text-white' 
              : 'bg-amber-500/90 text-white'
          }`}>
            <Clock className="w-3 h-3" />
            <span>{project.date_completed ? 'Completed' : 'In Progress'}</span>
          </div>
        </div>
          </motion.div>

          {/* Action Buttons - IMPROVED: Better hover effects */}
          <motion.div 
            className="flex gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {project.github_url && (
              <Link 
                href={project.github_url}
                target="_blank"
                className="flex-1"
              >
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.2)' }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white text-sm transition-all duration-300 border border-white/10 hover:border-white/30"
                >
                  <Github className="w-4 h-4" />
                  <span>Code</span>
                </motion.button>
              </Link>
            )}
            
            {project.project_url && (
              <Link 
                href={project.project_url}
                target="_blank"
                className="flex-1"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 rounded-lg text-white text-sm transition-all duration-300 shadow-lg shadow-amber-500/20"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Demo</span>
                </motion.button>
              </Link>
            )}

            {/* View Details Button - NEW: For more project details */}
            {!project.github_url && !project.project_url && (
              <motion.button
                whileHover={{ scale: 1.02, x: 2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white text-sm transition-all duration-300 border border-white/10 hover:border-white/30"
              >
                <span>View Details</span>
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            )}
          </motion.div>
        </div>
      </div>

      {/* Hover Overlay Effect - NEW: Subtle glow on hover */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.15), transparent 70%)'
        }}
      />
    </motion.div>
  );
}