import React from "react";
import { ArrowUp, Github, Linkedin } from "lucide-react";
import { socialLinks } from "../data/socialLinks";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/10 dark:border-white/10 light:border-black/5 bg-[#08090B] dark:bg-[#08090B] light:bg-[#FAFAFC] py-14">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/5 dark:border-white/5 light:border-black/5">
          {/* Wordmark & Persona */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold font-display tracking-tight text-[#F5F5F7] dark:text-[#F5F5F7] light:text-[#121316]">
                Kavyansh
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#7C9DFF]" />
            </div>
            <p className="text-xs text-[#9698A3] dark:text-[#9698A3] light:text-[#525462] font-mono">
              Developer · Creative Technologist · Builder
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-[#9698A3] dark:text-[#9698A3] light:text-[#525462]">
            <a href="#about" className="hover:text-[#F5F5F7] transition-colors">About</a>
            <a href="#work" className="hover:text-[#F5F5F7] transition-colors">Work</a>
            <a href="#stack" className="hover:text-[#F5F5F7] transition-colors">Stack</a>
            <a href="#experiments" className="hover:text-[#F5F5F7] transition-colors">Experiments</a>
            <a href="#contact" className="hover:text-[#F5F5F7] transition-colors">Contact</a>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#9698A3] hover:text-[#F5F5F7] transition-colors shrink-0"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#7C9DFF]" />
          </button>
        </div>

        {/* Bottom Credits Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#656774]">
          <p>© {currentYear} Kavyansh. All rights reserved.</p>
          <p className="italic text-[#9698A3] dark:text-[#9698A3] light:text-[#525462]">
            Made with curiosity, caffeine, and too many open tabs.
          </p>
        </div>
      </div>
    </footer>
  );
};
