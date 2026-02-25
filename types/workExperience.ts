// types/workExperience.ts
export interface WorkExperience {
  id: string;
  job_title: string;
  company_name: string;
  company_logo?: string;
  work_description: string;
  date_started: string;
  date_completed?: string; // undefined for current role
  is_current: boolean;
  employment_type: 'full-time' | 'part-time' | 'freelance' | 'contract' | 'internship';
  location: string;
  location_type: 'remote' | 'hybrid' | 'on-site';
  responsibilities: string[];
  technologies_used: string[];
  achievements: string[];
  company_website?: string;
}