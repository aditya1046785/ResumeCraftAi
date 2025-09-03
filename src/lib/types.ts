export interface ResumeData {
  name: string;
  contact: string;
  summary: string;
  experience: string;
  education: string;
  projects: string;
  skills: string;
}

export type ResumeSection = keyof ResumeData;

export interface Message {
  role: 'user' | 'model';
  text: string;
}
