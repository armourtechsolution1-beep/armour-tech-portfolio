'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, 
  X, 
  FileText, 
  Calendar,
  HardDrive,
  Tag,
  Eye,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Document } from '@/types/documents';
import { formatFileSize, getFileIcon } from '@/lib/documentIcons';

interface DownloadConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: Document;
  onConfirm: () => void;
}

export function DownloadConfirmModal({ isOpen, onClose, document, onConfirm }: DownloadConfirmModalProps) {
  const FileIcon = getFileIcon(document.file_extension, document.document_type);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 shadow-2xl w-full max-w-md overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/20 rounded-lg">
                  <Download className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Confirm Download</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Document Preview */}
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="p-3 bg-amber-500/10 rounded-xl">
                  <FileIcon className="w-8 h-8 text-amber-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-medium truncate">{document.document_name}</h4>
                  <p className="text-sm text-gray-400">{document.file_name}</p>
                </div>
              </div>

              {/* Document Details */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <HardDrive className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-300">{formatFileSize(document.file_size)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-300 uppercase">{document.file_extension}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-300">
                    {new Date(document.last_modified).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Eye className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-300">{document.download_count} downloads</span>
                </div>
              </div>

              {/* Tags */}
              {document.tags.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Tag className="w-4 h-4" />
                    <span>Tags</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {document.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-white/5 rounded-md text-xs text-gray-300 border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Privacy Notice */}
              <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                <p className="text-xs text-amber-400/80">
                  By downloading this document, you agree to the terms of use and 
                  acknowledge that this document is for personal use only.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 p-6 border-t border-gray-700">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 rounded-lg text-white font-medium transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}