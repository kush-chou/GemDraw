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
    id: "college-physics-openstax",
    title: "College Physics",
    description: "Master the fundamentals of physics with this course based on the OpenStax College Physics textbook.",
    imageUrl: "https://picsum.photos/seed/physics-course/600/400",
    imageHint: "physics textbook",
    subjects: [
      {
        id: "mechanics",
        title: "Mechanics",
        lessons: [
          { id: "mech-l1", title: "Kinematics in One Dimension" },
          { id: "mech-l2", title: "Newton's Laws of Motion" },
          { id: "mech-l3", title: "Work, Energy, and Power" },
        ],
      },
      {
        id: "electricity-magnetism",
        title: "Electricity & Magnetism",
        lessons: [
          { id: "em-l1", title: "Electric Charge and Field" },
          { id: "em-l2", title: "Electric Potential and Capacitance" },
          { id: "em-l3", title: "Circuits and DC Instruments" },
        ],
      },
    ],
  },
  {
    id: "calculus-volume-1-openstax",
    title: "Calculus Volume 1",
    description: "An introduction to calculus, covering functions, limits, derivatives, and integration. Based on OpenStax.",
    imageUrl: "https://picsum.photos/seed/math-course/600/400",
    imageHint: "calculus graph",
    subjects: [
      {
        id: "derivatives",
        title: "Derivatives",
        lessons: [
          { id: "deriv-l1", title: "Defining the Derivative" },
          { id: "deriv-l2", title: "Differentiation Rules" },
          { id: "deriv-l3", title: "Applications of Derivatives" },
        ],
      },
      {
        id: "integration",
        title: "Integration",
        lessons: [
          { id: "integ-l1", title: "Antiderivatives and Indefinite Integrals" },
          { id: "integ-l2", title: "The Fundamental Theorem of Calculus" },
          { id: "integ-l3", title: "Techniques of Integration" },
        ],
      },
    ],
  },
  {
    id: "chemistry-2e-openstax",
    title: "Principles of Chemistry",
    description: "Explore atoms, molecules, and reactions. Based on the OpenStax Chemistry 2e textbook.",
    imageUrl: "https://picsum.photos/seed/chemistry-course/600/400",
    imageHint: "chemistry beakers",
    subjects: [
      {
        id: "atomic-structure",
        title: "Atomic Structure and Periodicity",
        lessons: [
          { id: "atom-l1", title: "Electronic Structure of Atoms" },
          { id: "atom-l2", title: "Periodic Variations in Element Properties" },
        ],
      },
      {
        id: "chemical-bonding",
        title: "Chemical Bonding",
        lessons: [
          { id: "bond-l1", title: "Lewis Symbols and Structures" },
          { id: "bond-l2", title: "Molecular Structure and Polarity" },
          { id: "bond-l3", title: "Advanced Theories of Covalent Bonding" },
        ],
      },
    ],
  },
];
