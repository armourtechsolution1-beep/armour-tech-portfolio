'use client';

import type {
  Project,
  ProjectPhoto,
  ProjectTechnology,
  Review,
  Member,
  Skill,
  Contact,
  WorkExperience,
} from './types';

// Utility functions for combining related data
export function getProjectWithDetails(
  project: Project,
  photos: ProjectPhoto[],
  technologies: ProjectTechnology[],
  reviews: Review[]
) {
  return {
    ...project,
    projectPhotos: photos,
    technologies,
    reviews,
  };
}

export function getMemberWithDetails(
  member: Member,
  skills: Skill[],
  contacts: Contact[],
  workExperiences: WorkExperience[]
) {
  return {
    ...member,
    skills,
    contacts,
    workExperiences,
  };
}
