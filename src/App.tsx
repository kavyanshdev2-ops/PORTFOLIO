/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { CommandPalette } from "./components/CommandPalette";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { ProjectShowcase } from "./components/ProjectShowcase";
import { TechStack } from "./components/TechStack";
import { ExperimentsLab } from "./components/ExperimentsLab";
import { Principles } from "./components/Principles";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ScrollProgress } from "./components/ScrollProgress";
import { ProjectModal } from "./components/ProjectModal";
import { projects, Project } from "./data/projects";

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("kavyansh_theme");
      if (saved) return saved === "dark";
      return !document.documentElement.classList.contains("light");
    }
    return true;
  });

  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [modalProject, setModalProject] = useState<Project | null>(null);

  // Sync theme to HTML root element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("kavyansh_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("kavyansh_theme", "light");
    }
  }, [isDark]);

  // Global keyboard shortcut for Cmd + K / Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Section observer for active navigation highlight
  useEffect(() => {
    const sections = ["hero", "about", "work", "stack", "experiments", "contact"];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleOpenProjectById = (projectId: string) => {
    const target = projects.find((p) => p.id === projectId);
    if (target) {
      setModalProject(target);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#08090B] dark:bg-[#08090B] light:bg-[#FAFAFC] text-[#F5F5F7] dark:text-[#F5F5F7] light:text-[#121316] font-sans selection:bg-[#7C9DFF]/25 selection:text-[#F5F5F7] transition-colors duration-300">
      <ScrollProgress />

      <Navigation
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        activeSection={activeSection}
      />

      <main>
        <Hero
          onExploreWork={() => scrollToSection("work")}
          onConnect={() => scrollToSection("contact")}
        />

        <About />

        <ProjectShowcase />

        <TechStack
          onOpenProjectModal={handleOpenProjectById}
        />

        <ExperimentsLab />

        <Principles />

        <Contact />
      </main>

      <Footer />

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onSelectProject={handleOpenProjectById}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
      />

      {/* Direct Project Deep-Dive Modal if opened from Command Palette or Tech Stack */}
      <ProjectModal
        project={modalProject}
        onClose={() => setModalProject(null)}
      />
    </div>
  );
}
