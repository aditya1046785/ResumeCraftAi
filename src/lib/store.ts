import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ResumeData, ResumeSection, Message } from '@/lib/types';

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
  history: Message[];
  setResumeData: (data: ResumeData) => void;
  updateSection: (section: ResumeSection, content: string) => void;
  setHistory: (history: Message[]) => void;
  addMessage: (message: Message) => void;
  clearChat: () => void;
}

export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      resumeData: initialResumeData,
      history: [],
      setResumeData: (data) => set({ resumeData: data }),
      updateSection: (section, content) =>
        set((state) => ({
          resumeData: { ...state.resumeData, [section]: content },
        })),
      setHistory: (history) => set({ history }),
      addMessage: (message) => set((state) => ({ history: [...state.history, message] })),
      clearChat: () => set({ history: [], resumeData: initialResumeData }),
    }),
    {
      name: 'resume-storage', // name of the item in the storage (must be unique)
    }
  )
);
