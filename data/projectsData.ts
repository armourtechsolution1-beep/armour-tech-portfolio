// data/projectsData.ts
import { StaticProject } from "@/types/projects";

export const projectsData: StaticProject[] = [
  // GROUP PROJECTS
  {
    id: "gp1",
    project_name: "E-Health Records System",
    project_description: "A comprehensive electronic health records system for a regional hospital network. Features patient management, appointment scheduling, and secure data sharing between healthcare providers.",
    project_type: "web",
    display_photo_url: "/projectPlaceholder.jpg",
    date_started: "2023-01-15",
    date_completed: "2023-08-30",
    contribution_percentage: 35,
    category: "group",
    technologies: ["React", "Node.js", "PostgreSQL", "Docker", "FHIR API"],
    project_url: "https://ehealth-demo.com",
    github_url: "https://github.com/org/ehealth",
    team_members: [
      { name: "Sarah Johnson", role: "Project Lead" },
      { name: "Michael Chen", role: "Backend Developer" },
      { name: "Malcom Apunda", role: "Frontend Developer" },
      { name: "Priya Patel", role: "Database Architect" },
      { name: "James Wilson", role: "Security Specialist" }
    ]
  },
  {
    id: "gp2",
    project_name: "Smart Campus Mobile App",
    project_description: "A cross-platform mobile application for university students to access course materials, check schedules, receive notifications, and interact with faculty members.",
    project_type: "cross_platform",
    display_photo_url: "/projectPlaceholder.jpg",
    date_started: "2023-09-10",
    date_completed: "2024-02-28",
    contribution_percentage: 40,
    category: "group",
    technologies: ["React Native", "Firebase", "Redux", "Expo", "Push Notifications"],
    project_url: "https://smartcampus.app",
    github_url: "https://github.com/org/smartcampus",
    team_members: [
      { name: "Alex Rivera", role: "Mobile Lead" },
      { name: "Malcom Apunda", role: "UI/UX & Frontend" },
      { name: "Lisa Wang", role: "Backend Integration" },
      { name: "David Kim", role: "Testing & QA" }
    ]
  },
  {
    id: "gp3",
    project_name: "Inventory Management System",
    project_description: "A Windows desktop application for a retail chain to manage inventory, track sales, generate reports, and automate reordering processes.",
    project_type: "windows",
    display_photo_url: "/projectPlaceholder.jpg",
    date_started: "2022-11-05",
    date_completed: "2023-04-20",
    contribution_percentage: 25,
    category: "group",
    technologies: ["C#", ".NET Core", "SQL Server", "Windows Forms", "Entity Framework"],
    project_url: "https://inventory-demo.com",
    github_url: "https://github.com/org/inventory",
    team_members: [
      { name: "Robert Garcia", role: "Backend Lead" },
      { name: "Malcom Apunda", role: "Frontend Developer" },
      { name: "Emily Zhang", role: "Database Design" }
    ]
  },
  {
    id: "gp4",
    project_name: "FinTech Dashboard",
    project_description: "A financial analytics dashboard for investment firms to visualize market data, track portfolios, and generate performance reports in real-time.",
    project_type: "web",
    display_photo_url: "/projectPlaceholder.jpg",
    date_started: "2023-05-15",
    date_completed: "2023-12-10",
    contribution_percentage: 30,
    category: "group",
    technologies: ["Next.js", "TypeScript", "D3.js", "Express", "MongoDB", "WebSockets"],
    project_url: "https://fintech-demo.com",
    github_url: "https://github.com/org/fintech",
    team_members: [
      { name: "Malcom Apunda", role: "Frontend Architect" },
      { name: "Jessica Brown", role: "Data Visualization" },
      { name: "Thomas Lee", role: "API Development" }
    ]
  },
  {
    id: "gp5",
    project_name: "Community Forum Platform",
    project_description: "A discussion platform for local communities to share news, organize events, and engage in topic-based discussions with moderation tools.",
    project_type: "web",
    display_photo_url: "/projectPlaceholder.jpg",
    date_started: "2023-02-20",
    contribution_percentage: 20,
    category: "group",
    technologies: ["Django", "PostgreSQL", "Bootstrap", "Celery", "Redis"],
    project_url: "https://community-forum.demo",
    github_url: "https://github.com/org/communityforum",
    team_members: [
      { name: "Daniel Martinez", role: "Backend Lead" },
      { name: "Malcom Apunda", role: "Frontend & Integration" },
      { name: "Rachel Green", role: "UI Designer" },
      { name: "Steven Adams", role: "DevOps" }
    ]
  },

  // PERSONAL PROJECTS
  {
    id: "pp1",
    project_name: "TaskFlow - Personal Productivity",
    project_description: "A minimalist task management application with Kanban boards, time tracking, and productivity analytics. Built to streamline personal workflow.",
    project_type: "web",
    display_photo_url: "/projectPlaceholder.jpg",
    date_started: "2023-10-01",
    date_completed: "2024-01-15",
    contribution_percentage: 100,
    category: "personal",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Supabase", "DnD Kit"],
    project_url: "https://taskflow-demo.vercel.app",
    github_url: "https://github.com/malcom/taskflow"
  },
  {
    id: "pp2",
    project_name: "WeatherWear",
    project_description: "A mobile app that suggests outfits based on weather forecasts. Uses location data and machine learning to provide personalized clothing recommendations.",
    project_type: "android",
    display_photo_url: "/projectPlaceholder.jpg",
    date_started: "2023-07-15",
    contribution_percentage: 100,
    category: "personal",
    technologies: ["Kotlin", "Jetpack Compose", "OpenWeather API", "Room Database", "ML Kit"],
    project_url: "https://play.google.com/store/apps/weatherwear",
    github_url: "https://github.com/malcom/weatherwear"
  },
  {
    id: "pp3",
    project_name: "Dev Portfolio V2",
    project_description: "A modern, animated portfolio website showcasing projects and skills. Features smooth transitions, dark mode, and responsive design.",
    project_type: "web",
    display_photo_url: "/projectPlaceholder.jpg",
    date_started: "2024-01-10",
    date_completed: "2024-02-20",
    contribution_percentage: 100,
    category: "personal",
    technologies: ["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript"],
    project_url: "https://malcom.dev",
    github_url: "https://github.com/malcom/portfolio"
  },
  {
    id: "pp4",
    project_name: "Budget Buddy",
    project_description: "A command-line expense tracking tool with data visualization, budget alerts, and export capabilities. Perfect for developers who prefer terminal-based tools.",
    project_type: "command_line",
    display_photo_url: "/projectPlaceholder.jpg",
    date_started: "2023-08-05",
    date_completed: "2023-09-18",
    contribution_percentage: 100,
    category: "personal",
    technologies: ["Python", "Click", "SQLite", "Matplotlib", "Rich Library"],
    github_url: "https://github.com/malcom/budgetbuddy"
  },
  {
    id: "pp5",
    project_name: "Snake Game AI",
    project_description: "Classic snake game implementation with an AI agent that learns to play using reinforcement learning algorithms.",
    project_type: "gaming",
    display_photo_url: "/projectPlaceholder.jpg",
    date_started: "2023-11-20",
    date_completed: "2023-12-22",
    contribution_percentage: 100,
    category: "personal",
    technologies: ["Python", "Pygame", "TensorFlow", "OpenAI Gym", "Reinforcement Learning"],
    github_url: "https://github.com/malcom/snake-ai"
  },
  {
    id: "pp6",
    project_name: "Markdown Blog Engine",
    project_description: "A lightweight blog engine that renders markdown files into a beautiful blog with syntax highlighting and SEO optimization.",
    project_type: "web",
    display_photo_url: "/projectPlaceholder.jpg",
    date_started: "2024-01-05",
    contribution_percentage: 100,
    category: "personal",
    technologies: ["Next.js", "MDX", "Tailwind CSS", "Gray Matter", "Prism.js"],
    project_url: "https://blog-demo.vercel.app",
    github_url: "https://github.com/malcom/blog-engine"
  }
];