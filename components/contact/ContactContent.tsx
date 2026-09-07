"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  Calendar,
  ArrowUpRight,
  Check,
  Send,
  Sparkles,
  MapPin,
  Clock,
  Instagram,
  Youtube,
  Linkedin,
} from "lucide-react";
import { BehanceIcon } from "@/components/icons/BehanceIcon";
import { siteSettings } from "@/data/site";
import { aboutData } from "@/data/about";

export default function ContactContent() {
  const { contact, socials } = siteSettings;
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Directing & Screenplay",
    referral: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "Directing & Screenplay",
        referral: "",
        message: "",
      });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1200);
  };

  return (
    <div className="relative z-10 w-full overflow-hidden pt-18 sm:pt-24 md:pt-36 pb-16 bg-transparent">
      {/* =========================================================================
          1. KINETIC HEADER
          ========================================================================= */}
      <div className="w-full max-w-[1400px] mx-auto px-5 md:px-8 mb-12 sm:mb-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 pb-8 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-6 h-px bg-white/25" />
              <span className="text-[10px] tracking-[0.32em] text-white/50 font-medium uppercase">
                CONTACT
              </span>
              <span className="w-6 h-px bg-white/25" />
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-[0.9] text-white select-none">
              Connect.
            </h1>
            <p className="mt-4 text-white/60 text-base sm:text-xl font-normal max-w-xl">
              Let&apos;s start a conversation that brings your{" "}
              <span className="font-serif-editorial italic text-white" style={{ color: "var(--accent)" }}>
                cinematic vision
              </span>{" "}
              to life.
            </p>
          </div>

          {/* Availability & Socials Pills */}
          <div className="flex flex-col items-start lg:items-end gap-3">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>COMMISSIONS OPEN &bull; Q3 / Q4 2025</span>
            </div>
            <div className="flex items-center gap-2.5">
              {socials.instagram && (
                <a
                  href={socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.03] grid place-items-center text-white/75 hover:text-white hover:border-[var(--accent)] hover:bg-[var(--accent)] transition hover:scale-105"
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
                  className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.03] grid place-items-center text-white/75 hover:text-white hover:border-[var(--accent)] hover:bg-[var(--accent)] transition hover:scale-105"
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
                  className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.03] grid place-items-center text-white/75 hover:text-white hover:border-[var(--accent)] hover:bg-[var(--accent)] transition hover:scale-105"
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
                  className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.03] grid place-items-center text-white/75 hover:text-white hover:border-[var(--accent)] hover:bg-[var(--accent)] transition hover:scale-105"
                  aria-label="Behance"
                >
                  <BehanceIcon size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. THREE CONTACT INFO CARDS
          ========================================================================= */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 mb-16 sm:mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {/* Card 1: Email */}
          <div
            className="glass rounded-[28px] p-7 md:p-8 flex flex-col justify-between relative overflow-hidden bg-[#090909]/85 border border-white/[0.08] hover:border-[var(--accent)]/40 transition-all duration-300 group"
          >
            <div
              className="absolute -top-16 -right-16 w-44 h-44 rounded-full opacity-20 blur-3xl pointer-events-none group-hover:opacity-30 transition-opacity"
              style={{ background: "var(--accent)" }}
            />
            <div>
              <div className="flex items-center justify-between mb-6">
                <span
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white"
                  style={{
                    background: "rgba(255, 40, 0, 0.15)",
                    border: "1px solid rgba(255, 40, 0, 0.3)",
                    color: "var(--accent)",
                  }}
                >
                  <Mail size={20} />
                </span>
                <span className="text-[11px] font-mono tracking-widest text-white/40 uppercase">
                  DIRECT INBOX
                </span>
              </div>

              <h3 className="text-xl font-black text-white mb-1">Email</h3>
              <p className="text-xs text-white/50 mb-6">
                For treatments, pitch decks, script submissions &amp; inquiries.
              </p>
            </div>

            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 group-hover:text-white transition-colors pt-4 border-t border-white/[0.08]"
            >
              <span className="truncate">{contact.email}</span>
              <ArrowUpRight
                size={16}
                style={{ color: "var(--accent)" }}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shrink-0"
              />
            </a>
          </div>

          {/* Card 2: Phone */}
          <div
            className="glass rounded-[28px] p-7 md:p-8 flex flex-col justify-between relative overflow-hidden bg-[#090909]/85 border border-white/[0.08] hover:border-[var(--accent)]/40 transition-all duration-300 group"
          >
            <div
              className="absolute -top-16 -right-16 w-44 h-44 rounded-full opacity-20 blur-3xl pointer-events-none group-hover:opacity-30 transition-opacity"
              style={{ background: "var(--accent)" }}
            />
            <div>
              <div className="flex items-center justify-between mb-6">
                <span
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white"
                  style={{
                    background: "rgba(255, 40, 0, 0.15)",
                    border: "1px solid rgba(255, 40, 0, 0.3)",
                    color: "var(--accent)",
                  }}
                >
                  <Phone size={20} />
                </span>
                <span className="text-[11px] font-mono tracking-widest text-white/40 uppercase">
                  DIRECT LINE
                </span>
              </div>

              <h3 className="text-xl font-black text-white mb-1">Phone / WhatsApp</h3>
              <p className="text-xs text-white/50 mb-6">
                Available for production calls and urgent filming schedules.
              </p>
            </div>

            <a
              href={`tel:${contact.phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 group-hover:text-white transition-colors pt-4 border-t border-white/[0.08]"
            >
              <span>{contact.phone}</span>
              <ArrowUpRight
                size={16}
                style={{ color: "var(--accent)" }}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shrink-0"
              />
            </a>
          </div>

          {/* Card 3: Discovery Session */}
          <div
            className="glass rounded-[28px] p-7 md:p-8 flex flex-col justify-between relative overflow-hidden bg-[#090909]/85 border border-white/[0.08] hover:border-[var(--accent)]/40 transition-all duration-300 group"
          >
            <div
              className="absolute -top-16 -right-16 w-44 h-44 rounded-full opacity-20 blur-3xl pointer-events-none group-hover:opacity-30 transition-opacity"
              style={{ background: "var(--accent)" }}
            />
            <div>
              <div className="flex items-center justify-between mb-6">
                <span
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white"
                  style={{
                    background: "rgba(255, 40, 0, 0.15)",
                    border: "1px solid rgba(255, 40, 0, 0.3)",
                    color: "var(--accent)",
                  }}
                >
                  <Calendar size={20} />
                </span>
                <span className="text-[11px] font-mono tracking-widest text-white/40 uppercase">
                  DISCOVERY CALL
                </span>
              </div>

              <h3 className="text-xl font-black text-white mb-1">Book a Shoot</h3>
              <p className="text-xs text-white/50 mb-6">
                Schedule a 30-minute creative session to map out your production.
              </p>
            </div>

            <a
              href={`mailto:${contact.email}?subject=Discovery%20Call%20Request%20-%20Het%20Patel`}
              className="inline-flex items-center justify-between text-sm font-bold text-white transition-colors pt-4 border-t border-white/[0.08]"
            >
              <span style={{ color: "var(--accent)" }}>Schedule Call</span>
              <span className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center transition-transform group-hover:translate-x-1">
                <ArrowUpRight size={15} strokeWidth={2.5} />
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. FULL GLASS INQUIRY FORM
          ========================================================================= */}
      <div className="max-w-[1000px] mx-auto px-5 md:px-8 mb-20 sm:mb-28">
        <div className="glass rounded-[32px] p-8 sm:p-12 md:p-16 relative overflow-hidden bg-[#090909]/90 border border-white/[0.12] shadow-2xl">
          <div
            className="absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{ background: "var(--accent)" }}
          />

          <div className="mb-10 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-6 h-px bg-white/25" />
              <span className="text-[10px] tracking-[0.32em] text-white/50 uppercase font-medium">
                SEND AN INQUIRY
              </span>
              <span className="w-6 h-px bg-white/25" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white">
              Tell me about your{" "}
              <span className="font-serif-editorial italic" style={{ color: "var(--accent)" }}>
                project.
              </span>
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {/* Name */}
            <div>
              <label className="block text-[11px] tracking-[0.24em] text-white/70 mb-2 font-semibold uppercase font-mono">
                YOUR NAME *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Christopher Nolan"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/15 focus:border-[var(--accent)] rounded-xl px-5 py-4 text-[15px] text-white placeholder-white/20 transition outline-none"
              />
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[11px] tracking-[0.24em] text-white/70 mb-2 font-semibold uppercase font-mono">
                  EMAIL ADDRESS *
                </label>
                <input
                  type="email"
                  required
                  placeholder="nolan@syncopy.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/15 focus:border-[var(--accent)] rounded-xl px-5 py-4 text-[15px] text-white placeholder-white/20 transition outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] tracking-[0.24em] text-white/70 mb-2 font-semibold uppercase font-mono">
                  PHONE / WHATSAPP
                </label>
                <input
                  type="tel"
                  placeholder="+91 8104948207"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/15 focus:border-[var(--accent)] rounded-xl px-5 py-4 text-[15px] text-white placeholder-white/20 transition outline-none"
                />
              </div>
            </div>

            {/* Subject Dropdown & Referral */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[11px] tracking-[0.24em] text-white/70 mb-2 font-semibold uppercase font-mono">
                  INQUIRY TYPE *
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-[#0d0d0d] border border-white/15 focus:border-[var(--accent)] rounded-xl px-5 py-4 text-[15px] text-white transition outline-none appearance-none"
                >
                  <option value="Directing & Screenplay">Directing &amp; Screenplay</option>
                  <option value="Commercial TVC / Brand Film">Commercial TVC / Brand Film</option>
                  <option value="Cinematography (DOP)">Cinematography (DOP)</option>
                  <option value="Color Grading & Post">Color Grading &amp; Post</option>
                  <option value="Music Video Production">Music Video Production</option>
                  <option value="General Collaboration">General Collaboration</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] tracking-[0.24em] text-white/70 mb-2 font-semibold uppercase font-mono">
                  HOW DID YOU HEAR ABOUT ME?
                </label>
                <input
                  type="text"
                  placeholder="Instagram, Vimeo, recommendation..."
                  value={formData.referral}
                  onChange={(e) => setFormData({ ...formData, referral: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/15 focus:border-[var(--accent)] rounded-xl px-5 py-4 text-[15px] text-white placeholder-white/20 transition outline-none"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-[11px] tracking-[0.24em] text-white/70 mb-2 font-semibold uppercase font-mono">
                TELL ME ABOUT THE PROJECT *
              </label>
              <textarea
                rows={5}
                required
                placeholder="A few lines on the story, timeline, deliverables, and references..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/15 focus:border-[var(--accent)] rounded-xl px-5 py-4 text-[15px] text-white placeholder-white/20 transition outline-none resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitted}
              className="w-full py-4 sm:py-5 rounded-full font-bold tracking-[0.2em] text-sm uppercase text-white flex items-center justify-center gap-3 group transition-all duration-300 hover:scale-[1.01]"
              style={{
                background: "var(--accent)",
                boxShadow: "0 10px 40px -10px var(--glow)",
              }}
            >
              {submitted ? (
                <>
                  <Check size={18} /> Message Sent Successfully!
                </>
              ) : (
                <>
                  <span>SUBMIT INQUIRY</span>
                  <span className="w-7 h-7 rounded-full bg-white text-black grid place-items-center transition-transform group-hover:rotate-45">
                    <ArrowUpRight size={15} strokeWidth={2.5} />
                  </span>
                </>
              )}
            </button>

            <p className="text-center text-xs text-white/40 pt-2 font-mono">
              All inquiries are treated with strict creative confidentiality &bull; Direct response within 24 hours.
            </p>
          </form>
        </div>
      </div>


    </div>
  );
}