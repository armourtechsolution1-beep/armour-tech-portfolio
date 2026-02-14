import { Member, Contact } from '@/lib/types';
import { Mail, Github, Linkedin, Globe, Phone } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ContactSectionProps {
  member: Member;
  contacts: Contact[];
  className?: string;
}

const contactIcons: Record<string, typeof Mail> = {
  EMAIL: Mail,
  GITHUB: Github,
  LINKEDIN: Linkedin,
  WEBSITE: Globe,
  PHONE: Phone,
};

export function ContactSection({
  member,
  contacts,
  className,
}: ContactSectionProps) {
  if (!member.email && contacts.length === 0) {
    return null;
  }

  const allContacts = [
    ...(member.email
      ? [
          {
            id: 'email-primary',
            contact_type: 'EMAIL',
            value: member.email,
          },
        ]
      : []),
    ...contacts,
  ];

  return (
    <section className={cn('space-y-6', className)}>
      <div>
        <h2 className="text-2xl font-bold text-foreground">Contact</h2>
        <p className="text-muted-foreground mt-1">Get in touch</p>
      </div>

      <div className="flex flex-wrap gap-3">
        {allContacts.map(contact => {
          const Icon = contactIcons[contact.contact_type];
          const isEmail = contact.contact_type === 'EMAIL';
          const href = isEmail
            ? `mailto:${contact.value}`
            : contact.value.startsWith('http')
              ? contact.value
              : `https://${contact.value}`;

          return (
            <Link
              key={contact.id}
              href={href}
              target={isEmail ? undefined : '_blank'}
              rel={isEmail ? undefined : 'noopener noreferrer'}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-accent transition-colors"
            >
              {Icon && <Icon size={18} className="text-primary" />}
              <span className="text-sm font-medium text-foreground">
                {contact.contact_type === 'EMAIL'
                  ? 'Email'
                  : contact.contact_type.replace(/_/g, ' ')}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default ContactSection;
