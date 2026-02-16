'use server';

import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { fetchOrganization, fetchContacts } from '@/lib/mock-data';
import { ContactType, OwnerType } from '@/lib/types';
import Image from 'next/image';

export async function Footer() {
  const org = await fetchOrganization();
  const contacts = await fetchContacts(org.id, OwnerType.ORGANIZATION);

  const socialIcons: Record<ContactType, JSX.Element> = {
    [ContactType.GITHUB]: <Github className="h-5 w-5" />,
    [ContactType.LINKEDIN]: <Linkedin className="h-5 w-5" />,
    [ContactType.TWITTER]: <Twitter className="h-5 w-5" />,
    [ContactType.EMAIL]: <Mail className="h-5 w-5" />,
    [ContactType.PHONE]: <Mail className="h-5 w-5" />,
    [ContactType.WEBSITE]: <Mail className="h-5 w-5" />,
    [ContactType.INSTAGRAM]: <Mail className="h-5 w-5" />,
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background/50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold overflow-hidden">
                <Image 
                src={org.logo_url ||'Logo.jpeg'}
                alt='ATS'
                width={32}
                height={32}
                
                />
              </div>
              <span className="font-bold text-foreground">{org.name}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {org.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/home" className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/home/members" className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground">
                  Members
                </Link>
              </li>
              <li>
                <Link href="/home/projects" className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground">
                  Projects
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Connect With Us</h3>
            <div className="flex flex-wrap gap-3">
              {contacts.map(contact => {
                const icon = socialIcons[contact.contact_type];
                return (
                  <a
                    key={contact.id}
                    href={
                      contact.contact_type === ContactType.EMAIL
                        ? `mailto:${contact.value}`
                        : contact.value
                    }
                    target={contact.contact_type !== ContactType.EMAIL ? '_blank' : undefined}
                    rel={contact.contact_type !== ContactType.EMAIL ? 'noopener noreferrer' : undefined}
                    className="rounded-lg border border-border bg-background p-2 text-muted-foreground transition-all duration-300 hover:bg-muted hover:text-foreground"
                    aria-label={contact.contact_type}
                  >
                    {icon}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-border" />

        {/* Copyright */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {org.name}. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with passion and React
          </p>
        </div>
      </div>
    </footer>
  );
}
