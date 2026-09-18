export interface ProjectStill {
  id: string;
  url: string;
  title: string;
  caption?: string;
  lighting?: string;
  aspect?: "wide" | "standard" | "portrait";
}

export interface TechnicalSpecs {
  camera?: string;
  lens?: string;
  aspectRatio?: string;
  colorGrading?: string;
  lightingStyle?: string;
  location?: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  role: string;
  year: string;
  duration: string;
  image: string;
  videoUrl?: string;
  synopsis?: string;
  client?: string;
  deliverables?: string[];
  type?: "video" | "behance" | "gallery";
  stills?: ProjectStill[];
  behanceUrl?: string;
  technicalSpecs?: TechnicalSpecs;
}

export const featuredProjects: Project[] = [
  {
    id: "a-flowers-tale",
    title: "A Flower's Tale",
    category: "Short Film",
    role: "Director",
    year: "2024",
    duration: "20 min",
    image: "/images/a-flowers-tale.jpg",
    videoUrl: "https://youtu.be/ie-sxhsJYOM",
    synopsis: "Amongst the hustle of life, a neglected flower withers away, mirroring the fading love and connection in a relationship; as its petals droop, a realization dawns, prompting a desperate attempt to nurture and revive what was once cherished, before it's too late.",
    deliverables: ["Writer", "Director", "Editor", "Screenplay"],
  },
  {
    id: "sting-ace-the-night",
    title: "Sting - Ace the Night",
    category: "Advertise",
    role: "Director",
    year: "2023",
    duration: "TVC",
    image: "/images/sting-ace-the-night.png",
    videoUrl: "https://youtu.be/Rf2DR8_XDiI",
    synopsis: "When studying late feels like a losing battle, Sting delivers the spark—taking a tired student from barely awake to acing both the exam and the entire night.",
    deliverables: ["Writer", "Director", "Editor"],
  },
  {
    id: "pole-47",
    title: "Pole 47",
    category: "Short Film",
    role: "Director of Photography",
    year: "2026",
    duration: "25 min",
    image: "/images/pole-47.jpg",
    type: "behance",
    synopsis: "An atmospheric psychological drama captured on anamorphic glass, leaning into heavy shadows and intimate close-ups.",
    client: "Cinematography Case Study",
    deliverables: ["Director of Photography", "Camera Operator", "Lighting Design", "Colorist"],
    technicalSpecs: {
      camera: "Sony Cinema Line",
      lens: "Anamorphic & Prime Glass",
      aspectRatio: "2.39:1 CinemaScope",
      colorGrading: "ACES Custom Film Print Grade",
      lightingStyle: "Diffused Natural Daylight & Low-Key Practical",
      location: "Mumbai, India",
    },
    stills: [
      {
        id: "pole-47-01",
        url: "/images/pole-47/pole-47-01.jpg",
        title: "DAY 6 — FOREST OPENING",
        caption: "Opening daylight canopy framing the silent forest terrain.",
        aspect: "wide",
      },
      {
        id: "pole-47-02",
        url: "/images/pole-47/pole-47-02.jpg",
        title: "DAY 6 — CANOPY ILLUMINATION",
        caption: "Soft top-light breaking through branches and dense foliage.",
        aspect: "wide",
      },
      {
        id: "pole-47-03",
        url: "/images/pole-47/pole-47-03.jpg",
        title: "POLE 47 — SHADOW PROFILE",
        caption: "Chiaroscuro character close-up in natural shadow.",
        aspect: "wide",
      },
      {
        id: "pole-47-04",
        url: "/images/pole-47/pole-47-04.jpg",
        title: "DAY 6 — DUSK TWILIGHT",
        caption: "Natural cool-toned dusk ambient highlighting loneliness.",
        aspect: "wide",
      },
      {
        id: "pole-47-05",
        url: "/images/pole-47/pole-47-05.jpg",
        title: "POLE 47 — ANAMORPHIC DEPTH",
        caption: "Widescreen anamorphic composition with shallow focus bokeh.",
        aspect: "wide",
      },
      {
        id: "pole-47-06",
        url: "/images/pole-47/pole-47-06.jpg",
        title: "POLE 47 — LOW ANGLE SILHOUETTE",
        caption: "Low-angle dramatic silhouette against ambient exterior sky.",
        aspect: "wide",
      },
      {
        id: "pole-47-07",
        url: "/images/pole-47/pole-47-07.jpg",
        title: "POLE 47 — NIGHT CORRIDOR STUDY",
        caption: "Subdued tungsten spill revealing deep interior shadows.",
        aspect: "wide",
      },
      {
        id: "pole-47-08",
        url: "/images/pole-47/pole-47-08.jpg",
        title: "DAY 6 — DEEP FOREST TEXTURES",
        caption: "Tactile natural bark and foliage texture capture.",
        aspect: "wide",
      },
      {
        id: "pole-47-09",
        url: "/images/pole-47/pole-47-09.jpg",
        title: "POLE 47 — SATURATED NOCTURNE",
        caption: "Nocturnal color palette playing with vibrant chromatic tones.",
        aspect: "wide",
      },
      {
        id: "pole-47-10",
        url: "/images/pole-47/pole-47-10.jpg",
        title: "POLE 47 — ISOLATED REFLECTION",
        caption: "Quiet character gaze framed through reflective surfaces.",
        aspect: "wide",
      },
      {
        id: "pole-47-11",
        url: "/images/pole-47/pole-47-11.jpg",
        title: "DAY 6 — MORNING SILHOUETTES",
        caption: "Atmospheric early morning edge lighting against dense canopy.",
        aspect: "wide",
      },
      {
        id: "pole-47-12",
        url: "/images/pole-47/pole-47-12.jpg",
        title: "POLE 47 — HIGH CONTRAST INTERIOR",
        caption: "Cinematic negative fill shaping intimate spatial tension.",
        aspect: "wide",
      },
      {
        id: "pole-47-13",
        url: "/images/pole-47/pole-47-13.jpg",
        title: "POLE 47 — THE FINAL FRAME",
        caption: "Widescreen resolution capturing lingering atmospheric stillness.",
        aspect: "wide",
      },
    ],
  },
  {
    id: "a-golden-boy",
    title: "A Golden Boy",
    category: "Documentary",
    role: "Director",
    year: "2024",
    duration: "Feature",
    image: "/images/a-golden-boy.jpg",
    videoUrl: "https://youtu.be/xyckt6YUxBk",
    synopsis:
      "As a golden statue on Juhu Beach, a helpless yet hopeful man uses his unique art to connect with the world, sharing moments of joy amidst his struggles. His ambition to break free from his circumstances inspires not only his life but also the lives of those he touches.",
    deliverables: ["Director", "Lead Interviewer"],
  },
  {
    id: "o-sajna",
    title: "O' Sajna - Music Video",
    category: "Music Video",
    role: "Editor & Colorist",
    year: "2024",
    duration: "4 min",
    image: "/images/o-sajna.png",
    videoUrl: "https://cdn.pixabay.com/video/2020/05/25/40130-424076663_large.mp4",
    synopsis:
      "An evocative music video capturing emotional nuance, rhythm, and visual harmony through intimate frames and dynamic pacing.",
    deliverables: ["Music Video Editing", "Visual Rhythm", "Color Grading"],
  },
  {
    id: "void",
    title: "Void",
    category: "Short Film",
    role: "Director of Photography",
    year: "2026",
    duration: "5 min",
    image: "/images/void/void-03.jpg",
    type: "behance",
    synopsis: "An atmospheric narrative study in isolation and introspection, exploring quiet shadows, reflective silhouettes, and psychological depth.",
    client: "Cinematography Case Study",
    deliverables: ["Director of Photography", "Camera Operator", "Lighting Design", "Colorist"],
    technicalSpecs: {
      camera: "Sony FX30 Cinema Line",
      lens: "Anamorphic & Prime Glass",
      aspectRatio: "2.39:1 CinemaScope",
      colorGrading: "ACES Custom Cool-Slate & Amber Grade",
      lightingStyle: "Diffused Ambient Daylight & Practical Tungsten",
      location: "Mumbai, India",
    },
    stills: [
      {
        id: "void-01",
        url: "/images/void/void-01.jpg",
        title: "STARTER HERO FRAME",
        caption: "Opening silhouette frame balancing interior twilight against window practicals.",
        lighting: "Diffused Window Daylight & Amber Practical",
        aspect: "wide",
      },
      {
        id: "void-02",
        url: "/images/void/void-02.jpg",
        title: "THE MIRROR REFLECTION",
        caption: "Split-plane composition capturing quiet isolation and dual character perspective.",
        lighting: "Tungsten Rim & Subdued Fill",
        aspect: "wide",
      },
      {
        id: "void-03",
        url: "/images/void/void-03.jpg",
        title: "ATMOSPHERIC HORIZON",
        caption: "Cool-toned twilight exterior exploring loneliness across urban textures.",
        lighting: "Natural Dusk Ambient & Cyan Undertones",
        aspect: "wide",
      },
      {
        id: "void-04",
        url: "/images/void/void-04.jpg",
        title: "CHIAROSCURO PROFILE",
        caption: "High-contrast edge lighting accentuating emotional tension and subtle gaze.",
        lighting: "Hard Key Light & Deep Negative Fill",
        aspect: "wide",
      },
      {
        id: "void-05",
        url: "/images/void/void-05.jpg",
        title: "CINEMATIC TEXTURES",
        caption: "Macro focus on tactile details, smoke particles, and warm tungsten warmth.",
        lighting: "Warm Filament Practical",
        aspect: "wide",
      },
      {
        id: "void-06",
        url: "/images/void/void-06.jpg",
        title: "SHADOWS IN THE CORRIDOR",
        caption: "Geometric leading lines emphasizing physical space and psychological detachment.",
        lighting: "Top Overhead Softbox & Linear Practical",
        aspect: "wide",
      },
      {
        id: "void-07",
        url: "/images/void/void-07.jpg",
        title: "QUIET CONTEMPLATION",
        caption: "Close-up portrait study emphasizing natural skin tones against midnight blacks.",
        lighting: "Book-Lit Soft Key & Soft Hair Rim",
        aspect: "wide",
      },
      {
        id: "void-08",
        url: "/images/void/void-08.png",
        title: "THE NEON ENIGMA",
        caption: "Vibrant saturated chromatic contrast highlighting nocturnal mood and solitude.",
        lighting: "RGB LED Tubes & Fluorescent Spill",
        aspect: "wide",
      },
      {
        id: "void-09",
        url: "/images/void/void-09.png",
        title: "THE FINAL FRAME",
        caption: "Widescreen resolution capturing lingering resonance, depth of field, and stillness.",
        lighting: "Subtle Anamorphic Flare & Ambient Glow",
        aspect: "wide",
      },
    ],
  },
];
