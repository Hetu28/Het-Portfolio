# Component Architecture & Mapping: Het Patel Portfolio

This document maps every visual section and interactive surface of the reference website to its dedicated, modular React / Next.js component.

| Section / Feature | React Component | Source Path | State & Interactive Responsibilities |
| :--- | :--- | :--- | :--- |
| **Global Background & Ambience** | `<Background />` | `components/portfolio/Background.tsx` | Mouse tracking spotlight coordinates (`--mx`, `--my`), scroll position tracking for grid/glow translation, film grain canvas/SVG, 22 floating particle spans with randomized CSS variables. |
| **Navigation Header** | `<Nav />` | `components/portfolio/Nav.tsx` | Sticky scroll threshold opacity/blur, active section scrollspy highlight, mobile hamburger menu toggle state, mobile modal slide-in, contact modal trigger. |
| **Hero Section** | `<Hero />` | `components/portfolio/Hero.tsx` | Staggered Framer Motion entrance animations, status badge pulse, animated numbered roles, stat counters, interactive CTA triggers. |
| **Infinite Masonry Gallery** | `<InfiniteMasonry />` | `components/portfolio/InfiniteMasonry.tsx` | 2-column continuous vertical scrolling masonry showcase, staggered floating keyframes (`card-float-a/b/c`), card tilt physics on pointer move, image zoom on hover. |
| **Discipline Marquee** | `<Marquee />` *(sub-component)* | Inline in `components/portfolio/Hero.tsx` | Dual-track seamless looping ticker (`30s linear infinite`), pause-on-hover capability, glowing vermilion dividers. |
| **Showreel Showcase** | `<Showreel />` | `components/portfolio/Showreel.tsx` | Auto-playing ambient video teaser with fallback poster, custom play button trigger, full-screen video player modal with HTML5 video controls, esc-key dismiss. |
| **Featured Work Grid** | `<FeaturedWork />` | `components/portfolio/FeaturedWork.tsx` | 6 showcase project cards, 16:9 aspect ratio, smooth image scale on card hover, index tags, metadata tags, interactive Project Detail Lightbox modal. |
| **About / Biography** | `<About />` | `components/portfolio/About.tsx` | Portrait photography card with floating glass pills, quote callout box, Framer Motion entrance whileInView. |
| **Filmography & Credits** | `<Filmography />` | `components/portfolio/Filmography.tsx` | 3-column role-based filmography breakdown (Director/Writer, DOP, Editor/Colorist), numbered film lists with duration and meta tags. |
| **Experience & Credentials** | `<Experience />` | `components/portfolio/Experience.tsx` | Production Assistant film list (15+ productions), Masterclasses & Training list, Technical camera & lighting gear competencies grid. |
| **Software Toolkit** | `<Software />` | `components/portfolio/Software.tsx` | 5 glass cards with custom monogram icons, dynamic color glow matching application branding (Premiere, After Effects, DaVinci, Photoshop, Final Draft). |
| **Contact Section & Enquiry Form**| `<Contact />` | `components/portfolio/Contact.tsx` | Contact info cards with one-click email/phone clipboard copy, interactive project enquiry form with project type pills, input validation, animated submit state, and toast notification. |
| **Footer** | `<Footer />` | `components/portfolio/Footer.tsx` | Giant decorative monogram backdrop, brand mark, quick navigation links, smooth back-to-top button, copyright and credits. |
| **Smooth Scroll Utility** | `<SmoothScroll />` | `components/portfolio/SmoothScroll.tsx` | Lenis / custom smooth wheel scrolling momentum handler for ultra-fluid cinematic scrolling. |

---

## Centralized Data Architecture (`/data`)

All editable text, project metadata, filmography credits, software tools, and contact info are strictly isolated in TypeScript data modules:

- `/data/site.ts`: Global metadata, navigation links, bio details, stats, director coordinates, social URLs.
- `/data/projects.ts`: Featured portfolio projects with title, category, year, duration, image URL, video URL, aspect ratio, and synopsis.
- `/data/experience.ts`: Production assistant credits, masterclasses, camera gear, and technical skills.
- `/data/filmography.ts`: Complete categorized filmography credits grouped by director, DOP, and editor roles.
- `/data/software.ts`: Creative software suite with application name, short monogram, and brand tint color.
