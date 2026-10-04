"use client";

import React, { useMemo, useEffect, useState } from "react";

export default function Background() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Exact matching subtle dust mote particle configuration from live reference
  const particles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      bottom: -Math.random() * 15,
      delay: Math.random() * 12,
      duration: 16 + Math.random() * 16,
      opacity: 0.15 + Math.random() * 0.35,
      size: 1 + Math.random() * 1.8,
    }));
  }, []);

  useEffect(() => {
    let mx = 50, my = 50;
    const root = document.documentElement;

    const onMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth) * 100;
      my = (e.clientY / window.innerHeight) * 100;
      root.style.setProperty("--mx", `${mx}%`);
      root.style.setProperty("--my", `${my}%`);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Static Crisp Blueprint Grid */}
      <div className="cinematic-grid" />

      {/* Atmospheric Ambient Glow */}
      <div className="ambient-glow" />

      {/* Mouse Spotlight */}
      <div className="mouse-spotlight" />

      {/* Edge Vignette */}
      <div className="cinematic-vignette" />

      {/* Film Grain Texture */}
      <div className="film-grain" />

      {/* Ultra-subtle floating dust particles */}
      {mounted && (
        <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden">
          {particles.map((p) => (
            <div
              key={p.id}
              className="particle"
              style={{
                left: `${p.left}%`,
                bottom: `${p.bottom}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
                opacity: p.opacity,
                background: "rgba(255, 255, 255, 0.4)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
