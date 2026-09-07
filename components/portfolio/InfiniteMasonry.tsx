"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export interface MasonryItem {
  id: string;
  title: string;
  category?: string;
  year?: string;
  description?: string;
  tags?: string[];
  height: number;
  image: string;
  fullImage: string;
  objectPosition?: string;
  href?: string;
  isPortrait?: boolean;
}

const col1Items: MasonryItem[] = [
  {
    id: "set-direction",
    title: "SET DIRECTION",
    category: "PRODUCTION DESIGN • CINEMATOGRAPHY",
    year: "2024",
    description: "Atmospheric indie production set featuring vintage armchair styling, blue neon tube practicals, ambient fairy lights, glassware, and bespoke art direction.",
    tags: ["PRODUCTION DESIGN", "ART DIRECTION", "LIGHTING SETUP", "SET STYLING"],
    height: 260,
    image: "/images/masonry-set-design.jpg",
    fullImage: "/images/source/source-set-design.jpg",
  },
  {
    id: "portrait-study",
    title: "MORE ABOUT ME",
    category: "ABOUT HET PATEL • BIOGRAPHY",
    year: "2024",
    description: "Het Patel — Filmmaker, Cinematographer & Director based in Mumbai. Explore the full story, craft philosophy, and camera journey.",
    tags: ["DIRECTOR", "CINEMATOGRAPHER", "ABOUT ME", "BIOGRAPHY"],
    height: 420,
    image: "/images/het-portrait.jpg",
    fullImage: "/images/source/source-portrait.jpg",
    objectPosition: "center 26%",
    href: "/about",
    isPortrait: true,
  },
  {
    id: "edit-suite",
    title: "EDITORIAL TIMELINE",
    category: "POST-PRODUCTION • EDITING",
    year: "2024",
    description: "Multi-track timeline workflow in Adobe Premiere Pro detailing synchronous audio stems, color correction adjustment layers, and narrative pacing cuts.",
    tags: ["POST-PRODUCTION", "PREMIERE PRO", "OFFLINE EDIT", "TIMELINE"],
    height: 280,
    image: "/images/edit-suite.png",
    fullImage: "/images/source/source-edit-suite.png",
  },
  {
    id: "golden-silhouette",
    title: "GOLDEN SILHOUETTE",
    category: "CINEMATOGRAPHY • NATURAL LIGHT",
    year: "2024",
    description: "Golden hour sunset backlighting through a dense tree canopy silhouette with rich warm amber rim highlights and organic texture.",
    tags: ["CINEMATOGRAPHY", "NATURAL LIGHT", "GOLDEN HOUR", "SILHOUETTE"],
    height: 320,
    image: "/images/masonry-sunset-silhouette.jpg",
    fullImage: "/images/source/source-sunset-silhouette.jpg",
  },
  {
    id: "sinister-study",
    title: "THE OBSERVER",
    category: "PSYCHOLOGICAL THRILLER • LOW-KEY",
    year: "2024",
    description: "An unsettling psychological character frame emerging from pitch darkness, sculpted with intense amber rim lighting and high-contrast tension.",
    tags: ["PSYCHOLOGICAL THRILLER", "CHARACTER STUDY", "RIM LIGHTING", "SHADOW PLAY"],
    height: 380,
    image: "/images/masonry-sinister-study.jpg",
    fullImage: "/images/source/source-sinister-study.jpg",
    objectPosition: "center center",
    isPortrait: true,
  },
];

const col2Items: MasonryItem[] = [
  {
    id: "capturing-raw",
    title: "CAPTURING RAW",
    category: "TRAVEL CINEMA • ARCHITECTURE",
    year: "2024",
    description: "Panoramic golden sunset over sacred architectural palace waters with morning mist, soft light diffusion, and reflective symmetry.",
    tags: ["RAW CAPTURE", "ARCHITECTURE", "SUNSET", "TRAVEL CINEMA"],
    height: 290,
    image: "/images/masonry-raw-capture.jpg",
    fullImage: "/images/source/source-raw-capture.jpg",
    objectPosition: "center center",
  },
  {
    id: "fashion-editorial",
    title: "FASHION EDITORIAL",
    category: "STUDIO EDITORIAL • SONY FX30",
    year: "2024",
    description: "High-end studio fashion lookbook session capturing garment texture, floral daisy sequin embroidery, and dynamic editorial posing on Sony FX30.",
    tags: ["STUDIO LOOKBOOK", "SONY FX30", "FASHION", "LIGHTING"],
    height: 400,
    image: "/images/masonry-fx30.jpg",
    fullImage: "/images/source/source-fx30.jpg",
    objectPosition: "center 4%",
    isPortrait: true,
  },
  {
    id: "character-study",
    title: "CHARACTER STUDY",
    category: "NARRATIVE SHORT • DIRECTION",
    year: "2024",
    description: "Anamorphic widescreen composition exploring corporate desk isolation, focused headset key lighting, and shallow depth character framing.",
    tags: ["DIRECTOR FRAME", "NARRATIVE", "LIGHTING", "COLOR GRADING"],
    height: 320,
    image: "/images/masonry-office-frame.jpg",
    fullImage: "/images/source/source-office-frame.jpg",
  },
  {
    id: "practical-lighting",
    title: "PRACTICAL LIGHTING",
    category: "LIGHTING DESIGN • PRACTICALS",
    year: "2024",
    description: "Atmospheric candlelight study exploring warm candle glow, crystal glassware refraction, and circular bokeh falloff.",
    tags: ["PRACTICALS", "BOKEH", "LIGHTING DESIGN", "MACRO STUDY"],
    height: 280,
    image: "/images/masonry-wine-glasses.jpg",
    fullImage: "/images/source/source-wine-glasses.jpg",
  },
  {
    id: "candid-frame",
    title: "CANDID FRAME",
    category: "CINEMATOGRAPHY • CANDID",
    year: "2024",
    description: "Observational candid composition capturing quiet conversation on a park bench under natural daylight and palm trees.",
    tags: ["CANDID", "NATURAL LIGHT", "STREET STUDY", "CINEMATOGRAPHY"],
    height: 370,
    image: "/images/masonry-bench-conversation.jpg",
    fullImage: "/images/source/source-bench-conversation.jpg",
  },
];

function MasonryCard({
  item,
  onOpen,
}: {
  item: MasonryItem;
  onOpen: (item: MasonryItem) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleAction = (e: React.MouseEvent) => {
    if (item.href) {
      router.push(item.href);
    } else {
      onOpen(item);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = (e.clientX - cx) / (r.width / 2);
    const dy = (e.clientY - cy) / (r.height / 2);
    const rotY = dx * 4;
    const rotX = -dy * 4;
    const tx = dx * 2;
    const ty = dy * 2;

    el.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translate3d(${tx}px, ${ty}px, 0)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)";
  };

  return (
    <div
      className="w-full flex-shrink-0 pb-6"
      style={{ height: `${item.height + 24}px` }}
    >
      <div
        ref={ref}
        onClick={handleAction}
        className="masonry-card group w-full h-full cursor-pointer relative select-none"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out filter brightness-[1.08] contrast-[1.03]"
          style={{ objectPosition: item.objectPosition || "center center" }}
        />

        {/* Subtle Dark Gradient at Bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

        {/* Bottom Label and Hover-Only Shortcut Arrow Button */}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 flex items-center justify-between pointer-events-none">
          <span className="text-[11px] md:text-[12px] tracking-[0.24em] uppercase text-white/95 font-semibold drop-shadow-md">
            {item.title}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleAction(e);
            }}
            aria-label={item.href ? `Navigate to ${item.title}` : `Open full source image for ${item.title}`}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full grid place-items-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-auto transform translate-y-1 group-hover:translate-y-0 cursor-pointer hover:scale-110"
            style={{
              background: "var(--accent)",
              boxShadow: "0 0 16px var(--glow)",
            }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
              <path
                d="M7 17L17 7M9 7h8v8"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function InfiniteMasonry() {
  const [selectedItem, setSelectedItem] = useState<MasonryItem | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle modal escape key and lock background scrolling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedItem(null);
      }
    };
    if (selectedItem) {
      document.documentElement.classList.add("modal-open");
      document.body.classList.add("modal-open");
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.documentElement.classList.remove("modal-open");
      document.body.classList.remove("modal-open");
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.classList.remove("modal-open");
      document.body.classList.remove("modal-open");
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedItem]);

  const fullCol1 = [...col1Items, ...col1Items];
  const fullCol2 = [...col2Items, ...col2Items];

  return (
    <>
      <div
        className="masonry-container relative w-full h-[640px] sm:h-[720px] md:h-[800px] lg:h-[860px] xl:h-[900px] overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)",
        }}
      >
        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:gap-6 h-full">
          {/* Column 1 */}
          <div className="masonry-col">
            <div className="masonry-track-col1 !gap-0">
              {fullCol1.map((item, i) => (
                <MasonryCard
                  key={`col1-${i}-${item.title}`}
                  item={item}
                  onOpen={(it) => setSelectedItem(it)}
                />
              ))}
            </div>
          </div>

          {/* Column 2 */}
          <div className="masonry-col">
            <div className="masonry-track-col2 !gap-0">
              {fullCol2.map((item, i) => (
                <MasonryCard
                  key={`col2-${i}-${item.title}`}
                  item={item}
                  onOpen={(it) => setSelectedItem(it)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Source Quality Lightbox Modal Portalled to document.body for Unobstructed Stacking */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {selectedItem && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-[999999] bg-black/80 backdrop-blur-xl md:backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 md:p-8 overscroll-contain"
                onClick={() => setSelectedItem(null)}
              >
                <motion.div
                  initial={{ scale: 0.94, opacity: 0, y: 16 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.94, opacity: 0, y: 16 }}
                  transition={{ type: "spring", damping: 26, stiffness: 320 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-5xl lg:max-w-6xl xl:max-w-[1220px] bg-[#0c0c0e]/95 backdrop-blur-2xl rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 p-5 sm:p-7 md:p-9 flex flex-col gap-5 max-h-[94vh] overflow-y-auto overscroll-contain shadow-[0_35px_120px_rgba(0,0,0,0.95)]"
                >
                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={() => setSelectedItem(null)}
                    className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/70 border border-white/20 grid place-items-center text-white/90 hover:text-white hover:bg-white/15 transition-all shadow-lg cursor-pointer"
                    aria-label="Close"
                  >
                    <X size={17} />
                  </button>

                  {/* Adaptive Full Image Container (Never Cropped) */}
                  {selectedItem.isPortrait ? (
                    /* Portrait Image: Ambient Blurred Backdrop with Tall Viewport */
                    <div className="relative w-full h-[56vh] sm:h-[62vh] md:h-[66vh] rounded-xl overflow-hidden border border-white/10 bg-black flex items-center justify-center">
                      <img
                        src={selectedItem.fullImage}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover blur-2xl md:blur-3xl scale-125 opacity-55 brightness-75 select-none pointer-events-none transform -z-0"
                      />
                      <div className="absolute inset-0 bg-black/20 pointer-events-none z-[1]" />
                      <img
                        src={selectedItem.fullImage}
                        alt={selectedItem.title}
                        className="relative z-10 w-full h-full object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.85)]"
                      />
                    </div>
                  ) : (
                    /* Landscape Image: Container Adapts Naturally to Exact Image Aspect Ratio (Zero Cropping) */
                    <div className="relative w-full rounded-xl overflow-hidden border border-white/10 bg-black flex items-center justify-center">
                      <img
                        src={selectedItem.fullImage}
                        alt={selectedItem.title}
                        className="w-full h-auto max-h-[70vh] object-contain block"
                      />
                    </div>
                  )}

                  {/* Information Section */}
                  <div className="pt-1">
                    {selectedItem.category && (
                      <div className="text-[11px] tracking-[0.24em] uppercase text-white/60 font-semibold mb-1">
                        {selectedItem.category} {selectedItem.year && `• ${selectedItem.year}`}
                      </div>
                    )}
                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                      {selectedItem.title}
                    </h3>
                    {selectedItem.description && (
                      <p className="text-white/75 text-[14px] sm:text-[15px] leading-relaxed mb-4">
                        {selectedItem.description}
                      </p>
                    )}

                    {/* Badges / Deliverables */}
                    {selectedItem.tags && selectedItem.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                        {selectedItem.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] tracking-[0.16em] uppercase px-3.5 py-1 rounded-full bg-white/[0.05] text-white/85 border border-white/10 font-semibold"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
