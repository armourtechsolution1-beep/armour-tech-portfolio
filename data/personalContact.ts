// data/personalContact.ts

import { OrganizationMember } from "@/types/contactType";


export const personalContact: OrganizationMember = {
  id: 'member-001',
  first_name: 'Malcom',
  last_name: 'Apunda',
  other_name: 'David',
  gender: 'male',
  nationality: 'Kenyan',
  member_title: 'Senior Software Engineer',
  about: 'Passionate software engineer with over 4 years of experience building scalable applications and leading technical teams. Specialized in cloud architecture and full-stack development.',
  organization_id: 'org-001',
  is_active: true,
  expertise_areas: [
    'Cloud Architecture',
    'Full-Stack Development',
    'Team Leadership',
    'System Design',
    'DevOps',
    'Mobile Development'
  ],
  contacts: [
    {
      id: 'contact-001',
      template_id: 'email',
      member_id: 'member-001',
      user_name: 'malcom.david@example.com',
      hyperlink: 'mailto:malcom.david@example.com',
      contact_availability: 'alltime',
      is_active: true,
      created_at: '2024-01-01',
      updated_at: '2024-01-01'
    },
    {
      id: 'contact-002',
      template_id: 'telephone',
      member_id: 'member-001',
      user_name: '+254 700 123 456',
      hyperlink: 'tel:+254700123456',
      contact_availability: 'weekdays',
      availability_time_interval: {
        from: '9:00 AM',
        to: '6:00 PM'
      },
      is_active: true,
      created_at: '2024-01-01',
      updated_at: '2024-01-01'
    },
    {
      id: 'contact-003',
      template_id: 'github',
      member_id: 'member-001',
      user_name: 'malcomdavid',
      hyperlink: 'https://github.com/malcomdavid',
      contact_availability: 'alltime',
      is_active: true,
      created_at: '2024-01-01',
      updated_at: '2024-01-01'
    },
    {
      id: 'contact-004',
      template_id: 'linkedin',
      member_id: 'member-001',
      user_name: 'malcomdavid',
      hyperlink: 'https://linkedin.com/in/malcomdavid',
      contact_availability: 'alltime',
      is_active: true,
      created_at: '2024-01-01',
      updated_at: '2024-01-01'
    },
    {
      id: 'contact-005',
      template_id: 'location',
      member_id: 'member-001',
      user_name: 'Nairobi, Kenya',
      hyperlink: '',
      contact_availability: 'alltime',
      is_active: true,
      created_at: '2024-01-01',
      updated_at: '2024-01-01'
    }
  ]
};