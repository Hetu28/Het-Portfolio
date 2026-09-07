"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  Palette,
  Layers,
  Sun,
  Sparkles,
  Film,
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  Star,
  BookOpen,
  Clapperboard,
  Quote,
  Target,
  Zap,
} from "lucide-react";
import { aboutData } from "@/data/about";

export default function AboutContent() {
  const [photoIndex, setPhotoIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setPhotoIndex((prev) => (prev + 1) % aboutData.photoCarousel.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

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

  const renderIcon = (iconName: string) => {
    const props = { size: 20, style: { color: "var(--accent)" } };
    switch (iconName) {
      case "camera":
        return <Camera {...props} />;
      case "palette":
        return <Palette {...props} />;
      case "layers":
        return <Layers {...props} />;
      case "sun":
        return <Sun {...props} />;
      case "sparkles":
        return <Sparkles {...props} />;
      case "clapperboard":
        return <Clapperboard {...props} />;
      case "film":
      default:
        return <Film {...props} />;
    }
  };


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

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black uppercase tracking-tight leading-[0.95] text-white select-none">
          BEYOND THE{" "}
          <span className="font-serif-editorial italic font-normal" style={{ color: "var(--accent)" }}>
            FRAME
          </span>
        </h1>
        <p className="mt-4 text-white/50 text-sm sm:text-base tracking-[0.2em] uppercase font-mono font-medium">
          Director · Cinematographer · Editor · Graphic Designer
        </p>
      </div>

      {/* 2. THE MANIFESTO BANNER */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 mb-12 sm:mb-16">
        <div className="rounded-[28px] sm:rounded-[32px] p-8 sm:p-12 md:p-14 bg-[#09090c]/90 border border-white/[0.09] relative overflow-hidden shadow-2xl">
          <div
            className="absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{ background: "var(--accent)" }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent)] font-semibold uppercase tracking-wider mb-4">
                <Quote size={16} />
                <span>DIRECTOR'S CREED</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight mb-4">
                “Everything you see in the frame is intentional —{" "}
                <span className="font-serif-editorial italic font-normal" style={{ color: "var(--accent)" }}>
                  nothing is random
                </span>
                .”
              </h2>
              <p className="text-white/70 text-base sm:text-lg font-serif-editorial italic leading-relaxed mb-4">
                “There’s nothing right or wrong; it’s just how you think about it.”
              </p>
              <p className="text-white/50 text-xs sm:text-sm leading-relaxed max-w-xl">
                {aboutData.manifesto.subtext}
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-center space-y-3 sm:space-y-3.5 pt-4 lg:pt-0 lg:border-l lg:border-white/[0.08] lg:pl-10">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center gap-4 group hover:border-[var(--accent)]/50 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/30 flex items-center justify-center shrink-0">
                  <Sun size={18} style={{ color: "var(--accent)" }} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">RULE 01</div>
                  <div className="text-sm sm:text-base font-bold text-white">Light with intention.</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center gap-4 group hover:border-[#38bdf8]/50 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#38bdf8]/10 border border-[#38bdf8]/30 flex items-center justify-center shrink-0">
                  <Target size={18} className="text-[#38bdf8]" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">RULE 02</div>
                  <div className="text-sm sm:text-base font-bold text-white">Frame with purpose.</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center gap-4 group hover:border-[#f59e0b]/50 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#f59e0b]/10 border border-[#f59e0b]/30 flex items-center justify-center shrink-0">
                  <Zap size={18} className="text-[#f59e0b]" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">RULE 03</div>
                  <div className="text-sm sm:text-base font-bold text-white">Move like you mean it.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. BENTO GRID */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-7 items-stretch">
          {/* Column 1: Intro Card + Core Disciplines */}
          <div className="flex flex-col space-y-6 md:space-y-7">
            <div className="rounded-[24px] p-7 md:p-8 bg-[#090909]/90 relative overflow-hidden flex flex-col justify-center border border-white/[0.08]">
              <div
                className="absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-20 blur-3xl pointer-events-none"
                style={{ background: "var(--accent)" }}
              />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] tracking-[0.32em] text-white/50 uppercase font-mono font-medium">
                    {aboutData.founderSubtitle.prefix}
                  </span>
                  <span className="text-[10px] tracking-[0.25em] text-white/60 uppercase font-mono">
                    {aboutData.founderSubtitle.location}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight text-white">
                  Filmmaker &amp; Director <br />
                  <span className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-white">
                    Het{" "}
                  </span>
                  <span className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl" style={{ color: "var(--accent)" }}>
                    Patel
                  </span>
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Director", "Cinematographer (DOP)", "Editor", "Graphic Designer"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-white/80 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom: Core Disciplines Card */}
            <div className="rounded-[24px] p-6 sm:p-7 md:p-8 bg-[#090909]/90 relative overflow-hidden flex flex-col justify-between flex-1 min-h-[380px] sm:min-h-[440px] border border-white/[0.08] hover:border-white/20 transition-all duration-300">
              <div
                className="absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-15 blur-3xl pointer-events-none"
                style={{ background: "var(--accent)" }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent)" }} />
                    <span className="text-xs font-semibold tracking-wider uppercase font-mono" style={{ color: "var(--accent)" }}>
                      {aboutData.exploring.badge}
                    </span>
                  </div>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">
                    6 DISCIPLINES
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 tracking-tight">
                  {aboutData.exploring.title}
                </h3>
                <p className="text-[11.5px] text-white/50 mb-5 leading-relaxed">
                  Comprehensive technical and creative execution across the cinematic pipeline.
                </p>

                {/* 2-Column Craft Matrix */}
                <div className="grid grid-cols-2 gap-2.5">
                  {aboutData.exploring.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 sm:p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-[var(--accent)]/40 transition-all duration-300 flex flex-col justify-between min-h-[90px] group/disc"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/[0.04] border border-white/10 text-white/80 group-hover/disc:text-[var(--accent)] group-hover/disc:border-[var(--accent)]/30 transition-all duration-300">
                          {renderIcon(item.icon)}
                        </div>
                        <span className="text-[9.5px] font-mono text-white/30 group-hover/disc:text-[var(--accent)] transition-colors">
                          0{idx + 1}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white group-hover/disc:text-white transition-colors leading-tight">
                          {item.name}
                        </p>
                        <p className="text-[10px] text-white/45 mt-0.5 leading-snug group-hover/disc:text-white/70 transition-colors truncate">
                          {item.category}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Subtle Bar */}
              <div className="relative z-10 mt-5 pt-3.5 border-t border-white/[0.06] flex items-center justify-between text-[10.5px] font-mono text-white/40">
                <span>End-to-End Craft</span>
                <span style={{ color: "var(--accent)" }}>Set Logistics · Post Optics</span>
              </div>
            </div>
          </div>

          {/* Column 2: Centerpiece Director's Statement (Full Height Card) */}
          <div className="flex flex-col">
            <div className="rounded-[24px] p-7 md:p-9 bg-[#090909]/90 relative overflow-hidden flex-1 border border-white/[0.08] flex flex-col justify-between hover:border-white/20 transition-all duration-300">
              <div
                className="absolute -top-16 -left-16 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none"
                style={{ background: "var(--accent)" }}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-2.5 mb-6">
                  <span className="w-6 h-px" style={{ background: "var(--accent)" }} />
                  <span className="text-xs tracking-[0.3em] uppercase font-mono font-bold" style={{ color: "var(--accent)" }}>
                    DIRECTOR'S STATEMENT
                  </span>
                  <span className="w-6 h-px" style={{ background: "var(--accent)" }} />
                </div>

                <div className="space-y-5 mt-2">
                  <p className="text-white text-base sm:text-[17px] md:text-[17.5px] leading-[1.75] font-normal">
                    I am <strong className="text-white font-black" style={{ color: "var(--accent)" }}>Het Patel</strong>, an independent filmmaker working across direction, cinematography, editing, and graphic design based in Mumbai, India.
                  </p>
                  <p className="text-white/80 text-[14px] sm:text-[15px] leading-[1.75] font-normal">
                    With hands-on experience spanning narrative films, commercials, documentaries, and music videos — including roles as Assistant Director and Production Manager — I bring end-to-end craft to every set.
                  </p>
                  <p className="text-white/65 text-[13.5px] sm:text-[14px] leading-[1.7] font-serif-editorial italic pt-3 border-t border-white/[0.08]">
                    “From shaping light, blocking, and camera rhythm to sculpting time in post-production, I keep an obsessive eye for the subtle, minor details no one would ever consciously notice, but that make the entire frame unforgettable.”
                  </p>
                </div>
              </div>

              {/* Bottom Signature & Seal */}
              <div className="relative z-10 pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between">
                <div>
                  <div className="font-serif-editorial text-xl text-white">
                    Het Patel
                  </div>
                  <div className="text-[10px] font-mono tracking-[0.22em] text-white/45 uppercase mt-0.5">
                    Director · Cinematographer (DOP) · Editor
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/70 font-mono text-xs font-bold shadow-md">
                  HP
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Photo Carousel + BIG Director's Statement */}
          <div className="flex flex-col space-y-6 md:space-y-7">
            {/* Top: Photo Carousel Slider */}
            <div className="rounded-[24px] p-2 bg-[#090909]/90 relative overflow-hidden h-[210px] sm:h-[230px] border border-white/[0.08]">
              <div className="w-full h-full rounded-2xl overflow-hidden relative group bg-black">
                {aboutData.photoCarousel.map((slide, i) => (
                  <div
                    key={i}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                      i === photoIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                    }`}
                  >
                    <img
                      src={slide.image}
                      alt={slide.caption}
                      className="w-full h-full object-cover filter brightness-[1.08] contrast-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white/90 z-10">
                      <span className="font-medium tracking-wide text-[11px] sm:text-xs truncate max-w-[80%]">
                        {slide.caption}
                      </span>
                      <span className="text-[10px] font-bold tracking-widest font-mono" style={{ color: "var(--accent)" }}>
                        0{i + 1} / 0{aboutData.photoCarousel.length}
                      </span>
                    </div>
                  </div>
                ))}

                <div className="absolute top-3 right-4 flex items-center gap-1.5 z-20">
                  {aboutData.photoCarousel.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPhotoIndex(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === photoIndex ? "w-6" : "w-1.5 bg-white/40"
                      }`}
                      style={{ background: i === photoIndex ? "var(--accent)" : undefined }}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom: Visual Philosophy & Essential Reading Card */}
            <div className="rounded-[24px] p-7 md:p-8 bg-[#090909]/90 relative overflow-hidden flex flex-col justify-between flex-1 min-h-[380px] sm:min-h-[440px] border border-white/[0.08]">
              <div
                className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none"
                style={{ background: "var(--accent)" }}
              />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] backdrop-blur-md border border-white/10 text-xs font-semibold text-white/90 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent)" }} />
                  <span>{aboutData.currentlyReading.badge}</span>
                </div>

                <p className="text-[14.5px] sm:text-[15.5px] text-white/85 leading-relaxed font-normal">
                  {aboutData.currentlyReading.quote}
                </p>
              </div>

              <div className="relative z-10 mt-6 pt-5 border-t border-white/[0.08] flex items-center gap-4">
                <div className="w-14 h-20 sm:w-16 sm:h-22 rounded-lg overflow-hidden border border-white/20 shadow-2xl flex-shrink-0 bg-black/60">
                  <img
                    src={aboutData.currentlyReading.coverImage}
                    alt={aboutData.currentlyReading.bookTitle}
                    className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-[10px] tracking-[0.24em] uppercase font-semibold" style={{ color: "var(--accent)" }}>
                    <BookOpen size={12} />
                    <span>Essential Reading</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white mt-1">
                    {aboutData.currentlyReading.bookTitle}
                  </h4>
                  <p className="text-xs text-white/60 font-serif-editorial italic mt-0.5">
                    {aboutData.currentlyReading.author}
                  </p>
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
              Stories from producers &amp; clients
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
                <div className="text-xs sm:text-sm font-mono font-bold text-white/50">
                  0{testimonialIndex + 1} / 0{aboutData.testimonials.featured.length}
                </div>
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
          <a
            href="/#contact"
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
          </a>
        </div>
      </div>
    </div>
  );}
