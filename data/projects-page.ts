export interface ProjectPageItem {
  id: string;
  title: string;
  category: string;
  categories: string[];
  role: string;
  year: string;
  duration: string;
  image: string;
  videoUrl: string;
  synopsis: string;
  client?: string;
  deliverables: string[];
}

export interface CategoryFilter {
  id: string;
  label: string;
}

export const projectCategories: CategoryFilter[] = [
  { id: "all", label: "All Projects" },
  { id: "narrative", label: "Narrative Shorts" },
  { id: "commercial", label: "Commercials & TVCs" },
  { id: "documentary", label: "Documentaries" },
  { id: "music-video", label: "Music Videos" },
  { id: "cinematography", label: "Cinematography (DOP)" },
];

export const allProjectsList: ProjectPageItem[] = [
  {
    id: "a-flowers-tale",
    title: "A Flower's Tale",
    category: "Narrative Short",
    categories: ["narrative", "cinematography", "color"],
    role: "Director & Writer",
    year: "2024",
    duration: "20 min",
    image:
      "/images/a-flowers-tale.jpg",
    videoUrl: "/films/A Flower\'s Tale.mp4",
    synopsis:
      "Amongst the hustle of life, a neglected flower withers away, mirroring the fading love and connection in a relationship; as its petals droop, a realization dawns, prompting a desperate attempt to nurture and revive what was once cherished, before it's too late.",
    client: "Indie Film Festival Selection",
    deliverables: ["Writer", "Director", "Editor", "Screenplay"],
  },
  {
    id: "sting-ace-the-night",
    title: "Sting — Ace the Night",
    category: "Commercial TVC",
    categories: ["commercial", "color"],
    role: "Director & DOP",
    year: "2023",
    duration: "60 sec",
    image:
      "/images/sting-ace-the-night.jpg",
    videoUrl: "/films/Sting- Ace the night.mp4",
    synopsis:
      "High-octane commercial campaign capturing raw street energy, kinetic editing, and neon-lit Mumbai nightscapes.",
    client: "Sting Energy Drink",
    deliverables: ["Writer", "Director", "Editor"],
  },
  {
    id: "nothings-changed",
    title: "Nothing's Changed",
    category: "Narrative Short",
    categories: ["narrative", "color"],
    role: "Director",
    year: "2023",
    duration: "7 min",
    image:
      "/images/nothings-changed.jpg",
    videoUrl: "/films/Nothing\'s Changed.mp4",
    synopsis:
      "After a bitter breakup, Abhi's quest for revenge leads him down a dangerous path of mistaken identity and vengeful threats.",
    client: "FTII Student Showcase",
    deliverables: ["Director", "Writer", "Editor"],
  },
  {
    id: "a-golden-boy",
    title: "A Golden Boy",
    category: "Documentary Film",
    categories: ["documentary", "narrative"],
    role: "Director & Lead Interviewer",
    year: "2024",
    duration: "42 min",
    image:
      "/images/a-golden-boy.jpg",
    videoUrl: "/films/A golden Boy.mp4",
    synopsis:
      "As a golden statue on Juhu Beach, a helpless yet hopeful man uses his unique art to connect with the world, sharing moments of joy amidst his struggles. His ambition to break free from his circumstances inspires not only his life but also the lives of those he touches.",
    client: "National Geographic Youth Grant",
    deliverables: ["Director", "Lead Interviewer"],
  },
  {
    id: "void",
    title: "Void",
    category: "Cinematography (DOP)",
    categories: ["cinematography", "narrative", "color"],
    role: "Director of Photography",
    year: "2026",
    duration: "5 min",
    image:
      "/images/void.jpg",
    videoUrl: "/films/void.mp4",
    synopsis:
      "An atmospheric narrative study in isolation and introspection, exploring quiet shadows and psychological depth.",
    client: "Indie Short Film",
    deliverables: ["Director of Photography", "Camera Operator", "Lighting Design"],
  },
  {
    id: "rajasthan-cinematic",
    title: "Rajasthan Cinematics",
    category: "Documentary / Travel",
    categories: ["documentary", "cinematography", "color"],
    role: "Cinematographer & Colorist",
    year: "2025",
    duration: "18 min",
    image:
      "/images/rajasthan-cinematic.jpg",
    videoUrl: "https://cdn.pixabay.com/video/2020/05/25/40130-424076663_large.mp4",
    synopsis:
      "A visual ode to desert landscapes, ancient fortresses, and golden hour tones of Western Rajasthan.",
    client: "Rajasthan Tourism Campaign",
    deliverables: ["Cinematography", "Drone Pilot", "ACES Color Grading"],
  },
  {
    id: "pole-47",
    title: "Pole 47",
    category: "Cinematography Showcase",
    categories: ["cinematography", "narrative", "color"],
    role: "Director of Photography",
    year: "2026",
    duration: "25 min",
    image:
      "/images/pole-47.jpg",
    videoUrl: "https://cdn.pixabay.com/video/2020/05/25/40130-424076663_large.mp4",
    synopsis:
      "An atmospheric psychological drama captured on anamorphic glass, leaning into heavy shadows and intimate close-ups.",
    client: "Red Dust Productions",
    deliverables: ["Director of Photography", "Camera Operator", "Lighting Design"],
  },
  {
    id: "monsoon-diary",
    title: "Monsoon Diary",
    category: "Docuseries",
    categories: ["documentary", "cinematography"],
    role: "Lead Cinematographer",
    year: "2022",
    duration: "3 Episodes",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    videoUrl: "https://cdn.pixabay.com/video/2020/05/25/40130-424076663_large.mp4",
    synopsis:
      "Capturing the torrential beauty and human life along India's coastal belt during the peak monsoon season.",
    client: "Coastal Documentaries Guild",
    deliverables: ["Lead Cinematography", "Audio Field Recording", "DOP"],
  },
  {
    id: "echoes-of-silence",
    title: "Echoes of Silence",
    category: "Music Video",
    categories: ["music-video", "color", "cinematography"],
    role: "Director & Editor",
    year: "2024",
    duration: "4 min",
    image:
      "https://images.unsplash.com/photo-1514790193030-c89d266d5a9d?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    videoUrl: "https://cdn.pixabay.com/video/2020/05/25/40130-424076663_large.mp4",
    synopsis:
      "A visually hypnotic music video playing with chromatic aberration, water reflections, and surrealist lighting choreography.",
    client: "Indie Label Release",
    deliverables: ["Music Video Direction", "Visual Effects", "Colorist"],
  },
  {
    id: "facsimile",
    title: "Facsimile",
    category: "Narrative Short",
    categories: ["narrative", "cinematography", "color"],
    role: "Director & Writer",
    year: "2024",
    duration: "5 min",
    image:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    videoUrl: "https://cdn.pixabay.com/video/2020/05/25/40130-424076663_large.mp4",
    synopsis:
      "A tense 5-minute psychological short film exploring duplicate reality, identity, and the fragile line between memory and truth.",
    client: "Indie Short Film Showcase",
    deliverables: ["Director", "Writer", "Offline Editor", "Color Grading"],
  },
];

