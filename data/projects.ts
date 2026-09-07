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
}

export const featuredProjects: Project[] = [
  {
    id: "a-flowers-tale",
    title: "A Flower's Tale",
    category: "Narrative Short",
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
    category: "Commercial Brand Ad",
    role: "Director",
    year: "2023",
    duration: "TVC",
    image: "/images/sting-ace-the-night.jpg",
    videoUrl: "https://youtu.be/Rf2DR8_XDiI",
    synopsis: "High-octane commercial campaign capturing raw street energy, kinetic editing, and neon-lit nightscapes.",
    deliverables: ["Writer", "Director", "Editor"],
  },
  {
    id: "pole-47",
    title: "Pole 47",
    category: "Cinematographer (DOP)",
    role: "DOP",
    year: "2026",
    duration: "25 min",
    image: "/images/pole-47.jpg",
    videoUrl: "https://cdn.pixabay.com/video/2020/05/25/40130-424076663_large.mp4",
    synopsis: "An atmospheric psychological drama captured on anamorphic glass, leaning into heavy shadows and intimate close-ups.",
    deliverables: ["Director of Photography", "Camera Operator", "Lighting Design"],
  },
  {
    id: "a-golden-boy",
    title: "A Golden Boy",
    category: "Documentary Film",
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
    id: "rajasthan-cinematic",
    title: "Rajasthan Cinematics",
    category: "Travel Feature",
    role: "DOP",
    year: "2025",
    duration: "Short Film",
    image: "/images/rajasthan-cinematic.jpg",
    videoUrl: "https://cdn.pixabay.com/video/2020/05/25/40130-424076663_large.mp4",
    synopsis: "A visually rich visual ode to the desert landscapes, ancient fortresses, and golden hour hues of Rajasthan.",
    deliverables: ["Cinematography", "Colorist", "Drone Pilot"],
  },
  {
    id: "void",
    title: "Void",
    category: "Cinematographer (DOP)",
    role: "DOP",
    year: "2026",
    duration: "5 min",
    image: "/images/void.jpg",
    videoUrl: "https://cdn.pixabay.com/video/2020/05/25/40130-424076663_large.mp4",
    synopsis: "An atmospheric narrative study in isolation and introspection, exploring quiet shadows and psychological depth.",
    deliverables: ["Director of Photography", "Camera Operator", "Lighting Design"],
  },
];
