import React, { useEffect } from "react";
import { X, ExternalLink, Github, Layers, Cpu, AlertCircle, CheckCircle2 } from "lucide-react";
import { Project } from "../data/projects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#101115] text-[#F5F5F7] border border-white/10 rounded-2xl shadow-2xl overflow-y-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#101115]/90 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#7C9DFF]">
              {project.category}
            </span>
            <span aria-hidden="true" className="text-white/20">·</span>
            <span className="text-xs font-mono text-[#9698A3]">{project.status}</span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close project modal"
            className="p-1.5 rounded-lg text-[#9698A3] hover:text-[#F5F5F7] hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Title & Links */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2
                id="modal-project-title"
                className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-[#F5F5F7]"
              >
                {project.name}
              </h2>
              <p className="mt-1 text-sm text-[#9698A3] max-w-2xl leading-relaxed">
                {project.shortDescription}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-[#F5F5F7] flex items-center gap-2 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Repository</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target={project.liveUrl.startsWith("#") ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  onClick={() => {
                    if (project.liveUrl?.startsWith("#")) {
                      onClose();
                      const el = document.getElementById(project.liveUrl.replace("#", ""));
                      el?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-[#7C9DFF] hover:bg-[#6A8DF8] text-[#08090B] text-xs font-medium flex items-center gap-2 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Launch View</span>
                </a>
              )}
            </div>
          </div>

          {/* Featured Visual Image Banner */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/40">
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // Resilient fallback container if needed
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          </div>

          {/* Deep Architectural Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* System Architecture */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#7C9DFF]">
                <Layers className="w-4 h-4" />
                <span>Architecture Blueprint</span>
              </div>
              <ul className="space-y-2 text-xs text-[#9698A3] leading-relaxed">
                {project.architecture.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#7C9DFF] mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Technical Decisions */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#A78BFA]">
                <Cpu className="w-4 h-4" />
                <span>Engineering Decisions</span>
              </div>
              <ul className="space-y-2 text-xs text-[#9698A3] leading-relaxed">
                {project.technicalDecisions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#A78BFA] mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Challenges & Lessons Learned */}
          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-300">
              <AlertCircle className="w-4 h-4" />
              <span>Challenges & Technical Lessons</span>
            </div>
            <ul className="space-y-2 text-xs text-[#9698A3] leading-relaxed">
              {project.challengesAndLessons.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-300 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies Used Strip (Unboxed metadata with separators) */}
          <div className="pt-2 border-t border-white/10 flex flex-wrap items-center gap-2 text-xs font-mono text-[#9698A3]">
            <span className="text-[#656774] uppercase text-[11px]">Stack:</span>
            {project.technologies.map((t, idx) => (
              <React.Fragment key={idx}>
                <span className="text-[#F5F5F7]">{t}</span>
                {idx < project.technologies.length - 1 && (
                  <span aria-hidden="true" className="text-white/20">·</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
