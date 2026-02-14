// Enums
export enum OwnerType {
  ORGANIZATION = 'ORGANIZATION',
  MEMBER = 'MEMBER',
}

export enum ContactType {
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
  WEBSITE = 'WEBSITE',
  LINKEDIN = 'LINKEDIN',
  GITHUB = 'GITHUB',
  TWITTER = 'TWITTER',
  INSTAGRAM = 'INSTAGRAM',
}

export enum ProjectStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  ARCHIVED = 'ARCHIVED',
}

export enum ProjectType {
  WEB = 'WEB',
  MOBILE = 'MOBILE',
  DESIGN = 'DESIGN',
  OTHER = 'OTHER',
}

export enum ExperienceType {
  WORK = 'WORK',
  EDUCATION = 'EDUCATION',
}

export enum WorkType {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  CONTRACT = 'CONTRACT',
  FREELANCE = 'FREELANCE',
}

export enum DocumentPrivacy {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  ORGANIZATION = 'ORGANIZATION',
}

// Core Types
export interface Organization {
  id: string;
  name: string;
  description: string;
  objective: string;
  about: string;
  website_url: string | null;
  logo_url: string | null;
  cover_photo_url: string | null;
  email: string | null;
  phone: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  bio: string | null;
  objective: string | null;
  about: string | null;
  display_photo_url: string | null;
  cover_photo_url: string | null;
  organization_id: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  owner_id: string;
  owner_type: OwnerType;
  status: ProjectStatus;
  project_type: ProjectType;
  start_date: Date | null;
  end_date: Date | null;
  github_url: string | null;
  live_url: string | null;
  media_url: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface ProjectPhoto {
  id: string;
  project_id: string;
  photo_url: string;
  caption: string | null;
  order: number;
  created_at: Date;
}

export interface Technology {
  id: string;
  name: string;
  category: string;
  icon_url: string | null;
  color: string | null;
}

export interface ProjectTechnology {
  id: string;
  project_id: string;
  technology_id: string;
  percentage_used: number;
  technology?: Technology;
}

export interface Skill {
  id: string;
  name: string;
  mastery_percentage: number;
  category: string | null;
  owner_id: string;
  owner_type: OwnerType;
}

export interface Contact {
  id: string;
  owner_id: string;
  owner_type: OwnerType;
  contact_type: ContactType;
  value: string;
  is_primary: boolean;
}

export interface Review {
  id: string;
  project_id: string;
  reviewer_name: string;
  reviewer_role: string;
  reviewer_company: string | null;
  comment: string;
  rating: number;
  created_at: Date;
}

export interface WorkExperience {
  id: string;
  member_id: string;
  company_name: string;
  job_title: string;
  work_type: WorkType;
  description: string | null;
  start_date: Date;
  end_date: Date | null;
  is_current: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Document {
  id: string;
  member_id: string;
  title: string;
  description: string | null;
  file_url: string;
  privacy: DocumentPrivacy;
  created_at: Date;
  updated_at: Date;
}

// Relationship Types (populated entities)
export interface ProjectWithPhotosAndTechs extends Project {
  projectPhotos: ProjectPhoto[];
  technologies: ProjectTechnology[];
  reviews: Review[];
  teamMembers?: TeamMember[];
}

export interface TeamMember extends Member {
  role_on_project: string;
}

export interface MemberWithSkills extends Member {
  skills: Skill[];
  contacts: Contact[];
  workExperiences: WorkExperience[];
  documents: Document[];
}

export interface OrganizationWithRelations extends Organization {
  members: Member[];
  projects: Project[];
  skills: Skill[];
  contacts: Contact[];
}
