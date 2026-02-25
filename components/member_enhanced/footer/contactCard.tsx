'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Copy, 
  Check,
  ExternalLink,
  Clock,
  MessageSquare
} from 'lucide-react';
import Link from 'next/link';
import { ContactType, MemberContact, OrganizationMember } from '@/types/contactType';
import Image from 'next/image';
import { formatContactValue, getContactIcon } from '@/lib/contactIcons';
import { ContactAvailabilityBadge } from './contactAvailabilityBadge';
import { ContactModal } from './contactModal';


interface ContactCardProps {
  member: OrganizationMember;
  isPrimary?: boolean;
}

export function ContactCard({ member, isPrimary = false }: ContactCardProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<MemberContact | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleContactClick = (contact: MemberContact) => {
    if (contact.template_id === 'email' || contact.template_id === 'telephone') {
      setSelectedContact(contact);
      setShowContactModal(true);
    } else {
      window.open(contact.hyperlink, '_blank');
    }
  };

  const getInitials = () => {
    return `${member.first_name[0]}${member.last_name[0]}`;
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        whileHover={{ y: -4 }}
        className={`
          relative bg-gradient-to-br from-gray-800 to-gray-900 
          rounded-2xl border overflow-hidden
          ${isPrimary 
            ? 'border-amber-500/50 shadow-2xl shadow-amber-500/10' 
            : 'border-gray-700 hover:border-amber-500/30'
          }
          transition-all duration-500
        `}
      >
        {/* Primary Badge */}
        {isPrimary && (
          <div className="absolute top-4 left-4 z-10">
            <div className="px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full text-xs font-medium text-white shadow-lg shadow-amber-500/20">
              Primary Contact
            </div>
          </div>
        )}

        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, ${isPrimary ? '#f59e0b' : '#6b7280'} 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }} />
        </div>

        <div className="relative p-6 space-y-6">
          {/* Profile Header */}
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className={`
              relative w-20 h-20 rounded-2xl overflow-hidden
              ${isPrimary ? 'bg-gradient-to-br from-amber-500 to-amber-600' : 'bg-gradient-to-br from-gray-700 to-gray-800'}
              flex items-center justify-center
            `}>
              {member.profile_image ? (
                <Image
                  src={member.profile_image}
                  alt={`${member.first_name} ${member.last_name}`}
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="text-2xl font-bold text-white">
                  {getInitials()}
                </span>
              )}
            </div>

            {/* Member Info */}
            <div className="flex-1">
              <h3 className={`text-xl font-bold ${isPrimary ? 'text-amber-400' : 'text-white'}`}>
                {member.first_name} {member.last_name}
                {member.other_name && <span className="text-gray-400 text-lg ml-1">({member.other_name})</span>}
              </h3>
              <p className="text-gray-400 text-sm mt-1">{member.member_title}</p>
              <div className="flex items-center gap-2 mt-2">
                <MapPin className="w-3 h-3 text-gray-500" />
                <span className="text-xs text-gray-500">{member.nationality}</span>
              </div>
            </div>
          </div>

          {/* About Section */}
          {member.about && (
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">About</h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                {member.about}
              </p>
            </div>
          )}

          {/* Expertise Areas */}
          {member.expertise_areas.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {member.expertise_areas.map((area) => (
                  <span
                    key={area}
                    className="px-2 py-1 bg-white/5 rounded-md text-xs text-gray-300 border border-white/10"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Contact Methods */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</h4>
            <div className="space-y-2">
              {member.contacts.filter(c => c.is_active).map((contact) => {
                const Icon = getContactIcon(contact.template_id as ContactType);
                const isEmailOrPhone = contact.template_id === 'email' || contact.template_id === 'telephone';
                
                return (
                  <motion.div
                    key={contact.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className="p-1.5 bg-white/5 rounded-lg">
                        <Icon className="w-3.5 h-3.5 text-gray-400" />
                      </div>
                      
                      {isEmailOrPhone ? (
                        <button
                          onClick={() => handleContactClick(contact)}
                          className="flex-1 text-left text-sm text-gray-300 hover:text-amber-400 truncate transition-colors"
                        >
                          {formatContactValue(contact)}
                        </button>
                      ) : (
                        <Link
                          href={contact.hyperlink}
                          target="_blank"
                          className="flex-1 text-left text-sm text-gray-300 hover:text-amber-400 truncate transition-colors"
                        >
                          {formatContactValue(contact)}
                        </Link>
                      )}
                    </div>

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {isEmailOrPhone && (
                        <button
                          onClick={() => copyToClipboard(
                            contact.template_id === 'email' ? contact.user_name : contact.user_name,
                            contact.id
                          )}
                          className="p-1 hover:bg-white/10 rounded transition-colors"
                        >
                          {copiedId === contact.id ? (
                            <Check className="w-3.5 h-3.5 text-green-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5 text-gray-400" />
                          )}
                        </button>
                      )}
                      {!isEmailOrPhone && (
                        <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Availability */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Availability</h4>
            <div className="flex flex-wrap gap-2">
              {member.contacts
                .filter(c => c.is_active)
                .map(contact => (
                  <ContactAvailabilityBadge
                    key={contact.id}
                    availability={contact.contact_availability}
                    timeInterval={contact.availability_time_interval}
                  />
                ))}
            </div>
          </div>

          {/* Quick Contact Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowContactModal(true)}
            className={`
              w-full mt-4 px-4 py-3 rounded-xl font-medium
              flex items-center justify-center gap-2
              transition-all duration-300
              ${isPrimary 
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg shadow-amber-500/20'
                : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
              }
            `}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Send Message</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Contact Modal */}
      {selectedContact && (
        <ContactModal
          isOpen={showContactModal}
          onClose={() => {
            setShowContactModal(false);
            setSelectedContact(null);
          }}
          contact={selectedContact}
          member={member}
        />
      )}
    </>
  );
}