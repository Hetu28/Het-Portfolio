"use client";

import React from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { siteSettings } from "@/data/site";
import InfiniteMasonry from "./InfiniteMasonry";

export default function Hero() {
  const { hero } = siteSettings;

  return (
    <section
      id="home"
      className="relative z-10 pt-10 sm:pt-16 md:pt-26 lg:pt-28"
    >
      <div className="max-w-[1520px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:[grid-template-columns:51fr_49fr] gap-6 lg:gap-6 xl:gap-7 items-start">
          {/* =========================================================================
              LEFT COLUMN (EDITORIAL IDENTITY & TYPOGRAPHY) - ISOLATED LAYER
              ========================================================================= */}
          <div className="flex flex-col isolate relative z-10 pr-0">
            {/* Top Block: Status Line & Availability with Neon Green Indicator */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-3 md:mb-4">
              <div className="flex items-center gap-2.5">
                <span className="relative flex w-2.5 h-2.5">
                  <span
                    className="absolute inset-0 rounded-full animate-ping opacity-75"
                    style={{ background: "#22c55e" }}
                  />
                  <span
                    className="relative w-2.5 h-2.5 rounded-full"
                    style={{
                      background: "#22c55e",
                      boxShadow: "0 0 14px rgba(34, 197, 94, 0.95), 0 0 4px #22c55e",
                    }}
                  />
                </span>
                <span
                  className="text-[11px] tracking-[0.24em] font-semibold"
                  style={{ color: "#22c55e" }}
                >
                  OPEN FOR WORK
                </span>
              </div>

              <span className="hidden sm:inline h-3 w-px bg-white/15" />

              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] tracking-[0.06em] text-white/70">
                {hero.availabilityTags.map((tag) => (
                  <span key={tag} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-white/25" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Location Subtitle: Mumbai — INDIA */}
            <div className="text-[13px] md:text-[14px] tracking-[0.02em] text-white/55 mb-5 md:mb-6">
              Independent filmmaker / Mumbai — INDIA
            </div>

            {/* FILMMAKER Heading - Constrained to column boundary */}
            <div className="mb-6 md:mb-8 relative">
              <div className="relative pt-1">
                <h2
                  className="hero-filmmaker-title font-black tracking-[-0.045em] leading-[0.88] select-none whitespace-nowrap"
                  style={{ fontSize: "clamp(54px, 7.8vw, 116px)" }}
                >
                  <span className="text-white">FILM</span>
                  <span style={{ color: "var(--accent)" }}>MAKER</span>
                </h2>

                {/* Sub-Roles */}
                <div className="mt-3.5 md:mt-4 flex flex-wrap items-center gap-x-6 md:gap-x-8 gap-y-2">
                  {hero.secondaryRoles.map((role) => (
                    <div key={role} className="flex items-center gap-2.5">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{
                          background: "var(--accent)",
                          boxShadow: "0 0 10px var(--glow)",
                        }}
                      />
                      <span className="text-[12px] md:text-[13px] tracking-[0.28em] text-white/80 font-semibold">
                        {role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Headline */}
            <h1
              className="font-black tracking-[-0.03em] text-white text-[42px] sm:text-[52px] md:text-[62px] lg:text-[70px] xl:text-[78px]"
              style={{ lineHeight: 1.02 }}
            >
              <span className="block">stories</span>
              <span className="block">that deserve</span>
              <span className="block">
                <span className="font-serif-editorial" style={{ color: "var(--accent)" }}>
                  to be remembered.
                </span>
              </span>
            </h1>

            {/* Bio Description */}
            <p className="mt-6 md:mt-7 max-w-[560px] text-[15px] md:text-[16px] leading-[1.7] text-white/60">
              Independent filmmaker based in India. I direct, shoot and edit — crafting cinematic narratives, commercials, documentaries and music videos with an obsessive eye for detail.
            </p>

            {/* CTAs */}
            <div className="mt-8 md:mt-9 flex flex-wrap items-center gap-3">
              <a
                href="/CV/Het_Patel_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full pl-6 pr-2 py-2 text-[13px] font-semibold tracking-[0.14em] uppercase text-white transition hover:scale-[1.02]"
                style={{
                  background: "var(--accent)",
                  boxShadow: "0 10px 40px -10px var(--glow)",
                }}
              >
                View CV
                <span className="w-9 h-9 rounded-full bg-white text-black grid place-items-center transition-transform group-hover:rotate-45">
                  <ArrowUpRight size={16} strokeWidth={2.5} />
                </span>
              </a>

              <a
                href="/projects"
                className="group inline-flex items-center gap-3 rounded-full px-6 py-3 text-[13px] font-semibold tracking-[0.14em] uppercase text-white/90 border border-white/15 hover:border-white/40 hover:bg-white/[0.04] transition hover:scale-[1.02]"
              >
                <Play size={16} fill="currentColor" className="opacity-80 group-hover:opacity-100" />
                VIEW PROJECTS
              </a>
            </div>

            {/* Stat Counters Underneath CTAs */}
            <div className="mt-9 md:mt-11 flex items-center gap-8 opacity-75">
              <div>
                <div className="text-3xl font-serif-editorial" style={{ color: "var(--accent)" }}>
                  4+
                </div>
                <div className="text-[10px] tracking-[0.28em] text-white/50 uppercase mt-1">
                  Years
                </div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <div className="text-3xl font-serif-editorial">30+</div>
                <div className="text-[10px] tracking-[0.28em] text-white/50 uppercase mt-1">
                  Projects
                </div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <div className="text-3xl font-serif-editorial">3</div>
                <div className="text-[10px] tracking-[0.28em] text-white/50 uppercase mt-1">
                  Brands
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN (DUAL MASONRY IMAGE TRACKS)
              ========================================================================= */}
          <div className="lg:-mt-8 xl:-mt-10 w-full">
            <InfiniteMasonry />
          </div>
        </div>
      </div>
    </section>
  );
}
