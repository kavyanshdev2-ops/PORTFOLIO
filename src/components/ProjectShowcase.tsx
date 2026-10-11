import React, { useState } from "react";
import { ArrowUpRight, Github, ExternalLink, Layers, Eye } from "lucide-react";
import { projects, Project } from "../data/projects";
import { ProjectModal } from "./ProjectModal";

interface ProjectShowcaseProps {
  onOpenProjectModal?: (project: Project) => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    { label: "All Works", slug: "all" },
    { label: "Platforms & Brand", slug: "brand" },
    { label: "Frontend & UI", slug: "frontend" },
    { label: "AI & Software", slug: "ai" },
    { label: "Server Systems", slug: "infrastructure" },
  ];

  const filteredProjects = activeCategory === "all"
    ? projects
    : projects.filter((p) => p.categorySlug === activeCategory);

  return (
    <section id="work" className="py-28 relative border-t border-white/10 dark:border-white/10 light:border-black/5">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12">
          <div className="space-y-3 max-w-xl">
            <p className="text-xs font-mono uppercase tracking-widest text-[#7C9DFF]">
              PORTFOLIO SHOWCASE
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-[#F5F5F7] dark:text-[#F5F5F7] light:text-[#121316] leading-tight">
              Selected work. <br />
              <span className="text-[#9698A3] dark:text-[#9698A3] light:text-[#525462]">
                Built with intent.
              </span>
            </h2>
          </div>

          {/* Interactive Filter Segmented Control */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white/5 dark:bg-white/5 light:bg-black/5 border border-white/10 dark:border-white/10 light:border-black/10 shrink-0">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap shrink-0 ${
                  activeCategory === cat.slug
                    ? "bg-[#7C9DFF] text-[#08090B] shadow-sm font-semibold"
                    : "text-[#9698A3] dark:text-[#9698A3] light:text-[#525462] hover:text-[#F5F5F7] dark:hover:text-[#F5F5F7] light:hover:text-[#121316]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Immersive Projects Gallery Grid */}
        <div className="space-y-12">
          {filteredProjects.map((project, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <article
                key={project.id}
                className="group relative rounded-2xl bg-white/[0.02] dark:bg-white/[0.02] light:bg-black/[0.02] border border-white/10 dark:border-white/10 light:border-black/10 overflow-hidden hover:border-[#7C9DFF]/40 transition-all duration-300"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 lg:p-10 ${
                  !isEven ? "lg:flex-row-reverse" : ""
                }`}>
                  {/* Visual Preview Container */}
                  <div className={`lg:col-span-7 relative aspect-video rounded-xl overflow-hidden bg-black/40 border border-white/5 group-hover:border-white/15 transition-all ${
                    !isEven ? "lg:order-2" : "lg:order-1"
                  }`}>
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />

                    {/* Gradient Overlay & Quick inspect button */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-mono text-[#F5F5F7]">
                        <span className="w-2 h-2 rounded-full bg-[#7C9DFF]" />
                        <span>{project.status}</span>
                      </div>

                      <button
                        onClick={() => setSelectedProject(project)}
                        className="px-3 py-1.5 rounded-lg bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/20 text-xs font-medium text-white flex items-center gap-1.5 transition-all"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#7C9DFF]" />
                        <span>Inspect Architecture</span>
                      </button>
                    </div>
                  </div>

                  {/* Text Details & Metadata Container */}
                  <div className={`lg:col-span-5 space-y-5 ${
                    !isEven ? "lg:order-1" : "lg:order-2"
                  }`}>
                    {/* Unboxed Metadata (Zero-pill discipline) */}
                    <div className="flex items-center gap-2 text-xs font-mono text-[#9698A3] dark:text-[#9698A3] light:text-[#525462]">
                      <span className="text-[#7C9DFF] uppercase tracking-wider">{project.category}</span>
                      <span aria-hidden="true" className="text-white/20">·</span>
                      <span>{project.status}</span>
                    </div>

                    {/* Project Title */}
                    <h3 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-[#F5F5F7] dark:text-[#F5F5F7] light:text-[#121316]">
                      {project.name}
                    </h3>

                    {/* Short Description */}
                    <p className="text-sm text-[#9698A3] dark:text-[#9698A3] light:text-[#525462] leading-relaxed">
                      {project.shortDescription}
                    </p>

                    {/* Technologies list rendered as clean unboxed text with separators */}
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#656774] dark:text-[#656774] light:text-[#848796] pt-1">
                      {project.technologies.map((tech, tIdx) => (
                        <React.Fragment key={tIdx}>
                          <span className="text-[#9698A3] dark:text-[#9698A3] light:text-[#525462]">{tech}</span>
                          {tIdx < project.technologies.length - 1 && (
                            <span aria-hidden="true" className="text-white/20">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="pt-3 flex items-center gap-3">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="px-4 py-2 rounded-xl bg-white/5 dark:bg-white/5 light:bg-black/5 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-black/10 border border-white/10 dark:border-white/10 light:border-black/10 text-xs font-medium text-[#F5F5F7] dark:text-[#F5F5F7] light:text-[#121316] flex items-center gap-2 transition-colors"
                      >
                        <Layers className="w-3.5 h-3.5 text-[#7C9DFF]" />
                        <span>Case Study & Architecture</span>
                      </button>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target={project.liveUrl.startsWith("#") ? "_self" : "_blank"}
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-white/5 dark:bg-white/5 light:bg-black/5 hover:bg-white/10 text-[#9698A3] hover:text-[#F5F5F7] border border-white/10 transition-colors"
                          title="Open Demo or Target"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-white/5 dark:bg-white/5 light:bg-black/5 hover:bg-white/10 text-[#9698A3] hover:text-[#F5F5F7] border border-white/10 transition-colors"
                          title="View Repository"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
