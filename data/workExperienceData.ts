// data/workExperienceData.ts
import { WorkExperience } from '@/types/workExperience';

export const workExperienceData: WorkExperience[] = [
  {
    id: 'exp-001',
    job_title: 'Senior Software Engineer',
    company_name: 'TechInnovate Solutions',
    company_logo: '/Logo.jpeg',
    work_description: 'Lead developer for enterprise-scale web applications, architecting scalable solutions and mentoring junior developers. Spearheaded the migration of legacy systems to modern cloud-native architecture.',
    date_started: '2023-01-15',
    is_current: true,
    employment_type: 'full-time',
    location: 'San Francisco, CA',
    location_type: 'hybrid',
    responsibilities: [
      'Architect and implement microservices-based solutions',
      'Lead code reviews and technical design discussions',
      'Mentor junior and mid-level developers',
      'Collaborate with product managers on feature roadmap'
    ],
    technologies_used: [
      'React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 
      'Kubernetes', 'PostgreSQL', 'GraphQL', 'Redis'
    ],
    achievements: [
      'Reduced API response time by 45% through query optimization and caching strategies',
      'Led migration of 10+ services from monolithic to microservices architecture',
      'Implemented CI/CD pipeline reducing deployment time by 60%',
      'Mentored 5 junior developers who were promoted within 1 year'
    ],
    company_website: 'https://techinnovate.example.com'
  },
  {
    id: 'exp-002',
    job_title: 'Software Engineer',
    company_name: 'DataFlow Systems',
    company_logo: '/Logo.jpeg',
    work_description: 'Full-stack developer focused on building data-intensive applications for financial services clients. Collaborated with cross-functional teams to deliver robust, scalable solutions.',
    date_started: '2021-03-10',
    date_completed: '2022-12-20',
    is_current: false,
    employment_type: 'full-time',
    location: 'Austin, TX',
    location_type: 'on-site',
    responsibilities: [
      'Developed RESTful APIs for financial data processing',
      'Implemented real-time data visualization dashboards',
      'Optimized database queries for large-scale datasets',
      'Participated in agile ceremonies and sprint planning'
    ],
    technologies_used: [
      'Python', 'Django', 'React', 'PostgreSQL', 'Redis',
      'Docker', 'Celery', 'Pandas', 'WebSockets'
    ],
    achievements: [
      'Built real-time dashboard processing 1M+ daily transactions',
      'Reduced data processing time from 4 hours to 15 minutes',
      'Received Employee of the Quarter award for critical system optimization',
      'Presented technical workshops on Python optimization techniques'
    ],
    company_website: 'https://dataflow.example.com'
  },
  {
    id: 'exp-003',
    job_title: 'Frontend Developer',
    company_name: 'Creative Digital Agency',
    company_logo: '/Logo.jpeg',
    work_description: 'Designed and developed responsive web applications for diverse clients across e-commerce, healthcare, and education sectors. Focused on creating exceptional user experiences.',
    date_started: '2019-08-01',
    date_completed: '2021-02-28',
    is_current: false,
    employment_type: 'full-time',
    location: 'Chicago, IL',
    location_type: 'on-site',
    responsibilities: [
      'Translated design mockups into responsive web interfaces',
      'Implemented client-side state management solutions',
      'Optimized application performance and loading times',
      'Collaborated with UX designers on interactive prototypes'
    ],
    technologies_used: [
      'JavaScript', 'React', 'Redux', 'SASS', 'Webpack',
      'Jest', 'Figma', 'Storybook'
    ],
    achievements: [
      'Developed component library used across 15+ client projects',
      'Improved page load speed by 40% through code splitting and lazy loading',
      'Mentored 2 interns who were subsequently hired full-time',
      'Received Client Excellence Award for e-commerce platform delivery'
    ],
    company_website: 'https://creativeagency.example.com'
  },
  {
    id: 'exp-004',
    job_title: 'Freelance Web Developer',
    company_name: 'Self-Employed',
    work_description: 'Provided web development services to small businesses and startups. Managed full project lifecycle from requirements gathering to deployment and maintenance.',
    date_started: '2018-01-10',
    date_completed: '2019-07-30',
    is_current: false,
    employment_type: 'freelance',
    location: 'Remote',
    location_type: 'remote',
    responsibilities: [
      'Consulted with clients to define project requirements',
      'Designed and developed custom websites and web applications',
      'Managed hosting, domains, and ongoing maintenance',
      'Provided technical guidance and training to clients'
    ],
    technologies_used: [
      'WordPress', 'PHP', 'JavaScript', 'HTML/CSS', 'MySQL',
      'jQuery', 'Bootstrap', 'cPanel'
    ],
    achievements: [
      'Delivered 25+ successful client projects with 100% satisfaction rate',
      'Built recurring maintenance contracts with 80% of clients',
      'Developed custom WordPress plugins for specific client needs',
      'Created portfolio that generated consistent referral business'
    ]
  },
  {
    id: 'exp-005',
    job_title: 'Web Development Intern',
    company_name: 'StartUp Labs',
    company_logo: '/Logo.jpeg',
    work_description: 'Internship focused on learning modern web development practices while contributing to real-world projects. Gained hands-on experience with agile development.',
    date_started: '2017-06-01',
    date_completed: '2017-12-15',
    is_current: false,
    employment_type: 'internship',
    location: 'Boston, MA',
    location_type: 'on-site',
    responsibilities: [
      'Assisted senior developers with feature implementation',
      'Participated in daily stand-ups and sprint reviews',
      'Wrote unit tests and performed bug fixes',
      'Documented code and technical processes'
    ],
    technologies_used: [
      'HTML', 'CSS', 'JavaScript', 'React', 'Git',
      'Jest', 'REST APIs'
    ],
    achievements: [
      'Contributed to 3 production applications within first month',
      'Developed internal tool used by 20+ team members',
      'Presented final project demonstrating full-stack capabilities',
      'Received internship-to-hire offer (declined to pursue freelance)'
    ],
    company_website: 'https://startuplabs.example.com'
  }
];