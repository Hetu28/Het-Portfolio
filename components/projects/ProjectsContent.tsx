"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Play,
  X,
  Sparkles,
  Camera,
  Film,
} from "lucide-react";
import { allProjectsList, projectCategories, ProjectPageItem } from "@/data/projects-page";
import { allStillsList, stillsCategories, StillItem } from "@/data/stills";
import { aboutData } from "@/data/about";
import CinemaPlayer from "@/components/portfolio/CinemaPlayer";
import BehanceProjectView from "@/components/portfolio/BehanceProjectView";

export default function ProjectsContent() {
  const [viewMode, setViewMode] = useState<"projects" | "stills">("projects");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectPageItem | null>(null);
  const [activeStillModal, setActiveStillModal] = useState<StillItem | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveProjectModal(null);
        setActiveStillModal(null);
      }
    };

    if (activeProjectModal || activeStillModal) {
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
  }, [activeProjectModal, activeStillModal]);

  const filteredProjects =
    selectedCategory === "all"
      ? allProjectsList
      : allProjectsList.filter((p) => p.categories.includes(selectedCategory));

  const filteredStills = useMemo(() => {
    if (selectedCategory === "all") {
      return allStillsList;
    }

    const raw = allStillsList.filter((s) =>
      s.categories.includes(selectedCategory)
    );

    const portraits = raw.filter((s) => s.isPortrait);
    const landscapes = raw.filter((s) => !s.isPortrait);

    const aligned: typeof raw = [];
    let p = 0;
    let l = 0;

    // Interleave in pairs of 2 so every row has matching orientation
    while (p + 1 < portraits.length || l + 1 < landscapes.length) {
      if (p + 1 < portraits.length) {
        aligned.push(portraits[p++], portraits[p++]);
      }
      if (l + 1 < landscapes.length) {
        aligned.push(landscapes[l++], landscapes[l++]);
      }
    }

    // Handle any remaining single items
    if (p < portraits.length) aligned.push(portraits[p++]);
    if (l < landscapes.length) aligned.push(landscapes[l++]);

    return aligned;
  }, [selectedCategory]);

  const currentCategories =
    viewMode === "projects" ? projectCategories : stillsCategories;

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
              {viewMode === "projects" ? (
                <>
                  An exhaustive archive of narrative films, commercial campaigns, and{" "}
                  <span className="font-serif-editorial italic text-white" style={{ color: "var(--accent)" }}>
                    cinematographic studies
                  </span>
                  .
                </>
              ) : (
                <>
                  A curated gallery of cinematography stills, editorial lookbooks, and{" "}
                  <span className="font-serif-editorial italic text-white" style={{ color: "var(--accent)" }}>
                    photographic frames
                  </span>
                  .
                </>
              )}
            </p>
          </div>

          {/* Right Column: Master Mode Switcher (Projects vs Stills) + Category Filter Pills */}
          <div className="flex flex-col items-start gap-5 sm:gap-6 w-full lg:w-auto">
            {/* Master Mode Switcher — Rounded Pill Switcher flush-right above Commercials & TVCs */}
            <div className="self-end relative inline-flex items-center p-1 sm:p-1.5 rounded-full bg-[#0d0d10] border border-white/15 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_24px_rgba(255,0,0,0.15)] select-none">
              {/* Projects Tab */}
              <button
                type="button"
                onClick={() => {
                  setViewMode("projects");
                  setSelectedCategory("all");
                }}
                className={`relative z-10 flex items-center gap-2 sm:gap-2.5 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-black tracking-wider uppercase transition-colors duration-300 cursor-pointer ${
                  viewMode === "projects" ? "text-white" : "text-white/55 hover:text-white"
                }`}
              >
                {viewMode === "projects" && (
                  <motion.div
                    layoutId="activeCataloguePill"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "linear-gradient(135deg, #FF0000 0%, #cc0000 100%)",
                      boxShadow:
                        "0 0 24px var(--glow), inset 0 1px 1px rgba(255, 255, 255, 0.4)",
                    }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Film size={14} strokeWidth={2.4} />
                  <span>Works</span>
                </span>
              </button>

              {/* Gallery Tab */}
              <button
                type="button"
                onClick={() => {
                  setViewMode("stills");
                  setSelectedCategory("all");
                }}
                className={`relative z-10 flex items-center gap-2 sm:gap-2.5 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-black tracking-wider uppercase transition-colors duration-300 cursor-pointer ${
                  viewMode === "stills" ? "text-white" : "text-white/55 hover:text-white"
                }`}
              >
                {viewMode === "stills" && (
                  <motion.div
                    layoutId="activeCataloguePill"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "linear-gradient(135deg, #FF0000 0%, #cc0000 100%)",
                      boxShadow:
                        "0 0 24px var(--glow), inset 0 1px 1px rgba(255, 255, 255, 0.4)",
                    }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Camera size={14} strokeWidth={2.4} />
                  <span>Gallery</span>
                </span>
              </button>
            </div>

            {/* Dynamic Filter Navigation Bar (Smooth Swipe on Mobile, Wrap on Desktop) */}
            <div className="w-full lg:w-auto overflow-x-auto no-scrollbar py-1 flex items-center gap-2 sm:gap-2.5 flex-nowrap sm:flex-wrap -mx-5 px-5 sm:mx-0 sm:px-0">
              {currentCategories.map((cat) => {
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wider uppercase transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 touch-manipulation active:scale-95 ${
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
      </div>

      {/* =========================================================================
          2. MAIN CATALOGUE GRID (PROJECTS OR STILLS)
          ========================================================================= */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">
        {viewMode === "projects" ? (
          /* =================== PROJECTS VIEW (CURRENT) =================== */
          <motion.div
            layout
            key="projects-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
          >
            <AnimatePresence>
              {filteredProjects.map((project, index) => {
                const isBehance = project.type === "behance" || (project.stills && project.stills.length > 0);
                return (
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
                        loading={index < 4 ? "eager" : "lazy"}
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        style={{
                          objectPosition: project.objectPosition || "center center",
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-black/40" />

                      {/* Top Badges (Category & Year - Hidden by default, visible on hover) */}
                      <div className="absolute top-5 left-5 right-5 flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono tracking-widest uppercase text-white/90">
                          {project.category}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono tracking-widest text-white/80">
                          {project.year}
                        </span>
                      </div>

                      {/* Subtle Centered Open Icon */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-11 h-11 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.8)] group-hover:border-[var(--accent)]/60 group-hover:text-[var(--accent)]">
                          <ArrowUpRight size={18} strokeWidth={2.2} />
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
                );
              })}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* =================== STILLS & FRAMES VIEW =================== */
          <motion.div
            layout
            key="stills-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-10"
          >
            <AnimatePresence>
              {filteredStills.map((still, index) => {
                const isLastSolo =
                  filteredStills.length % 2 === 1 &&
                  index === filteredStills.length - 1;

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.45, delay: (index % 12) * 0.03 }}
                    key={still.id}
                    onClick={() => setActiveStillModal(still)}
                    className={`group relative cursor-pointer flex flex-col rounded-[24px] sm:rounded-[28px] overflow-hidden bg-[#0c0c0e]/95 border border-white/[0.08] hover:border-white/[0.22] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.9)] ${
                      isLastSolo
                        ? !still.isPortrait
                          ? "sm:col-span-2"
                          : "sm:col-span-2 sm:max-w-xl sm:w-full sm:mx-auto"
                        : ""
                    }`}
                  >
                    {/* Image Container */}
                    <div
                      className={`relative w-full overflow-hidden bg-black ${
                        isLastSolo && !still.isPortrait
                          ? "aspect-[21/9] sm:aspect-[2.35/1]"
                          : still.isPortrait
                          ? "aspect-[4/5]"
                          : "aspect-[16/9]"
                      }`}
                    >
                    <img
                      src={still.image}
                      alt={still.title}
                      loading={index < 6 ? "eager" : "lazy"}
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{ objectPosition: still.isPortrait ? "center 20%" : "center center" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                    {/* Centered Open Icon */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-11 h-11 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.8)] group-hover:border-[var(--accent)]/60 group-hover:text-[var(--accent)]">
                        <ArrowUpRight size={18} strokeWidth={2.2} />
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between bg-gradient-to-b from-transparent to-[#070708]/95">
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-white tracking-tight mb-2 group-hover:text-white transition-colors">
                        {still.title}
                      </h3>
                      <p className="text-white/60 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
                        {still.description}
                      </p>
                    </div>

                    {/* Tags */}
                    {still.tags && still.tags.length > 0 && (
                      <div className="pt-3.5 border-t border-white/[0.08] flex flex-wrap gap-1.5">
                        {still.stills && still.stills.length > 1 && (
                          <span className="px-2.5 py-0.5 rounded-md bg-[var(--accent)]/15 border border-[var(--accent)]/30 text-[10px] font-mono text-[var(--accent)] uppercase font-bold">
                            {still.stills.length} LOOKS
                          </span>
                        )}
                        {still.tags.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono text-white/60 uppercase font-semibold"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          </motion.div>
        )}
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

      {/* =========================================================================
          4. CINEMA VIDEO / BEHANCE CASE STUDY MODAL
          ========================================================================= */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {activeProjectModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/85 backdrop-blur-xl md:backdrop-blur-2xl overscroll-contain"
                onClick={() => setActiveProjectModal(null)}
              >
                {activeProjectModal.type === "behance" || (activeProjectModal.stills && activeProjectModal.stills.length > 0) ? (
                  <motion.div
                    initial={{ scale: 0.94, y: 16 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.94, y: 16 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative w-full max-w-5xl md:max-w-6xl lg:max-w-7xl xl:max-w-[1360px] rounded-[24px] sm:rounded-[28px] md:rounded-[36px] overflow-hidden bg-[#070709] border border-white/20 shadow-[0_35px_120px_rgba(0,0,0,0.95)] max-h-[94vh] max-h-[94dvh] overflow-y-auto overscroll-contain"
                  >
                    <BehanceProjectView
                      project={activeProjectModal}
                      onClose={() => setActiveProjectModal(null)}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ scale: 0.92, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.92, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative w-full max-w-5xl md:max-w-6xl lg:max-w-7xl xl:max-w-[1280px] rounded-[24px] sm:rounded-[28px] md:rounded-[36px] overflow-hidden bg-[#0c0c0e]/95 backdrop-blur-2xl border border-white/20 shadow-[0_35px_120px_rgba(0,0,0,0.95)] max-h-[94vh] max-h-[94dvh] flex flex-col overscroll-contain"
                  >
                    {/* Close Button */}
                    <button
                      onClick={() => setActiveProjectModal(null)}
                      aria-label="Close modal"
                      className="absolute top-4 right-4 sm:top-5 sm:right-5 z-40 w-11 h-11 rounded-full bg-black/75 border border-white/20 text-white flex items-center justify-center hover:bg-[var(--accent)] transition-colors cursor-pointer touch-manipulation active:scale-95 shadow-lg"
                    >
                      <X size={18} />
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
                )}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}

      {/* Stills Lightbox Modal */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {activeStillModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-[999999] bg-black/85 backdrop-blur-xl md:backdrop-blur-2xl flex items-center justify-center p-3 sm:p-5 md:p-8 overscroll-contain"
                onClick={() => setActiveStillModal(null)}
              >
                {activeStillModal.stills && activeStillModal.stills.length > 0 ? (
                  <div
                    className="relative w-full max-w-5xl lg:max-w-6xl xl:max-w-[1240px] bg-[#070709] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 max-h-[94vh] max-h-[94dvh] overflow-y-auto overscroll-contain shadow-[0_35px_120px_rgba(0,0,0,0.95)]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <BehanceProjectView
                      project={{
                        id: activeStillModal.id,
                        title: activeStillModal.title,
                        category: activeStillModal.category,
                        role:
                          activeStillModal.id === "festive-radiance"
                            ? "Director of Photography & Lighting"
                            : activeStillModal.id === "fashion-editorial"
                            ? "Fashion Photographer & Lighting"
                            : activeStillModal.id === "the-window-observer"
                            ? "Cinematographer (DOP)"
                            : "Architectural Cinematographer & DOP",
                        year: "2024",
                        duration: `${activeStillModal.stills.length} Frames`,
                        image: activeStillModal.image,
                        type: "behance",
                        synopsis: activeStillModal.description,
                        client:
                          activeStillModal.id === "festive-radiance"
                            ? "Traditional Festive Lookbook"
                            : activeStillModal.id === "fashion-editorial"
                            ? "Studio Fashion Lookbook"
                            : activeStillModal.id === "south-mumbai-heritage"
                            ? "South Mumbai Heritage Architecture"
                            : activeStillModal.id === "the-window-observer"
                            ? "Cinematic Narrative Character Study"
                            : "Urban Monoliths Architectural Study",
                        deliverables:
                          activeStillModal.id === "festive-radiance"
                            ? [
                                "Director of Photography",
                                "Traditional Lookbook",
                                "Lighting Design",
                                "Colorist",
                              ]
                            : activeStillModal.id === "fashion-editorial"
                            ? [
                                "Fashion Photography",
                                "Studio Lighting Design",
                                "Color Grading",
                                "Wardrobe Lookbook",
                              ]
                            : activeStillModal.id === "south-mumbai-heritage"
                            ? [
                                "Heritage Cinematography",
                                "Architectural Framing",
                                "Color Grading",
                                "Twilight Study",
                              ]
                            : activeStillModal.id === "the-window-observer"
                            ? [
                                "Narrative Cinematography",
                                "Window Framing",
                                "Color Grading",
                                "Character Study",
                              ]
                            : [
                                "Architectural Cinematography",
                                "Urban Framing",
                                "Color Grading",
                                "Telephoto Perspective",
                              ],
                        technicalSpecs:
                          activeStillModal.id === "festive-radiance"
                            ? {
                                camera: "Sony FX3 Cinema Line",
                                lens: "85mm Prime Glass",
                                aspectRatio: "3:2 Editorial Portrait",
                                lightingStyle:
                                  "Natural Ambient Daylight, Diya Flame & Micro-LEDs",
                                colorGrading: "Warm Heritage Gold & Amber Grade",
                                location: "Mumbai, India",
                              }
                            : activeStillModal.id === "fashion-editorial"
                            ? {
                                camera: "Sony FX3 Cinema Line",
                                lens: "85mm & 50mm Prime Glass",
                                aspectRatio: "3:2 Editorial Portrait",
                                lightingStyle: "Studio Strobes & Octabox Diffusion",
                                colorGrading: "Clean Studio Editorial Grade",
                                location: "Studio Cove, Mumbai",
                              }
                            : activeStillModal.id === "south-mumbai-heritage"
                            ? {
                                camera: "Sony Cinema Line FX30",
                                lens: "Cinema Prime Glass",
                                aspectRatio: "16:9 Architectural Widescreen",
                                lightingStyle: "Twilight Ambient & Morning Daylight",
                                colorGrading: "Atmospheric Heritage Grade",
                                location: "South Mumbai Heritage District",
                              }
                            : activeStillModal.id === "the-window-observer"
                            ? {
                                camera: "Canon EOS Cinema Line",
                                lens: "50mm & 85mm Prime Glass",
                                aspectRatio: "16:9 Cinematic Widescreen",
                                colorGrading: "Moody Cinematic Film Tone Curve",
                                location: "Interior Studio, Mumbai",
                              }
                            : {
                                camera: "Canon EOS Cinema",
                                lens: "Telephoto Prime Glass",
                                aspectRatio: "16:9 Architectural Widescreen",
                                lightingStyle: "Monsoon Overcast Skies",
                                colorGrading: "Moody Monolithic Tone Curve",
                                location: "Mumbai, Maharashtra",
                              },
                        stills: activeStillModal.stills,
                      }}
                      onClose={() => setActiveStillModal(null)}
                    />
                  </div>
                ) : (
                  <motion.div
                    initial={{ scale: 0.94, opacity: 0, y: 16 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.94, opacity: 0, y: 16 }}
                    transition={{ type: "spring", damping: 26, stiffness: 320 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative w-full max-w-5xl lg:max-w-6xl xl:max-w-[1240px] bg-[#0c0c0e]/95 backdrop-blur-2xl rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 p-5 sm:p-7 md:p-9 flex flex-col gap-5 max-h-[94vh] max-h-[94dvh] overflow-y-auto overscroll-contain shadow-[0_35px_120px_rgba(0,0,0,0.95)]"
                  >
                    {/* Close Button */}
                    <button
                      type="button"
                      onClick={() => setActiveStillModal(null)}
                      className="absolute top-4 right-4 z-40 w-10 h-10 rounded-full bg-black/75 border border-white/20 grid place-items-center text-white/90 hover:text-white hover:bg-white/15 transition-all shadow-lg cursor-pointer"
                      aria-label="Close"
                    >
                      <X size={18} />
                    </button>

                    {/* Adaptive Image Container */}
                    {activeStillModal.isPortrait ? (
                      /* Portrait Image with Ambient Blurred Backdrop */
                      <div className="relative w-full h-[56vh] sm:h-[62vh] md:h-[66vh] rounded-xl overflow-hidden border border-white/10 bg-black flex items-center justify-center">
                        <img
                          src={activeStillModal.fullImage}
                          alt=""
                          aria-hidden="true"
                          className="absolute inset-0 w-full h-full object-cover blur-2xl md:blur-3xl scale-125 opacity-55 brightness-75 select-none pointer-events-none transform -z-0"
                        />
                        <div className="absolute inset-0 bg-black/20 pointer-events-none z-[1]" />
                        <img
                          src={activeStillModal.fullImage}
                          alt={activeStillModal.title}
                          className="relative z-10 w-full h-full object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.85)]"
                        />
                      </div>
                    ) : (
                      /* Landscape Image Container */
                      <div className="relative w-full rounded-xl overflow-hidden border border-white/10 bg-black flex items-center justify-center">
                        <img
                          src={activeStillModal.fullImage}
                          alt={activeStillModal.title}
                          className="w-full h-auto max-h-[70vh] object-contain block"
                        />
                      </div>
                    )}

                    {/* Information Section */}
                    <div className="pt-1">
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-1.5">
                        <div className="text-[11px] tracking-[0.24em] uppercase text-white/60 font-semibold font-mono">
                          {activeStillModal.category}
                        </div>
                        {activeStillModal.camera && (
                          <span className="text-[11px] font-mono tracking-wider text-[var(--accent)]">
                            {activeStillModal.camera}
                          </span>
                        )}
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                        {activeStillModal.title}
                      </h3>

                      <p className="text-white/75 text-sm sm:text-[15px] leading-relaxed mb-4">
                        {activeStillModal.description}
                      </p>

                      {/* Tags */}
                      {activeStillModal.tags && activeStillModal.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                          {activeStillModal.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] tracking-[0.16em] uppercase px-3.5 py-1 rounded-full bg-white/[0.05] text-white/85 border border-white/10 font-semibold font-mono"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}

