import React, { useState, useEffect, useRef } from "react";
import { Search, Compass, FolderGit2, Cpu, Sparkles, Mail, Sun, Moon, ArrowRight, X } from "lucide-react";
import { projects } from "../data/projects";
import { socialLinks, contactDetails } from "../data/socialLinks";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (projectId: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Navigation" | "Projects" | "Actions" | "Contact";
  icon: React.ReactNode;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectProject,
  isDark,
  onToggleTheme,
}) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const scrollTo = (id: string) => {
    onClose();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(contactDetails.email);
    onClose();
  };

  const items: CommandItem[] = [
    // Navigation
    {
      id: "nav-home",
      title: "Home",
      subtitle: "Return to hero overview",
      category: "Navigation",
      icon: <Compass className="w-4 h-4 text-[#7C9DFF]" />,
      action: () => scrollTo("hero"),
    },
    {
      id: "nav-about",
      title: "About",
      subtitle: "Personal story & philosophy",
      category: "Navigation",
      icon: <Compass className="w-4 h-4 text-[#7C9DFF]" />,
      action: () => scrollTo("about"),
    },
    {
      id: "nav-work",
      title: "Selected Work",
      subtitle: "Explore featured projects and systems",
      category: "Navigation",
      icon: <FolderGit2 className="w-4 h-4 text-[#7C9DFF]" />,
      action: () => scrollTo("work"),
    },
    {
      id: "nav-stack",
      title: "Tech Stack",
      subtitle: "Tools, languages & playgrounds",
      category: "Navigation",
      icon: <Cpu className="w-4 h-4 text-[#7C9DFF]" />,
      action: () => scrollTo("stack"),
    },
    {
      id: "nav-experiments",
      title: "Experiments Lab",
      subtitle: "Interactive UI, glass & canvas demos",
      category: "Navigation",
      icon: <Sparkles className="w-4 h-4 text-[#A78BFA]" />,
      action: () => scrollTo("experiments"),
    },
    {
      id: "nav-contact",
      title: "Contact",
      subtitle: "Direct message & collaborative inquiries",
      category: "Navigation",
      icon: <Mail className="w-4 h-4 text-[#7C9DFF]" />,
      action: () => scrollTo("contact"),
    },

    // Projects
    ...projects.map((proj) => ({
      id: `proj-${proj.id}`,
      title: proj.name,
      subtitle: `${proj.category} · ${proj.status}`,
      category: "Projects" as const,
      icon: <FolderGit2 className="w-4 h-4 text-[#7C9DFF]" />,
      action: () => {
        onClose();
        onSelectProject(proj.id);
      },
    })),

    // Actions
    {
      id: "act-theme",
      title: isDark ? "Switch to Light Mode" : "Switch to Dark Mode",
      subtitle: "Toggle obsidian or crisp light aesthetics",
      category: "Actions",
      icon: isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />,
      action: () => {
        onToggleTheme();
        onClose();
      },
    },
    {
      id: "act-copy-email",
      title: "Copy Email Address",
      subtitle: contactDetails.email,
      category: "Actions",
      icon: <Mail className="w-4 h-4 text-[#7C9DFF]" />,
      action: copyEmail,
    },

    // Social Contact
    ...socialLinks.map((s) => ({
      id: `social-${s.platform}`,
      title: s.platform,
      subtitle: s.label,
      category: "Contact" as const,
      icon: <ArrowRight className="w-4 h-4 text-[#9698A3]" />,
      action: () => {
        window.open(s.url, "_blank", "noopener,noreferrer");
        onClose();
      },
    })),
  ];

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Menu"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-md transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[#101115] text-[#F5F5F7] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
          <Search className="w-4 h-4 text-[#9698A3]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or search sections, projects..."
            className="flex-1 bg-transparent text-sm text-[#F5F5F7] placeholder-[#656774] outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#9698A3] hover:text-[#F5F5F7] hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#9698A3]">
              No commands matching "{query}"
            </div>
          ) : (
            filteredItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={item.action}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors ${
                  idx === selectedIndex
                    ? "bg-[#7C9DFF]/15 text-[#F5F5F7] border border-[#7C9DFF]/30"
                    : "text-[#9698A3] hover:bg-white/5 hover:text-[#F5F5F7] border border-transparent"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="shrink-0 p-1.5 rounded-lg bg-white/5">{item.icon}</div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-[#F5F5F7] truncate">{item.title}</p>
                    <p className="text-[11px] text-[#9698A3] truncate">{item.subtitle}</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#656774] shrink-0 ml-2">
                  {item.category}
                </span>
              </button>
            ))
          )}
        </div>

        {/* Keyboard hints footer */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-white/5 bg-black/30 text-[11px] font-mono text-[#656774]">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <span>Kavyansh OS v2.6</span>
        </div>
      </div>
    </div>
  );
};
