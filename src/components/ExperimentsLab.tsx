import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Sliders, Type, Palette, Activity, Copy, Check, RotateCcw } from "lucide-react";

export const ExperimentsLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"glass" | "type" | "color" | "motion">("glass");

  // --- EXPERIMENT A: LIQUID GLASS PLAYGROUND ---
  const [glassBlur, setGlassBlur] = useState(20);
  const [glassOpacity, setGlassOpacity] = useState(6);
  const [borderIntensity, setBorderIntensity] = useState(15);
  const [ambientLight, setAmbientLight] = useState(50);
  const [copiedCSS, setCopiedCSS] = useState(false);

  const glassCSSCode = `backdrop-filter: blur(${glassBlur}px);
background: rgba(255, 255, 255, ${(glassOpacity / 100).toFixed(2)});
border: 1px solid rgba(255, 255, 255, ${(borderIntensity / 100).toFixed(2)});
box-shadow: 0 8px 32px 0 rgba(0, 0, 0, ${(ambientLight / 150).toFixed(2)});`;

  const handleCopyCSS = () => {
    navigator.clipboard.writeText(glassCSSCode);
    setCopiedCSS(true);
    setTimeout(() => setCopiedCSS(false), 2000);
  };

  // --- EXPERIMENT B: INTERACTIVE TYPE LAB ---
  const [typeText, setTypeText] = useState("Curiosity is where everything starts.");
  const [fontSize, setFontSize] = useState(38);
  const [letterSpacing, setLetterSpacing] = useState(-1);
  const [lineHeight, setLineHeight] = useState(1.15);
  const [fontFamily, setFontFamily] = useState<"display" | "sans" | "mono">("display");
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">("left");

  // --- EXPERIMENT C: COLOR ATMOSPHERE ---
  const [color1, setColor1] = useState("#7C9DFF");
  const [color2, setColor2] = useState("#A78BFA");
  const [color3, setColor3] = useState("#1E1B4B");
  const [gradientAngle, setGradientAngle] = useState(135);
  const [pulseSpeed, setPulseSpeed] = useState(3);

  // --- EXPERIMENT D: MOTION EXPERIMENT ---
  const motionCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [particleCount, setParticleCount] = useState(48);
  const [isAttracting, setIsAttracting] = useState(true);

  useEffect(() => {
    if (activeTab !== "motion") return;
    const canvas = motionCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const width = rect.width;
    const height = rect.height;

    // Particles simulation
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      radius: Math.random() * 2.5 + 1.5,
      hue: Math.random() > 0.5 ? 225 : 260, // Blue or violet
    }));

    let mouse = { x: width / 2, y: height / 2, active: false };

    const handlePointerMove = (e: MouseEvent) => {
      const cr = canvas.getBoundingClientRect();
      mouse.x = e.clientX - cr.left;
      mouse.y = e.clientY - cr.top;
      mouse.active = true;
    };

    const handlePointerLeave = () => {
      mouse.active = false;
    };

    const handleClick = () => {
      // Burst effect
      particles.forEach((p) => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        p.vx += (dx / dist) * 7;
        p.vy += (dy / dist) * 7;
      });
    };

    canvas.addEventListener("mousemove", handlePointerMove);
    canvas.addEventListener("mouseleave", handlePointerLeave);
    canvas.addEventListener("click", handleClick);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect near particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 75) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(124, 157, 255, ${(1 - dist / 75) * 0.25})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      particles.forEach((p) => {
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const force = (1 - dist / 180) * 0.12;
            const factor = isAttracting ? 1 : -1;
            p.vx += (dx / dist) * force * factor;
            p.vy += (dy / dist) * force * factor;
          }
        }

        // Friction & integration
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;

        // Bounce walls
        if (p.x < 0) { p.x = 0; p.vx *= -1; }
        if (p.x > width) { p.x = width; p.vx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; }
        if (p.y > height) { p.y = height; p.vy *= -1; }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${p.hue}, 90%, 75%)`;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousemove", handlePointerMove);
      canvas.removeEventListener("mouseleave", handlePointerLeave);
      canvas.removeEventListener("click", handleClick);
    };
  }, [activeTab, particleCount, isAttracting]);

  return (
    <section id="experiments" className="py-28 relative border-t border-white/10 dark:border-white/10 light:border-black/5">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12">
          <div className="space-y-3 max-w-xl">
            <p className="text-xs font-mono uppercase tracking-widest text-[#7C9DFF]">
              INTERACTION LAB
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-[#F5F5F7] dark:text-[#F5F5F7] light:text-[#121316]">
              Things I build <br />
              <span className="text-[#9698A3] dark:text-[#9698A3] light:text-[#525462]">
                just to see what’s possible.
              </span>
            </h2>
          </div>

          {/* Experiment Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white/5 dark:bg-white/5 light:bg-black/5 border border-white/10 dark:border-white/10 light:border-black/10 shrink-0">
            <button
              onClick={() => setActiveTab("glass")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === "glass"
                  ? "bg-[#7C9DFF] text-[#08090B] font-semibold"
                  : "text-[#9698A3] hover:text-[#F5F5F7]"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Liquid Glass</span>
            </button>
            <button
              onClick={() => setActiveTab("type")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === "type"
                  ? "bg-[#7C9DFF] text-[#08090B] font-semibold"
                  : "text-[#9698A3] hover:text-[#F5F5F7]"
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              <span>Type Lab</span>
            </button>
            <button
              onClick={() => setActiveTab("color")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === "color"
                  ? "bg-[#7C9DFF] text-[#08090B] font-semibold"
                  : "text-[#9698A3] hover:text-[#F5F5F7]"
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Atmosphere</span>
            </button>
            <button
              onClick={() => setActiveTab("motion")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === "motion"
                  ? "bg-[#7C9DFF] text-[#08090B] font-semibold"
                  : "text-[#9698A3] hover:text-[#F5F5F7]"
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Kinetic Mesh</span>
            </button>
          </div>
        </div>

        {/* Experiment Display Container */}
        <div className="rounded-2xl bg-white/[0.02] dark:bg-white/[0.02] light:bg-black/[0.02] border border-white/10 dark:border-white/10 light:border-black/10 p-6 sm:p-8 lg:p-10">
          {/* EXPERIMENT A: LIQUID GLASS PLAYGROUND */}
          {activeTab === "glass" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Controls Column */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h3 className="text-xl font-bold font-display text-[#F5F5F7] dark:text-[#F5F5F7] light:text-[#121316]">
                    Liquid Glass Physics
                  </h3>
                  <p className="mt-1 text-xs text-[#9698A3] dark:text-[#9698A3] light:text-[#525462]">
                    Adjust optical refraction, translucent opacity, and hairline edge light in real time.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono text-[#9698A3]">
                      <span>Backdrop Blur</span>
                      <span>{glassBlur}px</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="40"
                      value={glassBlur}
                      onChange={(e) => setGlassBlur(Number(e.target.value))}
                      className="w-full accent-[#7C9DFF]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono text-[#9698A3]">
                      <span>Surface Opacity</span>
                      <span>{glassOpacity}%</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="25"
                      value={glassOpacity}
                      onChange={(e) => setGlassOpacity(Number(e.target.value))}
                      className="w-full accent-[#7C9DFF]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono text-[#9698A3]">
                      <span>Border Hairline Light</span>
                      <span>{borderIntensity}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="40"
                      value={borderIntensity}
                      onChange={(e) => setBorderIntensity(Number(e.target.value))}
                      className="w-full accent-[#7C9DFF]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono text-[#9698A3]">
                      <span>Ambient Light Depth</span>
                      <span>{ambientLight}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={ambientLight}
                      onChange={(e) => setAmbientLight(Number(e.target.value))}
                      className="w-full accent-[#7C9DFF]"
                    />
                  </div>
                </div>

                <button
                  onClick={handleCopyCSS}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#F5F5F7] flex items-center justify-center gap-2 transition-colors"
                >
                  {copiedCSS ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Copied CSS to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#7C9DFF]" />
                      <span>Copy Generated CSS Snippet</span>
                    </>
                  )}
                </button>
              </div>

              {/* Live Preview Column */}
              <div className="lg:col-span-7 relative min-h-[360px] rounded-2xl overflow-hidden flex items-center justify-center p-8 bg-[#0B0C10] border border-white/10">
                {/* Colorful ambient shapes underneath to demonstrate refraction */}
                <div className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-[#7C9DFF]/30 blur-2xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-[#A78BFA]/30 blur-2xl" />
                <div className="absolute inset-0 bg-noise opacity-30" />

                {/* The dynamic glass card */}
                <div
                  style={{
                    backdropFilter: `blur(${glassBlur}px)`,
                    WebkitBackdropFilter: `blur(${glassBlur}px)`,
                    backgroundColor: `rgba(255, 255, 255, ${glassOpacity / 100})`,
                    border: `1px solid rgba(255, 255, 255, ${borderIntensity / 100})`,
                    boxShadow: `0 8px 32px 0 rgba(0, 0, 0, ${ambientLight / 150})`,
                  }}
                  className="relative z-10 w-full max-w-md p-6 rounded-2xl space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#7C9DFF]">
                      Live Rendered Glass
                    </span>
                    <span className="text-[11px] font-mono text-[#9698A3]">
                      blur({glassBlur}px)
                    </span>
                  </div>
                  <h4 className="text-lg font-bold font-display text-[#F5F5F7]">
                    Liquid Obsidian Interface
                  </h4>
                  <p className="text-xs text-[#9698A3] leading-relaxed">
                    Notice how high blur smooths the underlying colorful gradients while subtle opacity preserves optical legibility.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* EXPERIMENT B: INTERACTIVE TYPE LAB */}
          {activeTab === "type" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h3 className="text-xl font-bold font-display text-[#F5F5F7] dark:text-[#F5F5F7] light:text-[#121316]">
                    Kinetic Type Laboratory
                  </h3>
                  <p className="mt-1 text-xs text-[#9698A3] dark:text-[#9698A3] light:text-[#525462]">
                    Test typographic tension, letter spacing, font pairing, and rhythm.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#9698A3]">Custom Display Text</label>
                    <input
                      type="text"
                      value={typeText}
                      onChange={(e) => setTypeText(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-[#F5F5F7] outline-none focus:border-[#7C9DFF]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono text-[#9698A3]">
                      <span>Font Size</span>
                      <span>{fontSize}px</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="64"
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      className="w-full accent-[#7C9DFF]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono text-[#9698A3]">
                      <span>Letter Spacing</span>
                      <span>{letterSpacing}px</span>
                    </div>
                    <input
                      type="range"
                      min="-4"
                      max="8"
                      value={letterSpacing}
                      onChange={(e) => setLetterSpacing(Number(e.target.value))}
                      className="w-full accent-[#7C9DFF]"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <span className="text-xs font-mono text-[#656774] mr-2">Font:</span>
                    {(["display", "sans", "mono"] as const).map((f) => (
                      <button
                        key={f}
                        onClick={() => setFontFamily(f)}
                        className={`px-3 py-1 rounded-lg text-xs font-mono uppercase transition-colors ${
                          fontFamily === f
                            ? "bg-[#7C9DFF] text-[#08090B] font-semibold"
                            : "bg-white/5 text-[#9698A3] hover:text-[#F5F5F7]"
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Type Preview */}
              <div className="lg:col-span-7 min-h-[340px] p-8 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-center overflow-hidden">
                <p
                  style={{
                    fontSize: `${fontSize}px`,
                    letterSpacing: `${letterSpacing}px`,
                    lineHeight: lineHeight,
                    fontFamily:
                      fontFamily === "display"
                        ? "Outfit, sans-serif"
                        : fontFamily === "mono"
                        ? "JetBrains Mono, monospace"
                        : "Plus Jakarta Sans, sans-serif",
                    textAlign: textAlign,
                  }}
                  className="font-bold text-[#F5F5F7] transition-all"
                >
                  {typeText}
                </p>
                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#656774]">
                  <span>Family: {fontFamily}</span>
                  <span>Size: {fontSize}px</span>
                  <span>Tracking: {letterSpacing}px</span>
                </div>
              </div>
            </div>
          )}

          {/* EXPERIMENT C: COLOR ATMOSPHERE */}
          {activeTab === "color" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h3 className="text-xl font-bold font-display text-[#F5F5F7] dark:text-[#F5F5F7] light:text-[#121316]">
                    Atmospheric Light Field
                  </h3>
                  <p className="mt-1 text-xs text-[#9698A3] dark:text-[#9698A3] light:text-[#525462]">
                    Synthesize ambient gradients, directional angle, and pulsation rhythm.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-[#9698A3]">Primary</label>
                      <input
                        type="color"
                        value={color1}
                        onChange={(e) => setColor1(e.target.value)}
                        className="w-full h-9 rounded-lg bg-transparent cursor-pointer"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-[#9698A3]">Secondary</label>
                      <input
                        type="color"
                        value={color2}
                        onChange={(e) => setColor2(e.target.value)}
                        className="w-full h-9 rounded-lg bg-transparent cursor-pointer"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-[#9698A3]">Deep Base</label>
                      <input
                        type="color"
                        value={color3}
                        onChange={(e) => setColor3(e.target.value)}
                        className="w-full h-9 rounded-lg bg-transparent cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono text-[#9698A3]">
                      <span>Gradient Angle</span>
                      <span>{gradientAngle}°</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={gradientAngle}
                      onChange={(e) => setGradientAngle(Number(e.target.value))}
                      className="w-full accent-[#7C9DFF]"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => {
                        setColor1("#7C9DFF");
                        setColor2("#A78BFA");
                        setColor3("#101115");
                        setGradientAngle(135);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-[#9698A3] hover:text-[#F5F5F7] flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset Obsidian Palette</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Atmosphere Canvas Preview */}
              <div
                style={{
                  background: `linear-gradient(${gradientAngle}deg, ${color1}25, ${color2}20, ${color3})`,
                }}
                className="lg:col-span-7 min-h-[340px] rounded-2xl border border-white/10 flex items-center justify-center p-8 relative overflow-hidden transition-all duration-300"
              >
                <div className="absolute inset-0 bg-noise opacity-40" />
                <div className="relative z-10 text-center space-y-2 p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 max-w-sm">
                  <span className="text-[11px] font-mono text-[#7C9DFF]">Ambient Atmosphere</span>
                  <p className="text-sm font-medium text-[#F5F5F7]">
                    Organic lighting field designed for Apple-grade glass backgrounds.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* EXPERIMENT D: MOTION EXPERIMENT */}
          {activeTab === "motion" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold font-display text-[#F5F5F7] dark:text-[#F5F5F7] light:text-[#121316]">
                    Kinetic Vector Mesh
                  </h3>
                  <p className="mt-1 text-xs text-[#9698A3] dark:text-[#9698A3] light:text-[#525462]">
                    Move cursor to attract nodes. Click anywhere to trigger an energy burst.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsAttracting(!isAttracting)}
                    className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#F5F5F7] transition-colors"
                  >
                    Mode: {isAttracting ? "Attract" : "Repel"}
                  </button>
                  <span className="text-xs font-mono text-[#656774]">
                    {particleCount} active nodes
                  </span>
                </div>
              </div>

              <div className="relative h-[360px] rounded-2xl bg-black/50 border border-white/10 overflow-hidden cursor-crosshair">
                <canvas ref={motionCanvasRef} className="w-full h-full" />
                <div className="absolute bottom-3 right-4 text-[11px] font-mono text-[#656774] pointer-events-none">
                  Interactive Physics Engine · 60 FPS
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
