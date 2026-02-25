'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  Lock,
  Eye,
  Calendar,
  HardDrive,
  Tag,
  FileText,
  Globe,
  Mail
} from 'lucide-react';
import { Document } from '@/types/documents';
import { formatFileSize, getFileIcon } from '@/lib/documentIcons';
import { DownloadConfirmModal } from './confirmDownloadModal';
import { DocumentRequestModal } from './documentRequestModal';


interface DocumentCardProps {
  document: Document;
  index: number;
}

export function DocumentCard({ document, index }: DocumentCardProps) {
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  
  const FileIcon = getFileIcon(document.file_extension, document.document_type);
  
  const getPrivacyBadge = () => {
    switch (document.document_privacy) {
      case 'public':
        return (
          <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs border border-green-500/30">
            <Globe className="w-3 h-3" />
            <span>Public</span>
          </div>
        );
      case 'private':
        return (
          <div className="flex items-center gap-1 px-2 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs border border-amber-500/30">
            <Lock className="w-3 h-3" />
            <span>Private</span>
          </div>
        );
      case 'read_only':
        return (
          <div className="flex items-center gap-1 px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs border border-blue-500/30">
            <Eye className="w-3 h-3" />
            <span>Read Only</span>
          </div>
        );
    }
  };

  const handleDownload = () => {
    // Implement actual download logic here
    console.log('Downloading:', document.document_name);
    window.open(document.storage_url, '_blank');
  };

  const handleRequest = (data: any) => {
    // Implement actual request logic here
    console.log('Request submitted:', data);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        whileHover={{ y: -4 }}
        className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-amber-500/30 transition-all duration-300 overflow-hidden"
      >
        {/* Featured Badge */}
        {document.is_featured && (
          <div className="absolute top-3 left-3 z-10">
            <div className="px-2 py-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full text-xs font-medium text-white shadow-lg shadow-amber-500/20">
              Featured
            </div>
          </div>
        )}

        {/* Privacy Badge */}
        <div className="absolute top-3 right-3 z-10">
          {getPrivacyBadge()}
        </div>

        {/* Document Preview/Icon */}
        <div className="h-40 bg-gradient-to-br from-amber-500/5 to-amber-600/5 flex items-center justify-center relative overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative"
          >
            <FileIcon className="w-20 h-20 text-amber-400/30 group-hover:text-amber-400/50 transition-colors" />
          </motion.div>
          
          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #f59e0b 1px, transparent 0)`,
              backgroundSize: '20px 20px'
            }} />
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white line-clamp-1">
              {document.document_name}
            </h3>
            {document.description && (
              <p className="text-sm text-gray-400 line-clamp-2">
                {document.description}
              </p>
            )}
          </div>

          {/* File Info */}
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <HardDrive className="w-3 h-3" />
              <span>{formatFileSize(document.file_size)}</span>
            </div>
            <div className="flex items-center gap-1">
              <FileText className="w-3 h-3" />
              <span className="uppercase">{document.file_extension}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{new Date(document.upload_date).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Tags */}
          {document.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {document.tags.slice(0, 2).map(tag => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-white/5 rounded text-xs text-gray-400 border border-white/10"
                >
                  {tag}
                </span>
              ))}
              {document.tags.length > 2 && (
                <span className="px-2 py-0.5 bg-white/5 rounded text-xs text-gray-400 border border-white/10">
                  +{document.tags.length - 2}
                </span>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            {document.document_privacy === 'public' ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowDownloadModal(true)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 rounded-lg text-white text-sm font-medium transition-all duration-300"
              >
                <Download className="w-4 h-4" />
                Download
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowRequestModal(true)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg text-white text-sm font-medium transition-all duration-300"
              >
                <Mail className="w-4 h-4" />
                Request Access
              </motion.button>
            )}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10"
            >
              <Eye className="w-4 h-4 text-gray-400" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Modals */}
      <DownloadConfirmModal
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
        document={document}
        onConfirm={handleDownload}
      />

      <DocumentRequestModal
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        document={document}
        onSubmit={handleRequest}
      />
    </>
  );
}