'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Send, 
  User,
  Mail,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Phone
} from 'lucide-react';
import { MemberContact, OrganizationMember } from '@/types/contactType';


interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: MemberContact;
  member: OrganizationMember;
}

export function ContactModal({ isOpen, onClose, contact, member }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    purpose: 'professional'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const purposes = [
    { value: 'professional', label: 'Professional Inquiry' },
    { value: 'collaboration', label: 'Collaboration Opportunity' },
    { value: 'project', label: 'Project Discussion' },
    { value: 'opportunity', label: 'Job Opportunity' },
    { value: 'other', label: 'Other' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset after success
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setFormData({ name: '', email: '', message: '', purpose: 'professional' });
      }, 2000);
    }, 1500);
  };

  const isEmail = contact.template_id === 'email';
  const contactValue = isEmail ? contact.user_name : contact.user_name;

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
                  {isEmail ? (
                    <Mail className="w-5 h-5 text-amber-400" />
                  ) : (
                    <Phone className="w-5 h-5 text-amber-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Contact {member.first_name} {member.last_name}
                  </h3>
                  <p className="text-xs text-gray-400">
                    via {isEmail ? 'email' : 'phone'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Success State */}
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-8 text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-green-500/20 rounded-full">
                      <CheckCircle className="w-12 h-12 text-green-400" />
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">Message Sent</h4>
                  <p className="text-gray-400 text-sm">
                    Your message has been sent to {member.first_name}. They will respond shortly.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="p-6 space-y-4"
                >
                  {/* Contact Info Display */}
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-sm text-gray-300">
                      <span className="text-gray-500">Contact:</span>{' '}
                      <span className="text-amber-400 font-medium">{contactValue}</span>
                    </p>
                  </div>

                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300 flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      Your Email
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

                  {/* Purpose */}
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-gray-500" />
                      Purpose of Contact
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
                      Message
                    </label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                      placeholder="Write your message here..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 rounded-lg text-white font-medium transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  {/* Note */}
                  <p className="text-xs text-gray-500 text-center">
                    Your information will only be used to respond to this inquiry.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}