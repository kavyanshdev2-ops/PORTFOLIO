import React, { useState } from "react";
import { Cpu, Code2, Wrench, Sparkles, FolderGit2, Check } from "lucide-react";
import { technologies, technologyCategories, TechCategory, Technology } from "../data/technologies";
import { projects } from "../data/projects";

interface TechStackProps {
  onOpenProjectModal?: (projectId: string) => void;
}

export const TechStack: React.FC<TechStackProps> = ({ onOpenProjectModal }) => {
  const [activeCategory, setActiveCategory] = useState<TechCategory>("All");
  const [selectedTech, setSelectedTech] = useState<Technology>(technologies[0]);

  const filteredTechs = activeCategory === "All"
    ? technologies
    : technologies.filter((t) => t.category === activeCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Frontend":
        return <Code2 className="w-4 h-4 text-[#7C9DFF]" />;
      case "Programming":
        return <Cpu className="w-4 h-4 text-[#A78BFA]" />;
      case "Tools & Platforms":
        return <Wrench className="w-4 h-4 text-[#7C9DFF]" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#A78BFA]" />;
    }
  };

  const relatedProjectsList = projects.filter((p) =>
    selectedTech.relatedProjectIds.includes(p.id)
  );

  return (
    <section id="stack" className="py-28 relative border-t border-white/10 dark:border-white/10 light:border-black/5">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12">
          <div className="space-y-3 max-w-xl">
            <p className="text-xs font-mono uppercase tracking-widest text-[#7C9DFF]">
              SYSTEMS & CAPABILITIES
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-[#F5F5F7] dark:text-[#F5F5F7] light:text-[#121316]">
              My tools. <br />
              <span className="text-[#9698A3] dark:text-[#9698A3] light:text-[#525462]">
                My playground.
              </span>
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white/5 dark:bg-white/5 light:bg-black/5 border border-white/10 dark:border-white/10 light:border-black/10 shrink-0">
            {technologyCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap shrink-0 ${
                  activeCategory === category
                    ? "bg-[#7C9DFF] text-[#08090B] font-semibold shadow-sm"
                    : "text-[#9698A3] dark:text-[#9698A3] light:text-[#525462] hover:text-[#F5F5F7] dark:hover:text-[#F5F5F7] light:hover:text-[#121316]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Modular Interactive Matrix & Inspector Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Tech Grid (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredTechs.map((tech) => {
              const isSelected = selectedTech.name === tech.name;
              return (
                <button
                  key={tech.name}
                  onClick={() => setSelectedTech(tech)}
                  onFocus={() => setSelectedTech(tech)}
                  onMouseEnter={() => setSelectedTech(tech)}
                  className={`text-left p-4 rounded-xl transition-all duration-200 border ${
                    isSelected
                      ? "bg-white/[0.07] dark:bg-white/[0.07] light:bg-black/[0.05] border-[#7C9DFF] shadow-lg shadow-[#7C9DFF]/5"
                      : "bg-white/[0.02] dark:bg-white/[0.02] light:bg-black/[0.02] border-white/10 dark:border-white/10 light:border-black/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-white/5 dark:bg-white/5 light:bg-black/5">
                        {getCategoryIcon(tech.category)}
                      </div>
                      <span className="text-sm font-semibold text-[#F5F5F7] dark:text-[#F5F5F7] light:text-[#121316]">
                        {tech.name}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono text-[#656774] dark:text-[#656774] light:text-[#848796] uppercase">
                      {tech.category.split(" ")[0]}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-[#9698A3] dark:text-[#9698A3] light:text-[#525462] line-clamp-2 leading-relaxed">
                    {tech.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Selected Technology Deep-Dive Inspector (5 cols) */}
          <div className="lg:col-span-5 sticky top-28 p-6 sm:p-7 rounded-2xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-black/[0.02] border border-white/10 dark:border-white/10 light:border-black/10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#7C9DFF]">
                  Inspector Panel
                </span>
                <h3 className="text-2xl font-bold font-display text-[#F5F5F7] dark:text-[#F5F5F7] light:text-[#121316]">
                  {selectedTech.name}
                </h3>
              </div>
              <div className="p-2 rounded-xl bg-white/5 dark:bg-white/5 light:bg-black/5">
                {getCategoryIcon(selectedTech.category)}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-[#656774] tracking-wider">
                Functional Overview
              </span>
              <p className="text-xs sm:text-sm text-[#9698A3] dark:text-[#9698A3] light:text-[#525462] leading-relaxed">
                {selectedTech.description}
              </p>
            </div>

            {/* In-Practice Context */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-[#656774] tracking-wider">
                Application In My Workflow
              </span>
              <p className="text-xs sm:text-sm text-[#F5F5F7] dark:text-[#F5F5F7] light:text-[#121316] leading-relaxed bg-white/5 dark:bg-white/5 light:bg-black/5 p-3.5 rounded-xl border border-white/5">
                {selectedTech.context}
              </p>
            </div>

            {/* Connected Projects */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono uppercase text-[#656774] tracking-wider flex items-center justify-between">
                <span>Direct Project Connections</span>
                <span className="text-[#7C9DFF]">{relatedProjectsList.length}</span>
              </span>

              {relatedProjectsList.length === 0 ? (
                <p className="text-xs text-[#9698A3]">Used across experimental scripts and foundational toolchains.</p>
              ) : (
                <div className="space-y-2">
                  {relatedProjectsList.map((p) => (
                    <div
                      key={p.id}
                      className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs"
                    >
                      <div className="min-w-0 pr-2">
                        <p className="font-semibold text-[#F5F5F7] dark:text-[#F5F5F7] light:text-[#121316] truncate">
                          {p.name}
                        </p>
                        <p className="text-[11px] text-[#9698A3] truncate">{p.category}</p>
                      </div>

                      <a
                        href="#work"
                        className="text-[11px] font-mono text-[#7C9DFF] hover:underline shrink-0"
                      >
                        View Project →
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
