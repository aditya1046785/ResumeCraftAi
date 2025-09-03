import { config } from 'dotenv';
config();

import '@/ai/flows/parse-uploaded-resume.ts';
import '@/ai/flows/resume-content-enhancement.ts';
import '@/ai/flows/job-description-matching.ts';