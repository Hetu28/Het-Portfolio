export interface ExploringItem {
  name: string;
  category: string;
  icon: string;
  image?: string;
}

export interface PersonaBadge {
  id: string;
  label: string;
  icon: string;
  gradient: string;
  initialPos: { top: string; left: string; rotate: string };
}

export interface CarouselSlide {
  image: string;
  caption: string;
}

export interface CollaboratorItem {
  id: string;
  name: string;
  role: string;
  year: string;
  logo: string;
  category: string;
  extra?: string;
}

export interface TestimonialSlide {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string;
  rating: number;
}

export interface TestimonialCard {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  initial: string;
}

export interface AboutData {
  heroTag: string;
  title: string;
  manifesto: {
    quote1: string;
    quote2: string;
    creed: string[];
    subtext: string;
  };
  founderSubtitle: {
    prefix: string;
    name: string;
    title: string;
    location: string;
  };
  currentlyReading: {
    badge: string;
    quote: string;
    bookTitle: string;
    author: string;
    coverImage: string;
  };
  exploring: {
    badge: string;
    title: string;
    items: ExploringItem[];
  };
  directorStatement: {
    text: string;
  };
  photoCarousel: CarouselSlide[];
  persona: {
    badge: string;
    title: string;
    subtext: string;
    badges: PersonaBadge[];
  };
  collaborations: {
    tag: string;
    title: string;
    description: string;
    items: CollaboratorItem[];
  };
  testimonials: {
    title: string;
    subtitle: string;
    featured: TestimonialSlide[];
    grid: TestimonialCard[];
  };
  ctaMarquee: {
    line1: string[];
    line2: string[];
    buttonText: string;
    buttonHref: string;
  };
}

export const aboutData: AboutData = {
  heroTag: "ABOUT THE FILMMAKER",
  title: "BEYOND THE FRAME",
  manifesto: {
    quote1: "Everything you see in the frame is intentional — nothing is random.",
    quote2: "There’s nothing right or wrong; it’s just how you think about it.",
    creed: [
      "Light with intention.",
      "Frame with purpose.",
      "Move like you mean it.",
    ],
    subtext:
      "Every shadow, camera movement, and sound cue serves the emotional core of the narrative. I keep an obsessive eye for the subtle, minor details no one would ever consciously notice, but that make the entire frame unforgettable.",
  },
  founderSubtitle: {
    prefix: "Director • DOP • Editor",
    name: "Het",
    title: "Patel",
    location: "Mumbai, India",
  },
  currentlyReading: {
    badge: "✦ Visual Philosophy",
    quote:
      "“Everything you see in the frame is intentional — nothing is random. There’s nothing right or wrong; it’s just how you think about it. Cinema lives in the quiet choices made behind the lens.”",
    bookTitle: "In the Blink of an Eye",
    author: "Walter Murch & Roger Deakins",
    coverImage:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
  },
  exploring: {
    badge: "✦ Core Disciplines",
    title: "Direction, Optics & Post Architecture",
    items: [
      {
        name: "Directing & AD",
        category: "Blocking & Actor Nuance",
        icon: "clapperboard",
      },
      {
        name: "Cinematography",
        category: "Lighting & Framing",
        icon: "camera",
      },
      {
        name: "Post-Production",
        category: "Pacing, Montage & Sound",
        icon: "film",
      },
      {
        name: "Graphic Design",
        category: "Pitch Decks & Treatments",
        icon: "palette",
      },
      {
        name: "DaVinci Studio",
        category: "Color Science & Look Dev",
        icon: "sun",
      },
      {
        name: "Production Mgmt",
        category: "Set Logistics & Budgeting",
        icon: "layers",
      },
    ],
  },
  directorStatement: {
    text:
      "I am Het Patel, an independent filmmaker working across direction, cinematography, editing, and graphic design based in Mumbai, India. With hands-on experience spanning narrative films, commercials, documentaries, and music videos — including roles as Assistant Director and Production Manager — I bring end-to-end craft to every set. From shaping light and blocking to sculpting time in post, I obsess over the minor details that make the entire story unforgettable.",
  },
  photoCarousel: [
    {
      image: "/images/a-flowers-tale.jpg",
      caption: "A Flower's Tale (2024) — Narrative Short",
    },
    {
      image: "/images/sting-ace-the-night.jpg",
      caption: "Sting: Ace the Night (2023) — Brand Commercial",
    },
    {
      image: "/images/a-golden-boy.jpg",
      caption: "A Golden Boy (2024) — Documentary",
    },
    {
      image: "/images/rajasthan-cinematic.jpg",
      caption: "Rajasthan Cinematics (2025) — Visual Short",
    },
    {
      image: "/images/void.jpg",
      caption: "Void (2026) — Cinematographer (DOP)",
    },
  ],
  persona: {
    badge: "✦ Filmmaker DNA",
    title: "Guiding Principles",
    subtext: "The core mantras that govern every camera movement, lighting decision, and cut.",
    badges: [
      {
        id: "intentional",
        label: "🎬 Everything in Frame is Intentional",
        icon: "target",
        gradient: "linear-gradient(135deg, #FF2800, #FF6B00)",
        initialPos: { top: "4%", left: "4%", rotate: "-6deg" },
      },
      {
        id: "light-intent",
        label: "💡 Light with Intention",
        icon: "sun",
        gradient: "linear-gradient(135deg, #FF4500, #E60045)",
        initialPos: { top: "24%", left: "25%", rotate: "6deg" },
      },
      {
        id: "frame-purpose",
        label: "📐 Frame with Purpose",
        icon: "camera",
        gradient: "linear-gradient(135deg, #D97706, #DC2626)",
        initialPos: { top: "48%", left: "4%", rotate: "-4deg" },
      },
      {
        id: "move-mean",
        label: "⚡ Move Like You Mean It",
        icon: "activity",
        gradient: "linear-gradient(135deg, #2563EB, #7C3AED)",
        initialPos: { top: "68%", left: "30%", rotate: "5deg" },
      },
      {
        id: "eye-details",
        label: "🔍 Eye for Minor Details",
        icon: "moon",
        gradient: "linear-gradient(135deg, #4F46E5, #9333EA)",
        initialPos: { top: "86%", left: "6%", rotate: "-3deg" },
      },
    ],
  },
  collaborations: {
    tag: "BRANDS & FILMS",
    title: "Brands & Films I've Collaborated With",
    description:
      "Collaborating across narrative sets, commercial campaigns, and freelance creative projects in Mumbai and nationwide.",
    items: [
      {
        id: "crafting-gifts",
        name: "Crafting Gifts",
        role: "Script Writer • Director • Cinematographer • Editor",
        year: "2024",
        category: "Commercial Brand Reels",
        logo: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=200&q=80",
      },
      {
        id: "label-fiora",
        name: "Label Fiora",
        role: "Director • Cinematographer • Editor",
        year: "2024",
        category: "Fashion Brand Campaign",
        logo: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=200&q=80",
      },
      {
        id: "sculpther",
        name: "SculptHer",
        role: "Director • Cinematographer • Editor",
        year: "2024",
        category: "Commercial Brand Film",
        logo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      },
      {
        id: "three-mothers",
        name: "Three Mothers",
        extra: "Bolti Khidkiyaan : Short Film Festival",
        role: "Short Film • Assistant Director",
        year: "2025",
        category: "Narrative Short",
        logo: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=200&q=80",
      },
      {
        id: "baap-re-baap",
        name: "Baap Re Baap",
        extra: "NSFF Mumbai - 2026",
        role: "Short Film • Assistant Director",
        year: "2025",
        category: "Narrative Short",
        logo: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=200&q=80",
      },
      {
        id: "ujaad",
        name: "Ujaad",
        role: "Short Film • Assistant Director & Creative Producer",
        year: "2025",
        category: "Narrative Short",
        logo: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=200&q=80",
      },
      {
        id: "void-prod",
        name: "Void",
        role: "Short Film • Cinematographer (DOP)",
        year: "2026",
        category: "Narrative Short",
        logo: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=200&q=80",
      },
      {
        id: "pole-47",
        name: "Pole 47",
        role: "25 Min Short Film • Cinematographer (DOP)",
        year: "2026",
        category: "Narrative Short",
        logo: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=200&q=80",
      },
    ],
  },
  testimonials: {
    title: "Testimonials.",
    subtitle: "Endorsements from producers, directors & creative partners",
    featured: [
      {
        id: "1",
        quote:
          "Het directed and edited our fashion and commercial reels with incredible rhythm and razor-sharp attention to detail. His visual sensibilities and disciplined frame composition elevated our entire campaign aesthetic.",
        author: "Label Fiora",
        role: "Fashion Brand",
        company: "Commercial Client",
        image: "/images/label-fiora.png",
        rating: 5,
      },
      {
        id: "2",
        quote:
          "Working with Het was an absolute game-changer. His eye for lighting and cinematic blocking elevated our commercial far beyond our expectations. Everything in his frame is intentional.",
        author: "Sagar Gupta",
        role: "Founder & Creative Lead",
        company: "Brand Media Lab",
        image:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
        rating: 5,
      },
      {
        id: "3",
        quote:
          "Het's visual instincts are extraordinary. From pre-production mood boards to the final grade, he brought a disciplined aesthetic and calm on set under tight schedules.",
        author: "Abhay Sharma",
        role: "Executive Producer",
        company: "Cinema Collective",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80",
        rating: 5,
      },
    ],
    grid: [
      {
        id: "g1",
        quote:
          "“Flawless visual execution. Het captured the exact moody, cinematic atmosphere we envisioned for our commercial.”",
        author: "Abhishek Verma",
        role: "Creative Director",
        company: "Crafting Gifts",
        rating: 5,
        initial: "A",
      },
      {
        id: "g2",
        quote:
          "“Creative, reliable, and deeply passionate about the filmmaking craft. Every frame looks like a cinema poster.”",
        author: "Rohan Kulkarni",
        role: "Producer",
        company: "SculptHer Media",
        rating: 5,
        initial: "R",
      },
      {
        id: "g3",
        quote:
          "“From camera choreography to the final color grade, Het delivered a visual standard that exceeded all expectations.”",
        author: "Muskan Mehta",
        role: "Producer",
        company: "Narrative Films",
        rating: 5,
        initial: "M",
      },
    ],
  },
  ctaMarquee: {
    line1: [
      "EVERYTHING IN THE FRAME IS INTENTIONAL",
      "LIGHT WITH INTENTION • FRAME WITH PURPOSE",
      "MOVE LIKE YOU MEAN IT",
      "NOTHING IS RANDOM",
    ],
    line2: [
      "DIRECTING",
      "CINEMATOGRAPHY (DOP)",
      "EDITING & COLOR",
      "GRAPHIC DESIGN & TREATMENTS",
      "MUMBAI — INDIA",
    ],
    buttonText: "Let’s Collaborate",
    buttonHref: "/#contact",
  },
};
