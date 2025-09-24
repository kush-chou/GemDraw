'use server';
/**
 * @fileOverview A simple chat AI flow.
 *
 * - chat - A function that handles the chat process.
 */
import {ai} from '@/ai/genkit';
import {z} from 'zod';

const ChatInputSchema = z.object({
  history: z.array(
    z.object({
      role: z.enum(['user', 'model']),
      content: z.array(z.object({text: z.string()})),
    })
  ),
  message: z.string(),
});

export async function chat(
  history: z.infer<typeof ChatInputSchema>['history'],
  message: string
) {
  const {stream, response} = ai.generateStream({
    prompt: message,
    history: history,
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
