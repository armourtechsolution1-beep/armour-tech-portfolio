// types/documents.ts
export type DocumentType = 'certificate' | 'resume' | 'transcript' | 'recommendation' | 'thesis' | 'publication' | 'patent' | 'whitepaper';
export type DocumentPrivacy = 'public' | 'private' | 'read_only';
export type DocumentStatus = 'pending' | 'approved' | 'rejected';

export interface Document {
  id: string;
  document_name: string;
  description?: string;
  file_name: string;
  file_size: number; // in bytes
  file_type: string;
  file_extension: string;
  document_type: DocumentType;
  document_privacy: DocumentPrivacy;
  upload_date: string;
  last_modified: string;
  download_count: number;
  tags: string[];
  thumbnail_url?: string;
  storage_url?: string;
  is_featured: boolean;
}

export interface DocumentDownloadRequest {
  id: string;
  document_id: string;
  requester_email: string;
  requester_name?: string;
  request_message?: string;
  request_date: string;
  status: DocumentStatus;
  ref_code: string;
}