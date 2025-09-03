'use server';
/**
 * @fileOverview This file defines a Genkit flow for a conversational resume builder.
 *
 * - askResumeQuestion - A function that takes the current resume data and conversation history to determine the next question to ask.
 * - ConversationalResumeInput - The input type for the askResumeQuestion function.
 * - ConversationalResumeOutput - The return type for the askResumeQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type {ResumeData} from '@/lib/types';

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  text: z.string(),
});

const ConversationalResumeInputSchema = z.object({
  resumeData: z.object({
    name: z.string(),
    contact: z.string(),
    summary: z.string(),
    experience: z.string(),
    education: z.string(),
    projects: z.string(),
    skills: z.string(),
  }),
  history: z.array(MessageSchema),
});

export type ConversationalResumeInput = z.infer<typeof ConversationalResumeInputSchema>;

const ConversationalResumeOutputSchema = z.object({
  question: z.string().describe("The next question to ask the user to gather more information for their resume. If all information is gathered, this should be a concluding remark."),
  updatedResumeData: z.object({
    name: z.string(),
    contact: z.string(),
    summary: z.string(),
    experience: z.string(),
    education: z.string(),
    projects: z.string(),
    skills: z.string(),
  }).describe("The updated resume data based on the user's last response. Only update fields that were directly addressed in the last user message. Keep existing data if not mentioned."),
  isComplete: z.boolean().describe("Set to true only when all necessary resume sections (name, contact, summary, experience, education, skills) are filled and sufficient."),
});

export type ConversationalResumeOutput = z.infer<typeof ConversationalResumeOutputSchema>;


export async function askResumeQuestion(
  input: ConversationalResumeInput
): Promise<ConversationalResumeOutput> {
  return conversationalResumeFlow(input);
}

const resumePrompt = ai.definePrompt({
  name: 'conversationalResumePrompt',
  input: {schema: ConversationalResumeInputSchema},
  output: {schema: ConversationalResumeOutputSchema},
  prompt: `You are a friendly and professional AI career coach building a resume with a user through conversation.
Your goal is to gather all the necessary information for a standard tech resume.

**Conversation Rules:**
1.  **One Question at a Time:** Ask only one question at a time to keep the conversation focused.
2.  **Be Personal and Encouraging:** Use a warm and supportive tone.
3.  **Analyze User Response:** The user's last message is in the history. Use it to update the resume JSON. Only change fields relevant to the last message.
4.  **Check for Missing Information:** Look at the 'updatedResumeData' JSON to see what's missing.
5.  **Determine Next Question:** Based on the missing information, ask the next logical question. Start with name, then contact, summary, experience, education, projects, and finally skills.
6.  **Mark as Complete:** Once all sections are reasonably filled, set \`isComplete\` to \`true\` and provide a concluding remark as the final \`question\`.

**Current Resume Data:**
\`\`\`json
{{{json resumeData}}}
\`\`\`

**Conversation History:**
{{#each history}}
**{{role}}**: {{text}}
{{/each}}

Based on the history and current data, update the resume data and ask the next question.
`,
});


const conversationalResumeFlow = ai.defineFlow(
  {
    name: 'conversationalResumeFlow',
    inputSchema: ConversationalResumeInputSchema,
    outputSchema: ConversationalResumeOutputSchema,
  },
  async (input) => {
    // If history is empty, start the conversation.
    if (input.history.length === 0) {
      return {
        question: "Hello! I'm here to help you build a great resume. Let's start with your full name, please.",
        updatedResumeData: input.resumeData,
        isComplete: false,
      };
    }

    const { output } = await resumePrompt(input);
    return output!;
  }
);
