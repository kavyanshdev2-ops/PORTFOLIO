import React, { useState } from "react";
import { Mail, Copy, Check, Send, ArrowUpRight, Github, Linkedin, MessageSquare } from "lucide-react";
import { contactDetails, socialLinks } from "../data/socialLinks";

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactDetails.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const validate = () => {
    const err: Record<string, string> = {};
    if (!formData.name.trim()) err.name = "Please enter your name.";
    if (!formData.email.trim() || !formData.email.includes("@")) {
      err.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      err.message = "Message must be at least 10 characters.";
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Formatted mailto dispatch to ensure real, transparent message transport
    setTimeout(() => {
      const subject = encodeURIComponent(formData.subject || `Inquiry from ${formData.name}`);
      const body = encodeURIComponent(
        `Hi Kavyansh,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
      );
      window.location.href = `mailto:${contactDetails.email}?subject=${subject}&body=${body}`;

      setIsSubmitting(false);
      setIsSent(true);
    }, 600);
  };

  return (
    <section id="contact" className="py-28 relative border-t border-white/10 dark:border-white/10 light:border-black/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Headline, Direct Links, & Location Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <p className="text-xs font-mono uppercase tracking-widest text-[#7C9DFF]">
                GET IN TOUCH
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-[#F5F5F7] dark:text-[#F5F5F7] light:text-[#121316] leading-tight">
                Have an idea? <br />
                <span className="text-[#7C9DFF]">Let’s make it real.</span>
              </h2>
              <p className="text-sm sm:text-base text-[#9698A3] dark:text-[#9698A3] light:text-[#525462] leading-relaxed">
                I’m always interested in ambitious ideas, interesting collaborations, and opportunities to build something meaningful.
              </p>
            </div>

            {/* Email Direct Action Card */}
            <div className="p-5 rounded-2xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-black/[0.02] border border-white/10 dark:border-white/10 light:border-black/10 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#656774]">
                Direct Communication Channel
              </span>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <a
                  href={`mailto:${contactDetails.email}`}
                  className="text-sm font-semibold text-[#F5F5F7] dark:text-[#F5F5F7] light:text-[#121316] hover:text-[#7C9DFF] transition-colors truncate"
                >
                  {contactDetails.email}
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#9698A3] hover:text-[#F5F5F7] flex items-center gap-1.5 transition-colors shrink-0"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Social links grid */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#656774]">
                Networks & Profiles
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                {socialLinks.map((item) => (
                  <a
                    key={item.platform}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/[0.02] dark:bg-white/[0.02] light:bg-black/[0.02] border border-white/10 dark:border-white/10 light:border-black/10 hover:border-[#7C9DFF]/40 text-xs text-[#9698A3] hover:text-[#F5F5F7] transition-all flex items-center justify-between group"
                  >
                    <span>{item.platform}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#656774] group-hover:text-[#7C9DFF] transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Location & Timezone metadata */}
            <div className="pt-2 text-xs font-mono text-[#656774] flex items-center gap-2">
              <span>{contactDetails.location}</span>
              <span aria-hidden="true">·</span>
              <span>{contactDetails.timezone}</span>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-white/[0.02] dark:bg-white/[0.02] light:bg-black/[0.02] border border-white/10 dark:border-white/10 light:border-black/10">
            {isSent ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-display text-[#F5F5F7]">
                  Draft Prepared in Mail Client
                </h3>
                <p className="text-xs sm:text-sm text-[#9698A3] max-w-md mx-auto leading-relaxed">
                  Your default email client has been opened with your inquiry. You can also reach out directly at{" "}
                  <span className="text-[#7C9DFF]">{contactDetails.email}</span>.
                </p>
                <button
                  onClick={() => {
                    setIsSent(false);
                    setFormData({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-[#F5F5F7] transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="text-xs font-mono text-[#9698A3]">
                      Your Name <span className="text-[#7C9DFF]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: "" });
                      }}
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 dark:bg-white/5 light:bg-black/5 border border-white/10 dark:border-white/10 light:border-black/10 text-xs text-[#F5F5F7] dark:text-[#F5F5F7] light:text-[#121316] outline-none focus:border-[#7C9DFF] transition-colors"
                    />
                    {errors.name && (
                      <p className="text-[11px] text-rose-400 font-mono">{errors.name}</p>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="text-xs font-mono text-[#9698A3]">
                      Your Email <span className="text-[#7C9DFF]">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: "" });
                      }}
                      placeholder="jane@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 dark:bg-white/5 light:bg-black/5 border border-white/10 dark:border-white/10 light:border-black/10 text-xs text-[#F5F5F7] dark:text-[#F5F5F7] light:text-[#121316] outline-none focus:border-[#7C9DFF] transition-colors"
                    />
                    {errors.email && (
                      <p className="text-[11px] text-rose-400 font-mono">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Subject field */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-subject" className="text-xs font-mono text-[#9698A3]">
                    Subject / Topic
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="New digital product collaboration or technical exploration"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 dark:bg-white/5 light:bg-black/5 border border-white/10 dark:border-white/10 light:border-black/10 text-xs text-[#F5F5F7] dark:text-[#F5F5F7] light:text-[#121316] outline-none focus:border-[#7C9DFF] transition-colors"
                  />
                </div>

                {/* Message field */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="text-xs font-mono text-[#9698A3]">
                    Message <span className="text-[#7C9DFF]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: "" });
                    }}
                    placeholder="Tell me about what you're building, the vision, and where you'd like to collaborate..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 dark:bg-white/5 light:bg-black/5 border border-white/10 dark:border-white/10 light:border-black/10 text-xs text-[#F5F5F7] dark:text-[#F5F5F7] light:text-[#121316] outline-none focus:border-[#7C9DFF] transition-colors resize-none"
                  />
                  {errors.message && (
                    <p className="text-[11px] text-rose-400 font-mono">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 rounded-xl bg-[#7C9DFF] hover:bg-[#6A8DF8] text-[#08090B] font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-[#7C9DFF]/20 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Preparing message...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Transmit Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
