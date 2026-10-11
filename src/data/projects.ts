export interface Project {
  id: string;
  name: string;
  category: string;
  categorySlug: 'brand' | 'frontend' | 'ai' | 'infrastructure';
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  status: 'Active' | 'Evolving' | 'Exploratory' | 'Production';
  githubUrl?: string;
  liveUrl?: string;
  image: string;
  architecture: string[];
  technicalDecisions: string[];
  challengesAndLessons: string[];
  highlights: string[];
}

export const projects: Project[] = [
  {
    id: "inef",
    name: "INEF / INEFFABLE",
    category: "Digital Platform / Brand / Community",
    categorySlug: "brand",
    shortDescription:
      "A digital ecosystem combining contemporary branding, web experiences, and gaming-community infrastructure.",
    fullDescription:
      "INEF (Inefficable) is a multi-layered digital venture uniting custom streetwear aesthetics, minimalist web experiences, and integrated player community ecosystems. Designed to bridge physical apparel culture with digital gaming affinity.",
    technologies: ["React", "Vite", "Tailwind CSS", "JavaScript", "Supabase", "REST APIs"],
    status: "Active",
    githubUrl: "https://github.com",
    liveUrl: "https://inef.cc",
    image: "/src/assets/images/inef_brand_showcase_1791731083987.jpg",
    architecture: [
      "Client: Lightweight React 19 SPA bundled with Vite for ultra-fast asset delivery.",
      "Styling: Custom utility tokens adhering to monochrome brutalist and modern streetwear typography.",
      "Data & Auth: Supabase backend handling user sessions, inventory waitlists, and community registrations.",
      "Edge Services: Edge-cached static delivery ensuring sub-second response times across global regions.",
    ],
    technicalDecisions: [
      "Chose a typography-first editorial grid over standard e-commerce templates to preserve brand exclusivity.",
      "Implemented optimistic UI updates on cart interactions and community drop signups.",
      "Architected clean separation between public showcase views and authenticated community member areas.",
    ],
    challengesAndLessons: [
      "Balancing high-fashion editorial aesthetics with performant image loading and responsive mobile layouts.",
      "Learned that minimalist typography requires rigorous contrast checks and micro-spacing discipline across disparate screen densities.",
    ],
    highlights: [
      "Editorial lookbook layout",
      "Gaming community bridge",
      "Supabase session integration",
      "Zero-latency routing",
    ],
  },
  {
    id: "interactive-web-experiences",
    name: "Interactive Web Experiences",
    category: "Frontend Engineering / UI Experiments",
    categorySlug: "frontend",
    shortDescription:
      "An evolving collection of interactive interfaces, motion studies, responsive layouts, and creative frontend experiments.",
    fullDescription:
      "A living lab exploring the boundaries of browser rendering, spatial layouts, micro-interactions, and organic physics. Focuses on sensory feedback that feels deliberate rather than ornamental.",
    technologies: ["React", "TypeScript", "Motion", "Tailwind CSS", "HTML5 Canvas", "SVG"],
    status: "Evolving",
    githubUrl: "https://github.com",
    liveUrl: "#experiments",
    image: "/src/assets/images/ui_experiments_showcase_1791731099431.jpg",
    architecture: [
      "Component Engine: Modular React components with strict props contracts and isolated animation states.",
      "Motion Layer: Compositor-only transforms (scale, opacity, 3D matrix) guaranteeing 60fps execution.",
      "Canvas Bridge: Hardware-accelerated canvas render loops for particle interactions and fluid glass highlights.",
    ],
    technicalDecisions: [
      "Enforced WCAG AA contrast standards even across dark obsidian translucent glass surfaces.",
      "Avoided heavy physics bundles by engineering bespoke spring algorithms and 2D vector mathematics.",
      "Implemented prefers-reduced-motion fallbacks for all procedural animations.",
    ],
    challengesAndLessons: [
      "Preventing layout thrashing during continuous mouse tracking by decoupling mouse coordinate sampling from DOM writes.",
      "Refined an acute understanding of cubic-bezier timing functions and tactile interaction settling curves.",
    ],
    highlights: [
      "Liquid glass refraction engine",
      "Cursor-reactive light fields",
      "Kinetic typography laboratory",
      "Sub-16ms frame performance",
    ],
  },
  {
    id: "ai-software-experiments",
    name: "AI & Software Experiments",
    category: "Software Engineering / AI",
    categorySlug: "ai",
    shortDescription:
      "Experiments exploring intelligent applications, automation, programming, and emerging technology.",
    fullDescription:
      "Exploratory prototypes investigating how machine intelligence interfaces with human workflows. Focuses on prompt engineering patterns, automation pipelines, and data transformations without relying on superficial wrappers.",
    technologies: ["Python", "JavaScript", "SQL", "REST APIs", "Modern CLI Tooling"],
    status: "Exploratory",
    githubUrl: "https://github.com",
    image: "/src/assets/images/hero_glass_artifact_1791731066744.jpg",
    architecture: [
      "Backend Services: Python scripts and serverless handlers executing automated tasks and parsing pipelines.",
      "Database: Relational schemas in SQL structured for rapid vector querying and metadata extraction.",
      "Client Interface: Minimalist operational controls providing transparent insight into algorithm inputs and outputs.",
    ],
    technicalDecisions: [
      "Prioritized predictable deterministic scripts for structured processing before augmenting with probabilistic models.",
      "Emphasized human-in-the-loop review interfaces to evaluate machine output validity.",
    ],
    challengesAndLessons: [
      "Managing rate limits and latency variability while maintaining a responsive user feedback loop.",
      "Gained critical intuition into data sanitation, token budgeting, and system evaluation benchmarks.",
    ],
    highlights: [
      "Automated pipeline prototypes",
      "Data transformation tooling",
      "Clean relational schemas",
      "Structured output parsers",
    ],
  },
  {
    id: "gaming-community-infrastructure",
    name: "Gaming Community Infrastructure",
    category: "Community / Backend / Server Systems",
    categorySlug: "infrastructure",
    shortDescription:
      "Building and configuring multiplayer gaming environments, community systems, server functionality, and supporting integrations.",
    fullDescription:
      "Engineering robust multiplayer server environments (including dedicated Minecraft server networks), real-time player data synchronization, automated discord bot integrations, and custom gameplay plugins.",
    technologies: ["Java", "Python", "SQL", "Linux", "Docker", "Network Protocols"],
    status: "Production",
    githubUrl: "https://github.com",
    image: "/src/assets/images/server_infrastructure_showcase_1791731117414.jpg",
    architecture: [
      "Server Clusters: Multi-node server instances running optimized Java runtime environments.",
      "Data Persistence: SQL databases tracking player economy, permissions, and session records.",
      "Automation: Python and bash scripts managing automated backup cycles, crash recovery, and health checks.",
      "Integrations: Webhook bridges linking in-game telemetry to community chat channels.",
    ],
    technicalDecisions: [
      "Fine-tuned JVM garbage collection flags (Aikar's G1GC flags) to eliminate tick lag during peak concurrent spikes.",
      "Implemented asynchronous database read/writes to safeguard the main server tick loop from I/O pauses.",
    ],
    challengesAndLessons: [
      "Mitigating denial-of-service vulnerabilities and managing socket connection surges.",
      "Mastered low-level concurrency, packet handling, and thread safety in high-stress multiplayer environments.",
    ],
    highlights: [
      "High-concurrency server tuning",
      "Custom Java plugin extensions",
      "Automated operational failover",
      "Zero-downtime rolling restarts",
    ],
  },
];
