"use client";

import React, { useState } from "react";
import { contributionFilms, freelanceProjects } from "@/data/experience";
import { Film } from "lucide-react";

export default function Experience() {
  const [selectedRole, setSelectedRole] = useState<string>("All");

  const getRoleColor = (cat: string) => {
    switch (cat) {
      case "Direction & AD":
        return "var(--accent)";
      case "Cinematography & Camera":
        return "#38bdf8";
      case "Production Management":
        return "#f59e0b";
      case "Sound & Technical":
        return "#a855f7";
      default:
        return "var(--accent)";
    }
  };

  const getBadgeStyle = (role: string) => {
    if (role.includes("Director")) return "text-[var(--accent)] border-[var(--accent)]/30 bg-[var(--accent)]/10";
    if (role.includes("Cinematographer")) return "text-[#38bdf8] border-[#38bdf8]/30 bg-[#38bdf8]/10";
    if (role.includes("Editor")) return "text-[#a855f7] border-[#a855f7]/30 bg-[#a855f7]/10";
    if (role.includes("Writer")) return "text-[#f59e0b] border-[#f59e0b]/30 bg-[#f59e0b]/10";
    return "text-white/80 border-white/20 bg-white/5";
  };

  const filteredFilms = contributionFilms.filter(
    (f) => selectedRole === "All" || f.category === selectedRole
  );

  return (
    <section id="experience" className="relative z-10 pt-4 md:pt-6 pb-20 md:pb-28 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">
        {/* =========================================================================
            SECTION 1: ON-SET CONTRIBUTIONS MATRIX
            ========================================================================= */}
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-4">
          <span className="w-6 h-px bg-white/25" />
          <span className="text-[10px] tracking-[0.32em] text-white/50 font-medium uppercase font-mono">
            CONTRIBUTIONS
          </span>
          <span className="w-6 h-px bg-white/25" />
        </div>

        {/* Heading & Subheading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-[32px] sm:text-[44px] md:text-[54px] lg:text-[64px] leading-[1] tracking-[-0.03em] font-black">
              My{" "}
              <span className="font-serif-editorial italic font-normal" style={{ color: "var(--accent)" }}>
                contributions
              </span>
              .
            </h2>
            <p className="mt-2.5 text-white/55 max-w-xl text-[13.5px] sm:text-[14.5px] leading-relaxed">
              Hands-on set experience across narrative cinema, indie shorts, and commercial shoots — contributing across Direction, Cinematography, Production Management, Sound, and Editing.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {["All", "Cinematography & Camera", "Direction & AD", "Production Management", "Sound & Technical"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedRole(cat)}
                className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider transition-all duration-300 ${
                  selectedRole === cat
                    ? "bg-white text-black shadow-lg scale-[1.03]"
                    : "bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]"
                }`}
              >
                {cat === "All" ? "All Sets" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* =========================================================================
            CLEAN 5-COLUMN FILM BOXES GRID
            ========================================================================= */}
        <div className="relative">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3 md:gap-3.5">
            {contributionFilms.map((film) => {
              const isMatch = selectedRole === "All" || film.category === selectedRole;
              const roleColor = getRoleColor(film.category);

              return (
                <div
                  key={film.seat}
                  className={`relative group rounded-xl p-3.5 sm:p-4 flex flex-col justify-between min-h-[96px] sm:min-h-[104px] transition-all duration-300 border ${
                    isMatch
                      ? "bg-[#0c0c0f]/90 border-white/[0.08] hover:border-[var(--accent)] hover:bg-[#121217] hover:scale-[1.03] hover:shadow-[0_8px_25px_-8px_var(--glow)]"
                      : "bg-white/[0.01] border-white/[0.02] opacity-25"
                  }`}
                >
                  {/* Seat Headrest Curved Accent */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-b-full bg-white/15 group-hover:bg-[var(--accent)] transition-colors" />

                  {/* Top Row: Seat Code & Year */}
                  <div className="flex items-center justify-between mb-1.5 pt-0.5">
                    <span className="px-1.5 py-0.5 rounded font-mono text-[9px] tracking-wider font-bold bg-white/[0.05] border border-white/10 text-white/75 group-hover:text-[var(--accent)] group-hover:border-[var(--accent)]/40 transition-colors">
                      {film.seat}
                    </span>
                    <span className="text-[10px] font-mono text-white/40 group-hover:text-white/70 transition-colors">
                      {film.year}
                    </span>
                  </div>

                  {/* Film Title */}
                  <div className="my-0.5">
                    <h4 className="text-[13px] sm:text-[13.5px] font-bold tracking-tight text-white group-hover:text-white transition-colors leading-snug line-clamp-1">
                      {film.title}
                    </h4>
                  </div>

                  {/* Bottom Role Badge */}
                  <div className="mt-2 pt-1.5 border-t border-white/[0.05] flex items-center justify-between">
                    <span
                      className="text-[9.5px] sm:text-[10px] font-medium tracking-wide leading-tight truncate"
                      style={{ color: roleColor }}
                    >
                      {film.role}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/20 group-hover:scale-125 transition-transform shrink-0 ml-1" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Legend */}
          <div className="mt-8 pt-5 border-t border-white/[0.08] flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 text-[11px] text-white/60 font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background: "var(--accent)" }} />
              <span>Direction & AD</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span>Cinematography & Camera</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Production Management</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span>Sound & Technical</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            SECTION 2: FREELANCE COLLABORATIONS
            ========================================================================= */}
        <div className="mt-20 sm:mt-24 pt-12 sm:pt-16 border-t border-white/[0.08]">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-px bg-white/25" />
            <span className="text-[10px] tracking-[0.32em] text-white/50 font-medium uppercase font-mono">
              FREELANCE
            </span>
            <span className="w-6 h-px bg-white/25" />
          </div>

          {/* Heading matching Section 1 scale */}
          <div className="mb-10">
            <h2 className="text-[32px] sm:text-[44px] md:text-[54px] lg:text-[64px] leading-[1] tracking-[-0.03em] font-black">
              Freelance{" "}
              <span className="font-serif-editorial italic font-normal" style={{ color: "var(--accent)" }}>
                collaborations
              </span>
              .
            </h2>
            <p className="mt-2.5 text-white/55 max-w-xl text-[13.5px] sm:text-[14.5px] leading-relaxed">
              Multi-disciplinary projects handled across scriptwriting, directing, cinematography, and post-production editing.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {freelanceProjects.map((proj) => (
              <div
                key={proj.title}
                className="group relative rounded-2xl p-6 sm:p-7 bg-[#0c0c0f]/90 border border-white/[0.08] hover:border-[var(--accent)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_35px_-10px_var(--glow)] flex flex-col justify-between min-h-[170px]"
              >
                {/* Top accent tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Film size={15} style={{ color: "var(--accent)" }} />
                    <span className="text-[11px] font-mono text-white/45 tracking-wider uppercase font-semibold">
                      {proj.category}
                    </span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-[var(--accent)] group-hover:scale-125 transition-all" />
                </div>

                {/* Project Title */}
                <div className="my-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-white transition-colors tracking-tight">
                    {proj.title}
                  </h3>
                </div>

                {/* Roles Pills */}
                <div className="mt-4 pt-4 border-t border-white/[0.06] flex flex-wrap gap-2">
                  {proj.roles.map((role) => (
                    <span
                      key={role}
                      className={`text-[11px] font-medium px-3 py-1 rounded-md border tracking-wide transition-all ${getBadgeStyle(
                        role
                      )}`}
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
