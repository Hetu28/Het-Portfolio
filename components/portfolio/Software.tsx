"use client";

import React from "react";
import { softwareList } from "@/data/software";

export default function Software() {
  return (
    <section className="relative z-10 section-y">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-6 h-px bg-white/25" />
          <span className="text-[10px] tracking-[0.32em] text-white/50 font-medium uppercase">
            SOFTWARE &amp; TOOLKIT
          </span>
          <span className="w-6 h-px bg-white/25" />
        </div>

        <h2 className="text-[36px] md:text-[56px] lg:text-[68px] leading-[1] tracking-[-0.03em] font-black mb-12">
          The{" "}
          <span className="font-serif-editorial" style={{ color: "var(--accent)" }}>
            tools
          </span>{" "}
          I trust.
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-5">
          {softwareList.map((tool) => (
            <div
              key={tool.id}
              className="glass rounded-2xl p-6 flex flex-col items-start gap-6 relative overflow-hidden hover:border-white/20 transition-all group hover:-translate-y-1 duration-300"
            >
              <div className="w-14 h-14 flex items-center justify-center">
                <img
                  src={tool.logo}
                  alt={tool.name}
                  className="w-full h-full object-contain filter drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)] group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <div className="text-[13px] tracking-[0.06em] text-white/85 font-medium">
                {tool.name}
              </div>

              <div
                className="absolute -bottom-16 -right-8 w-40 h-40 rounded-full opacity-15 blur-3xl pointer-events-none group-hover:opacity-25 transition-opacity"
                style={{ background: tool.color }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}