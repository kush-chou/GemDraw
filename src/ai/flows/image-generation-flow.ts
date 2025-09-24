'use server';
/**
 * @fileOverview An image generation AI flow.
 */
import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'zod';

export const imageGenerationFlow = ai.defineFlow(
  {
    name: 'imageGenerationFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (prompt) => {
    const response = await ai.generate({
      model: googleAI.model('gemini-1.5-flash'),
      prompt: `A clean, simple, high-quality image for a presentation slide about the following topic: ${prompt}`,
      config: {
        responseMimeType: 'image/png',
      },
    });

    const imagePart = response.media;
    if (!imagePart || !imagePart.url) {
      throw new Error('Failed to generate image or find image URL.');
    }
    return imagePart.url;
  }
);
