export type Lesson = {
  id: string;
  title: string;
};

export type Subject = {
  id: string;
  title: string;
  lessons: Lesson[];
};

export type Course = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  subjects: Subject[];
};

export const courses: Course[] = [
  {
    id: "intro-to-ai",
    title: "Introduction to Artificial Intelligence",
    description: "Learn the fundamentals of AI, machine learning, and neural networks.",
    imageUrl: "https://picsum.photos/seed/ai-course/600/400",
    imageHint: "artificial intelligence",
    subjects: [
      {
        id: "neural-networks",
        title: "Understanding Neural Networks",
        lessons: [
          { id: "nn-l1", title: "What is a Neuron?" },
          { id: "nn-l2", title: "Activation Functions Explained" },
          { id: "nn-l3", title: "Building Your First Network" },
        ],
      },
      {
        id: "natural-language-processing",
        title: "Natural Language Processing (NLP)",
        lessons: [
          { id: "nlp-l1", title: "From Text to Tokens" },
          { id: "nlp-l2", title: "Understanding Word Embeddings" },
          { id: "nlp-l3", title: "Introduction to Transformers" },
        ],
      },
    ],
  },
  {
    id: "creative-coding",
    title: "Creative Coding with AI",
    description: "Explore the intersection of art, code, and generative models.",
    imageUrl: "https://picsum.photos/seed/creative-code/600/400",
    imageHint: "creative coding",
    subjects: [
      {
        id: "generative-art",
        title: "Generative Art",
        lessons: [
          { id: "ga-l1", title: "Introduction to p5.js" },
          { id: "ga-l2", title: "Creating with Perlin Noise" },
          { id: "ga-l3", title: "AI Image Generation APIs" },
        ],
      },
      {
        id: "interactive-installations",
        title: "Interactive Installations",
        lessons: [
          { id: "ii-l1", title: "Working with Sensors" },
          { id: "ii-l2", title: "Real-time AI Interaction" },
        ],
      },
    ],
  },
  {
    id: "ai-for-designers",
    title: "AI Tools for Modern Designers",
    description: "Leverage AI to supercharge your design workflow and creativity.",
    imageUrl: "https://picsum.photos/seed/ai-design/600/400",
    imageHint: "AI design",
    subjects: [
      {
        id: "prompt-engineering",
        title: "Mastering Prompt Engineering",
        lessons: [
          { id: "pe-l1", title: "The Art of the Perfect Prompt" },
          { id: "pe-l2", title: "Advanced Prompting Techniques" },
        ],
      },
      {
        id: "ai-in-ui-ux",
        title: "AI in UI/UX Design",
        lessons: [
          { id: "uiux-l1", title: "Generative User Interfaces" },
          { id: "uiux-l2", title: "AI-Powered Prototyping" },
        ],
      },
    ],
  },
];
