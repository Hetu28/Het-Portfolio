"use client";

import React from "react";

const items = [
  "DIRECTION",
  "CINEMATOGRAPHY",
  "EDITING",
  "COLOR GRADING",
  "DOCUMENTARIES",
  "COMMERCIALS",
  "MUSIC VIDEOS",
  "NARRATIVE",
];

export default function MarqueeBanner() {
  const quadrupled = [...items, ...items, ...items, ...items];

  return (
    <section className="relative z-10 w-full overflow-hidden select-none py-14 md:py-20 my-0 pointer-events-none">
      <div className="marquee-track flex items-center whitespace-nowrap">
        {quadrupled.map((item, idx) => (
          <div
            key={`${item}-${idx}`}
            className="flex items-center gap-8 md:gap-14 mx-4 md:mx-8 shrink-0"
          >
            <span
              className="text-[22px] sm:text-[28px] md:text-[34px] lg:text-[38px] font-black tracking-[0.14em] uppercase select-none transition-colors duration-300"
              style={{ color: "#4e4e55" }}
            >
              {item}
            </span>
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{
                background: "var(--accent)",
                boxShadow: "0 0 12px var(--glow)",
              }}
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
