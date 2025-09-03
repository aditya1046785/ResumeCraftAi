'use server';

/**
 * @fileOverview Parses an uploaded resume into structured sections.
 *
 * - parseUploadedResume - A function that handles the resume parsing process.
 * - ParseUploadedResumeInput - The input type for the parseUploadedResume function.
 * - ParseUploadedResumeOutput - The return type for the parseUploadedResume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ParseUploadedResumeInputSchema = z.object({
  resumeDataUri: z
    .string()
    .describe(
      "The resume file as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ParseUploadedResumeInput = z.infer<typeof ParseUploadedResumeInputSchema>;

const ParseUploadedResumeOutputSchema = z.object({
  sections: z
    .array(z.string())
    .describe('The different sections parsed from the resume.'),
  education: z.string().describe('The education section of the resume.'),
  skills: z.string().describe('The skills section of the resume.'),
  projects: z.string().describe('The projects section of the resume.'),
  internships: z.string().describe('The internships section of the resume.'),
});
export type ParseUploadedResumeOutput = z.infer<typeof ParseUploadedResumeOutputSchema>;

export async function parseUploadedResume(
  input: ParseUploadedResumeInput
): Promise<ParseUploadedResumeOutput> {
  return parseUploadedResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'parseUploadedResumePrompt',
  input: {schema: ParseUploadedResumeInputSchema},
  output: {schema: ParseUploadedResumeOutputSchema},
  prompt: `You are an expert resume parser. You will extract the different
sections of the resume and provide the content for each section.

Parse the following resume:

{{media url=resumeDataUri}}

Make sure that the resume is split into sections, and each section is returned.
`,
});

const parseUploadedResumeFlow = ai.defineFlow(
  {
    name: 'parseUploadedResumeFlow',
    inputSchema: ParseUploadedResumeInputSchema,
    outputSchema: ParseUploadedResumeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
