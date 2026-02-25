'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

import { personalContact } from '@/data/personalContact';
import { OrganizationMembersGrid } from './organizationMembers';

export default function ContactSection() {
  return (
    <section id="contact" className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Personal Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border border-amber-500/30 overflow-hidden shadow-2xl shadow-amber-500/10">
            {/* Decorative Elements */}
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
            </div>

            {/* Content */}
            <div className="relative p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Left Column - Contact Info */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                      Let's <span className="text-amber-400">Connect</span>
                    </h2>
                    <p className="text-gray-400">
                      Have a project in mind or want to collaborate? I'm always open to discussing new opportunities.
                    </p>
                  </div>

                  {/* Contact Details */}
                  <div className="space-y-4">
                    {personalContact.contacts.map((contact) => {
                      const Icon = contact.template_id === 'email' ? Mail :
                                 contact.template_id === 'telephone' ? Phone :
                                 contact.template_id === 'location' ? MapPin :
                                 Clock;
                      
                      return (
                        <motion.div
                          key={contact.id}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                          className="flex items-center gap-3 group"
                        >
                          <div className="p-2 bg-amber-500/10 rounded-lg group-hover:bg-amber-500/20 transition-colors">
                            <Icon className="w-5 h-5 text-amber-400" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              {contact.template_id === 'email' ? 'Email' :
                               contact.template_id === 'telephone' ? 'Phone' :
                               contact.template_id === 'location' ? 'Location' :
                               'Availability'}
                            </p>
                            {contact.template_id === 'email' ? (
                              <a
                                href={`mailto:${contact.user_name}`}
                                className="text-white hover:text-amber-400 transition-colors"
                              >
                                {contact.user_name}
                              </a>
                            ) : contact.template_id === 'telephone' ? (
                              <a
                                href={`tel:${contact.user_name}`}
                                className="text-white hover:text-amber-400 transition-colors"
                              >
                                {contact.user_name}
                              </a>
                            ) : (
                              <p className="text-white">{contact.user_name}</p>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <motion.a
                      href={`mailto:${personalContact.contacts.find(c => c.template_id === 'email')?.user_name}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl text-white font-medium flex items-center justify-center gap-2 hover:from-amber-600 hover:to-amber-700 transition-all duration-300"
                    >
                      <Mail className="w-4 h-4" />
                      Send Email
                    </motion.a>
                    <motion.a
                      href={`tel:${personalContact.contacts.find(c => c.template_id === 'telephone')?.user_name}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-medium flex items-center justify-center gap-2 hover:bg-white/10 transition-all duration-300"
                    >
                      <Phone className="w-4 h-4" />
                      Call Now
                    </motion.a>
                  </div>
                </div>

                {/* Right Column - Profile Summary */}
                <div className="space-y-6">
                  <div className="relative">
                    <div className="aspect-square max-w-xs mx-auto">
                      <div className="relative w-full h-full">
                        {/* Profile Image Placeholder */}
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl opacity-10" />
                        <div className="absolute inset-4 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl border border-amber-500/20 flex items-center justify-center">
                          <span className="text-6xl font-bold text-amber-400">
                            {personalContact.first_name[0]}{personalContact.last_name[0]}
                          </span>
                        </div>
                        
                        {/* Availability Badge */}
                        <div className="absolute -bottom-2 -right-2">
                          <div className="px-4 py-2 bg-green-500/20 backdrop-blur-sm rounded-full border border-green-500/30">
                            <span className="text-sm text-green-400 flex items-center gap-2">
                              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                              Available for work
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white">
                      {personalContact.first_name} {personalContact.last_name}
                    </h3>
                    <p className="text-amber-400">{personalContact.member_title}</p>
                    <p className="text-sm text-gray-400 mt-2">
                      {personalContact.about}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Organization Members Section */}
        <OrganizationMembersGrid />
      </div>
    </section>
  );
}