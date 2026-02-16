'use server';

import {
  Organization,
  Member,
  Project,
  ProjectPhoto,
  Technology,
  ProjectTechnology,
  Skill,
  Contact,
  Review,
  WorkExperience,
  OwnerType,
  ContactType,
  ProjectStatus,
  ProjectType,
  WorkType,
} from './types';

// Mock Organization
const mockOrganization: Organization = {
  id: 'org-1',
  name: 'ArmourTech Solutions',
  description: 'We Build scalable applications using the latest technology',
  objective: 'We create innovative digital solutions that transform businesses',
  about: 'ArmourTech is a full-stack development company focused on creating cutting-edge web applications and digital experiences. Our team of passionate engineers and designers work together to deliver high-quality software solutions.',
  website_url: 'https://armour-tech-portfolio.vercel.app/',
  logo_url: '/Logo.jpeg',
  cover_photo_url: 'https://picsum.photos/seed/cover/1200/600',
  email: 'armourtechsolution1@gmail.com',
  phone: '+254 741 013 836',
  created_at: new Date('2023-01-01'),
  updated_at: new Date('2024-01-01'),
};

// Mock Members
const mockMembers: Member[] = [
  {
    id: 'member-1',
    name: 'Malcom David',
    email: 'malcomdavidapunda@gmail.com',
    role: 'Lead Developer',
    bio: 'Full-stack engineer passionate about React and Node.js',
    objective: 'Building scalable web applications that solve real-world problems',
    about: 'Sarah is a talented full-stack developer with expertise in modern JavaScript frameworks. She leads our technical initiatives and mentors junior developers.',
    display_photo_url: '/profile/malcom.png',
    cover_photo_url: '/profile/placeholder.jpg',
    organization_id: 'org-1',
    created_at: new Date('2023-02-01'),
    updated_at: new Date('2024-01-01'),
  },
  {
    id: 'member-2',
    name: 'Indiazi Alvin Wesley',
    email: 'indiazialvin@gmail.com',
    role: 'UI/UX Designer',
    bio: 'Design enthusiast creating beautiful user experiences',
    objective: 'Crafting intuitive and visually stunning user interfaces',
    about: 'Alex brings a creative eye to every project. With a background in graphic design, Alex creates interfaces that are both beautiful and functional.',
    display_photo_url: '/profile/alvo.png',
    cover_photo_url: '/profile/alvo2.jpg',
    organization_id: 'org-1',
    created_at: new Date('2023-03-01'),
    updated_at: new Date('2024-01-01'),
  },
  {
    id: 'member-3',
    name: 'Mathews Oniala',
    email: 'mathewsoniala@gmail.com',
    role: 'DevOps Engineer',
    bio: 'Cloud infrastructure specialist',
    objective: 'Ensuring reliable, scalable cloud infrastructure',
    about: 'Marcus manages our cloud infrastructure with AWS expertise. He ensures our applications run smoothly at scale.',
    display_photo_url: '/profile/mathews.png',
    cover_photo_url: '/profile/mathews.png',
    organization_id: 'org-1',
    created_at: new Date('2023-04-01'),
    updated_at: new Date('2024-01-01'),
  },
  {
    id: 'member-4',
    name: 'Mohammed Chala',
    email: 'mohammed@gmail.com',
    role: 'Backend Developer',
    bio: 'Database and API optimization expert',
    objective: 'Creating robust and efficient backend systems',
    about: 'Emma specializes in database design and API architecture. She works behind the scenes to make our applications lightning-fast.',
    display_photo_url: '/profile/chala.png',
    cover_photo_url: '/profile/chala.png',
    organization_id: 'org-1',
    created_at: new Date('2023-05-01'),
    updated_at: new Date('2024-01-01'),
  },
   {
    id: 'member-4',
    name: 'Brian Odero',
    email: 'oderobrian@gmail.com',
    role: 'Backend Developer',
    bio: 'Database and API optimization expert',
    objective: 'Creating robust and efficient backend systems',
    about: 'Emma specializes in database design and API architecture. She works behind the scenes to make our applications lightning-fast.',
    display_photo_url: '/profile/placeholder.jpg',
    cover_photo_url: '/profile/placeholder.jpg',
    organization_id: 'org-1',
    created_at: new Date('2023-05-01'),
    updated_at: new Date('2024-01-01'),
  },
];

// Mock Technologies
const mockTechnologies: Technology[] = [
  {
    id: 'tech-1',
    name: 'React',
    category: 'Frontend',
    icon_url: 'https://cdn.jsdelivr.net/npm/devicon@latest/icons/react/react-original.svg',
    color: '#61DAFB',
  },
  {
    id: 'tech-2',
    name: 'Next.js',
    category: 'Frontend',
    icon_url: 'https://cdn.jsdelivr.net/npm/devicon@latest/icons/nextjs/nextjs-original.svg',
    color: '#000000',
  },
  {
    id: 'tech-3',
    name: 'TypeScript',
    category: 'Language',
    icon_url: 'https://cdn.jsdelivr.net/npm/devicon@latest/icons/typescript/typescript-original.svg',
    color: '#3178C6',
  },
  {
    id: 'tech-4',
    name: 'Tailwind CSS',
    category: 'Styling',
    icon_url: 'https://cdn.jsdelivr.net/npm/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
    color: '#06B6D4',
  },
  {
    id: 'tech-5',
    name: 'Node.js',
    category: 'Backend',
    icon_url: 'https://cdn.jsdelivr.net/npm/devicon@latest/icons/nodejs/nodejs-original.svg',
    color: '#339933',
  },
];

// Mock Projects
const mockProjects: Project[] = [
  {
    id: 'project-1',
    name: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with real-time inventory management',
    owner_id: 'org-1',
    owner_type: OwnerType.ORGANIZATION,
    status: ProjectStatus.COMPLETED,
    project_type: ProjectType.WEB,
    start_date: new Date('2023-06-01'),
    end_date: new Date('2024-01-01'),
    github_url: 'https://github.com/techflow/ecommerce',
    live_url: 'https://ecommerce-demo.techflow.dev',
    media_url: 'https://picsum.photos/seed/ecommerce-hero/1200/600',
    created_at: new Date('2023-06-01'),
    updated_at: new Date('2024-01-01'),
    details: "On the Insert tab, the galleries include items that are designed to coordinate with the overall look of your document. You can use these galleries to insert tables, headers, footers, lists, cover pages, and other document building blocks. When you create pictures, charts, or diagrams, they also coordinate with your current document look.You can easily change the formatting of selected text in the document text by choosing a look for the selected text from the Quick Styles gallery on the Home tab. You can also format text directly by using the other controls on the Home tab. Most controls offer a choice of using the look from the current theme or using a format that you specify directly.To change the overall look of your document, choose new Theme elements on the Page Layout tab. To change the looks available in the Quick Style gallery, use the Change Current Quick Style Set command. Both the Themes gallery and the Quick Styles gallery provide reset commands so that you can always restore the look of your document to the original contained in your current template."
  },
  {
    id: 'project-2',
    name: 'AI Content Generator',
    description: 'Intelligent content generation tool powered by machine learning',
    owner_id: 'member-1',
    owner_type: OwnerType.MEMBER,
    status: ProjectStatus.ACTIVE,
    project_type: ProjectType.WEB,
    start_date: new Date('2023-09-01'),
    end_date: null,
    github_url: 'https://github.com/techflow/ai-generator',
    live_url: 'https://ai-gen.techflow.dev',
    media_url: 'https://picsum.photos/seed/ai-hero/1200/600',
    created_at: new Date('2023-09-01'),
    updated_at: new Date('2024-01-01'),
    details: "On the Insert tab, the galleries include items that are designed to coordinate with the overall look of your document. You can use these galleries to insert tables, headers, footers, lists, cover pages, and other document building blocks. When you create pictures, charts, or diagrams, they also coordinate with your current document look.You can easily change the formatting of selected text in the document text by choosing a look for the selected text from the Quick Styles gallery on the Home tab. You can also format text directly by using the other controls on the Home tab. Most controls offer a choice of using the look from the current theme or using a format that you specify directly.To change the overall look of your document, choose new Theme elements on the Page Layout tab. To change the looks available in the Quick Style gallery, use the Change Current Quick Style Set command. Both the Themes gallery and the Quick Styles gallery provide reset commands so that you can always restore the look of your document to the original contained in your current template."

  },
  {
    id: 'project-3',
    name: 'Mobile Task Manager',
    description: 'Cross-platform task management application for iOS and Android',
    owner_id: 'org-1',
    owner_type: OwnerType.ORGANIZATION,
    status: ProjectStatus.ACTIVE,
    project_type: ProjectType.MOBILE,
    start_date: new Date('2023-10-01'),
    end_date: null,
    github_url: 'https://github.com/techflow/task-manager',
    live_url: 'https://taskapp.techflow.dev',
    media_url: 'https://picsum.photos/seed/mobile-hero/1200/600',
    created_at: new Date('2023-10-01'),
    updated_at: new Date('2024-01-01'),
    details: "On the Insert tab, the galleries include items that are designed to coordinate with the overall look of your document. You can use these galleries to insert tables, headers, footers, lists, cover pages, and other document building blocks. When you create pictures, charts, or diagrams, they also coordinate with your current document look.You can easily change the formatting of selected text in the document text by choosing a look for the selected text from the Quick Styles gallery on the Home tab. You can also format text directly by using the other controls on the Home tab. Most controls offer a choice of using the look from the current theme or using a format that you specify directly.To change the overall look of your document, choose new Theme elements on the Page Layout tab. To change the looks available in the Quick Style gallery, use the Change Current Quick Style Set command. Both the Themes gallery and the Quick Styles gallery provide reset commands so that you can always restore the look of your document to the original contained in your current template."

  },
  {
    id: 'project-4',
    name: 'Analytics Dashboard',
    description: 'Real-time analytics and reporting dashboard with data visualization',
    owner_id: 'member-2',
    owner_type: OwnerType.MEMBER,
    status: ProjectStatus.COMPLETED,
    project_type: ProjectType.WEB,
    start_date: new Date('2023-07-01'),
    end_date: new Date('2023-12-01'),
    github_url: 'https://github.com/techflow/analytics',
    live_url: 'https://analytics.techflow.dev',
    media_url: 'https://picsum.photos/seed/analytics-hero/1200/600',
    created_at: new Date('2023-07-01'),
    updated_at: new Date('2023-12-01'),
    details: "On the Insert tab, the galleries include items that are designed to coordinate with the overall look of your document. You can use these galleries to insert tables, headers, footers, lists, cover pages, and other document building blocks. When you create pictures, charts, or diagrams, they also coordinate with your current document look.You can easily change the formatting of selected text in the document text by choosing a look for the selected text from the Quick Styles gallery on the Home tab. You can also format text directly by using the other controls on the Home tab. Most controls offer a choice of using the look from the current theme or using a format that you specify directly.To change the overall look of your document, choose new Theme elements on the Page Layout tab. To change the looks available in the Quick Style gallery, use the Change Current Quick Style Set command. Both the Themes gallery and the Quick Styles gallery provide reset commands so that you can always restore the look of your document to the original contained in your current template."

  },
  {
    id: 'project-5',
    name: 'Chat Application',
    description: 'Real-time messaging application with encryption',
    owner_id: 'member-3',
    owner_type: OwnerType.MEMBER,
    status: ProjectStatus.ACTIVE,
    project_type: ProjectType.WEB,
    start_date: new Date('2023-11-01'),
    end_date: null,
    github_url: 'https://github.com/techflow/chat',
    live_url: 'https://chat.techflow.dev',
    media_url: 'https://picsum.photos/seed/chat-hero/1200/600',
    created_at: new Date('2023-11-01'),
    updated_at: new Date('2024-01-01'),
    details: "On the Insert tab, the galleries include items that are designed to coordinate with the overall look of your document. You can use these galleries to insert tables, headers, footers, lists, cover pages, and other document building blocks. When you create pictures, charts, or diagrams, they also coordinate with your current document look.You can easily change the formatting of selected text in the document text by choosing a look for the selected text from the Quick Styles gallery on the Home tab. You can also format text directly by using the other controls on the Home tab. Most controls offer a choice of using the look from the current theme or using a format that you specify directly.To change the overall look of your document, choose new Theme elements on the Page Layout tab. To change the looks available in the Quick Style gallery, use the Change Current Quick Style Set command. Both the Themes gallery and the Quick Styles gallery provide reset commands so that you can always restore the look of your document to the original contained in your current template."

  },
  {
    id: 'project-6',
    name: 'Design System',
    description: 'Comprehensive design system and component library',
    owner_id: 'org-1',
    owner_type: OwnerType.ORGANIZATION,
    status: ProjectStatus.ACTIVE,
    project_type: ProjectType.DESIGN,
    start_date: new Date('2023-08-01'),
    end_date: null,
    github_url: 'https://github.com/techflow/design-system',
    live_url: 'https://design.techflow.dev',
    media_url: 'https://picsum.photos/seed/design-hero/1200/600',
    created_at: new Date('2023-08-01'),
    updated_at: new Date('2024-01-01'),
    details: "On the Insert tab, the galleries include items that are designed to coordinate with the overall look of your document. You can use these galleries to insert tables, headers, footers, lists, cover pages, and other document building blocks. When you create pictures, charts, or diagrams, they also coordinate with your current document look.You can easily change the formatting of selected text in the document text by choosing a look for the selected text from the Quick Styles gallery on the Home tab. You can also format text directly by using the other controls on the Home tab. Most controls offer a choice of using the look from the current theme or using a format that you specify directly.To change the overall look of your document, choose new Theme elements on the Page Layout tab. To change the looks available in the Quick Style gallery, use the Change Current Quick Style Set command. Both the Themes gallery and the Quick Styles gallery provide reset commands so that you can always restore the look of your document to the original contained in your current template."

  },
];

// Mock Project Photos
const mockProjectPhotos: ProjectPhoto[] = [
  // Project 1 - E-Commerce
  {
    id: 'photo-1',
    project_id: 'project-1',
    photo_url: 'https://picsum.photos/seed/ecommerce/800/600',
    caption: 'Product listing page',
    order: 1,
    created_at: new Date('2023-06-01'),
  },
  {
    id: 'photo-1b',
    project_id: 'project-1',
    photo_url: 'https://picsum.photos/seed/ecommerce1/800/600',
    caption: 'Shopping cart interface',
    order: 2,
    created_at: new Date('2023-06-05'),
  },
  {
    id: 'photo-1c',
    project_id: 'project-1',
    photo_url: 'https://picsum.photos/seed/ecommerce2/800/600',
    caption: 'Checkout flow',
    order: 3,
    created_at: new Date('2023-06-10'),
  },
  // Project 2 - AI
  {
    id: 'photo-2',
    project_id: 'project-2',
    photo_url: 'https://picsum.photos/seed/ai/800/600',
    caption: 'AI interface',
    order: 1,
    created_at: new Date('2023-09-01'),
  },
  {
    id: 'photo-2b',
    project_id: 'project-2',
    photo_url: 'https://picsum.photos/seed/ai1/800/600',
    caption: 'Content generation results',
    order: 2,
    created_at: new Date('2023-09-05'),
  },
  {
    id: 'photo-2c',
    project_id: 'project-2',
    photo_url: 'https://picsum.photos/seed/ai2/800/600',
    caption: 'Analytics dashboard',
    order: 3,
    created_at: new Date('2023-09-10'),
  },
  // Project 3 - Mobile
  {
    id: 'photo-3',
    project_id: 'project-3',
    photo_url: 'https://picsum.photos/seed/mobile/800/600',
    caption: 'Mobile app interface',
    order: 1,
    created_at: new Date('2023-10-01'),
  },
  {
    id: 'photo-3b',
    project_id: 'project-3',
    photo_url: 'https://picsum.photos/seed/mobile1/800/600',
    caption: 'Task management view',
    order: 2,
    created_at: new Date('2023-10-05'),
  },
  {
    id: 'photo-3c',
    project_id: 'project-3',
    photo_url: 'https://picsum.photos/seed/mobile2/800/600',
    caption: 'Notification system',
    order: 3,
    created_at: new Date('2023-10-10'),
  },
  // Project 4 - Analytics
  {
    id: 'photo-4',
    project_id: 'project-4',
    photo_url: 'https://picsum.photos/seed/analytics/800/600',
    caption: 'Dashboard preview',
    order: 1,
    created_at: new Date('2023-07-01'),
  },
  {
    id: 'photo-4b',
    project_id: 'project-4',
    photo_url: 'https://picsum.photos/seed/analytics1/800/600',
    caption: 'Real-time metrics',
    order: 2,
    created_at: new Date('2023-07-05'),
  },
  {
    id: 'photo-4c',
    project_id: 'project-4',
    photo_url: 'https://picsum.photos/seed/analytics2/800/600',
    caption: 'Custom reporting',
    order: 3,
    created_at: new Date('2023-07-10'),
  },
  // Project 5 - Chat
  {
    id: 'photo-5',
    project_id: 'project-5',
    photo_url: 'https://picsum.photos/seed/chat/800/600',
    caption: 'Chat interface',
    order: 1,
    created_at: new Date('2023-11-01'),
  },
  {
    id: 'photo-5b',
    project_id: 'project-5',
    photo_url: 'https://picsum.photos/seed/chat1/800/600',
    caption: 'Group chat features',
    order: 2,
    created_at: new Date('2023-11-05'),
  },
  {
    id: 'photo-5c',
    project_id: 'project-5',
    photo_url: 'https://picsum.photos/seed/chat2/800/600',
    caption: 'Media sharing',
    order: 3,
    created_at: new Date('2023-11-10'),
  },
  // Project 6 - Design System
  {
    id: 'photo-6',
    project_id: 'project-6',
    photo_url: 'https://picsum.photos/seed/design/800/600',
    caption: 'Component library',
    order: 1,
    created_at: new Date('2023-08-01'),
  },
  {
    id: 'photo-6b',
    project_id: 'project-6',
    photo_url: 'https://picsum.photos/seed/design1/800/600',
    caption: 'Typography system',
    order: 2,
    created_at: new Date('2023-08-05'),
  },
  {
    id: 'photo-6c',
    project_id: 'project-6',
    photo_url: 'https://picsum.photos/seed/design2/800/600',
    caption: 'Color palette and tokens',
    order: 3,
    created_at: new Date('2023-08-10'),
  },
];

// Mock Project Technologies (relationships)
const mockProjectTechnologies: ProjectTechnology[] = [
  { id: 'pt-1', project_id: 'project-1', technology_id: 'tech-1', percentage_used: 85, technology: mockTechnologies[0] },
  { id: 'pt-2', project_id: 'project-1', technology_id: 'tech-2', percentage_used: 100, technology: mockTechnologies[1] },
  { id: 'pt-3', project_id: 'project-1', technology_id: 'tech-3', percentage_used: 90, technology: mockTechnologies[2] },
  { id: 'pt-4', project_id: 'project-2', technology_id: 'tech-1', percentage_used: 95, technology: mockTechnologies[0] },
  { id: 'pt-5', project_id: 'project-2', technology_id: 'tech-5', percentage_used: 80, technology: mockTechnologies[4] },
  { id: 'pt-6', project_id: 'project-3', technology_id: 'tech-3', percentage_used: 100, technology: mockTechnologies[2] },
  { id: 'pt-7', project_id: 'project-4', technology_id: 'tech-2', percentage_used: 100, technology: mockTechnologies[1] },
  { id: 'pt-8', project_id: 'project-4', technology_id: 'tech-4', percentage_used: 85, technology: mockTechnologies[3] },
  { id: 'pt-9', project_id: 'project-5', technology_id: 'tech-1', percentage_used: 90, technology: mockTechnologies[0] },
  { id: 'pt-10', project_id: 'project-5', technology_id: 'tech-5', percentage_used: 85, technology: mockTechnologies[4] },
  { id: 'pt-11', project_id: 'project-6', technology_id: 'tech-4', percentage_used: 100, technology: mockTechnologies[3] },
];

// Mock Reviews
const mockReviews: Review[] = [
  // Project 1 Reviews
  {
    id: 'review-1',
    project_id: 'project-1',
    reviewer_name: 'John Smith',
    reviewer_role: 'CTO',
    reviewer_company: 'RetailCo',
    comment: 'Exceptional work on the e-commerce platform. The team delivered exactly what we needed, on time and within budget.',
    rating: 5,
    created_at: new Date('2024-01-15'),
  },
  {
    id: 'review-3',
    project_id: 'project-1',
    reviewer_name: 'Michael Brown',
    reviewer_role: 'CEO',
    reviewer_company: 'StartupXYZ',
    comment: 'Professional team, excellent communication throughout the project.',
    rating: 4,
    created_at: new Date('2024-01-05'),
  },
  {
    id: 'review-1b',
    project_id: 'project-1',
    reviewer_name: 'Sarah Mitchell',
    reviewer_role: 'Operations Lead',
    reviewer_company: 'RetailCo',
    comment: 'The e-commerce platform has increased our conversion rate by 35%. Great work!',
    rating: 5,
    created_at: new Date('2024-01-20'),
  },
  // Project 2 Reviews
  {
    id: 'review-2a',
    project_id: 'project-2',
    reviewer_name: 'Dr. James Wilson',
    reviewer_role: 'Research Lead',
    reviewer_company: 'AI Innovations',
    comment: 'Impressive implementation of machine learning models. The API is well-designed and efficient.',
    rating: 5,
    created_at: new Date('2024-01-18'),
  },
  // Project 4 Reviews
  {
    id: 'review-2',
    project_id: 'project-4',
    reviewer_name: 'Lisa Anderson',
    reviewer_role: 'Product Manager',
    reviewer_company: 'DataViz Inc',
    comment: 'The analytics dashboard has transformed how we track our metrics. Clean UI and powerful insights.',
    rating: 5,
    created_at: new Date('2024-01-10'),
  },
  {
    id: 'review-2b',
    project_id: 'project-4',
    reviewer_name: 'David Chen',
    reviewer_role: 'Data Analyst',
    reviewer_company: 'DataViz Inc',
    comment: 'Fast performance even with large datasets. Excellent visualization options.',
    rating: 4,
    created_at: new Date('2024-01-12'),
  },
  // Project 5 Reviews
  {
    id: 'review-5a',
    project_id: 'project-5',
    reviewer_name: 'Emma Rodriguez',
    reviewer_role: 'CEO',
    reviewer_company: 'Communication Pro',
    comment: 'The chat application is secure, reliable, and user-friendly. Highly recommended!',
    rating: 5,
    created_at: new Date('2024-01-22'),
  },
];

// Mock Skills
const mockSkills: Skill[] = [
  // Sarah Chen skills
  {
    id: 'skill-1',
    name: 'React',
    mastery_percentage: 95,
    category: 'Frontend',
    owner_id: 'member-1',
    owner_type: OwnerType.MEMBER,
  },
  {
    id: 'skill-2',
    name: 'Node.js',
    mastery_percentage: 90,
    category: 'Backend',
    owner_id: 'member-1',
    owner_type: OwnerType.MEMBER,
  },
  {
    id: 'skill-5',
    name: 'TypeScript',
    mastery_percentage: 92,
    category: 'Language',
    owner_id: 'member-1',
    owner_type: OwnerType.MEMBER,
  },
  {
    id: 'skill-6',
    name: 'GraphQL',
    mastery_percentage: 85,
    category: 'Backend',
    owner_id: 'member-1',
    owner_type: OwnerType.MEMBER,
  },
  // Alex Rodriguez skills
  {
    id: 'skill-3',
    name: 'UI Design',
    mastery_percentage: 94,
    category: 'Design',
    owner_id: 'member-2',
    owner_type: OwnerType.MEMBER,
  },
  {
    id: 'skill-7',
    name: 'Figma',
    mastery_percentage: 96,
    category: 'Design',
    owner_id: 'member-2',
    owner_type: OwnerType.MEMBER,
  },
  {
    id: 'skill-8',
    name: 'User Research',
    mastery_percentage: 88,
    category: 'Design',
    owner_id: 'member-2',
    owner_type: OwnerType.MEMBER,
  },
  // Marcus Johnson skills
  {
    id: 'skill-4',
    name: 'Kubernetes',
    mastery_percentage: 92,
    category: 'DevOps',
    owner_id: 'member-3',
    owner_type: OwnerType.MEMBER,
  },
  {
    id: 'skill-9',
    name: 'Docker',
    mastery_percentage: 94,
    category: 'DevOps',
    owner_id: 'member-3',
    owner_type: OwnerType.MEMBER,
  },
  {
    id: 'skill-10',
    name: 'AWS',
    mastery_percentage: 90,
    category: 'DevOps',
    owner_id: 'member-3',
    owner_type: OwnerType.MEMBER,
  },
  // Emma Wilson skills
  {
    id: 'skill-11',
    name: 'PostgreSQL',
    mastery_percentage: 93,
    category: 'Backend',
    owner_id: 'member-4',
    owner_type: OwnerType.MEMBER,
  },
  {
    id: 'skill-12',
    name: 'API Design',
    mastery_percentage: 91,
    category: 'Backend',
    owner_id: 'member-4',
    owner_type: OwnerType.MEMBER,
  },
  {
    id: 'skill-13',
    name: 'Performance Optimization',
    mastery_percentage: 89,
    category: 'Backend',
    owner_id: 'member-4',
    owner_type: OwnerType.MEMBER,
  },
];

// Mock Contacts
const mockContacts: Contact[] = [
  {
    id: 'contact-1',
    owner_id: 'org-1',
    owner_type: OwnerType.ORGANIZATION,
    contact_type: ContactType.EMAIL,
    value: 'hello@techflow.dev',
    is_primary: true,
  },
  {
    id: 'contact-2',
    owner_id: 'org-1',
    owner_type: OwnerType.ORGANIZATION,
    contact_type: ContactType.GITHUB,
    value: 'https://github.com/techflow',
    is_primary: false,
  },
  {
    id: 'contact-3',
    owner_id: 'org-1',
    owner_type: OwnerType.ORGANIZATION,
    contact_type: ContactType.LINKEDIN,
    value: 'https://linkedin.com/company/techflow',
    is_primary: false,
  },
];

// Mock Work Experiences
const mockWorkExperiences: WorkExperience[] = [
  // Sarah Chen - Member 1
  {
    id: 'work-1',
    member_id: 'member-1',
    company_name: 'TechFlow Inc',
    job_title: 'Lead Developer',
    work_type: WorkType.FULL_TIME,
    description: 'Leading development of core products and mentoring junior developers',
    start_date: new Date('2023-02-01'),
    end_date: null,
    is_current: true,
    created_at: new Date('2023-02-01'),
    updated_at: new Date('2024-01-01'),
  },
  {
    id: 'work-1b',
    member_id: 'member-1',
    company_name: 'Digital Solutions Inc',
    job_title: 'Full Stack Developer',
    work_type: WorkType.FULL_TIME,
    description: 'Developed web applications using React and Node.js for enterprise clients',
    start_date: new Date('2021-06-01'),
    end_date: new Date('2023-01-31'),
    is_current: false,
    created_at: new Date('2021-06-01'),
    updated_at: new Date('2023-01-31'),
  },
  // Alex Rodriguez - Member 2
  {
    id: 'work-2',
    member_id: 'member-2',
    company_name: 'TechFlow Inc',
    job_title: 'UI/UX Designer',
    work_type: WorkType.FULL_TIME,
    description: 'Designing intuitive interfaces and conducting user research for digital products',
    start_date: new Date('2023-03-01'),
    end_date: null,
    is_current: true,
    created_at: new Date('2023-03-01'),
    updated_at: new Date('2024-01-01'),
  },
  {
    id: 'work-2b',
    member_id: 'member-2',
    company_name: 'Creative Studio Co',
    job_title: 'Graphic Designer',
    work_type: WorkType.FULL_TIME,
    description: 'Created visual assets and brand identities for various clients',
    start_date: new Date('2020-01-01'),
    end_date: new Date('2023-02-28'),
    is_current: false,
    created_at: new Date('2020-01-01'),
    updated_at: new Date('2023-02-28'),
  },
  // Marcus Johnson - Member 3
  {
    id: 'work-3',
    member_id: 'member-3',
    company_name: 'TechFlow Inc',
    job_title: 'DevOps Engineer',
    work_type: WorkType.FULL_TIME,
    description: 'Managing cloud infrastructure and ensuring system reliability and performance',
    start_date: new Date('2023-04-01'),
    end_date: null,
    is_current: true,
    created_at: new Date('2023-04-01'),
    updated_at: new Date('2024-01-01'),
  },
  {
    id: 'work-3b',
    member_id: 'member-3',
    company_name: 'CloudFirst Technologies',
    job_title: 'Infrastructure Engineer',
    work_type: WorkType.FULL_TIME,
    description: 'Automated deployment processes and managed AWS infrastructure for startup',
    start_date: new Date('2021-09-01'),
    end_date: new Date('2023-03-31'),
    is_current: false,
    created_at: new Date('2021-09-01'),
    updated_at: new Date('2023-03-31'),
  },
  // Emma Wilson - Member 4
  {
    id: 'work-4',
    member_id: 'member-4',
    company_name: 'TechFlow Inc',
    job_title: 'Backend Developer',
    work_type: WorkType.FULL_TIME,
    description: 'Building scalable backend systems and optimizing database performance',
    start_date: new Date('2023-05-01'),
    end_date: null,
    is_current: true,
    created_at: new Date('2023-05-01'),
    updated_at: new Date('2024-01-01'),
  },
  {
    id: 'work-4b',
    member_id: 'member-4',
    company_name: 'DataCore Systems',
    job_title: 'Software Engineer',
    work_type: WorkType.FULL_TIME,
    description: 'Designed and implemented database schemas for financial applications',
    start_date: new Date('2020-03-01'),
    end_date: new Date('2023-04-30'),
    is_current: false,
    created_at: new Date('2020-03-01'),
    updated_at: new Date('2023-04-30'),
  },
];

// Async data fetching functions (simulating API calls)
export async function fetchOrganization(): Promise<Organization> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockOrganization;
}

export async function fetchMembers(): Promise<Member[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockMembers;
}

export async function fetchMemberById(id: string): Promise<Member | null> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockMembers.find(m => m.id === id) || null;
}

export async function fetchProjects(): Promise<Project[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockProjects;
}

export async function fetchProjectById(id: string): Promise<Project | null> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockProjects.find(p => p.id === id) || null;
}

export async function fetchProjectsByOwner(
  ownerId: string,
  ownerType: OwnerType
): Promise<Project[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockProjects.filter(
    p => p.owner_id === ownerId && p.owner_type === ownerType
  );
}

export async function fetchTechnologies(): Promise<Technology[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockTechnologies;
}

export async function fetchProjectPhotos(projectId: string): Promise<ProjectPhoto[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockProjectPhotos.filter(pp => pp.project_id === projectId);
}

export async function fetchProjectTechnologies(
  projectId: string
): Promise<ProjectTechnology[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockProjectTechnologies.filter(pt => pt.project_id === projectId);
}

export async function fetchSkills(
  ownerId: string,
  ownerType: OwnerType
): Promise<Skill[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockSkills.filter(s => s.owner_id === ownerId && s.owner_type === ownerType);
}

export async function fetchContacts(
  ownerId: string,
  ownerType: OwnerType
): Promise<Contact[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockContacts.filter(c => c.owner_id === ownerId && c.owner_type === ownerType);
}

export async function fetchReviews(projectId: string): Promise<Review[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockReviews.filter(r => r.project_id === projectId);
}

export async function fetchWorkExperiences(memberId: string): Promise<WorkExperience[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockWorkExperiences.filter(we => we.member_id === memberId);
}



export async function searchProjects(query: string): Promise<Project[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  const lowerQuery = query.toLowerCase();
  return mockProjects.filter(
    p =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
  );
}

export async function searchMembers(query: string): Promise<Member[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  const lowerQuery = query.toLowerCase();
  return mockMembers.filter(
    m =>
      m.name.toLowerCase().includes(lowerQuery) ||
      m.role.toLowerCase().includes(lowerQuery) ||
      (m.bio && m.bio.toLowerCase().includes(lowerQuery))
  );
}

export async function fetchMemberProjects(
  memberId: string
): Promise<Project[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockProjects.filter(
    p =>
      (p.owner_id === memberId && p.owner_type === OwnerType.MEMBER) ||
      // In a real app, this would check a join table for team membership
      [
        { projectId: 'project-1', memberIds: ['member-1', 'member-2'] },
        { projectId: 'project-2', memberIds: ['member-1'] },
        { projectId: 'project-3', memberIds: ['member-3', 'member-4'] },
        { projectId: 'project-4', memberIds: ['member-2', 'member-4'] },
        { projectId: 'project-5', memberIds: ['member-3', 'member-1'] },
        { projectId: 'project-6', memberIds: ['member-2', 'member-1'] },
      ].some(pm => pm.projectId === p.id && pm.memberIds.includes(memberId))
  );
}

export async function fetchProjectTeam(projectId: string): Promise<Member[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  const teamMap: Record<string, string[]> = {
    'project-1': ['member-1', 'member-2', 'member-4'],
    'project-2': ['member-1'],
    'project-3': ['member-3', 'member-4', 'member-1'],
    'project-4': ['member-2', 'member-4'],
    'project-5': ['member-3', 'member-1'],
    'project-6': ['member-2', 'member-1', 'member-3'],
  };
  const memberIds = teamMap[projectId] || [];
  return mockMembers.filter(m => memberIds.includes(m.id));
}

export async function fetchProjectReviewsWithStats(
  projectId: string
): Promise<{ reviews: Review[]; averageRating: number; totalReviews: number }> {
  await new Promise(resolve => setTimeout(resolve, 300));
  const reviews = mockReviews.filter(r => r.project_id === projectId);
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;
  return {
    reviews,
    averageRating: Math.round(averageRating * 10) / 10,
    totalReviews: reviews.length,
  };
}

export async function fetchMemberWithRelations(
  memberId: string
): Promise<{
  member: Member | null;
  skills: Skill[];
  workExperiences: WorkExperience[];
  contacts: Contact[];
} | null> {
  const member = await fetchMemberById(memberId);
  if (!member) return null;
  const [skills, workExperiences, contacts] = await Promise.all([
    fetchSkills(memberId, OwnerType.MEMBER),
    fetchWorkExperiences(memberId),
    fetchContacts(memberId, OwnerType.MEMBER),
  ]);
  return { member, skills, workExperiences, contacts };
}

export async function fetchProjectWithRelations(
  projectId: string
): Promise<{
  project: Project | null;
  photos: ProjectPhoto[];
  technologies: ProjectTechnology[];
  reviews: Review[];
  teamMembers: Member[];
  reviewStats: { averageRating: number; totalReviews: number };
} | null> {
  const project = await fetchProjectById(projectId);
  if (!project) return null;
  const [photos, technologies, reviewData, teamMembers] = await Promise.all([
    fetchProjectPhotos(projectId),
    fetchProjectTechnologies(projectId),
    fetchProjectReviewsWithStats(projectId),
    fetchProjectTeam(projectId),
  ]);
  return {
    project,
    photos,
    technologies,
    reviews: reviewData.reviews,
    teamMembers,
    reviewStats: {
      averageRating: reviewData.averageRating,
      totalReviews: reviewData.totalReviews,
    },
  };
}
