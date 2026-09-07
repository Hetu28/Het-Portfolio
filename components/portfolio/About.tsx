"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function About() {
  const counts = [4, 30, 3];

  return (
    <section id="about" className="relative z-10 section-y">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">
        {/* Section Header: Spans above both Image & Text */}
        <div className="flex items-center gap-3 mb-8 sm:mb-12">
          <span className="w-6 h-px bg-white/25" />
          <span className="text-[10px] tracking-[0.32em] text-white/50 font-medium uppercase font-mono">
            ABOUT
          </span>
          <span className="w-6 h-px bg-white/25" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-start">
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
            <h2 className="text-[36px] sm:text-[48px] md:text-[58px] lg:text-[68px] leading-[1.05] tracking-[-0.03em] font-black text-white">
              I chase the{" "}
              <span className="font-serif-editorial italic font-normal" style={{ color: "var(--accent)" }}>
                quiet frames
              </span>{" "}
              that feel loud in memory.
            </h2>

            <div className="mt-6 sm:mt-7 space-y-4 text-white/70 text-[15px] md:text-[16px] leading-[1.75] max-w-xl">
              <p>
                I’m Het — an independent filmmaker working across direction, cinematography, editing, and graphic design. With hands-on experience spanning narrative films, commercials, and music videos — including roles as Assistant Director and Production Manager — I bring end-to-end craft to every set.
              </p>
              <p>
                From shaping light, blocking, and camera rhythm to sculpting time in post-production, I keep an obsessive eye for the subtle, minor details no one would ever consciously notice, but that make the entire frame unforgettable.
              </p>
            </div>

            {/* Stat Counters & View More Red Bubble (4-Col) */}
            <div className="mt-10 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-6 pt-6 border-t border-white/[0.08] items-center">
              <div className="relative">
                <div className="text-4xl lg:text-5xl font-black tracking-[-0.03em] text-white flex items-baseline">
                  <span>{counts[0]}</span>
                  <span style={{ color: "var(--accent)" }}>+</span>
                </div>
                <div className="mt-2 text-[10px] tracking-[0.24em] text-white/50 uppercase font-medium font-mono">
                  YEARS EXPERIENCE
                </div>
              </div>

              <div className="relative">
                <div className="text-4xl lg:text-5xl font-black tracking-[-0.03em] text-white flex items-baseline">
                  <span>{counts[1]}</span>
                  <span style={{ color: "var(--accent)" }}>+</span>
                </div>
                <div className="mt-2 text-[10px] tracking-[0.24em] text-white/50 uppercase font-medium font-mono">
                  PROJECTS COMPLETED
                </div>
              </div>

              <div className="relative">
                <div className="text-4xl lg:text-5xl font-black tracking-[-0.03em] text-white flex items-baseline">
                  <span>{counts[2]}</span>
                </div>
                <div className="mt-2 text-[10px] tracking-[0.24em] text-white/50 uppercase font-medium font-mono">
                  BRANDS WORKED WITH
                </div>
              </div>

              {/* Theme Red Bubble: View More */}
              <div className="flex items-center">
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2.5 pl-5 pr-2 py-2 rounded-full text-[11px] font-bold tracking-[0.16em] uppercase text-white transition-all duration-300 hover:scale-105 active:scale-95 relative overflow-hidden shadow-lg shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #ff451a 0%, #ff2800 65%, #d11e00 100%)",
                    boxShadow:
                      "inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.55), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.35), 0 8px 24px -3px rgba(255, 40, 0, 0.55), 0 0 16px rgba(255, 40, 0, 0.3)",
                  }}
                >
                  <span
                    className="absolute inset-x-2 top-0 h-[48%] rounded-t-full pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.05) 60%, transparent 100%)",
                    }}
                  />
                  <span className="relative z-10 whitespace-nowrap drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
                    VIEW MORE
                  </span>
                  <span className="relative z-10 w-7 h-7 rounded-full bg-white text-black flex items-center justify-center transition-transform duration-300 group-hover:rotate-45 shadow-[0_2px_6px_rgba(0,0,0,0.25)] shrink-0">
                    <ArrowUpRight size={14} strokeWidth={2.6} />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
