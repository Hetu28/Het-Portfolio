# Design Tokens Specification: Het Patel Portfolio

## 1. Color Tokens

```css
:root {
  /* Surface & Backgrounds */
  --bg: #070707;                    /* Primary deep cinematic black */
  --card: #111111;                  /* Glass card surface background */
  --card-hover: #161616;            /* Active card surface */
  
  /* Text & Content */
  --text: #F4F4F4;                  /* 100% white-silver primary text */
  --text-muted: rgba(255, 255, 255, 0.60); /* 60% muted secondary text */
  --text-dim: rgba(255, 255, 255, 0.35);   /* 35% tertiary / tabular numbers */
  
  /* Accent & Illumination */
  --accent: #FF2800;                /* Pure cinematic vermilion red */
  --accent-rgb: 255, 40, 0;
  --glow: rgba(255, 40, 0, 0.35);    /* Intense red diffuse glow */
  --glow-subtle: rgba(255, 40, 0, 0.12); /* Subtle ambient flare */
  
  /* Borders & Dividers */
  --border: rgba(255, 255, 255, 0.08); /* Default card & pill border */
  --border-subtle: rgba(255, 255, 255, 0.04);
  --border-focus: rgba(255, 255, 255, 0.25);
  
  /* Software Accent Tints */
  --tint-premiere: #9999FF;
  --tint-after-effects: #C9A6FF;
  --tint-davinci: #FF7A45;
  --tint-photoshop: #31A8FF;
  --tint-final-draft: #F4F4F4;
}
```

---

## 2. Typography Tokens

```css
/* Font Families */
--font-sans: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif;
--font-serif: 'Instrument Serif', 'Times New Roman', Georgia, serif;

/* Font Sizes & Line Heights */
--text-hero: clamp(3.25rem, 7vw, 6.5rem);       /* 52px - 104px, line-height 0.98 */
--text-section-title: clamp(2.75rem, 6vw, 6.875rem); /* 44px - 110px, line-height 0.95 */
--text-card-title: clamp(1.5rem, 2.5vw, 2.25rem);    /* 24px - 36px, line-height 1.1 */
--text-body: 1rem;                              /* 16px, line-height 1.75 */
--text-body-sm: 0.875rem;                       /* 14px, line-height 1.6 */
--text-badge: 0.625rem;                         /* 10px, letter-spacing 0.3em, uppercase */
```

---

## 3. Spacing & Sizing Tokens

```css
/* Max Container Widths */
--container-hero: 1500px;
--container-main: 1400px;
--container-narrow: 1100px;

/* Border Radii */
--radius-full: 9999px; /* Navigation pills, circular play badges */
--radius-card-lg: 28px; /* Showreel container */
--radius-card-md: 24px; /* Project cards, masonry cards */
--radius-card-sm: 16px; /* Software cards, experience blocks */
--radius-badge: 8px;   /* Small status pills */

/* Elevation & Shadows */
--shadow-glow: 0 0 28px rgba(255, 40, 0, 0.35);
--shadow-glow-lg: 0 40px 120px -40px rgba(255, 40, 0, 0.35);
--shadow-card: 0 30px 60px -30px rgba(0,0,0,0.7), 0 10px 30px -10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04);
--shadow-nav: 0 20px 60px -30px rgba(0,0,0,0.8);
```

---

## 4. Animation & Transition Tokens

```css
/* Transition Curves */
--ease-cinematic: cubic-bezier(0.22, 1, 0.36, 1);
--ease-zoom: cubic-bezier(0.2, 0.7, 0.2, 1);

/* Durations */
--duration-fast: 200ms;
--duration-normal: 400ms;
--duration-smooth: 700ms;
--duration-cinematic: 1400ms;
```
