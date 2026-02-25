// types/projects.ts
export type ProjectType = 'android' | 'web' | 'ios' | 'windows' | 'cross_platform' | 'command_line' | 'gaming' | 'library';

export interface StaticProject {
  id: string;
  project_name: string;
  project_description: string;
  project_type: ProjectType;
  display_photo_url: string;
  date_started: string;
  date_completed?: string;
  contribution_percentage: number;
  category: 'group' | 'personal';
  technologies: string[];
  project_url?: string;
  github_url?: string;
  team_members?: {
    name: string;
    role: string;
  }[];
}