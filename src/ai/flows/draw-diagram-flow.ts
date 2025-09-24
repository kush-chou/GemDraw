'use server';
/**
 * @fileOverview A flow for generating Excalidraw diagrams from text prompts.
 *
 * - drawDiagram - A function that takes a text prompt and returns Excalidraw elements.
 * - DrawDiagramInput - The input type for the drawDiagram function.
 * - DrawDiagramOutput - The return type for the drawDiagram function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExcalidrawElementSchema = z.object({
  type: z.enum([
    'text',
    'line',
    'rectangle',
    'ellipse',
    'arrow',
    'diamond',
    'image',
    'frame',
    'embeddable',
  ]),
  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number(),
  angle: z.number().default(0),
  strokeColor: z.string().default('#000000'),
  backgroundColor: z.string().default('transparent'),
  fillStyle: z.string().default('hachure'),
  strokeWidth: z.number().default(1),
  strokeStyle: z.string().default('solid'),
  roughness: z.number().default(1),
  opacity: z.number().default(100),
  groupIds: z.array(z.string()).default([]),
  frameId: z.string().optional(),
  roundness: z
    .object({
      type: z.number(),
    })
    .optional(),
  seed: z.number(),
  version: z.number().default(2),
  versionNonce: z.number(),
  isDeleted: z.boolean().default(false),
  boundElements: z.array(z.any()).default([]),
  updated: z.number(),
  link: z.string().optional().nullable(),
  locked: z.boolean().default(false),
  text: z.string().optional(),
  fontSize: z.number().optional(),
  fontFamily: z.number().optional(),
  textAlign: z.string().optional(),
  verticalAlign: z.string().optional(),
  baseline: z.number().optional(),
  containerId: z.string().optional().nullable(),
  originalText: z.string().optional(),
  lineHeight: z.number().optional(),
  points: z.array(z.array(z.number())).optional(),
  startBinding: z.any().optional(),
  endBinding: z.any().optional(),
  startArrowhead: z.string().optional().nullable(),
  endArrowhead: z.string().optional().nullable(),
});

const DrawDiagramInputSchema = z.object({
  prompt: z.string().describe('The user prompt describing the diagram to draw.'),
});
export type DrawDiagramInput = z.infer<typeof DrawDiagramInputSchema>;

const DrawDiagramOutputSchema = z.object({
  elements: z
    .array(ExcalidrawElementSchema)
    .describe('The array of Excalidraw elements for the diagram.'),
});
export type DrawDiagramOutput = z.infer<typeof DrawDiagramOutputSchema>;

export async function drawDiagram(
  input: DrawDiagramInput
): Promise<DrawDiagramOutput> {
  return drawDiagramFlow(input);
}

const prompt = ai.definePrompt({
  name: 'drawDiagramPrompt',
  input: {schema: DrawDiagramInputSchema},
  output: {schema: DrawDiagramOutputSchema},
  prompt: `You are an expert at creating diagrams using Excalidraw. A user will provide a prompt, and you will generate the JSON for the Excalidraw elements to create the diagram.

  - The canvas is 800x600. Keep elements within these bounds.
  - Make the diagrams clear, simple, and visually appealing.
  - Use appropriate shapes and text to explain concepts.
  - Make sure stroke and background colors are visible on a dark background (#141414). Use light colors like '#aca7f2' for strokes and text.

  User Prompt:
  {{{prompt}}}`,
});

const drawDiagramFlow = ai.defineFlow(
  {
    name: 'drawDiagramFlow',
    inputSchema: DrawDiagramInputSchema,
    outputSchema: DrawDiagramOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
