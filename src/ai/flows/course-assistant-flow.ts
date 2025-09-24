'use server';
/**
 * @fileOverview An AI flow for a course assistant.
 *
 * - courseAssistant - A function that handles the tutoring process.
 */
import {ai} from '@/ai/genkit';
import {z} from 'zod';

const CourseAssistantInputSchema = z.object({
  history: z.array(
    z.object({
      role: z.enum(['user', 'model']),
      content: z.array(z.object({text: z.string()})),
    })
  ),
  message: z.string(),
  courseTitle: z.string(),
});

const prompt = ai.definePrompt({
    name: 'courseAssistantPrompt',
    input: { schema: CourseAssistantInputSchema },
    prompt: `You are an expert tutor and teaching assistant for the course titled "{{courseTitle}}". Your goal is to help students understand the course material. Be encouraging, clear, and provide detailed explanations.

    The user's message is: "{{message}}"`,
});


export async function courseAssistant(
  history: z.infer<typeof CourseAssistantInputSchema>['history'],
  message: string,
  courseTitle: string
) {
  const {stream, response} = ai.generateStream({
    prompt: {
        message,
        courseTitle,
        history,
    },
    history: history,
    model: prompt,
  });

  // For server-side streaming, we need to return a ReadableStream
  const readableStream = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.text;
        if (text) {
          controller.enqueue(text);
        }
      }
      controller.close();
    },
  });

  await response;
  return readableStream;
}
