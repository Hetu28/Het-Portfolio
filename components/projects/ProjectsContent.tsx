"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Play,
  X,
} from "lucide-react";
import { allProjectsList, projectCategories, ProjectPageItem } from "@/data/projects-page";
import { aboutData } from "@/data/about";
import CinemaPlayer from "@/components/portfolio/CinemaPlayer";

export default function ProjectsContent() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectPageItem | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveProjectModal(null);
      }
    };

    if (activeProjectModal) {
      document.documentElement.classList.add("modal-open");
      document.body.classList.add("modal-open");
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.documentElement.classList.remove("modal-open");
      document.body.classList.remove("modal-open");
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }

    return () => {
      document.documentElement.classList.remove("modal-open");
      document.body.classList.remove("modal-open");
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeProjectModal]);

  const filteredProjects =
    selectedCategory === "all"
      ? allProjectsList
      : allProjectsList.filter((p) => p.categories.includes(selectedCategory));

  return (
    <div className="relative z-10 w-full overflow-hidden pt-18 sm:pt-24 md:pt-36 pb-16 bg-transparent">
      {/* =========================================================================
          1. KINETIC EDITORIAL HEADER
          ========================================================================= */}
      <div className="w-full max-w-[1400px] mx-auto px-5 md:px-8 mb-12 sm:mb-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 pb-8 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-6 h-px bg-white/25" />
              <span className="text-[10px] tracking-[0.32em] text-white/50 font-medium uppercase">
                COMPLETE CATALOGUE
              </span>
              <span className="w-6 h-px bg-white/25" />
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-[0.9] text-white select-none">
              The Archive.
            </h1>
            <p className="mt-4 text-white/60 text-base sm:text-xl font-normal max-w-xl">
              An exhaustive archive of narrative films, commercial campaigns, and{" "}
              <span className="font-serif-editorial italic text-white" style={{ color: "var(--accent)" }}>
                cinematographic studies
              </span>
              .
            </p>
          </div>

          {/* Dynamic Filter Navigation Bar */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {projectCategories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                    active
                      ? "text-white shadow-lg"
                      : "text-white/60 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06]"
                  }`}
                  style={{
                    background: active ? "var(--accent)" : undefined,
                    boxShadow: active ? "0 0 24px var(--glow)" : undefined,
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. 2-COLUMN HIGH-IMPACT CINEMATIC GRID
          ========================================================================= */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
                key={project.id}
                onClick={() => setActiveProjectModal(project)}
                className="group relative cursor-pointer flex flex-col rounded-[28px] sm:rounded-[32px] overflow-hidden bg-[#0a0a0c]/90 border border-white/[0.08] hover:border-white/[0.2] transition-all duration-500 hover:shadow-[0_25px_60px_rgba(0,0,0,0.85)]"
              >
                {/* 16:9 Thumbnail Image Container */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-black/40" />

                  {/* Top Badges */}
                  <div className="absolute top-5 left-5 right-5 flex items-center justify-between pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono tracking-widest uppercase text-white/90">
                      {project.category}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono tracking-widest text-white/80">
                      {project.year}
                    </span>
                  </div>

                  {/* Bottom Right 'Watch Film' Pill */}
                  <div className="absolute bottom-5 right-5 z-20">
                    <div className="px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs font-semibold text-white flex items-center gap-2 group-hover:bg-[var(--accent)] group-hover:border-transparent transition-all duration-300 shadow-xl">
                      <span className="w-2 h-2 rounded-full bg-red-500 group-hover:bg-white animate-pulse" />
                      <span>Watch Film</span>
                    </div>
                  </div>
                </div>

                {/* Card Information */}
                <div className="p-6 sm:p-8 flex flex-col flex-grow justify-between bg-gradient-to-b from-transparent to-[#070708]/95">
                  <div>
                    <div className="flex items-baseline justify-between gap-4 mb-2">
                      <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight group-hover:text-white transition-colors">
                        {project.title}
                      </h3>
                      <span className="font-serif-editorial italic text-sm sm:text-base text-[var(--accent)] shrink-0">
                        {project.role}
                      </span>
                    </div>

                    <p className="text-white/60 text-sm sm:text-base line-clamp-2 leading-relaxed mb-6 font-normal">
                      {project.synopsis}
                    </p>
                  </div>

                  {/* Deliverables / Tags */}
                  <div className="pt-5 border-t border-white/[0.08] flex flex-wrap items-center gap-2">
                    {project.deliverables.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-white/50 uppercase font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* =========================================================================
          3. DUAL MARQUEE CALL-TO-ACTION BANNER
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

      {/* =========================================================================
          4. CINEMA VIDEO MODAL LIGHTBOX
          ========================================================================= */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {activeProjectModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-xl md:backdrop-blur-2xl overscroll-contain"
                onClick={() => setActiveProjectModal(null)}
              >
                <motion.div
                  initial={{ scale: 0.92, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.92, y: 20 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-5xl md:max-w-6xl lg:max-w-7xl xl:max-w-[1280px] rounded-[28px] md:rounded-[36px] overflow-hidden bg-[#0c0c0e]/95 backdrop-blur-2xl border border-white/20 shadow-[0_35px_120px_rgba(0,0,0,0.95)] max-h-[94vh] flex flex-col overscroll-contain"
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setActiveProjectModal(null)}
                    aria-label="Close modal"
                    className="absolute top-5 right-5 z-40 w-11 h-11 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center hover:bg-[var(--accent)] transition-colors cursor-pointer"
                  >
                    <X size={20} />
                  </button>

                  {/* Cinema Player Container */}
                  <div className="relative aspect-[16/9] w-full bg-black">
                    <CinemaPlayer
                      videoUrl={activeProjectModal.videoUrl}
                      poster={activeProjectModal.image}
                      title={activeProjectModal.title}
                    />
                  </div>

                  {/* Modal Metadata Footer */}
                  <div className="p-6 sm:p-8 bg-[#090909] overflow-y-auto">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-white/[0.08]">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] tracking-[0.3em] uppercase font-mono font-bold" style={{ color: "var(--accent)" }}>
                            {activeProjectModal.category}
                          </span>
                          <span className="text-white/30">•</span>
                          <span className="text-xs text-white/60 font-mono">
                            {activeProjectModal.year} — {activeProjectModal.duration}
                          </span>
                        </div>
                        <h2 className="text-2xl sm:text-4xl font-black text-white">
                          {activeProjectModal.title}
                        </h2>
                      </div>

                      <span className="font-serif-editorial italic text-lg text-white/80">
                        {activeProjectModal.role}
                      </span>
                    </div>

                    <p className="mt-4 text-white/70 text-sm sm:text-base leading-relaxed">
                      {activeProjectModal.synopsis}
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold text-white/40 uppercase tracking-wider mr-2 font-mono">
                        Credits:
                      </span>
                      {activeProjectModal.deliverables.map((item, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-white/80 font-medium"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
