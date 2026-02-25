'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  X, 
  User, 
  MessageSquare, 
  Send,
  Shield,
  AlertCircle,
  CheckCircle,
  Copy,
  ExternalLink
} from 'lucide-react';
import { Document } from '@/types/documents';

interface DocumentRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: Document;
  onSubmit: (data: RequestFormData) => void;
}

interface RequestFormData {
  email: string;
  name: string;
  message: string;
  purpose: string;
}

interface RequestConfirmationProps {
  refCode: string;
  email: string;
  onClose: () => void;
}

function RequestConfirmation({ refCode, email, onClose }: RequestConfirmationProps) {
  const [copied, setCopied] = useState(false);

  const copyRefCode = () => {
    navigator.clipboard.writeText(refCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-6"
    >
      <div className="flex justify-center">
        <div className="p-3 bg-green-500/20 rounded-full">
          <CheckCircle className="w-12 h-12 text-green-400" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-white">Request Submitted</h3>
        <p className="text-gray-400 text-sm">
          Your request has been sent to the document owner. You will receive a notification once it's processed.
        </p>
      </div>

      <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Reference Code</span>
          <div className="flex items-center gap-2">
            <code className="px-2 py-1 bg-gray-800 rounded text-amber-400 font-mono text-sm">
              {refCode}
            </code>
            <button
              onClick={copyRefCode}
              className="p-1 hover:bg-white/10 rounded transition-colors"
            >
              <Copy className={`w-4 h-4 ${copied ? 'text-green-400' : 'text-gray-400'}`} />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Mail className="w-4 h-4" />
          <span>Confirmation sent to {email}</span>
        </div>
      </div>

      <button
        onClick={onClose}
        className="w-full px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg text-white font-medium"
      >
        Done
      </button>
    </motion.div>
  );
}

export function DocumentRequestModal({ isOpen, onClose, document, onSubmit }: DocumentRequestModalProps) {
  const [step, setStep] = useState<'form' | 'submitting' | 'confirmation'>('form');
  const [refCode, setRefCode] = useState('');
  const [formData, setFormData] = useState<RequestFormData>({
    email: '',
    name: '',
    message: '',
    purpose: 'professional'
  });

  const purposes = [
    { value: 'professional', label: 'Professional Review' },
    { value: 'academic', label: 'Academic Research' },
    { value: 'personal', label: 'Personal Interest' },
    { value: 'collaboration', label: 'Potential Collaboration' },
    { value: 'other', label: 'Other' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('submitting');
    
    // Simulate API call
    setTimeout(() => {
      const generatedCode = `REQ-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      setRefCode(generatedCode);
      setStep('confirmation');
      onSubmit(formData);
    }, 1500);
  };

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
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/20 rounded-lg">
                  <Mail className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {step === 'confirmation' ? 'Request Sent' : 'Request Document Access'}
                </h3>
              </div>
              {step !== 'submitting' && (
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              )}
            </div>

            <div className="p-6">
              {step === 'form' && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Document Info */}
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10 mb-4">
                    <p className="text-sm text-gray-300">
                      Requesting access to: <span className="text-amber-400 font-medium">{document.document_name}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      This document requires approval before download
                    </p>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>

                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300 flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Purpose */}
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-gray-500" />
                      Purpose of Request
                    </label>
                    <select
                      value={formData.purpose}
                      onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-amber-500 transition-colors"
                    >
                      {purposes.map(p => (
                        <option key={p.value} value={p.value} className="bg-gray-800">
                          {p.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-gray-500" />
                      Additional Message (Optional)
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                      placeholder="Briefly explain why you need access to this document..."
                    />
                  </div>

                  {/* Privacy Note */}
                  <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                    <p className="text-xs text-amber-400/80 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>
                        Your information will only be used to process this request and will not be shared with third parties.
                      </span>
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 rounded-lg text-white font-medium transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Submit Request
                  </button>
                </form>
              )}

              {step === 'submitting' && (
                <div className="py-12 text-center">
                  <div className="inline-block p-3 bg-amber-500/20 rounded-full animate-pulse mb-4">
                    <Mail className="w-8 h-8 text-amber-400" />
                  </div>
                  <p className="text-white">Submitting your request...</p>
                  <p className="text-sm text-gray-400 mt-2">Please wait</p>
                </div>
              )}

              {step === 'confirmation' && (
                <RequestConfirmation
                  refCode={refCode}
                  email={formData.email}
                  onClose={onClose}
                />
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}