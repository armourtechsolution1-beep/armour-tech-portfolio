// types/contact.ts
export type ContactType = 'facebook' |
 'instagram' | 
 'email' | 
 'discord' |
  'github' |
   'whatsapp' |
    'telephone' |
     'website'|
     'linkedin'|
     'twitter'|
     'youtube'|
     'twitch'|
     'slack'|
     'telegram'|
     'signal'|
     'other';
export type ContactAvailability = 'unavailable' | 'alltime' | 'weekends' | 'weekdays' | 'monthly' | 'annually';

export interface ContactTemplate {
  id: string;
  display_name: string;
  base_url: string;
  contact_type: ContactType;
}

export interface MemberContact {
  id: string;
  template_id: string;
  member_id: string;
  user_name: string;
  hyperlink: string;
  contact_availability: ContactAvailability;
  availability_time_interval?: {
    from: string;
    to: string;
  };
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface OrganizationMember {
  id: string;
  first_name: string;
  last_name: string;
  other_name?: string;
  gender: string;
  nationality: string;
  member_title: string;
  about?: string;
  profile_image?: string;
  organization_id: string;
  is_active: boolean;
  expertise_areas: string[];
  contacts: MemberContact[];
}