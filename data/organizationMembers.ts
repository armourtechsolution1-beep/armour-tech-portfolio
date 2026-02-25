// data/organizationMembers.ts

import { OrganizationMember } from "@/types/contactType";


export const organizationMembers: OrganizationMember[] = [
   // Include primary member
  {
    id: 'member-002',
    first_name: 'Sarah',
    last_name: 'Johnson',
    member_title: 'Lead UX Designer',
    about: 'Creative designer with a passion for user-centered design and interactive experiences. 6+ years in product design.',
    nationality: 'American',
    gender: 'female',
    organization_id: 'org-001',
    is_active: true,
    expertise_areas: [
      'UX Research',
      'UI Design',
      'Interaction Design',
      'Design Systems',
      'User Testing',
      'Figma'
    ],
    contacts: [
      {
        id: 'contact-006',
        template_id: 'email',
        member_id: 'member-002',
        user_name: 'sarah.j@example.com',
        hyperlink: 'mailto:sarah.j@example.com',
        contact_availability: 'weekdays',
        availability_time_interval: {
          from: '10:00 AM',
          to: '4:00 PM'
        },
        is_active: true,
        created_at: '2024-01-01',
        updated_at: '2024-01-01'
      },
      {
        id: 'contact-007',
        template_id: 'linkedin',
        member_id: 'member-002',
        user_name: 'sarahjohnson',
        hyperlink: 'https://linkedin.com/in/sarahjohnson',
        contact_availability: 'alltime',
        is_active: true,
        created_at: '2024-01-01',
        updated_at: '2024-01-01'
      },
      {
        id: 'contact-008',
        template_id: 'website',
        member_id: 'member-002',
        user_name: 'sarah.design',
        hyperlink: 'https://sarah.design',
        contact_availability: 'alltime',
        is_active: true,
        created_at: '2024-01-01',
        updated_at: '2024-01-01'
      }
    ]
  },
  {
    id: 'member-003',
    first_name: 'Michael',
    last_name: 'Chen',
    member_title: 'DevOps Engineer',
    about: 'Infrastructure specialist focused on CI/CD, containerization, and cloud automation. AWS Certified Professional.',
    nationality: 'Singaporean',
    gender: 'male',
    organization_id: 'org-001',
    is_active: true,
    expertise_areas: [
      'AWS/Azure',
      'Kubernetes',
      'Docker',
      'Terraform',
      'CI/CD Pipelines',
      'Monitoring'
    ],
    contacts: [
      {
        id: 'contact-009',
        template_id: 'email',
        member_id: 'member-003',
        user_name: 'michael.c@example.com',
        hyperlink: 'mailto:michael.c@example.com',
        contact_availability: 'weekdays',
        is_active: true,
        created_at: '2024-01-01',
        updated_at: '2024-01-01'
      },
      {
        id: 'contact-010',
        template_id: 'github',
        member_id: 'member-003',
        user_name: 'michaelchen',
        hyperlink: 'https://github.com/michaelchen',
        contact_availability: 'alltime',
        is_active: true,
        created_at: '2024-01-01',
        updated_at: '2024-01-01'
      },
      {
        id: 'contact-011',
        template_id: 'twitter',
        member_id: 'member-003',
        user_name: 'michaelchen',
        hyperlink: 'https://twitter.com/michaelchen',
        contact_availability: 'weekends',
        is_active: true,
        created_at: '2024-01-01',
        updated_at: '2024-01-01'
      }
    ]
  },
  {
    id: 'member-004',
    first_name: 'Priya',
    last_name: 'Patel',
    member_title: 'Backend Architect',
    about: 'Distributed systems expert with a focus on microservices, databases, and API design. Open source contributor.',
    nationality: 'Indian',
    gender: 'female',
    organization_id: 'org-001',
    is_active: true,
    expertise_areas: [
      'Microservices',
      'Node.js',
      'Python',
      'PostgreSQL',
      'MongoDB',
      'GraphQL'
    ],
    contacts: [
      {
        id: 'contact-012',
        template_id: 'email',
        member_id: 'member-004',
        user_name: 'priya.p@example.com',
        hyperlink: 'mailto:priya.p@example.com',
        contact_availability: 'weekdays',
        availability_time_interval: {
          from: '11:00 AM',
          to: '3:00 PM'
        },
        is_active: true,
        created_at: '2024-01-01',
        updated_at: '2024-01-01'
      },
      {
        id: 'contact-013',
        template_id: 'linkedin',
        member_id: 'member-004',
        user_name: 'priyapatel',
        hyperlink: 'https://linkedin.com/in/priyapatel',
        contact_availability: 'alltime',
        is_active: true,
        created_at: '2024-01-01',
        updated_at: '2024-01-01'
      },
      {
        id: 'contact-014',
        template_id: 'github',
        member_id: 'member-004',
        user_name: 'priyap',
        hyperlink: 'https://github.com/priyap',
        contact_availability: 'alltime',
        is_active: true,
        created_at: '2024-01-01',
        updated_at: '2024-01-01'
      }
    ]
  },
  {
    id: 'member-005',
    first_name: 'James',
    last_name: 'Wilson',
    member_title: 'Mobile Developer',
    about: 'Cross-platform mobile developer specializing in React Native and Flutter. Published 10+ apps on App Store.',
    nationality: 'British',
    gender: 'male',
    organization_id: 'org-001',
    is_active: true,
    expertise_areas: [
      'React Native',
      'Flutter',
      'iOS',
      'Android',
      'Mobile UI',
      'App Store Optimization'
    ],
    contacts: [
      {
        id: 'contact-015',
        template_id: 'email',
        member_id: 'member-005',
        user_name: 'james.w@example.com',
        hyperlink: 'mailto:james.w@example.com',
        contact_availability: 'weekdays',
        is_active: true,
        created_at: '2024-01-01',
        updated_at: '2024-01-01'
      },
      {
        id: 'contact-016',
        template_id: 'telephone',
        member_id: 'member-005',
        user_name: '+44 20 1234 5678',
        hyperlink: 'tel:+442012345678',
        contact_availability: 'weekdays',
        availability_time_interval: {
          from: '2:00 PM',
          to: '6:00 PM'
        },
        is_active: true,
        created_at: '2024-01-01',
        updated_at: '2024-01-01'
      }
    ]
  },
  {
    id: 'member-006',
    first_name: 'Elena',
    last_name: 'Rodriguez',
    member_title: 'Data Scientist',
    about: 'Machine learning engineer with expertise in predictive modeling, NLP, and big data analytics.',
    nationality: 'Spanish',
    gender: 'female',
    organization_id: 'org-001',
    is_active: true,
    expertise_areas: [
      'Machine Learning',
      'Python',
      'TensorFlow',
      'PyTorch',
      'Data Analysis',
      'NLP'
    ],
    contacts: [
      {
        id: 'contact-017',
        template_id: 'email',
        member_id: 'member-006',
        user_name: 'elena.r@example.com',
        hyperlink: 'mailto:elena.r@example.com',
        contact_availability: 'weekdays',
        is_active: true,
        created_at: '2024-01-01',
        updated_at: '2024-01-01'
      },
      {
        id: 'contact-018',
        template_id: 'linkedin',
        member_id: 'member-006',
        user_name: 'elenarodriguez',
        hyperlink: 'https://linkedin.com/in/elenarodriguez',
        contact_availability: 'alltime',
        is_active: true,
        created_at: '2024-01-01',
        updated_at: '2024-01-01'
      }
    ]
  }
];