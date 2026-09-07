"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, X } from "lucide-react";
import { featuredProjects, Project } from "@/data/projects";
import { motion, AnimatePresence } from "framer-motion";
import CinemaPlayer from "@/components/portfolio/CinemaPlayer";

export default function FeaturedWork() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };
    if (selectedProject) {
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
  }, [selectedProject]);

  const formatMeta = (p: Project) => {
    return `${p.category} • ${p.role}`;
  };

  return (
    <>
      <section id="work" className="relative z-10 py-24 md:py-36">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-px bg-white/25" />
            <span className="text-[10px] tracking-[0.32em] text-white/50 font-medium uppercase">
              SELECTED WORK
            </span>
            <span className="w-6 h-px bg-white/25" />
          </div>

          {/* Heading */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 md:mb-24">
            <h2 className="leading-[0.95] tracking-[-0.03em] font-black text-[44px] sm:text-[60px] md:text-[86px] lg:text-[110px]">
              <span className="block gradient-text">Frames that linger,</span>
              <span className="block gradient-text font-serif-editorial italic">
                stories that resonate.
              </span>
            </h2>
            <p className="text-white/50 text-[15px] md:text-[17px] tracking-[0.08em] max-w-md pb-3 font-normal">
              A curated selection of narrative shorts, commercial TVCs, and visual explorations directed and shot with meticulous craft.
            </p>
          </div>

          {/* Projects 2-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 md:gap-y-20">
            {featuredProjects.map((p, i) => (
              <div
                key={p.id}
                onClick={() => setSelectedProject(p)}
                className="group cursor-pointer block"
              >
                <div className="relative">
                  {/* Card Thumbnail */}
                  <div
                    className="relative w-full rounded-[24px] sm:rounded-[28px] overflow-hidden border border-white/[0.08] bg-[#090909]"
                    style={{ aspectRatio: "16/9" }}
                  >
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

                    {/* Hover Glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                      style={{
                        boxShadow: "0 0 0 1px rgba(255,40,0,0.35) inset, 0 30px 80px -20px var(--glow)",
                      }}
                    />

                    {/* Top Badges */}
                    <div className="absolute top-5 left-5 text-[10px] tracking-[0.28em] text-white/80 font-mono">
                      {String(i + 1).padStart(2, "0")} / {String(featuredProjects.length).padStart(2, "0")}
                    </div>
                    <div className="absolute top-5 right-5 text-[10px] tracking-[0.28em] text-white/70 uppercase font-medium">
                      {p.duration}
                    </div>
                  </div>

                  {/* Below Card Details */}
                  <div className="relative mt-4 overflow-hidden">
                    <div className="flex items-end justify-between gap-4 py-3 transition-all duration-300 group-hover:pl-2">
                      <div className="min-w-0">
                        <div className="text-[11px] tracking-[0.24em] text-white/50 uppercase mb-1.5 font-medium">
                          {formatMeta(p)}
                        </div>
                        <h3 className="text-xl sm:text-2xl md:text-[28px] font-bold tracking-[-0.02em] text-white">
                          {p.title}
                        </h3>
                      </div>
                      <div className="shrink-0 flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-white/70 group-hover:text-white transition-colors">
                        <span className="hidden sm:inline">VIEW PROJECT</span>
                        <span className="w-8 h-8 rounded-full border border-white/15 grid place-items-center transition-all duration-300 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white">
                          <ArrowUpRight size={13} strokeWidth={2.5} />
                        </span>
                      </div>
                    </div>

                    {/* Animated Accent Line */}
                    <div className="h-px w-full bg-white/10 relative overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 w-0 group-hover:w-full transition-all duration-[700ms] ease-[cubic-bezier(0.2,0.7,0.2,1)]"
                        style={{ background: "var(--accent)" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Projects CTA */}
          <div className="mt-14 md:mt-20 flex justify-center">
            <a
              href="/projects"
              className="group inline-flex items-center gap-4 rounded-full px-8 py-4 text-sm font-bold tracking-[0.16em] uppercase text-white transition-all duration-300 hover:scale-105"
              style={{
                background: "var(--accent)",
                boxShadow: "0 10px 40px -10px var(--glow)",
              }}
            >
              <span>Explore All Projects</span>
              <span className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center transition-transform group-hover:rotate-45">
                <ArrowUpRight size={16} strokeWidth={2.5} />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox Modal Portalled to document.body */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {selectedProject && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[999999] bg-black/80 backdrop-blur-xl md:backdrop-blur-2xl flex items-center justify-center p-4 md:p-8 overscroll-contain"
                onClick={() => setSelectedProject(null)}
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0, y: 12 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.95, opacity: 0, y: 12 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-5xl lg:max-w-6xl xl:max-w-[1220px] bg-[#0c0c0e]/95 backdrop-blur-2xl rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 p-5 sm:p-7 md:p-9 flex flex-col gap-5 max-h-[94vh] overflow-y-auto overscroll-contain shadow-[0_35px_120px_rgba(0,0,0,0.95)]"
                >
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 z-40 w-9 h-9 rounded-full border border-white/20 grid place-items-center text-white bg-black/60 hover:bg-white/15 transition-colors cursor-pointer"
                    aria-label="Close"
                  >
                    <X size={16} />
                  </button>

                  {/* Cinema Player Embed Container */}
                  <div className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden border border-white/15 bg-black shadow-2xl">
                    <CinemaPlayer
                      videoUrl={selectedProject.videoUrl}
                      poster={selectedProject.image}
                      title={selectedProject.title}
                    />
                  </div>

                  <div>
                    <div className="text-[11px] tracking-[0.24em] uppercase text-white/60 font-semibold mb-1">
                      {formatMeta(selectedProject)}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white mb-2.5">
                      {selectedProject.title}
                    </h3>
                    <p className="text-white/75 text-[14px] sm:text-[15px] leading-relaxed mb-4">
                      {selectedProject.synopsis || "Cinematic project exploring lighting, composition, and storytelling precision."}
                    </p>

                    {selectedProject.deliverables && (
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                        {selectedProject.deliverables.map((d) => (
                          <span
                            key={d}
                            className="text-[11px] tracking-[0.16em] uppercase px-3 py-1 rounded-full bg-white/[0.05] text-white/80 border border-white/10 font-medium"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
