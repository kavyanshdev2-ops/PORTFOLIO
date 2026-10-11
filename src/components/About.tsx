import React, { useState } from "react";
import { Sparkles, Terminal, Code2, Gamepad2, Brain, Palette, Music2, BookOpen } from "lucide-react";
import { profile } from "../data/profile";

export const About: React.FC = () => {
  const [activeInterest, setActiveInterest] = useState<number | null>(0);

  const interestIcons = [
    <Palette className="w-4 h-4 text-[#7C9DFF]" />,
    <Terminal className="w-4 h-4 text-[#7C9DFF]" />,
    <Brain className="w-4 h-4 text-[#A78BFA]" />,
    <Gamepad2 className="w-4 h-4 text-[#7C9DFF]" />,
    <BookOpen className="w-4 h-4 text-[#A78BFA]" />,
  ];

  return (
    <section id="about" className="py-28 relative border-t border-white/10 dark:border-white/10 light:border-black/5">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Eyebrow & Editorial Headline */}
        <div className="space-y-4 max-w-3xl">
          <p className="text-xs font-mono uppercase tracking-widest text-[#7C9DFF]">
            {profile.aboutStory.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-[#F5F5F7] dark:text-[#F5F5F7] light:text-[#121316]">
            {profile.aboutStory.headline}
          </h2>
        </div>

        {/* Asymmetrical Editorial Story Grid */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Story Narrative */}
          <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-[#9698A3] dark:text-[#9698A3] light:text-[#525462] leading-relaxed font-normal">
            {profile.aboutStory.paragraphs.map((p, idx) => (
              <p key={idx} className="relative pl-6 border-l border-white/10 dark:border-white/10 light:border-black/10">
                {p}
              </p>
            ))}

            {/* Quote takeaway */}
            <div className="pt-6">
              <blockquote className="p-6 rounded-2xl bg-white/[0.02] dark:bg-white/[0.02] light:bg-black/[0.02] border border-white/10 dark:border-white/10 light:border-black/5">
                <p className="text-sm sm:text-base italic text-[#F5F5F7] dark:text-[#F5F5F7] light:text-[#121316]">
                  "Technology without thoughtful design feels sterile; design without robust engineering quickly collapses. I operate right at the seam."
                </p>
                <footer className="mt-3 text-xs font-mono text-[#7C9DFF]">
                  — Kavyansh, DEV
                </footer>
              </blockquote>
            </div>
          </div>

          {/* Right Column: Personal Interests & Creative Dimensions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#656774]">
                Core Pursuits & Curiosity Fields
              </span>
              <p className="text-xs text-[#9698A3] dark:text-[#9698A3] light:text-[#525462]">
                Hover or select an area to explore what drives the craft.
              </p>
            </div>

            <div className="space-y-3">
              {profile.interests.map((interest, idx) => {
                const isSelected = activeInterest === idx;
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setActiveInterest(idx)}
                    onClick={() => setActiveInterest(idx)}
                    className={`cursor-pointer p-4 rounded-xl transition-all duration-200 border ${
                      isSelected
                        ? "bg-white/[0.06] dark:bg-white/[0.06] light:bg-black/[0.04] border-[#7C9DFF]/40 shadow-sm"
                        : "bg-white/[0.02] dark:bg-white/[0.02] light:bg-black/[0.015] border-white/5 dark:border-white/5 light:border-black/5 hover:border-white/15"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-lg bg-white/5 dark:bg-white/5 light:bg-black/5">
                          {interestIcons[idx % interestIcons.length]}
                        </div>
                        <h3 className="text-sm font-semibold text-[#F5F5F7] dark:text-[#F5F5F7] light:text-[#121316]">
                          {interest.title}
                        </h3>
                      </div>
                      <span className="text-[11px] font-mono text-[#656774]">
                        {interest.tag}
                      </span>
                    </div>

                    {isSelected && (
                      <p className="mt-2.5 text-xs text-[#9698A3] dark:text-[#9698A3] light:text-[#525462] leading-normal pl-9">
                        {interest.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
