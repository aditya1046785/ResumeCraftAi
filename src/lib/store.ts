import { create } from 'zustand';
import type { ResumeData, ResumeSection } from '@/lib/types';

const initialResumeData: ResumeData = {
  name: "Your Name",
  contact: "your.email@example.com | 123-456-7890 | linkedin.com/in/yourprofile",
  summary: "A brief summary about your professional background and career goals.",
  experience: `Company Name | Job Title | City, State | MM/YYYY - MM/YYYY
- Responsibility or achievement 1.
- Responsibility or achievement 2.
- Responsibility or achievement 3.`,
  education: `University Name | Degree, Major | City, State | Graduated MM/YYYY
- Relevant coursework or honors.`,
  projects: `Project Name | Technologies Used
- Description of the project and your role.
- Link to repository or live version.`,
  skills: "Languages: JavaScript, Python, Java\nFrameworks: React, Node.js, Spring\nDatabases: MySQL, MongoDB",
};

interface ResumeState {
  resumeData: ResumeData;
  setResumeData: (data: ResumeData) => void;
  updateSection: (section: ResumeSection, content: string) => void;
}

export const useResumeStore = create<ResumeState>((set) => ({
  resumeData: initialResumeData,
  setResumeData: (data) => set({ resumeData: data }),
  updateSection: (section, content) =>
    set((state) => ({
      resumeData: { ...state.resumeData, [section]: content },
    })),
}));
