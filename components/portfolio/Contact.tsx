"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, ArrowUpRight, Check, Instagram, Youtube, Linkedin } from "lucide-react";
import { BehanceIcon } from "@/components/icons/BehanceIcon";
import { siteSettings } from "@/data/site";

export default function Contact() {
  const { contact, socials } = siteSettings;
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 4000);
    }, 1000);
  };

  return (
    <section id="contact" className="relative z-10 section-y">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column Info */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-6 h-px bg-white/25" />
              <span className="text-[10px] tracking-[0.32em] text-white/50 font-medium uppercase">
                CONTACT
              </span>
              <span className="w-6 h-px bg-white/25" />
            </div>

            <h2 className="text-[44px] md:text-[68px] lg:text-[88px] leading-[0.98] tracking-[-0.03em] font-black">
              Let’s make something<br />
              <span className="font-serif-editorial" style={{ color: "var(--accent)" }}>
                unforgettable.
              </span>
            </h2>

            <p className="mt-8 text-white/55 max-w-md text-[15px] leading-[1.7]">
              {contact.subheading}
            </p>

            {/* Direct Coordinates */}
            <div className="mt-12 space-y-5">
              <a href={`mailto:${contact.email}`} className="flex items-center gap-4 group">
                <span className="w-10 h-10 rounded-full border border-white/10 grid place-items-center group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] transition">
                  <Mail size={14} />
                </span>
                <span className="text-white/85 group-hover:text-white text-[15px] transition font-medium">
                  {contact.email}
                </span>
              </a>

              <div className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-full border border-white/10 grid place-items-center">
                  <Phone size={14} />
                </span>
                <span className="text-white/85 text-[15px] font-medium">{contact.phone}</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-full border border-white/10 grid place-items-center">
                  <MapPin size={14} />
                </span>
                <span className="text-white/85 text-[15px] font-medium">{contact.location}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-10 flex items-center gap-3">
              {socials.instagram && (
                <a
                  href={socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 grid place-items-center hover:border-[var(--accent)] hover:bg-[var(--accent)] transition hover:scale-105"
                  aria-label="Instagram"
                >
                  <Instagram size={14} />
                </a>
              )}
              {socials.youtube && (
                <a
                  href={socials.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 grid place-items-center hover:border-[var(--accent)] hover:bg-[var(--accent)] transition hover:scale-105"
                  aria-label="YouTube"
                >
                  <Youtube size={14} />
                </a>
              )}
              {socials.linkedin && (
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 grid place-items-center hover:border-[var(--accent)] hover:bg-[var(--accent)] transition hover:scale-105"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={14} />
                </a>
              )}
              {socials.behance && (
                <a
                  href={socials.behance}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 grid place-items-center hover:border-[var(--accent)] hover:bg-[var(--accent)] transition hover:scale-105"
                  aria-label="Behance"
                >
                  <BehanceIcon size={15} />
                </a>
              )}
            </div>
          </div>

          {/* Right Column Form */}
          <div className="lg:col-span-6">
            <div className="glass rounded-[28px] p-8 md:p-10 relative overflow-hidden bg-[#0a0a0a]/90">
              <div
                className="absolute -top-16 -right-16 w-60 h-60 rounded-full opacity-25 blur-3xl pointer-events-none"
                style={{ background: "var(--accent)" }}
              />

              <div className="flex items-center gap-3 mb-6">
                <span className="w-5 h-px bg-white/25" />
                <span className="text-[10px] tracking-[0.32em] text-white/50 uppercase font-medium">
                  PROJECT ENQUIRY
                </span>
                <span className="w-5 h-px bg-white/25" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div>
                  <label className="block text-[10px] tracking-[0.24em] text-white/60 mb-2 font-semibold uppercase">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Christopher Nolan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border-b border-white/15 focus:border-[var(--accent)] outline-none py-2.5 text-[15px] text-white placeholder-white/20 transition"
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.24em] text-white/60 mb-2 font-semibold uppercase">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="nolan@syncopy.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent border-b border-white/15 focus:border-[var(--accent)] outline-none py-2.5 text-[15px] text-white placeholder-white/20 transition"
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.24em] text-white/60 mb-2 font-semibold uppercase">
                    TELL ME ABOUT THE PROJECT
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="A few lines on what you're making, timeline and references..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-transparent border-b border-white/15 focus:border-[var(--accent)] outline-none py-2.5 text-[15px] text-white placeholder-white/20 transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitted}
                  className="w-full mt-4 py-3.5 rounded-full font-bold tracking-[0.18em] text-[12px] uppercase text-white flex items-center justify-center gap-2 group transition-all duration-300 hover:scale-[1.01]"
                  style={{
                    background: "var(--accent)",
                    boxShadow: "0 10px 30px -8px var(--glow)",
                  }}
                >
                  {submitted ? (
                    <>
                      <Check size={16} /> Message Sent
                    </>
                  ) : (
                    <>
                      <span>SEND MESSAGE</span>
                      <span className="w-6 h-6 rounded-full bg-white text-black grid place-items-center transition-transform group-hover:rotate-45">
                        <ArrowUpRight size={13} strokeWidth={2.5} />
                      </span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}