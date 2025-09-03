import { create } from 'zustand';
import type { ResumeData, ResumeSection } from '@/lib/types';

const initialResumeData: ResumeData = {
  name: "",
  contact: "",
  summary: "",
  experience: "",
  education: "",
  projects: "",
  skills: "",
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
