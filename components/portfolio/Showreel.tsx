"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Play, Maximize2, X } from "lucide-react";
import { siteSettings } from "@/data/site";
import { motion, AnimatePresence } from "framer-motion";

export default function Showreel() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { showreel } = siteSettings;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsPlaying(false);
      }
    };
    if (isPlaying) {
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
  }, [isPlaying]);

  return (
    <>
      <section id="showreel" className="relative z-10 pt-0 pb-24 md:pb-36">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          {/* Eyebrow flanked by matching designed line elements */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-px bg-white/25" />
            <span className="text-[10px] tracking-[0.32em] text-white/50 font-medium">
              SHOWREEL
            </span>
            <span className="w-6 h-px bg-white/25" />
          </div>

          {/* Dynamic Gradient Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="leading-[0.95] tracking-[-0.03em] font-black text-[44px] sm:text-[60px] md:text-[86px] lg:text-[110px]"
          >
            <span className="block gradient-text">Before you know my work,</span>
            <span className="block gradient-text font-serif-editorial italic">experience it.</span>
          </motion.h2>

          <p className="mt-8 text-white/50 text-[15px] md:text-[17px] tracking-[0.08em]">
            In storytelling, there's a saying: show, don't tell. Press play and see what catches your eyes.
          </p>

          {/* Large Cinematic Video Card */}
          <div className="mt-14 md:mt-20 relative group">
            <div
              className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#090909]"
              style={{
                aspectRatio: "21/9",
                boxShadow: "0 40px 120px -40px var(--glow)",
              }}
            >
              {/* Background Looping Video Preview */}
              <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                poster={showreel.posterUrl}
              >
                <source src={showreel.videoUrl} type="video/mp4" />
              </video>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30 pointer-events-none" />

              {/* Centered Glowing Play Button */}
              <button
                onClick={() => setIsPlaying(true)}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 rounded-full grid place-items-center transition-transform group-hover:scale-105"
                aria-label="Play showreel"
                style={{
                  background: "rgba(255,40,0,0.9)",
                  boxShadow: "0 0 60px var(--glow), inset 0 0 0 1px rgba(255,255,255,0.15)",
                }}
              >
                <Play
                  size={36}
                  className="text-white translate-x-0.5 fill-white"
                  strokeWidth={2}
                />
              </button>

              {/* Badges and metadata */}
              <div className="absolute top-6 left-6 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                <span className="text-[10px] tracking-[0.3em] text-white/80 uppercase font-semibold">
                  REEL • 2025
                </span>
              </div>

              <div className="absolute top-6 right-6 text-[10px] tracking-[0.3em] text-white/70 flex items-center gap-2 uppercase font-medium">
                4K • 24FPS
                <Maximize2 size={12} />
              </div>

              <div className="absolute bottom-6 left-6 text-[11px] tracking-[0.22em] text-white/70 font-serif-editorial italic">
                A four-minute film about frames that stayed.
              </div>

              <div className="absolute bottom-6 right-6 text-[10px] tracking-[0.3em] text-white/70 font-medium">
                03:52
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen Video Modal Portalled to document.body */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isPlaying && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[999999] bg-black/85 backdrop-blur-xl md:backdrop-blur-2xl flex items-center justify-center p-4 md:p-10 overscroll-contain"
                onClick={() => setIsPlaying(false)}
              >
                <button
                  onClick={() => setIsPlaying(false)}
                  className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full border border-white/20 grid place-items-center text-white bg-black/50 hover:bg-white/15 transition-colors cursor-pointer"
                  aria-label="Close video"
                >
                  <X size={20} />
                </button>
                <div
                  className="relative w-full max-w-6xl lg:max-w-7xl xl:max-w-[1360px] aspect-video rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-[0_40px_140px_rgba(0,0,0,0.95)] bg-black"
                  onClick={(e) => e.stopPropagation()}
                >
                  <video
                    controls
                    autoPlay
                    className="w-full h-full object-cover"
                    poster={showreel.posterUrl}
                  >
                    <source src={showreel.videoUrl} type="video/mp4" />
                  </video>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
