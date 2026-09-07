"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { X, ArrowUpRight } from "lucide-react";
import { siteSettings } from "@/data/site";
import { motion, AnimatePresence } from "framer-motion";

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <>
      {/* MOBILE HEADER (Right H Logo Button acting as Menu trigger, nothing on left) */}
      <header className="fixed top-3.5 inset-x-0 z-50 flex items-center justify-end px-4 sm:px-6 md:hidden pointer-events-none">
        {/* Right: Iconic H Menu Button (Slightly larger with premium glass bezel) */}
        <button
          aria-label="Toggle Menu"
          onClick={() => setOpen(!open)}
          className="pointer-events-auto p-1.5 rounded-[18px] border border-white/24 bg-[#0a0a0e]/90 shadow-[0_12px_30px_-5px_rgba(0,0,0,0.9),inset_0_1.5px_1px_rgba(255,255,255,0.45)] transition-all duration-300 active:scale-90 hover:scale-105"
          style={{
            backdropFilter: "blur(28px) saturate(190%)",
            WebkitBackdropFilter: "blur(28px) saturate(190%)",
          }}
        >
          <div
            className="w-10 h-10 rounded-[13px] flex items-center justify-center text-[17px] font-black tracking-tight relative overflow-hidden transition-all duration-300"
            style={{
              background: open
                ? "linear-gradient(135deg, #e53e1b 0%, #cc2000 100%)"
                : "linear-gradient(135deg, #ff4d26 0%, #ff2800 60%, #cc2000 100%)",
              color: "#fff",
              boxShadow:
                "inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.7), inset 0 -1.5px 2px 0 rgba(0, 0, 0, 0.45), 0 0 20px var(--glow)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent h-1/2 pointer-events-none" />
            {open ? <X size={18} strokeWidth={2.6} /> : "H"}
          </div>
        </button>
      </header>

      {/* DESKTOP HEADER (Floating Liquid Glass Pill Bar - Unchanged for Desktop Users) */}
      <header
        className={`fixed top-6 inset-x-0 z-50 hidden md:flex justify-center px-6 pointer-events-none transition-all duration-300 ${
          scrolled ? "translate-y-0" : "translate-y-0"
        }`}
      >
        <div
          ref={navRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="pointer-events-auto flex items-center justify-between p-1.5 rounded-full border border-white/18 transition-all duration-300 relative overflow-hidden group shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8),inset_0_1.5px_1px_rgba(255,255,255,0.45),inset_0_-1px_1px_rgba(0,0,0,0.4)]"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(20, 20, 25, 0.72) 45%, rgba(10, 10, 14, 0.88) 100%)",
            backdropFilter: "blur(32px) saturate(190%) contrast(105%) brightness(108%)",
            WebkitBackdropFilter: "blur(32px) saturate(190%) contrast(105%) brightness(108%)",
          }}
        >
          {/* Top Edge Specular Reflection (Curved Glass Sheen) */}
          <div
            className="absolute inset-x-5 top-0 h-[48%] rounded-t-full pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.05) 55%, transparent 100%)",
            }}
          />

          {/* Interactive Liquid Refraction Spotlight */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-500"
            style={{
              opacity: isHovered ? 0.35 : 0.12,
              background: `radial-gradient(140px circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.3), transparent 70%)`,
            }}
          />

          {/* Brand Avatar / Home Link */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 pl-3 pr-5 py-1 z-10"
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-[13px] font-black tracking-tight relative overflow-hidden transition-transform duration-300 group-hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #ff4d26 0%, #ff2800 60%, #cc2000 100%)",
                color: "#fff",
                boxShadow:
                  "inset 0 1px 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 1.5px 0 rgba(0, 0, 0, 0.4), 0 0 20px var(--glow)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/35 to-transparent h-1/2 pointer-events-none" />
              H
            </div>
            <span className="text-[11px] tracking-[0.28em] text-white/90 font-semibold group-hover:text-white transition-colors">
              HET&nbsp;PATEL
            </span>
          </Link>

          {/* Desktop Nav Links (Liquid Glass Pills) */}
          <nav className="flex items-center gap-1 px-1.5 z-10">
            {siteSettings.nav.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname?.startsWith(item.href));

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-[13px] tracking-wide transition-all duration-200 px-4 py-1.5 rounded-full relative ${
                    isActive
                      ? "text-white font-medium bg-white/[0.12] border border-white/16 shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_2px_8px_rgba(0,0,0,0.3)]"
                      : "text-white/70 hover:text-white hover:bg-white/[0.07] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.18)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA Button (Liquid Vermilion Glass Pill) */}
          <Link
            href="/#contact"
            className="group ml-2 flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-full text-[11px] font-bold tracking-[0.16em] uppercase text-white whitespace-nowrap transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] relative overflow-hidden z-10 shrink-0"
            style={{
              background: "linear-gradient(135deg, #ff451a 0%, #ff2800 65%, #d11e00 100%)",
              boxShadow:
                "inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.55), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.35), 0 6px 20px -2px rgba(255, 40, 0, 0.5), 0 0 16px rgba(255, 40, 0, 0.3)",
            }}
          >
            {/* Top Gloss Curve on CTA */}
            <span
              className="absolute inset-x-2 top-0 h-[48%] rounded-t-full pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.05) 60%, transparent 100%)",
              }}
            />
            <span className="relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] whitespace-nowrap">
              {siteSettings.cta}
            </span>
            <span className="relative z-10 w-6 h-6 rounded-full bg-white text-black flex items-center justify-center transition-transform duration-300 group-hover:rotate-45 shadow-[0_2px_6px_rgba(0,0,0,0.25)] shrink-0">
              <ArrowUpRight size={13} strokeWidth={2.6} />
            </span>
          </Link>
        </div>
      </header>

      {/* Mobile Drawer Menu (Liquid Glass Treatment) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-3.5 top-16 z-40 rounded-3xl p-5 md:hidden flex flex-col gap-2.5 border border-white/18 bg-[#0a0a0e]/95 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.9),inset_0_1.5px_1px_rgba(255,255,255,0.35)]"
            style={{
              backdropFilter: "blur(32px) saturate(190%) contrast(105%)",
              WebkitBackdropFilter: "blur(32px) saturate(190%) contrast(105%)",
            }}
          >
            <div className="flex items-center gap-3 pb-3 mb-1 border-b border-white/10 px-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[13px] font-black text-white"
                style={{
                  background: "linear-gradient(135deg, #ff4d26, #ff2800)",
                  boxShadow: "inset 0 1px 1px rgba(255,255,255,0.5), 0 0 16px var(--glow)",
                }}
              >
                H
              </div>
              <span className="text-[11px] tracking-[0.28em] text-white font-bold">
                HET PATEL
              </span>
            </div>

            {siteSettings.nav.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname?.startsWith(item.href));

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`text-[14px] font-medium tracking-[0.02em] px-4 py-2.5 rounded-2xl transition-all ${
                    isActive
                      ? "text-white bg-white/[0.12] border border-white/16 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]"
                      : "text-white/75 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 py-3 rounded-full text-[12px] font-bold tracking-[0.18em] uppercase text-white shadow-[0_6px_20px_rgba(255,40,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.5)]"
              style={{
                background: "linear-gradient(135deg, #ff451a, #ff2800)",
              }}
            >
              {siteSettings.cta}
              <ArrowUpRight size={14} strokeWidth={2.5} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
