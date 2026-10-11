import React, { useState, useEffect } from "react";
import { Command, Sun, Moon, Menu, X, ArrowUpRight } from "lucide-react";

interface NavigationProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenCommandPalette: () => void;
  activeSection: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  isDark,
  onToggleTheme,
  onOpenCommandPalette,
  activeSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about", id: "about" },
    { label: "Work", href: "#work", id: "work" },
    { label: "Stack", href: "#stack", id: "stack" },
    { label: "Experiments", href: "#experiments", id: "experiments" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#08090B]/80 dark:bg-[#08090B]/80 light:bg-white/85 backdrop-blur-xl border-b border-white/10 dark:border-white/10 light:border-black/5 py-3.5 shadow-lg shadow-black/10"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between gap-8">
          {/* Zone 1: Wordmark */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-lg font-bold font-display tracking-tight text-[#F5F5F7] dark:text-[#F5F5F7] light:text-[#121316] hover:opacity-85 transition-opacity whitespace-nowrap shrink-0 flex items-center gap-2 group"
          >
            <span>Kavyansh</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#7C9DFF] opacity-80 group-hover:scale-125 transition-transform" />
          </a>

          {/* Zone 2: Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#9698A3] dark:text-[#9698A3] light:text-[#525462]"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 hover:text-[#F5F5F7] dark:hover:text-[#F5F5F7] light:hover:text-[#121316] ${
                    isActive ? "text-[#F5F5F7] dark:text-[#F5F5F7] light:text-[#121316]" : ""
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7C9DFF] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Command Launcher, Theme Switcher, Quick Connect) */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Quick Command Launcher Button */}
            <button
              onClick={onOpenCommandPalette}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 dark:bg-white/5 light:bg-black/5 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-black/10 border border-white/10 dark:border-white/10 light:border-black/10 text-xs font-mono text-[#9698A3] dark:text-[#9698A3] light:text-[#525462] transition-colors whitespace-nowrap shrink-0"
              title="Open Command Palette (Cmd + K)"
            >
              <Command className="w-3.5 h-3.5 text-[#7C9DFF]" />
              <span className="hidden lg:inline">Cmd + K</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
              className="p-2 rounded-xl bg-white/5 dark:bg-white/5 light:bg-black/5 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-black/10 border border-white/10 dark:border-white/10 light:border-black/10 text-[#9698A3] dark:text-[#9698A3] light:text-[#525462] hover:text-[#F5F5F7] dark:hover:text-[#F5F5F7] light:hover:text-[#121316] transition-colors whitespace-nowrap shrink-0"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-indigo-500" />}
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => handleNavClick("#contact")}
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#7C9DFF] hover:bg-[#6A8DF8] text-[#08090B] font-medium text-xs transition-colors whitespace-nowrap shrink-0 shadow-sm shadow-[#7C9DFF]/20"
            >
              <span>Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="md:hidden p-2 rounded-xl bg-white/5 dark:bg-white/5 light:bg-black/5 text-[#9698A3] hover:text-[#F5F5F7] dark:hover:text-[#F5F5F7] light:hover:text-[#121316] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden bg-[#08090B]/95 backdrop-blur-2xl pt-24 px-6 flex flex-col justify-between pb-10 animate-in fade-in">
          <div className="space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-[#656774] pb-2 border-b border-white/10">
              Navigation
            </div>
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="block text-2xl font-display font-medium text-[#F5F5F7] hover:text-[#7C9DFF] transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="space-y-4 pt-6 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCommandPalette();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-[#9698A3]"
            >
              <Command className="w-4 h-4 text-[#7C9DFF]" />
              <span>Open Command Palette</span>
            </button>
            <button
              onClick={() => handleNavClick("#contact")}
              className="w-full py-3 rounded-xl bg-[#7C9DFF] text-[#08090B] font-medium text-sm text-center"
            >
              Let’s Connect
            </button>
          </div>
        </div>
      )}
    </>
  );
};
