"use client";

import React, { useState, useRef } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  ArrowUpRight,
} from "lucide-react";
import { siteSettings } from "@/data/site";
import { aboutData } from "@/data/about";

export default function ShowreelContent() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullScreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="relative z-10 w-full overflow-hidden pt-18 sm:pt-24 md:pt-36 pb-16 bg-transparent">
      {/* =========================================================================
          1. KINETIC SHOWREEL HEADER
          ========================================================================= */}
      <div className="w-full max-w-[1400px] mx-auto px-5 md:px-8 mb-12 sm:mb-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 pb-8 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-6 h-px bg-white/25" />
              <span className="text-[10px] tracking-[0.32em] text-white/50 font-medium uppercase">
                SHOWREEL
              </span>
              <span className="w-6 h-px bg-white/25" />
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-[0.9] text-white select-none">
              The Reel.
            </h1>
            <p className="mt-4 text-white/60 text-base sm:text-xl font-normal max-w-xl">
              A kinetic montage of narrative shorts, commercial campaigns, and{" "}
              <span className="font-serif-editorial italic text-white" style={{ color: "var(--accent)" }}>
                cinematic frames
              </span>
              .
            </p>
          </div>

          {/* Quick Technical Specs Pills */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-white/80">
              4K DCI
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-white/80">
              2.39:1 Scope
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-white/80">
              ACES Color
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-white/80">
              ProRes 4444 XQ
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. LARGE CINEMATIC SHOWCASE VIDEO PLAYER
          ========================================================================= */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 mb-20 sm:mb-28">
        <div className="relative group rounded-[32px] overflow-hidden border border-white/[0.12] bg-[#090909] shadow-2xl">
          <div
            className="relative w-full overflow-hidden"
            style={{
              aspectRatio: "21/9",
              minHeight: "340px",
              boxShadow: "0 40px 140px -30px var(--glow)",
            }}
          >
            <video
              ref={videoRef}
              className="w-full h-full object-cover cursor-pointer"
              autoPlay
              muted
              loop
              playsInline
              poster={siteSettings.showreel.posterUrl}
              onClick={togglePlay}
            >
              <source src={siteSettings.showreel.videoUrl} type="video/mp4" />
            </video>

            {/* Ambient Dark Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* Custom Control Overlay */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-20 pointer-events-auto">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause" : "Play"}
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white transition-transform hover:scale-105"
                  style={{
                    background: "var(--accent)",
                    boxShadow: "0 0 24px var(--glow)",
                  }}
                >
                  {isPlaying ? (
                    <Pause size={18} fill="currentColor" />
                  ) : (
                    <Play size={18} fill="currentColor" className="ml-0.5" />
                  )}
                </button>

                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute" : "Mute"}
                  className="w-11 h-11 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-xs text-white/80 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>MASTER REEL • 2024–2025</span>
                </div>

                <button
                  onClick={toggleFullScreen}
                  aria-label="Full Screen"
                  className="w-11 h-11 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <Maximize2 size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. DUAL MARQUEE CALL-TO-ACTION BANNER
          ========================================================================= */}
      <div className="relative mt-20 py-16 sm:py-24 overflow-hidden border-y border-white/[0.08] bg-transparent">
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