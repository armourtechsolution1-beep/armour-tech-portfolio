'use client';

import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  Building,
  CheckCircle,
  ChevronRight,
  ExternalLink,
  Clock,
  Award,
  Code2,
  FolderKanban
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { WorkExperience } from '@/types/workExperience';

interface WorkExperienceCardProps {
  experience: WorkExperience;
  index: number;
  isLast: boolean;
}

export function WorkExperienceCard({ experience, index, isLast }: WorkExperienceCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const getEmploymentTypeColor = (type: string) => {
    const colors = {
      'full-time': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      'part-time': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      'freelance': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      'contract': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      'internship': 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    };
    return colors[type as keyof typeof colors] || colors['full-time'];
  };

  const getLocationTypeColor = (type: string) => {
    const colors = {
      'remote': 'bg-teal-500/20 text-teal-300 border-teal-500/30',
      'hybrid': 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      'on-site': 'bg-rose-500/20 text-rose-300 border-rose-500/30'
    };
    return colors[type as keyof typeof colors] || colors['on-site'];
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className="relative"
    >
      {/* Timeline Connector Line */}
      {!isLast && (
        <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-gradient-to-b from-amber-500/50 to-transparent hidden md:block" />
      )}

      <div className={`
        relative flex flex-col md:flex-row gap-6 p-6 
        bg-gradient-to-br from-gray-800/50 to-gray-900/50 
        backdrop-blur-sm rounded-2xl border border-gray-700/50
        hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/5
        transition-all duration-500
      `}>
        {/* Timeline Dot (Desktop) */}
        <div className="absolute -left-3 top-8 w-6 h-6 rounded-full bg-amber-500 border-4 border-gray-900 hidden md:block" />

        {/* Left Section - Company & Role */}
        <div className="md:w-1/3 space-y-4">
          <div className="flex items-start gap-4">
            {/* Company Logo Placeholder */}
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
              {experience.company_logo ? (
                <Image 
                  src={experience.company_logo} 
                  alt={experience.company_name}
                  width={48}
                  height={48}
                  className="rounded-lg"
                />
              ) : (
                <Building className="w-8 h-8 text-amber-400" />
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">
                {experience.job_title}
              </h3>
              
              <Link 
                href={experience.company_website || '#'} 
                target="_blank"
                className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors group"
              >
                <span className="text-lg font-medium">{experience.company_name}</span>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </div>

          {/* Employment Badges */}
          <div className="flex flex-wrap gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getEmploymentTypeColor(experience.employment_type)}`}>
              {experience.employment_type}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getLocationTypeColor(experience.location_type)}`}>
              {experience.location_type}
            </span>
          </div>

          {/* Date Range */}
          <div className="flex items-center gap-2 text-gray-300">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span className="text-sm">
              {formatDate(experience.date_started)} — {' '}
              {experience.is_current ? (
                <span className="text-emerald-400 font-medium">Present</span>
              ) : (
                formatDate(experience.date_completed!)
              )}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-gray-300">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span className="text-sm">{experience.location}</span>
          </div>

          {/* Duration Badge */}
          <div className="flex items-center gap-2 text-gray-300">
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="text-sm">
              {(() => {
                const start = new Date(experience.date_started);
                const end = experience.is_current ? new Date() : new Date(experience.date_completed!);
                const years = end.getFullYear() - start.getFullYear();
                const months = end.getMonth() - start.getMonth();
                const totalMonths = years * 12 + months;
                
                if (totalMonths < 12) {
                  return `${totalMonths} month${totalMonths !== 1 ? 's' : ''}`;
                } else {
                  const yrs = Math.floor(totalMonths / 12);
                  const mths = totalMonths % 12;
                  return mths > 0 ? `${yrs} yr ${mths} mo` : `${yrs} year${yrs !== 1 ? 's' : ''}`;
                }
              })()}
            </span>
          </div>
        </div>

        {/* Right Section - Details */}
        <div className="md:w-2/3 space-y-6">
          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <FolderKanban className="w-4 h-4" />
              Overview
            </h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              {experience.work_description}
            </p>
          </div>

          {/* Key Achievements */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4" />
              Key Achievements
            </h4>
            <ul className="space-y-2">
              {experience.achievements.map((achievement, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-2 text-sm"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{achievement}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Technologies Used */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {experience.technologies_used.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-3 py-1.5 bg-gray-700/50 border border-gray-600 rounded-lg text-xs font-medium text-gray-200 hover:border-amber-500/50 hover:bg-gray-700 transition-all duration-300"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Responsibilities (if not covered in description) */}
          {experience.responsibilities.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Responsibilities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {experience.responsibilities.map((resp, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <ChevronRight className="w-3 h-3 text-amber-500" />
                    <span>{resp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Current Role Badge */}
        {experience.is_current && (
          <div className="absolute -top-3 -right-3">
            <div className="px-4 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full shadow-lg shadow-emerald-500/20">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Current Role
              </span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}