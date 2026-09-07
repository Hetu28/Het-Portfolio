"use client";

import React from "react";
import { filmographyData } from "@/data/filmography";

export default function Filmography() {
  return (
    <section id="filmography" className="relative z-10 pt-20 md:pt-28 pb-8 md:pb-12">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-6 h-px bg-white/25" />
          <span className="text-[10px] tracking-[0.32em] text-white/50 font-medium uppercase font-mono">
            FILMOGRAPHY
          </span>
          <span className="w-6 h-px bg-white/25" />
        </div>

        {/* Heading */}
        <h2 className="text-[44px] md:text-[76px] lg:text-[96px] leading-[0.95] tracking-[-0.03em] font-black mb-16">
          A body of{" "}
          <span className="font-serif-editorial" style={{ color: "var(--accent)" }}>
            work
          </span>
          .
        </h2>

        {/* Filmography Groups */}
        <div className="space-y-14 md:space-y-20">
          {filmographyData.map((group, groupIdx) => (
            <div
              key={group.role}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start"
            >
              {/* Left Column Role Header */}
              <div className="lg:col-span-4">
                <div className="sticky top-32">
                  <div className="text-[10px] tracking-[0.32em] text-white/40 mb-2 font-mono">
                    {String(groupIdx + 1).padStart(2, "0")}
                  </div>
                  <div className="text-[13px] tracking-[0.3em] font-semibold uppercase" style={{ color: "var(--accent)" }}>
                    {group.role}
                  </div>
                  <div className="mt-4 text-white/45 text-sm max-w-xs leading-relaxed">
                    {group.subtitle}
                  </div>
                </div>
              </div>

              {/* Right Film List - Original Minimal Layout with Rich Text Highlighting */}
              <div className="lg:col-span-8 border-t border-white/[0.08]">
                {group.items.map((item, itemIdx) => (
                  <div
                    key={item.title}
                    className="group flex items-center justify-between gap-4 py-4 md:py-5 border-b border-white/[0.08] hover:border-white/25 hover:pl-3 transition-all duration-300 cursor-default select-none"
                  >
                    <div className="flex items-baseline gap-5 md:gap-8 min-w-0">
                      <span className="text-[12px] md:text-[13px] tabular-nums text-white/35 group-hover:text-[var(--accent)] w-6 shrink-0 font-mono transition-colors duration-300">
                        {String(itemIdx + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <div className="text-[18px] sm:text-[22px] md:text-[24px] font-semibold tracking-[-0.01em] text-white/80 group-hover:text-white group-hover:drop-shadow-[0_0_16px_rgba(255,255,255,0.4)] transition-all duration-300">
                          {item.title}
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center">
                      <span className="text-[11px] sm:text-[12px] tracking-[0.2em] text-white/45 group-hover:text-[var(--accent)] uppercase font-medium font-mono transition-colors duration-300">
                        {item.meta}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
