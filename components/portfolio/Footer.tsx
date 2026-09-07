"use client";

import React from "react";
import { Instagram, Youtube, Linkedin } from "lucide-react";
import { BehanceIcon } from "@/components/icons/BehanceIcon";
import { siteSettings } from "@/data/site";

export default function Footer() {
  const { footer, socials } = siteSettings;

  return (
    <footer className="relative z-10 pt-24 pb-12">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">
        {/* Large Monogram Headline */}
        <div className="text-[16vw] md:text-[13vw] leading-[0.85] font-black tracking-[-0.04em] text-white/90 select-none">
          HET <span className="font-serif-editorial" style={{ color: "var(--accent)" }}>PATEL</span>
        </div>

        {/* Row 1: Brand & Nav Links */}
        <div className="mt-12 border-t border-white/[0.08] pt-8 flex flex-col md:flex-row gap-8 md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-7 h-7 rounded-md grid place-items-center text-[13px] font-black"
              style={{ background: "var(--accent)", color: "#fff" }}
            >
              H
            </div>
            <div>
              <div className="text-[11px] tracking-[0.28em] font-semibold text-white uppercase">{footer.name}</div>
              <div className="text-[11px] text-white/40 mt-0.5">{footer.tagline}</div>
            </div>
          </div>

          <nav className="flex flex-wrap gap-6">
            {siteSettings.nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[12px] tracking-[0.14em] uppercase text-white/60 hover:text-white transition font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {socials.instagram && (
              <a
                href={socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 grid place-items-center hover:border-[var(--accent)] hover:bg-[var(--accent)] transition hover:scale-105"
                aria-label="Instagram"
              >
                <Instagram size={14} />
              </a>
            )}
            {socials.youtube && (
              <a
                href={socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 grid place-items-center hover:border-[var(--accent)] hover:bg-[var(--accent)] transition hover:scale-105"
                aria-label="YouTube"
              >
                <Youtube size={14} />
              </a>
            )}
            {socials.linkedin && (
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 grid place-items-center hover:border-[var(--accent)] hover:bg-[var(--accent)] transition hover:scale-105"
                aria-label="LinkedIn"
              >
                <Linkedin size={14} />
              </a>
            )}
            {socials.behance && (
              <a
                href={socials.behance}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 grid place-items-center hover:border-[var(--accent)] hover:bg-[var(--accent)] transition hover:scale-105"
                aria-label="Behance"
              >
                <BehanceIcon size={15} />
              </a>
            )}
          </div>
        </div>

        {/* Row 2: Copyright */}
        <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-[11px] tracking-[0.22em] text-white/35 uppercase">
          <div>{footer.copyright}</div>
          <div className="font-serif-editorial italic tracking-normal text-white/50">
            {footer.credit}
          </div>
        </div>
      </div>
    </footer>
  );
}
