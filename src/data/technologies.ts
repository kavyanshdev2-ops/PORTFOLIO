export interface Technology {
  name: string;
  category: 'Frontend' | 'Programming' | 'Tools & Platforms' | 'Interest Areas';
  description: string;
  context: string;
  relatedProjectIds: string[];
}

export const technologyCategories = [
  'All',
  'Frontend',
  'Programming',
  'Tools & Platforms',
  'Interest Areas',
] as const;

export type TechCategory = (typeof technologyCategories)[number];

export const technologies: Technology[] = [
  // FRONTEND
  {
    name: "React",
    category: "Frontend",
    description: "Component architecture, modern hooks, and state management for scalable interactive web apps.",
    context: "Primary client-side library across INEF, UI experiments, and web products.",
    relatedProjectIds: ["inef", "interactive-web-experiences"],
  },
  {
    name: "JavaScript",
    category: "Frontend",
    description: "Core browser engine language, ESNext features, asynchronous event loop, and DOM APIs.",
    context: "Deep foundational mastery across client scripts and tooling.",
    relatedProjectIds: ["inef", "interactive-web-experiences", "ai-software-experiments"],
  },
  {
    name: "HTML5 & Semantic Markup",
    category: "Frontend",
    description: "Accessible document trees, ARIA specifications, structured metadata, and SEO optimization.",
    context: "Essential foundation for every digital product and accessible user interface.",
    relatedProjectIds: ["inef", "interactive-web-experiences"],
  },
  {
    name: "CSS & Modern Layouts",
    category: "Frontend",
    description: "Flexbox, CSS Grid, custom properties, subgrid, container queries, and compositor-only transforms.",
    context: "Pixel-perfect spatial design and responsive fluid typography.",
    relatedProjectIds: ["inef", "interactive-web-experiences"],
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    description: "Utility-first design token system for rapid iteration, dark mode syncing, and clean styling.",
    context: "Primary CSS methodology across production applications and design experiments.",
    relatedProjectIds: ["inef", "interactive-web-experiences"],
  },

  // PROGRAMMING
  {
    name: "Java",
    category: "Programming",
    description: "Object-oriented systems, JVM tuning, high-concurrency threading, and backend server logic.",
    context: "Core language for Minecraft multiplayer game server infrastructure and custom plugins.",
    relatedProjectIds: ["gaming-community-infrastructure"],
  },
  {
    name: "Python",
    category: "Programming",
    description: "Scripting, rapid prototyping, data manipulation, automation pipelines, and AI API integrations.",
    context: "Automation scripts, backend utility tools, and machine learning explorations.",
    relatedProjectIds: ["ai-software-experiments", "gaming-community-infrastructure"],
  },
  {
    name: "SQL",
    category: "Programming",
    description: "Relational database schema modeling, queries, indexing, transactions, and foreign key relations.",
    context: "Player persistence, community databases, and transactional data integrity.",
    relatedProjectIds: ["gaming-community-infrastructure", "ai-software-experiments"],
  },

  // TOOLS & PLATFORMS
  {
    name: "Git",
    category: "Tools & Platforms",
    description: "Distributed version control, branching strategies, rebase workflows, and clean commit history.",
    context: "Fundamental daily workflow for tracking all code changes and experiments.",
    relatedProjectIds: ["inef", "interactive-web-experiences", "ai-software-experiments", "gaming-community-infrastructure"],
  },
  {
    name: "GitHub",
    category: "Tools & Platforms",
    description: "Repository management, collaboration, issue tracking, and automated CI/CD deployment pipelines.",
    context: "Code hosting, open-source sharing, and project documentation.",
    relatedProjectIds: ["inef", "interactive-web-experiences"],
  },
  {
    name: "Vite",
    category: "Tools & Platforms",
    description: "Next-gen frontend tooling with lightning-fast ES module dev server and Rollup production builds.",
    context: "Default build tooling for all modern React and frontend applications.",
    relatedProjectIds: ["inef", "interactive-web-experiences"],
  },
  {
    name: "Supabase",
    category: "Tools & Platforms",
    description: "Postgres-backed backend-as-a-service with instant REST APIs, auth sessions, and row-level security.",
    context: "Data store and authentication layer for web platform prototypes and INEF.",
    relatedProjectIds: ["inef"],
  },
  {
    name: "Cloudflare",
    category: "Tools & Platforms",
    description: "Global edge CDN, DNS management, edge workers, and distributed security shielding.",
    context: "Asset caching and DNS optimization for web domains and game services.",
    relatedProjectIds: ["inef", "gaming-community-infrastructure"],
  },

  // INTEREST AREAS
  {
    name: "AI & Machine Learning",
    category: "Interest Areas",
    description: "Model integration, prompt engineering, agentic pipelines, and exploring cognitive augmentations.",
    context: "Active exploration into how intelligent software transforms creator workflows.",
    relatedProjectIds: ["ai-software-experiments"],
  },
  {
    name: "Interactive UI/UX",
    category: "Interest Areas",
    description: "Spatial depth, liquid glass surfaces, tactile feedback, micro-animations, and Apple-grade polish.",
    context: "Obsessive focus on making software feel responsive, living, and enjoyable.",
    relatedProjectIds: ["interactive-web-experiences", "inef"],
  },
  {
    name: "Creative Coding",
    category: "Interest Areas",
    description: "Mathematical visualizations, procedural generative art, canvas simulations, and shaders.",
    context: "Building interactive experiments that merge computer science with aesthetic expression.",
    relatedProjectIds: ["interactive-web-experiences"],
  },
  {
    name: "Backend Systems",
    category: "Interest Areas",
    description: "Distributed systems, network sockets, concurrency models, and resilient server engineering.",
    context: "Designing bulletproof infrastructure capable of withstanding heavy real-time user loads.",
    relatedProjectIds: ["gaming-community-infrastructure"],
  },
];
