"use client";

import React, { useState } from "react";
import { Plus, ArrowUpRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { faqData } from "@/data/faq";

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleItem = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="relative z-10 pt-16 md:pt-20 pb-20 md:pb-28 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">
        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* =========================================================================
              LEFT COLUMN: Title, Descriptive Body & Quick Contact
              ========================================================================= */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px bg-white/25" />
              <span className="text-[10px] tracking-[0.32em] text-white/50 font-medium uppercase font-mono">
                FAQ
              </span>
              <span className="w-6 h-px bg-white/25" />
            </div>

            {/* Giant Gradient Title */}
            <h2
              className="text-6xl sm:text-7xl md:text-8xl lg:text-[92px] font-black tracking-tight leading-none uppercase select-none mb-4"
              style={{
                background: "linear-gradient(135deg, #FFE3D1 0%, #FFB088 45%, #FF2800 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              FAQ.
            </h2>

            {/* Editorial Heading */}
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-4">
              Frequently asked questions{" "}
              <span className="font-serif-editorial italic font-normal" style={{ color: "var(--accent)" }}>
                about me
              </span>
              .
            </h3>

            {/* Descriptive Body Paragraph */}
            <p className="text-white/60 text-[14.5px] sm:text-[15.5px] leading-relaxed mb-8 max-w-lg">
              Everything you might want to know about my filmmaking process, on-set directing and cinematography roles, freelance commissions, and project workflows - up front.
            </p>

            {/* Interactive Quick Help Box */}
            <div className="rounded-2xl p-6 bg-[#0c0c0f]/90 border border-white/[0.08] relative overflow-hidden">
              <div
                className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-20 blur-2xl pointer-events-none"
                style={{ background: "var(--accent)" }}
              />
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent)] font-semibold uppercase tracking-wider mb-2">
                  <Sparkles size={14} />
                  <span>Have a unique project?</span>
                </div>
                <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-4">
                  Need a custom quote, multi-city crew, or expedited post-production turnaround? Let's discuss directly.
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white text-black hover:bg-white/90 transition-all group"
                >
                  <span>Get in Touch</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: Interactive FAQ Accordion List (Aligned Under FAQ Heading)
              ========================================================================= */}
          <div className="lg:col-span-7 flex flex-col gap-3.5 sm:gap-4 lg:pt-[118px]">
            {faqData.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className={`rounded-2xl md:rounded-[22px] bg-[#0c0c0f]/90 border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border-[var(--accent)]/50 shadow-[0_8px_30px_-10px_var(--glow)]"
                      : "border-white/[0.08] hover:border-white/[0.18]"
                  }`}
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer transition-colors group"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                      <span
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full text-white font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 shadow-md"
                        style={{
                          background: isOpen
                            ? "linear-gradient(135deg, #FF5722 0%, #FF2800 100%)"
                            : "rgba(255, 255, 255, 0.08)",
                          boxShadow: isOpen ? "0 0 16px rgba(255, 40, 0, 0.35)" : "none",
                          color: isOpen ? "#ffffff" : "rgba(255, 255, 255, 0.7)",
                        }}
                      >
                        {item.id}
                      </span>
                      <span className="text-base sm:text-lg md:text-xl font-semibold text-white tracking-tight group-hover:text-white transition-colors">
                        {item.question}
                      </span>
                    </div>

                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center shrink-0 text-white/70 group-hover:border-white/20 group-hover:text-white transition-all">
                      <Plus
                        size={18}
                        className={`transition-transform duration-300 ${isOpen ? "rotate-45 text-[var(--accent)]" : ""}`}
                      />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-white/65 leading-relaxed pl-14 sm:pl-16 pr-6 border-t border-white/[0.04]">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
