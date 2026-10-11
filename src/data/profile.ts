export interface ProfileData {
  name: string;
  tagline: string;
  title: string;
  experienceYears: string;
  availability: {
    status: 'available' | 'limited' | 'busy';
    label: string;
    sublabel: string;
  };
  headline: {
    part1: string;
    highlight: string;
  };
  bioShort: string;
  aboutStory: {
    eyebrow: string;
    headline: string;
    paragraphs: string[];
  };
  interests: {
    title: string;
    description: string;
    tag: string;
  }[];
  milestones: {
    label: string;
    description: string;
  }[];
}

export const profile: ProfileData = {
  name: "Kavyansh",
  tagline: "Developer • Creative Technologist • Builder",
  title: "Creative Technologist & Full-Stack Developer",
  experienceYears: "4+ years",
  availability: {
    status: "available",
    label: "Available for select collaborations",
    sublabel: "Open to innovative products & experimental ideas",
  },
  headline: {
    part1: "I turn ideas into",
    highlight: "digital experiences.",
  },
  bioShort:
    "I’m Kavyansh — a developer and creative technologist exploring the intersection of software, AI, and design. I build digital products that bring ambitious ideas to life.",
  aboutStory: {
    eyebrow: "A LITTLE ABOUT ME",
    headline: "Curiosity is where everything starts.",
    paragraphs: [
      "I’ve spent the past four years exploring code, experimenting with technologies, and turning ideas into real projects. I enjoy the logic behind a system as much as the experience people have using it.",
      "From building web applications to exploring AI-powered tools and creating digital communities, I approach every project as an opportunity to learn, experiment, and make something better.",
      "For me, development isn’t just about writing code. It’s about connecting technology, design, and imagination.",
    ],
  },
  interests: [
    {
      title: "Interactive UI & Motion",
      description: "Crafting fluid, responsive interfaces that react organically to user intent.",
      tag: "Design & UX",
    },
    {
      title: "Full-Stack Web Systems",
      description: "Building scalable architectures from database schema to smooth client renders.",
      tag: "Engineering",
    },
    {
      title: "AI & Emerging Tech",
      description: "Experimenting with intelligent workflows, automation models, and novel interactions.",
      tag: "Research",
    },
    {
      title: "Community Infrastructure",
      description: "Architecting multiplayer servers, player engagement ecosystems, and custom tooling.",
      tag: "Multiplayer",
    },
    {
      title: "Creative Coding & Writing",
      description: "Exploring algorithmic visuals, storytelling, and speculative tech concepts.",
      tag: "Creative",
    },
  ],
  milestones: [
    {
      label: "Smart India Hackathon",
      description: "Collaborated on problem-solving solutions under competitive, rapid prototyping constraints.",
    },
    {
      label: "Gaming Communities",
      description: "Engineered high-concurrency multiplayer server ecosystems and automation plugins.",
    },
    {
      label: "4+ Years of Code",
      description: "Continuous self-directed engineering, frontend craft, and architectural experimentation.",
    },
  ],
};
