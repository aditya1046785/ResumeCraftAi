'use server';

/**
 * @fileOverview This file defines a Genkit flow for matching a resume to a job description.
 *
 * - jobDescriptionMatch - A function that takes a job description and resume content, analyzes them, and provides a "Fit Score" and suggestions for resume adjustments.
 * - JobDescriptionMatchInput - The input type for the jobDescriptionMatch function.
 * - JobDescriptionMatchOutput - The return type for the jobDescriptionMatch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const JobDescriptionMatchInputSchema = z.object({
  jobDescription: z
    .string()
    .describe('The text content of the job description.'),
  resumeContent: z.string().describe('The text content of the resume.'),
});

export type JobDescriptionMatchInput = z.infer<typeof JobDescriptionMatchInputSchema>;

const JobDescriptionMatchOutputSchema = z.object({
  fitScore: z
    .number()
    .describe(
      'A score (0-100) representing how well the resume matches the job description.'
    ),
  suggestions: z
    .string()
    .describe(
      'Suggestions for improving the resume to better match the job description.'
    ),
});

export type JobDescriptionMatchOutput = z.infer<typeof JobDescriptionMatchOutputSchema>;

export async function jobDescriptionMatch(
  input: JobDescriptionMatchInput
): Promise<JobDescriptionMatchOutput> {
  return jobDescriptionMatchFlow(input);
}

const jobDescriptionMatchPrompt = ai.definePrompt({
  name: 'jobDescriptionMatchPrompt',
  input: {schema: JobDescriptionMatchInputSchema},
  output: {schema: JobDescriptionMatchOutputSchema},
  prompt: `You are an AI resume expert. Given a job description and resume text, determine how well the resume matches the job description and provide suggestions for improvement.

Job Description:
{{jobDescription}}

Resume Content:
{{resumeContent}}

Provide a fit score between 0 and 100, and provide concrete suggestions on how to improve the resume. Focus on specific skills or experience the resume is lacking, and how to phrase things better to align with the job description.
`,
});

const jobDescriptionMatchFlow = ai.defineFlow(
  {
    name: 'jobDescriptionMatchFlow',
    inputSchema: JobDescriptionMatchInputSchema,
    outputSchema: JobDescriptionMatchOutputSchema,
  },
  async input => {
    const {output} = await jobDescriptionMatchPrompt(input);
    return output!;
  }
);
