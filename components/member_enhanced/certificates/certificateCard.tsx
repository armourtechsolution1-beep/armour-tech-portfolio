'use client';

import { Certificate } from '@/types/certificates';
import { motion } from 'framer-motion';
import { 
  Award, 
  Calendar, 
  ExternalLink, 
  Shield, 
  Star,
  CheckCircle,
  Clock,
  Hash,
  Building,
  FileText,
  Medal
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CertificateCardProps {
  certificate: Certificate;
  index: number;
}

// Color schemes for different certificate levels/badges
const colorSchemes = {
  beginner: {
    bg: 'from-blue-50 to-indigo-100',
    border: 'border-blue-300',
    badge: 'bg-blue-500',
    text: 'text-blue-700',
    icon: 'text-blue-600',
    accent: 'blue'
  },
  intermediate: {
    bg: 'from-green-50 to-emerald-100',
    border: 'border-green-300',
    badge: 'bg-green-500',
    text: 'text-green-700',
    icon: 'text-green-600',
    accent: 'green'
  },
  advanced: {
    bg: 'from-amber-50 to-orange-100',
    border: 'border-amber-300',
    badge: 'bg-amber-500',
    text: 'text-amber-700',
    icon: 'text-amber-600',
    accent: 'amber'
  },
  expert: {
    bg: 'from-purple-50 to-pink-100',
    border: 'border-purple-300',
    badge: 'bg-purple-500',
    text: 'text-purple-700',
    icon: 'text-purple-600',
    accent: 'purple'
  }
};

export function CertificateCard({ certificate, index }: CertificateCardProps) {
  const colors = colorSchemes[certificate.level];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        y: -8,
        rotateY: 2,
        boxShadow: '0 25px 40px -12px rgba(0, 0, 0, 0.5)'
      }}
      viewport={{ once: true }}
      className="relative w-full max-w-md mx-auto cursor-pointer perspective-1000"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Certificate Card - Styled like a real certificate */}
      <div className={`
        relative bg-gradient-to-br ${colors.bg} 
        rounded-2xl border-2 ${colors.border} 
        shadow-2xl overflow-hidden
        before:absolute before:inset-0 before:bg-white/40 before:backdrop-blur-[2px]
      `}>
        
        {/* Decorative Border - Like a real certificate */}
        <div className="absolute inset-3 border-2 border-double border-gray-300/50 rounded-xl" />
        
        {/* Corner Decorations */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-amber-500/30 rounded-tl-2xl" />
        <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-amber-500/30 rounded-tr-2xl" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-amber-500/30 rounded-bl-2xl" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-amber-500/30 rounded-br-2xl" />

        {/* Main Content */}
        <div className="relative p-8 z-10">
          {/* Header with Badge */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-2 ${colors.badge} rounded-lg shadow-lg`}>
                  <Award className="w-5 h-5 text-white" />
                </div>
                <span className={`text-xs font-semibold uppercase tracking-wider ${colors.text}`}>
                  {certificate.level} Level
                </span>
              </div>
              
              {/* Certificate Title */}
              <h3 className={`text-xl font-bold text-gray-800 mb-1`}>
                {certificate.cert_name}
              </h3>
              
              {/* Provider */}
              <div className="flex items-center gap-1 text-gray-600">
                <Building className="w-3.5 h-3.5" />
                <span className="text-sm">{certificate.cert_provider}</span>
              </div>
            </div>

            {/* Badge/Medal Icon */}
            <div className="relative">
              <div className={`w-16 h-16 ${colors.badge} rounded-full flex items-center justify-center shadow-xl`}>
                <Medal className="w-8 h-8 text-white" />
              </div>
              {certificate.is_valid && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {certificate.cert_description}
          </p>

          {/* Skills Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {certificate.skills_covered.slice(0, 3).map((skill) => (
              <span 
                key={skill}
                className={`px-2 py-1 bg-white/80 backdrop-blur-sm rounded-md text-xs font-medium text-gray-700 border border-gray-200`}
              >
                {skill}
              </span>
            ))}
            {certificate.skills_covered.length > 3 && (
              <span className="px-2 py-1 bg-white/80 backdrop-blur-sm rounded-md text-xs font-medium text-gray-700 border border-gray-200">
                +{certificate.skills_covered.length - 3}
              </span>
            )}
          </div>

          {/* Certificate Details Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              <div>
                <p className="text-gray-400">Issued</p>
                <p className="font-medium">{new Date(certificate.issue_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
              </div>
            </div>
            
            {certificate.expiry_date ? (
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <div>
                  <p className="text-gray-400">Expires</p>
                  <p className="font-medium">{new Date(certificate.expiry_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs text-emerald-600">
                <CheckCircle className="w-3.5 h-3.5" />
                <div>
                  <p className="text-gray-400">Status</p>
                  <p className="font-medium">Lifetime</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 text-xs text-gray-600 col-span-2">
              <Hash className="w-3.5 h-3.5 text-gray-400" />
              <div className="truncate">
                <p className="text-gray-400">Credential ID</p>
                <p className="font-medium font-mono text-xs">{certificate.credential_id}</p>
              </div>
            </div>
          </div>

          {/* Verify Button */}
          {certificate.credential_url && (
            <Link href={certificate.credential_url} target="_blank">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 
                  bg-gradient-to-r from-gray-800 to-gray-900 
                  hover:from-gray-900 hover:to-black
                  text-white rounded-lg text-sm font-medium
                  transition-all duration-300 shadow-lg`}
              >
                <Shield className="w-4 h-4" />
                <span>Verify Certificate</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </motion.button>
            </Link>
          )}
        </div>

        {/* Watermark/Seal Effect */}
        <div className="absolute bottom-4 right-4 opacity-5">
          <Award className="w-24 h-24 text-gray-800" />
        </div>
      </div>
    </motion.div>
  );
}