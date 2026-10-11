import React, { useState } from "react";
import { ArrowDown, Sparkles, FolderGit2, Mail, ExternalLink } from "lucide-react";
import { profile } from "../data/profile";
import { HeroArtifactCanvas } from "./HeroArtifactCanvas";

interface HeroProps {
  onExploreWork: () => void;
  onConnect: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onConnect }) => {
  // Configurable availability indicator status state so user can toggle/edit easily
  const [availability, setAvailability] = useState(profile.availability);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 overflow-hidden"
    >
      {/* Interactive cursor light field & ambient gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-[#7C9DFF]/10 via-[#A78BFA]/08 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-noise opacity-40 pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-6 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Availability status tag (unboxed text with subtle separator, editable) */}
            <div className="flex items-center gap-2.5 text-xs text-[#9698A3] dark:text-[#9698A3] light:text-[#525462] font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7C9DFF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7C9DFF]"></span>
              </span>
              <span className="font-medium text-[#F5F5F7] dark:text-[#F5F5F7] light:text-[#121316]">
                {availability.label}
              </span>
              <span aria-hidden="true" className="text-white/20">·</span>
              <span className="hidden sm:inline text-[11px] text-[#656774]">
                {availability.sublabel}
              </span>
            </div>

            {/* Oversized Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-bold font-display tracking-tight leading-[1.08] text-balance">
              {profile.headline.part1}{" "}
              <span className="block mt-1 bg-gradient-to-r from-[#7C9DFF] via-[#A78BFA] to-[#7C9DFF] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
                {profile.headline.highlight}
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-[#9698A3] dark:text-[#9698A3] light:text-[#525462] leading-relaxed max-w-xl">
              {profile.bioShort}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreWork}
                className="px-6 py-3 rounded-xl bg-[#F5F5F7] text-[#08090B] font-medium text-sm hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 shadow-lg shadow-white/5"
              >
                <FolderGit2 className="w-4 h-4 text-[#08090B]" />
                <span>Explore Selected Work</span>
              </button>

              <button
                onClick={onConnect}
                className="px-6 py-3 rounded-xl bg-white/5 dark:bg-white/5 light:bg-black/5 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-black/10 border border-white/10 dark:border-white/10 light:border-black/10 text-sm font-medium text-[#F5F5F7] dark:text-[#F5F5F7] light:text-[#121316] transition-all flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-[#7C9DFF]" />
                <span>Let’s Connect</span>
              </button>
            </div>

            {/* Identity & Technical DNA unboxed metadata */}
            <div className="pt-4 flex flex-wrap items-center gap-3 text-xs font-mono text-[#9698A3] dark:text-[#9698A3] light:text-[#656774]">
              <span>4+ Years Craft</span>
              <span aria-hidden="true">·</span>
              <span>Full-Stack Systems</span>
              <span aria-hidden="true">·</span>
              <span>Creative Code</span>
              <span aria-hidden="true">·</span>
              <span>Next-Gen UI</span>
            </div>
          </div>

          {/* Right Column: 3D Interactive Centerpiece */}
          <div className="lg:col-span-5 flex justify-center">
            <HeroArtifactCanvas />
          </div>
        </div>

        {/* Factual Milestones Row below the split (Portfolio Guideline rule) */}
        <div className="mt-16 pt-8 border-t border-white/10 dark:border-white/10 light:border-black/10 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {profile.milestones.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <p className="text-xs font-mono uppercase tracking-wider text-[#7C9DFF]">
                {item.label}
              </p>
              <p className="text-xs text-[#9698A3] dark:text-[#9698A3] light:text-[#525462] leading-normal">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="mt-10 flex flex-col items-center justify-center text-xs font-mono text-[#656774] space-y-2 pointer-events-none">
        <span>Scroll to discover</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#7C9DFF]" />
      </div>
    </section>
  );
};
