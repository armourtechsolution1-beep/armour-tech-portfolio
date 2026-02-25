// types/certificates.ts
export interface Certificate {
  id: string;
  cert_name: string;
  cert_description: string;
  cert_provider: string;
  issue_date: string;
  expiry_date?: string;
  credential_id: string;
  credential_url?: string;
  skills_covered: string[];
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  certificate_image?: string;
  badge_color: string;
  is_valid: boolean;
}