# Comprehensive Reverse-Engineering Specification: Het Patel Portfolio

**Reference URL**: [https://het-director.preview.emergentagent.com](https://het-director.preview.emergentagent.com)  
**Target Persona**: Senior Frontend Engineer, UI Reverse-Engineer, Interaction Designer, Visual QA Specialist  
**Tech Stack Alignment**: Next.js 14+ (App Router), TypeScript, Tailwind CSS, Framer Motion, Lucide React

---

## 1. Section Sequence and Hierarchy

The reference website is structured as a continuous, high-atmosphere single-page narrative portfolio arranged in the following exact order:

1. **Global Background Atmosphere Layer** (`<Background />`): Fixed viewport elements including:
   - Cinematic grid lines (`.cinematic-grid` with radial opacity mask and scroll-linked vertical translation).
   - Dynamic ambient red/orange radial flares (`.ambient-glow` with mouse/scroll shift).
   - Mouse-tracking spotlight (`.mouse-spotlight` updated via pointer events).
   - Deep cinematic vignette overlay (`.cinematic-vignette`).
   - SVG-based noise film grain (`.film-grain` with 6-step jitter animation).
   - 22 floating glowing ambient particles (`.particle` with randomized positions, delays, and durations).
2. **Fixed Floating Navigation Header** (`<Nav />`):
   - Pill-shaped frosted glass container (`.glass`, `rounded-full`).
   - Brand avatar badge ("H" on vermilion accent `#FF2800`) + monogram "HET PATEL".
   - Desktop anchor navigation links (`Home`, `About`, `Portfolio`, `Showreel`, `Experience`, `Contact`).
   - Call-to-action button: `BOOK A SHOOT` with an animated rotating arrow icon badge.
   - Mobile hamburger menu toggle button triggering a full-width frosted glass modal overlay.
3. **Hero Section** (`<Hero />`, `#home`):
   - Status badge: Pulsing accent dot + `AVAILABLE FOR PROJECTS — 2025`.
   - Numbered role discipline list: `01 FILMMAKER`, `02 DIRECTOR`, `03 CINEMATOGRAPHER`, `04 EDITOR` with tabular numbering.
   - Massive editorial headline: "Creating stories that deserve *to be remembered.*" (*"to be remembered."* rendered in italicized serif `font-serif-editorial` with accent color `#FF2800`).
   - Editorial bio paragraph: "Independent filmmaker based in India...".
   - Interactive CTA group: Vermilion primary button `View Portfolio` + Secondary bordered button `Book a Shoot` with play icon.
   - Stat counters: `6+ Years`, `42 Projects`, `18 Brands` separated by subtle vertical dividers.
   - Interactive Infinite Masonry Right Column (`<InfiniteMasonry />`): Dual continuous vertical columns displaying 12 curated cards with staggered floating animations (`card-float-a`, `card-float-b`, `card-float-c`), subtle 3D tilt interaction, gradient dark overlays, and hover reveal badges.
   - Infinite Horizontal Marquee ticker: Dual-track continuous horizontal scrolling loop showcasing film disciplines separated by glowing vermilion accent dots.
4. **Showreel Section** (`<Showreel />`, `#showreel`):
   - Eyebrow header: Horizontal dash + `SHOWREEL — 2025`.
   - Headline: "Before you know my work, *experience it.*" with dynamic gradient text shimmer (`.gradient-text`).
   - Subtitle: "Press play and enter my world."
   - Ultra-widescreen (21:9 aspect ratio) interactive video showcase with auto-looping ambient preview video (`https://cdn.pixabay.com/video/2020/05/25/40130-424076663_large.mp4`), poster fallback, film grain overlay, pulsing `REEL • 2025` live status, `4K • 24FPS` badge, duration counter `03:52`, and a central glowing crimson play button opening an immersive full-screen modal video player with custom controls.
5. **Featured Work / Portfolio Section** (`<FeaturedWork />`, `#portfolio`):
   - Section header: `FEATURED — SELECTED WORK` with headline "Curated *frames* I'm proud of." and descriptive paragraph.
   - 2-column responsive grid featuring 6 showcase projects:
     1. *A Flower's Tale* (Narrative Short, 15 min, 2024)
     2. *Sting — Ace the Night* (TVC Commercial Brand Ad, 2024)
     3. *Pole 47* (Short Film, 25 min, 2024)
     4. *A Golden Boy* (Documentary Film, Feature, 2023)
     5. *Rajasthan Cinematic* (Travel Feature / DOP, Short Film, 2023)
     6. *Dream Come True* (Conceptual AI Advertisement, Concept, 2024)
   - Each project card features: 16:9 cinematic aspect ratio container, subtle border, smooth hover zoom (1.05x with cubic bezier), overlay gradient, index tag (`01 / 06`), metadata badges, bold title, and an animated hover arrow button with glowing crimson shadow.
   - Interactive Project Lightbox Modal with full backdrop blur, title, role, duration, year, high-res preview, and synopsis details.
6. **About Section** (`<About />`, `#about`):
   - Split layout: Left column features a cinematic vertical portrait card (3:4 ratio) with frosted glass corner badges (`DIRECTOR • DOP`, `MUMBAI • IND`) and ambient warm backglow.
   - Right column: `ABOUT — PORTRAIT OF A FILMMAKER` badge, large statement heading "I chase the quiet frames that feel loud in memory.", narrative philosophy paragraphs, and signature director quote box.
7. **Experience & Filmography Section** (`<Experience />` + `<Filmography />`, `#experience`):
   - Filmography Grid / Tabs: Categorized by roles (`DIRECTOR & WRITER`, `CINEMATOGRAPHER (DOP)`, `EDITOR & COLORIST`) displaying all 16 narrative films, commercials, documentaries, and music videos with duration tags.
   - Additional Experience Cards: Production Assistant credits (`15+ Productions`), Masterclasses & Training, Technical Competencies (Arri Alexa, RED V-Raptor, Sony FX6/FX9, Anamorphic lenses, Gimbal & Steadicam).
8. **Software & Toolkit Section** (`<Software />`):
   - `SOFTWARE — TOOLKIT` badge + headline "The *tools* I trust."
   - 5-column glass card grid for core post-production applications:
     1. Adobe Premiere Pro (`Pr`, `#9999FF` tint)
     2. Adobe After Effects (`Ae`, `#C9A6FF` tint)
     3. DaVinci Resolve (`Dv`, `#FF7A45` tint)
     4. Adobe Photoshop (`Ps`, `#31A8FF` tint)
     5. Final Draft (`Fd`, `#F4F4F4` tint)
   - Each card features custom short badge with colored radial backglow, frosted border hover effect, and subtle vertical float on hover.
9. **Contact & Project Enquiry Section** (`<Contact />`, `#contact`):
   - Eyebrow: `CONTACT — SAY HELLO`.
   - Heading: "Let's make something *unforgettable.*"
   - Left column: Direct contact coordinates (Email: `hetppatel2008@gmail.com`, Phone: `+91 810494XXXX`, Location: `India`), quick copy-to-clipboard button, and social link badges (Instagram, YouTube, LinkedIn).
   - Right column: Interactive project enquiry glass form (Name, Email, Project Type selector pills, Budget Range, Project Details message, and Submit button with success toast notification and loading state).
10. **Footer Section** (`<Footer />`):
    - Massive background monogram typography (`HET PATEL`).
    - Brand badge + navigation link list + back-to-top smooth scroll button.
    - Copyright notice: `© 2026 Het Patel • All rights reserved`.

---

## 2. Layout Specifications

- **Maximum Content Width**: `1500px` for Hero section, `1400px` for Showreel, Portfolio, About, Experience, Software, Contact, and Footer.
- **Margins & Container Paddings**:
  - Desktop (>= 1024px): `px-8` (32px) to `px-12` (48px), section vertical padding `8rem` (128px).
  - Tablet (768px - 1023px): `px-6` (24px) to `px-8` (32px), section vertical padding `5rem` (80px).
  - Mobile (< 768px): `px-5` (20px), section vertical padding `4rem` (64px).
- **Grid Structures**:
  - Hero: 1 column on mobile/tablet, 2-column on desktop with explicit `52fr / 48fr` split.
  - Featured Work: 1 column on mobile, 2 columns on tablet/desktop (`grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-14`).
  - About: 1 column on mobile, 2 columns on desktop (`grid-cols-1 lg:grid-cols-12 gap-12`).
  - Software: 2 columns on mobile (`grid-cols-2`), 5 columns on desktop (`md:grid-cols-5 gap-4 md:gap-5`).
  - Filmography: 1 column on mobile, 3 columns on desktop (`grid-cols-1 md:grid-cols-3 gap-6`).
  - Contact: 1 column on mobile, 2 columns on desktop (`grid-cols-1 lg:grid-cols-12 gap-12`).

---

## 3. Typography and Sizing System

- **Primary Sans-Serif**: `Inter`, ui-sans-serif, system-ui, sans-serif (Weights: 300, 400, 500, 600, 700, 800, 900).
- **Editorial Accent Serif**: `Instrument Serif`, `Times New Roman`, serif (Style: Italic, Weight: 400, Letter spacing: `-0.02em`).
- **Hierarchy Breakdown**:
  - Hero Heading: `52px` (mobile), `68px` (sm), `80px` (md), `92px` (lg), `104px` (xl); line-height `0.98`; tracking `-0.03em`; font-weight `900`.
  - Section Headings: `44px` (mobile), `60px` (sm), `84px` (md), `110px` (lg); line-height `0.95`; tracking `-0.03em`; font-weight `900`.
  - Eyebrows / Badges: `10px` to `11px`; uppercase; letter-spacing `0.28em` to `0.32em`; font-weight `500` / `600`.
  - Body Text: `15px` to `16px`; line-height `1.7` to `1.75`; color `rgba(255, 255, 255, 0.6)`.
  - Marquee Text: `24px` (mobile) to `36px` (desktop); font-weight `900`; tracking `-0.02em`; color `rgba(255, 255, 255, 0.25)`.

---

## 4. Color Palette & Lighting Model

- **Background Pitch Black**: `#070707` (`var(--bg)`).
- **Card Dark Charcoal**: `#111111` / `#0F0F0F` (`var(--card)`).
- **Primary Vermilion Red Accent**: `#FF2800` (`var(--accent)`).
- **Accent Glow**: `rgba(255, 40, 0, 0.35)` (`var(--glow)`).
- **Border Default**: `rgba(255, 255, 255, 0.08)` (`var(--border)`).
- **Border Subtle**: `rgba(255, 255, 255, 0.04)`.
- **Border Hover**: `rgba(255, 255, 255, 0.20)`.
- **Text High Emphasis**: `#F4F4F4` (`var(--text)`).
- **Text Medium Muted**: `rgba(255, 255, 255, 0.60)`.
- **Text Low Emphasis**: `rgba(255, 255, 255, 0.35)`.

---

## 5. Animation, Easing & Physics

- **Custom Bezier**: `cubic-bezier(0.22, 1, 0.36, 1)` (snappy ease-out used across hero reveals, hover states, and card lifts).
- **Image Hover Scale**: `duration-[1400ms] ease-[cubic-bezier(0.2, 0.7, 0.2, 1)] scale-[1.05]`.
- **Horizontal Marquee**: `30s linear infinite` continuous track translate `-50%`.
- **Film Grain Animation**: `1.4s steps(6) infinite` jitter matrix translate.
- **Floating Particles**: `floatParticle` linear infinite ranging from `14s` to `28s` duration.
- **Card Floating Drift**: Staggered vertical hover float (`6s`, `8s`, `7s` sinusoidal bounce).
- **Scroll Reactive Grid & Glow**: Dynamic translation along Y-axis driven by scroll offset.
