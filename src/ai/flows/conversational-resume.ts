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

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  text: z.string(),
});

const ConversationalResumeInputSchema = z.object({
  history: z.array(MessageSchema),
});

export type ConversationalResumeInput = z.infer<typeof ConversationalResumeInputSchema>;

const ConversationalResumeOutputSchema = z.object({
  question: z.string().describe("The next question to ask the user to gather more information for their resume. If all information is gathered, this should be a concluding remark."),
  updatedResumeData: z.object({
    name: z.string().describe("The user's full name. Extracted from the conversation."),
    contact: z.string().describe("The user's contact information (email, phone, LinkedIn). Extracted from the conversation."),
    summary: z.string().describe("A professional summary. Generated from the conversation."),
    experience: z.string().describe("The user's work experience. Extracted and formatted from the conversation."),
    education: z.string().describe("The user's educational background. Extracted from the conversation."),
    projects: z.string().describe("The user's projects. Extracted from the conversation."),
    skills: z.string().describe("The user's skills. Extracted from the conversation."),
  }).describe("The complete, updated resume data. This should only be populated once the conversation is complete and all necessary information has been gathered."),
  isComplete: z.boolean().describe("Set to true only when all necessary resume sections (name, contact, summary, experience, education, skills) have been sufficiently filled through the conversation."),
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
  prompt: `You are a friendly and professional AI career coach. Your goal is to build a complete resume with the user through a natural, free-flowing conversation.

**Your Task:**
1.  **Engage in Conversation:** Have a natural, multi-turn conversation. Start with basics like name and contact, then move to summary, experience, education, projects, and skills.
2.  **Gather Information Holistically:** Do not treat this as a simple form. Ask clarifying questions or follow-ups to get good, detailed information. For example, for a job, ask about their responsibilities and key achievements.
3.  **Keep Track of Progress:** Mentally track which sections you have sufficient information for.
4.  **Determine the Next Question:** Based on what information is still missing, ask the next logical question. Keep it to one main question at a time.
5.  **Signal Completion:** Once you are satisfied that you have gathered all the necessary information for a strong resume, set \`isComplete\` to \`true\`.
6.  **Populate Resume AT THE END:** The \`updatedResumeData\` field should remain empty (all fields as empty strings) throughout the conversation. Only when you set \`isComplete\` to \`true\`, you must populate ALL fields in \`updatedResumeData\` with the information gathered from the entire conversation.
7.  **Concluding Remark:** When \`isComplete\` is true, the \`question\` field should contain a concluding remark, like "Thanks! I've drafted your resume based on our conversation. You can see it in the preview."

**Conversation History:**
{{#each history}}
**{{role}}**: {{text}}
{{/each}}

Based on the full conversation history, determine if you have enough information. If not, ask the next question. If yes, set \`isComplete\` to true and fill out the entire \`updatedResumeData\` object.
`,
});


const conversationalResumeFlow = ai.defineFlow(
  {
    name: 'conversationalResumeFlow',
    inputSchema: ConversationalResumeInputSchema,
    outputSchema: ConversationalResumeOutputSchema,
  },
  async (input) => {
    const emptyResume = {
        name: "",
        contact: "",
        summary: "",
        experience: "",
        education: "",
        projects: "",
        skills: "",
    };

    // If history is empty, start the conversation.
    if (input.history.length === 0) {
      return {
        question: "Hello! I'm here to help you build a great resume. Let's start with your full name, please.",
        updatedResumeData: emptyResume,
        isComplete: false,
      };
    }

    const { output } = await resumePrompt(input);
    return output!;
  }
);
