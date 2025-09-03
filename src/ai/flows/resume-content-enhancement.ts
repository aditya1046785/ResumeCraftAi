'use server';
/**
 * @fileOverview An AI agent that suggests improvements to resume content.
 *
 * - enhanceResumeContent - A function that takes raw resume content and suggests improvements.
 * - EnhanceResumeContentInput - The input type for the enhanceResumeContent function.
 * - EnhanceResumeContentOutput - The return type for the enhanceResumeContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhanceResumeContentInputSchema = z.object({
  rawContent: z
    .string()
    .describe('The raw resume content to be improved, such as a bullet point description of a job.'),
});
export type EnhanceResumeContentInput = z.infer<typeof EnhanceResumeContentInputSchema>;

const EnhanceResumeContentOutputSchema = z.object({
  enhancedContent: z
    .string()
    .describe('The improved resume content, rephrased to highlight achievements.'),
});
export type EnhanceResumeContentOutput = z.infer<typeof EnhanceResumeContentOutputSchema>;

export async function enhanceResumeContent(input: EnhanceResumeContentInput): Promise<EnhanceResumeContentOutput> {
  return enhanceResumeContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'enhanceResumeContentPrompt',
  input: {schema: EnhanceResumeContentInputSchema},
  output: {schema: EnhanceResumeContentOutputSchema},
  prompt: `You are a career coach specializing in resume writing. Your goal is to transform raw resume content into strong, professional achievements.

  Improve the following resume content to highlight achievements and use strong phrasing:

  {{{rawContent}}}
  `,
});

const enhanceResumeContentFlow = ai.defineFlow(
  {
    name: 'enhanceResumeContentFlow',
    inputSchema: EnhanceResumeContentInputSchema,
    outputSchema: EnhanceResumeContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
