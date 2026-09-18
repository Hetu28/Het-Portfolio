"use client";

import React, { useState, useEffect, useRef } from "react";
import { Project, ProjectStill } from "@/data/projects";
import {
  Maximize2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BehanceProjectViewProps {
  project: Project;
  onClose?: () => void;
}

export default function BehanceProjectView({
  project,
  onClose,
}: BehanceProjectViewProps) {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const stillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const touchStartX = useRef<number | null>(null);

  const stills: ProjectStill[] = project.stills || [];

  const closeLightbox = () => {
    const targetIndex = activeLightboxIndex;
    setActiveLightboxIndex(null);

    if (targetIndex !== null) {
      // Instant jump-cut scroll to that particular image as preview closes
      requestAnimationFrame(() => {
        const targetElement =
          stillRefs.current[targetIndex] ||
          document.getElementById(`${project.id}-still-${targetIndex}`) ||
          document.getElementById(`still-${targetIndex}`);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "instant" as ScrollBehavior,
            block: "center",
          });
        }
      });
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;

      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowRight") {
        setActiveLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % stills.length : 0
        );
      } else if (e.key === "ArrowLeft") {
        setActiveLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + stills.length) % stills.length : 0
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightboxIndex, stills.length]);

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const nextStill = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % stills.length);
    }
  };

  const prevStill = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex(
        (activeLightboxIndex - 1 + stills.length) % stills.length
      );
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    touchStartX.current = null;
    if (diffX > 45) {
      // Swiped left -> next
      nextStill();
    } else if (diffX < -45) {
      // Swiped right -> prev
      prevStill();
    }
  };

  return (
    <div className="w-full text-white bg-[#070709] selection:bg-[#FF2800] selection:text-white">
      {/* =========================================================================
          1. MODAL TOP HEADER BAR
          ========================================================================= */}
      <div
        className="sticky top-0 z-40 px-4 sm:px-8 py-3.5 sm:py-4 bg-[#070709]/95 backdrop-blur-xl border-b border-white/[0.08] flex items-center justify-between gap-3"
        style={{ paddingTop: "max(0.875rem, env(safe-area-inset-top))" }}
      >
        {/* Top Left Title */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight truncate">
            {project.title}
          </h2>
          <span className="text-white/25 hidden sm:inline">•</span>
          <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] uppercase text-[#FF2800] font-semibold truncate shrink-0">
            {project.category}
          </span>
        </div>

        {/* Top Right Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/[0.06] hover:bg-[var(--accent)] border border-white/15 hover:border-transparent flex items-center justify-center text-white transition-colors cursor-pointer shrink-0 touch-manipulation"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* =========================================================================
          2. CENTERED HERO PRESENTATION
          ========================================================================= */}
      <div className="px-4 sm:px-8 md:px-12 pt-8 sm:pt-16 pb-8 sm:pb-12 flex flex-col items-center text-center">
        {/* Center Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-black/60 border border-white/10 text-[10px] sm:text-[11px] font-mono tracking-[0.18em] uppercase text-white/80 mb-5 sm:mb-6 max-w-full truncate">
          <span className="w-2 h-2 rounded-full bg-[#FF2800] shrink-0" />
          <span className="truncate">{project.category ? project.category.toUpperCase() : "CINEMATOGRAPHY (DOP)"}</span>
          <span className="text-white/30">•</span>
          <span>{project.year}</span>
        </div>

        {/* Giant Centered Title */}
        <h1
          className="font-black uppercase tracking-tight text-white mb-2 select-none"
          style={{ fontSize: "clamp(36px, 11vw, 96px)", lineHeight: 0.95 }}
        >
          {project.title}
        </h1>

        {/* Elegant Serif Italic Subtitle */}
        <p className="font-serif-editorial italic text-xl sm:text-3xl md:text-4xl text-white/80 mb-4 sm:mb-6">
          {project.role}
        </p>

        {/* Creative Synopsis */}
        <p className="text-white/70 text-sm sm:text-lg md:text-xl max-w-3xl leading-relaxed mb-6 sm:mb-8 font-normal">
          {project.synopsis}
        </p>

        {/* Deliverables / Roles Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {project.deliverables?.map((role, i) => (
            <span
              key={i}
              className="px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono uppercase tracking-wider text-white/70 font-medium"
            >
              {role}
            </span>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="flex flex-col items-center gap-1.5 text-[11px] font-mono tracking-[0.24em] uppercase text-white/50 select-none">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF2800] animate-ping" />
            <span>EXPLORE STILLS</span>
          </span>
          <ChevronDown size={15} className="animate-bounce text-[#FF2800]" />
        </div>
      </div>

      {/* =========================================================================
          3. ALL STILLS BIG & SAME SIZE (SLIDESHOW / SHOWCASE FEED)
          ========================================================================= */}
      <div className="px-4 sm:px-8 md:px-12 pb-16 space-y-8 sm:space-y-12 max-w-[1360px] mx-auto">
        {stills.map((still, idx) => (
          <div
            key={still.id || idx}
            id={`${project.id}-still-${idx}`}
            ref={(el) => {
              stillRefs.current[idx] = el;
            }}
            className="space-y-3"
          >
            <div
              onClick={() => openLightbox(idx)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl border border-white/[0.12] bg-black shadow-2xl transition-all duration-500 hover:border-white/30"
            >
              {/* Big, consistent 16:9 widescreen ratio for all images */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
                <img
                  src={still.url}
                  alt={still.title}
                  loading={idx < 3 ? "eager" : "lazy"}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Top-Left Badge: Red dot + Still Number */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[11px] font-mono tracking-widest uppercase text-white shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-[#FF2800]" />
                    <span>
                      {String(idx + 1).padStart(2, "0")} / {String(stills.length).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* Hover Inspect / Fullscreen Pill */}
                <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="px-4 py-2 rounded-full bg-black/90 backdrop-blur-md border border-white/25 text-xs font-semibold text-white flex items-center gap-2 shadow-2xl">
                    <Maximize2 size={14} className="text-[#FF2800]" />
                    <span>View in Fullscreen</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* =========================================================================
          4. FULLSCREEN LIGHTBOX VIEWER (UNBOXED & MAX SIZED)
          ========================================================================= */}
      <AnimatePresence>
        {activeLightboxIndex !== null && stills[activeLightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="fixed inset-0 z-[9999999] bg-black/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 md:p-8 select-none cursor-zoom-out touch-pan-y"
            onClick={closeLightbox}
          >
            {/* Top Right Close Cross Button (Fixed with safe area) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              style={{
                top: "max(1rem, env(safe-area-inset-top))",
                right: "max(1rem, env(safe-area-inset-right))",
              }}
              className="fixed z-50 w-11 h-11 rounded-full bg-black/80 hover:bg-[var(--accent)] border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-2xl touch-manipulation active:scale-95"
              aria-label="Close Lightbox"
            >
              <X size={20} />
            </button>

            {/* Prev Navigation Arrow */}
            {stills.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevStill();
                }}
                style={{
                  left: "max(0.75rem, env(safe-area-inset-left))",
                }}
                className="fixed z-40 w-12 h-12 rounded-full bg-black/75 hover:bg-white/20 text-white/90 hover:text-white flex items-center justify-center transition-all cursor-pointer border border-white/15 active:scale-90 touch-manipulation shadow-2xl"
                aria-label="Previous image"
              >
                <ChevronLeft size={26} />
              </button>
            )}

            {/* Big Unboxed Image */}
            <motion.div
              key={activeLightboxIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-[98vw] max-h-[92vh] max-h-[92dvh] flex items-center justify-center cursor-default"
            >
              <img
                src={stills[activeLightboxIndex].url}
                alt={stills[activeLightboxIndex].title}
                className="max-h-[92vh] max-h-[92dvh] max-w-[98vw] w-auto h-auto object-contain rounded-xl sm:rounded-2xl select-none shadow-[0_25px_80px_rgba(0,0,0,0.95)]"
              />
            </motion.div>

            {/* Next Navigation Arrow */}
            {stills.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextStill();
                }}
                style={{
                  right: "max(0.75rem, env(safe-area-inset-right))",
                }}
                className="fixed z-40 w-12 h-12 rounded-full bg-black/75 hover:bg-white/20 text-white/90 hover:text-white flex items-center justify-center transition-all cursor-pointer border border-white/15 active:scale-90 touch-manipulation shadow-2xl"
                aria-label="Next image"
              >
                <ChevronRight size={26} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
