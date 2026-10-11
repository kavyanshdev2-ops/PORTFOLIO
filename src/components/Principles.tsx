import React from "react";

export const Principles: React.FC = () => {
  const principles = [
    {
      num: "01",
      title: "Build with purpose.",
      body: "Every line of code and architectural decision must solve an actual challenge or fundamentally elevate the user journey. I avoid unnecessary complexity and vanity abstractions.",
    },
    {
      num: "02",
      title: "Design is function.",
      body: "Visual restraint, typography, and fluid feedback aren’t cosmetic afterthoughts — they are the direct medium through which humans interact with software. Polish builds trust.",
    },
    {
      num: "03",
      title: "Stay curious.",
      body: "True breakthroughs happen when technical rigor meets fearless experimentation. The best digital products are born when you ask: 'What happens if we push this further?'",
    },
  ];

  return (
    <section className="py-28 relative border-t border-white/10 dark:border-white/10 light:border-black/5">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Eyebrow */}
        <div className="space-y-3 pb-14 max-w-xl">
          <p className="text-xs font-mono uppercase tracking-widest text-[#7C9DFF]">
            ENGINEERING CREED
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-[#F5F5F7] dark:text-[#F5F5F7] light:text-[#121316]">
            Design philosophy. <br />
            <span className="text-[#9698A3] dark:text-[#9698A3] light:text-[#525462]">
              Rooted in craft.
            </span>
          </h2>
        </div>

        {/* Editorial 3-Column Split */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          {principles.map((item) => (
            <div
              key={item.num}
              className="space-y-5 pt-6 border-t border-white/15 dark:border-white/15 light:border-black/15 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono text-[#7C9DFF] group-hover:translate-x-1 transition-transform">
                  {item.num}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#7C9DFF] transition-colors" />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-display text-[#F5F5F7] dark:text-[#F5F5F7] light:text-[#121316]">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#9698A3] dark:text-[#9698A3] light:text-[#525462] leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
