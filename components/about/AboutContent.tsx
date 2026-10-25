"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  Star,
} from "lucide-react";
import { aboutData } from "@/data/about";

export default function AboutContent() {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % aboutData.testimonials.featured.length);
  };
  const prevTestimonial = () => {
    setTestimonialIndex((prev) =>
      prev === 0 ? aboutData.testimonials.featured.length - 1 : prev - 1
    );
  };

  const activeTestimonial = aboutData.testimonials.featured[testimonialIndex];


  return (
    <div className="relative z-10 w-full overflow-hidden pt-18 sm:pt-24 md:pt-36 pb-20 bg-transparent">
      {/* 1. HERO TITLE */}
      <div className="w-full max-w-[1400px] mx-auto px-5 md:px-8 mb-12 sm:mb-16 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="w-6 h-px bg-white/25" />
          <span className="text-[10px] tracking-[0.32em] text-white/50 font-medium uppercase font-mono">
            ABOUT THE FILMMAKER • MUMBAI, INDIA
          </span>
          <span className="w-6 h-px bg-white/25" />
        </div>

        <h1
          className="font-black uppercase tracking-tight text-white select-none"
          style={{ fontSize: "clamp(34px, 8.5vw, 110px)", lineHeight: 0.95 }}
        >
          BEYOND THE{" "}
          <span className="font-serif-editorial italic font-normal" style={{ color: "var(--accent)" }}>
            FRAME
          </span>
        </h1>
        <p className="mt-4 text-white/50 text-sm sm:text-base tracking-[0.2em] uppercase font-mono font-medium">
          Director · Cinematographer · Editor · Graphic Designer
        </p>
      </div>

      {/* 2. THE FILMMAKER & DIRECTOR PHILOSOPHY */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 mb-20 sm:mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 lg:gap-16 items-start">
          {/* Left Column Image Card (40-45%) */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-[24px] border border-white/[0.08] aspect-[4/5] bg-[#090909] shadow-2xl">
              <img
                src="/images/het-portrait.jpg"
                alt="Het Patel"
                className="w-full h-full object-cover object-[center_26%] filter brightness-[1.08] contrast-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <div className="text-3xl font-serif-editorial text-white">
                    Het Patel
                  </div>
                </div>
                <div className="text-[10px] tracking-[0.3em] text-white/70 uppercase font-medium font-mono">
                  MUMBAI — INDIA
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Text (55-60%) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <h2 className="text-[34px] sm:text-[46px] md:text-[54px] lg:text-[64px] leading-[1.05] tracking-[-0.03em] font-black text-white">
              I{" "}
              <span className="font-serif-editorial italic font-normal" style={{ color: "var(--accent)" }}>
                don’t
              </span>{" "}
              just{" "}
              <span className="font-serif-editorial italic font-normal" style={{ color: "var(--accent)" }}>
                shoot
              </span>{" "}
              scenes, I{" "}
              <span className="font-serif-editorial italic font-normal" style={{ color: "var(--accent)" }}>
                build stories
              </span>{" "}
              you can{" "}
              <span className="font-serif-editorial italic font-normal" style={{ color: "var(--accent)" }}>
                step into
              </span>
              .
            </h2>

            <div className="mt-6 sm:mt-7 space-y-4 text-white/70 text-[15px] md:text-[16px] leading-[1.75] max-w-xl">
              <p>
                Hey! I’m Het. When you watch a film, you shouldn’t be thinking about the lights, the cameras, or the software. You should just be completely lost in the world we built. That’s why I direct, shoot, and edit with a 360-degree obsession for the final screen experience.
              </p>
              <p>
                Having led sets as a Director, DOP, and Assistant Director, I know that memorable cinema is 10% inspiration and 90% deliberate decisions. From how a shadow falls across an actor’s face to where a cut lands on a heartbeat, I make sure every detail serves the story.
              </p>
            </div>

            {/* Stat Counters under the paragraph (3 Columns, NO More About Me button) */}
            <div className="mt-10 sm:mt-12 grid grid-cols-3 gap-6 pt-6 border-t border-white/[0.08] items-center">
              <div className="relative">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.03em] text-white flex items-baseline">
                  <span>4</span>
                  <span style={{ color: "var(--accent)" }}>+</span>
                </div>
                <div className="mt-2 text-[10px] tracking-[0.24em] text-white/50 uppercase font-medium font-mono">
                  YEARS EXPERIENCE
                </div>
              </div>

              <div className="relative">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.03em] text-white flex items-baseline">
                  <span>30</span>
                  <span style={{ color: "var(--accent)" }}>+</span>
                </div>
                <div className="mt-2 text-[10px] tracking-[0.24em] text-white/50 uppercase font-medium font-mono">
                  PROJECTS COMPLETED
                </div>
              </div>

              <div className="relative">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.03em] text-white flex items-baseline">
                  <span>3</span>
                  <span style={{ color: "var(--accent)" }}>+</span>
                </div>
                <div className="mt-2 text-[10px] tracking-[0.24em] text-white/50 uppercase font-medium font-mono">
                  BRANDS WORKED WITH
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. CLIENT COMMISSIONS */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 mt-20 sm:mt-28">
        <div className="rounded-[28px] p-7 sm:p-10 md:p-14 lg:p-16 bg-[#090909]/90 relative overflow-hidden border border-white/[0.08]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-6 h-px bg-white/25" />
                <span className="text-[10px] tracking-[0.32em] text-white/50 uppercase font-medium font-mono">
                  BRANDS &amp; FILMS
                </span>
                <span className="w-6 h-px bg-white/25" />
              </div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-6 leading-[1.05] tracking-tight text-white">
                Brands &amp; Films{" "}
                <span className="font-serif-editorial italic font-normal" style={{ color: "var(--accent)" }}>
                  I've Collaborated With
                </span>
              </h2>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-6">
                {aboutData.collaborations.description}
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase font-mono" style={{ color: "var(--accent)" }}>
                <span>Scroll on the right to explore</span>
                <ArrowRight size={14} className="animate-pulse" />
              </div>
            </div>

            <div className="lg:col-span-7 max-h-[560px] overflow-y-auto pr-2 sm:pr-4 client-scroll space-y-4 sm:space-y-5">
              {aboutData.collaborations.items.map((item) => (
                <div
                  key={item.id}
                  className="p-5 sm:p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-[var(--accent)]/40 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between text-xs text-white/50 mb-3">
                    <span className="font-semibold uppercase tracking-wider text-[11px]" style={{ color: "var(--accent)" }}>
                      {item.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white/80 font-mono text-[11px]">
                      {item.year}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden border border-white/10 bg-black/60 flex-shrink-0 flex items-center justify-center p-1 group-hover:border-[var(--accent)]/50 transition-colors">
                      <img
                        src={item.logo}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-xl grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-2">
                        <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-white transition-colors">
                          {item.name}
                        </h3>
                        {item.extra && (
                          <span className="text-xs sm:text-sm text-white/60 font-medium">
                            · {item.extra}
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-white/60 mt-0.5 font-medium">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5. TESTIMONIALS */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 mt-20 sm:mt-28">
        <div className="mb-10 sm:mb-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-6 h-px bg-white/25" />
            <span className="text-[10px] tracking-[0.32em] text-white/50 uppercase font-medium font-mono">
              CLIENT STORIES
            </span>
            <span className="w-6 h-px bg-white/25" />
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none text-white">
            Testimonials.{" "}
            <span className="font-serif-editorial italic font-normal text-3xl sm:text-5xl md:text-6xl text-white/70 block mt-2">
              Stories from{" "}
              <span style={{ color: "var(--accent)" }}>
                producers &amp; clients
              </span>
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-7 items-stretch mb-10">
          <div
            className="md:col-span-7 rounded-[24px] p-7 sm:p-10 flex flex-col justify-between relative overflow-hidden bg-[#090909]/90 border border-white/[0.08] min-h-[300px] sm:min-h-[340px]"
            style={{ boxShadow: "0 20px 60px -20px var(--glow)" }}
          >
            <div
              className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-25 blur-3xl pointer-events-none"
              style={{ background: "var(--accent)" }}
            />

            <div className="relative z-10 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 mb-4" style={{ color: "var(--accent)" }}>
                  {[...Array(activeTestimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>

                <p className="text-white text-base sm:text-lg md:text-xl font-normal leading-relaxed">
                  {activeTestimonial.quote}
                </p>
              </div>

              <div className="flex items-end justify-between mt-8 pt-5 border-t border-white/[0.08] text-white">
                <div>
                  <h4 className="font-extrabold uppercase text-sm sm:text-base tracking-wide text-white">
                    {activeTestimonial.author}
                  </h4>
                  <p className="text-xs sm:text-sm text-white/60 font-serif-editorial italic mt-0.5">
                    {activeTestimonial.role} • {activeTestimonial.company}
                  </p>
                </div>
                {aboutData.testimonials.featured.length > 1 && (
                  <div className="text-xs sm:text-sm font-mono font-bold text-white/50">
                    0{testimonialIndex + 1} / 0{aboutData.testimonials.featured.length}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="md:col-span-5 relative rounded-[24px] overflow-hidden aspect-[4/5] min-h-[260px] sm:min-h-[320px] border border-white/[0.08] group bg-black">
            <img
              src={activeTestimonial.image}
              alt={activeTestimonial.author}
              className="absolute inset-0 w-full h-full object-cover grayscale contrast-110 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20" />

            {aboutData.testimonials.featured.length > 1 && (
              <div className="absolute bottom-4 right-4 flex items-center gap-2.5 z-20">
                <button
                  onClick={prevTestimonial}
                  aria-label="Previous testimonial"
                  className="w-10 h-10 rounded-full bg-[#0b0b0b]/90 border border-white/20 text-white flex items-center justify-center transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  <ArrowLeft size={16} strokeWidth={2.5} />
                </button>
                <button
                  onClick={nextTestimonial}
                  aria-label="Next testimonial"
                  className="w-10 h-10 rounded-full bg-[#0b0b0b]/90 border border-white/20 text-white flex items-center justify-center transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  <ArrowRight size={16} strokeWidth={2.5} />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {aboutData.testimonials.grid.map((card) => (
            <div
              key={card.id}
              className="rounded-[24px] p-6 sm:p-8 flex flex-col justify-between bg-[#090909]/90 border border-white/[0.08] hover:border-[var(--accent)]/40 transition-all duration-300"
            >
              <div>
                <div className="flex items-center gap-1 mb-4" style={{ color: "var(--accent)" }}>
                  {[...Array(card.rating)].map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                </div>
                <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                  {card.quote}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.08]">
                <div
                  className="w-9 h-9 rounded-md flex items-center justify-center text-[12px] font-black text-white shadow-md"
                  style={{ background: "var(--accent)" }}
                >
                  {card.initial}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">{card.author}</h4>
                  <p className="text-xs text-white/45 uppercase tracking-wider font-mono text-[10px]">
                    {card.role} • {card.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          6. DUAL MARQUEE CALL-TO-ACTION BANNER
          ========================================================================= */}
      <div className="relative mt-20 sm:mt-28 py-16 sm:py-24 overflow-hidden border-y border-white/[0.08] bg-transparent">
        <div className="absolute inset-0 flex flex-col justify-center items-center overflow-hidden opacity-25 select-none pointer-events-none">
          <div className="marquee-fast-left">
            <div className="text-4xl sm:text-6xl md:text-7xl font-black uppercase text-white tracking-tight whitespace-nowrap px-4">
              {aboutData.ctaMarquee.line1.join(" • ")} •{" "}
              {aboutData.ctaMarquee.line1.join(" • ")} •
            </div>
          </div>
          <div className="marquee-fast-right mt-3">
            <div
              className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight whitespace-nowrap px-4"
              style={{ color: "var(--accent)" }}
            >
              {aboutData.ctaMarquee.line2.join(" • ")} •{" "}
              {aboutData.ctaMarquee.line2.join(" • ")} •
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 flex flex-col items-center justify-center text-center">
          <Link
            href={aboutData.ctaMarquee.buttonHref}
            className="group inline-flex items-center gap-4 sm:gap-6 px-8 sm:px-14 py-4 sm:py-6 rounded-full text-lg sm:text-2xl md:text-3xl font-black text-white transition-all duration-500 hover:scale-105"
            style={{
              background: "var(--accent)",
              boxShadow: "0 0 45px var(--glow)",
            }}
          >
            <span>{aboutData.ctaMarquee.buttonText}</span>
            <span className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white text-black flex items-center justify-center transition-transform duration-300 group-hover:translate-x-2 group-hover:rotate-45 shadow-md">
              <ArrowUpRight size={22} strokeWidth={2.5} style={{ color: "var(--accent)" }} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );}
