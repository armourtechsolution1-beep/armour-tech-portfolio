// lib/documentIcons.ts
import { DocumentType } from '@/types/documents';
import {
  FileText,
  FileBadge,
  GraduationCap,
  ScrollText,
  BookOpen,
  FileJson,
  FileCode,
  FileSpreadsheet,
  FileImage,
  FileArchive,
  FileVideo,
  FileAudio,
  File,
  Award,
  PenTool,
  Newspaper
} from 'lucide-react';

export const DocumentIconMap: Record<DocumentType, any> = {
  certificate: Award,
  resume: FileBadge,
  transcript: GraduationCap,
  recommendation: ScrollText,
  thesis: BookOpen,
  publication: Newspaper,
  patent: PenTool,
  whitepaper: FileText
};

export const FileExtensionIconMap: Record<string, any> = {
  pdf: FileText,
  doc: FileText,
  docx: FileText,
  txt: FileText,
  rtf: FileText,
  xls: FileSpreadsheet,
  xlsx: FileSpreadsheet,
  csv: FileSpreadsheet,
  ppt: FileText,
  pptx: FileText,
  jpg: FileImage,
  jpeg: FileImage,
  png: FileImage,
  gif: FileImage,
  svg: FileImage,
  webp: FileImage,
  zip: FileArchive,
  rar: FileArchive,
  '7z': FileArchive,
  tar: FileArchive,
  gz: FileArchive,
  mp4: FileVideo,
  mov: FileVideo,
  avi: FileVideo,
  mkv: FileVideo,
  mp3: FileAudio,
  wav: FileAudio,
  flac: FileAudio,
  json: FileJson,
  xml: FileCode,
  html: FileCode,
  css: FileCode,
  js: FileCode,
  ts: FileCode,
  jsx: FileCode,
  tsx: FileCode,
  py: FileCode,
  java: FileCode,
  cpp: FileCode,
  c: FileCode,
  go: FileCode,
  rs: FileCode,
  rb: FileCode,
  php: FileCode,
  sql: FileCode
};

export const getFileIcon = (extension: string, type: DocumentType) => {
  // Try to get icon by file extension first
  const extIcon = FileExtensionIconMap[extension.toLowerCase()];
  if (extIcon) return extIcon;
  
  // Fallback to document type icon
  const typeIcon = DocumentIconMap[type];
  if (typeIcon) return typeIcon;
  
  // Default icon
  return File;
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};