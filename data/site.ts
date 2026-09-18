export interface SiteSettings {
  name: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  cta: string;
  nav: Array<{ label: string; href: string; isExternal?: boolean }>;
  hero: {
    availabilityBadge: string;
    availabilityTags: string[];
    locationSubtitle: string;
    secondaryRoles: string[];
    headlineLine1: string;
    headlineLine2: string;
    headlineLine3Italic: string;
    bio: string;
    stats: Array<{ value: string; label: string }>;
  };
  showreel: {
    videoUrl: string;
    posterUrl: string;
  };
  about: {
    eyebrow: string;
    headingPrefix: string;
    headingItalic: string;
    headingSuffix: string;
    bio1: string;
    bio2: string;
    image: string;
    stats: Array<{ number: number; suffix: string; label: string }>;
  };
  contact: {
    eyebrow: string;
    heading: string;
    subheading: string;
    email: string;
    phone: string;
    location: string;
  };
  socials: {
    instagram?: string;
    youtube?: string;
    linkedin?: string;
    behance?: string;
  };
  footer: {
    name: string;
    tagline: string;
    copyright: string;
    credit: string;
  };
}

export const siteSettings: SiteSettings = {
  name: "Het Patel",
  role: "FILMMAKER",
  tagline: "Director • Cinematographer • Editor • Storyteller",
  location: "Mumbai, India",
  email: "hetucreatives@gmail.com",
  phone: "+91 8104948207",
  cta: "Contact",
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
  ],
  hero: {
    availabilityBadge: "OPEN FOR WORK",
    availabilityTags: ["Freelance", "Full-Time", "Collaborations", "Commercial"],
    locationSubtitle: "Independent filmmaker / Mumbai — INDIA",
    secondaryRoles: ["DIRECTOR", "CINEMATOGRAPHER", "EDITOR", "STORYTELLER"],
    headlineLine1: "why just watch",
    headlineLine2: "when you could",
    headlineLine3Italic: "feel it all?",
    bio: "I’m an independent filmmaker from India. I direct, shoot, and edit with one simple goal: making sure whatever we put on screen stays in your head long after the lights come back up.",
    stats: [
      { value: "4+", label: "Years" },
      { value: "30+", label: "Projects" },
      { value: "3", label: "Brands" },
    ],
  },
  showreel: {
    videoUrl: "https://cdn.pixabay.com/video/2020/05/25/40130-424076663_large.mp4",
    posterUrl: "https://images.unsplash.com/photo-1627133805103-ce2d34ccdd37?crop=entropy&cs=srgb&fm=jpg&q=85&w=2000",
  },
  about: {
    eyebrow: "ABOUT • PORTRAIT OF A FILMMAKER",
    headingPrefix: "I don’t just shoot scenes, I",
    headingItalic: "build stories",
    headingSuffix: "you can step into.",
    bio1: "Hey! I’m Het. When you watch a film, you shouldn’t be thinking about the lights, the cameras, or the software. You should just be completely lost in the world we built. That’s why I direct, shoot, and edit with a 360-degree obsession for the final screen experience.",
    bio2: "Having led sets as a Director, DOP, and Assistant Director, I know that memorable cinema is 10% inspiration and 90% deliberate decisions. From how a shadow falls across an actor’s face to where a cut lands on a heartbeat, I make sure every detail serves the story.",
    image: "https://images.unsplash.com/photo-1534951258346-c31a2e0ff914?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    stats: [
      { number: 4, suffix: "+", label: "Years Experience" },
      { number: 30, suffix: "+", label: "Projects Completed" },
      { number: 3, suffix: "", label: "Brands Worked With" },
      { number: 5, suffix: "+", label: "Films Produced" },
    ],
  },
  contact: {
    eyebrow: "CONTACT • SAY HELLO",
    heading: "Let's make something\nunforgettable.",
    subheading: "Available for select directing, cinematography and editing commissions worldwide.",
    email: "hetucreatives@gmail.com",
    phone: "+91 8104948207",
    location: "Mumbai, India",
  },
  socials: {
    instagram: "https://instagram.com/",
    youtube: "https://youtube.com/@hetucreatives?si=IOtVrETWzDJg_-4Q",
    linkedin: "https://linkedin.com/",
    behance: "https://behance.net/",
  },
  footer: {
    name: "HET PATEL",
    tagline: "Filmmaker • Director • DOP • Editor",
    copyright: "© 2026 Het Patel • All rights reserved",
    credit: "Designed & Developed for Het Patel.",
  },
};
