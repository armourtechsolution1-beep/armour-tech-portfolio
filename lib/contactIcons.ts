// lib/contactIcons.ts
import { ContactType, MemberContact } from '@/types/contactType';
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  MessageCircle,
  Phone,
  Globe,
  Youtube,
  Twitch,
  Slack,
  Disc as Discord,
  Send as Telegram,
  MessageSquare,
  Link2
} from 'lucide-react';

export const ContactIconMap: Record<ContactType, any> = {
  email: Mail,
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  facebook: Facebook,
  instagram: Instagram,
  discord: Discord,
  whatsapp: MessageCircle,
  telephone: Phone,
  website: Globe,
  youtube: Youtube,
  twitch: Twitch,
  slack: Slack,
  telegram: Telegram,
  signal: MessageSquare,
  other: Link2
};

export const getContactIcon = (type: ContactType) => {
  return ContactIconMap[type] || Link2;
};

export const formatContactValue = (contact: MemberContact): string => {
  switch (contact.template_id) {
    case 'email':
      return contact.user_name;
    case 'telephone':
      return contact.user_name;
    case 'website':
      return contact.user_name.replace(/^https?:\/\//, '');
    default:
      return `@${contact.user_name}`;
  }
};