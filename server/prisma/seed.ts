import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import path from "path";
import crypto from "crypto";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const prisma = new PrismaClient();

// Helper to hash password safely without external binary dependencies
function hashPassword(password: string): string {
  const salt = "het_portfolio_salt_2026";
  return crypto.scryptSync(password, salt, 64).toString("hex");
}

async function main() {
  console.log("==================================================");
  console.log("🌱 SEEDING VERIFIED PORTFOLIO DATA (PHASE 2)");
  console.log("==================================================");

  // 1. Clean existing records atomically in transaction
  console.log("Cleaning current records...");
  await prisma.$transaction([
    prisma.projectStill.deleteMany(),
    prisma.technicalSpecs.deleteMany(),
    prisma.projectDeliverable.deleteMany(),
    prisma.projectCategoryMapping.deleteMany(),
    prisma.project.deleteMany(),
    prisma.filmographyItem.deleteMany(),
    prisma.filmographyGroup.deleteMany(),
    prisma.contributionFilm.deleteMany(),
    prisma.freelanceProjectRole.deleteMany(),
    prisma.freelanceProject.deleteMany(),
    prisma.brandCollaboration.deleteMany(),
    prisma.fAQ.deleteMany(),
    prisma.siteSetting.deleteMany(),
    prisma.adminUser.deleteMany(),
  ]);

  // 2. Seed Admin User
  console.log("Seeding default admin user...");
  await prisma.adminUser.create({
    data: {
      email: "admin@hetpatel.com",
      name: "Het Patel",
      passwordHash: hashPassword("AdminHet2026!"),
    },
  });

  // 3. Seed Site Settings
  console.log("Seeding site settings...");
  const settings = [
    { key: "site_name", value: "Het Patel", description: "Director / Filmmaker Name" },
    { key: "site_role", value: "FILMMAKER", description: "Primary Brand Role" },
    { key: "site_tagline", value: "Director • Cinematographer • Editor • Storyteller", description: "Header tagline" },
    { key: "contact_email", value: "hetucreatives@gmail.com", description: "Inquiry receiving email" },
    { key: "contact_phone", value: "+91 8169313780", description: "Direct contact phone number" },
    { key: "contact_location", value: "Mumbai, India", description: "Primary operating location" },
    { key: "availability_badge", value: "OPEN FOR WORK", description: "Current work status" },
    {
      key: "showreel_video_url",
      value: "https://cdn.pixabay.com/video/2020/05/25/40130-424076663_large.mp4",
      description: "Ambient showreel video URL",
    },
    {
      key: "showreel_poster_url",
      value: "https://images.unsplash.com/photo-1627133805103-ce2d34ccdd37?crop=entropy&cs=srgb&fm=jpg&q=85&w=2000",
      description: "Showreel poster thumbnail",
    },
  ];

  for (const s of settings) {
    await prisma.siteSetting.create({ data: s });
  }

  // 4. Seed FAQs (Verified from data/faq.ts)
  console.log("Seeding FAQs...");
  const faqs = [
    {
      id: 1,
      question: "What roles do you take on during productions?",
      answer:
        "I primarily work as a Director, Cinematographer (DOP), and Editor, while also taking on roles such as Assistant Director, Creative Producer, and camera crew when a production requires it. For independent projects, I can handle the complete creative process — from developing the idea, scriptwriting, and storyboarding to direction, cinematography, editing, and final delivery.",
      sortOrder: 1,
    },
    {
      id: 2,
      question: "What type of clients and projects do you work with?",
      answer:
        "I work with filmmakers, production teams, creative studios, brands, and independent clients across a range of visual projects. My work includes short films, documentaries, commercials, branded content, music and creative films, personal projects, and other narrative-driven productions.",
      sortOrder: 2,
    },
    {
      id: 3,
      question: "Are you available for shoots outside Mumbai?",
      answer:
        "Yes. I'm based in Mumbai, India, and available for projects across India. I'm also open to international productions and travel depending on the project, location, and production requirements.",
      sortOrder: 3,
    },
    {
      id: 4,
      question: "How long does a typical project take from start to finish?",
      answer:
        "Timelines vary depending on the project's scope, number of shoot days, locations, crew, and post-production requirements. Smaller projects can typically be completed within a few weeks, while larger narrative productions, documentaries, and more involved commercial projects may take one to several months from pre-production through final delivery.",
      sortOrder: 4,
    },
    {
      id: 5,
      question: "How do I get started or discuss a new project?",
      answer:
        "You can reach out through the contact form or email hetucreatives@gmail.com with a brief overview of your project, your requirements, and your expected timeline. From there, we can discuss the creative direction, scope, production requirements, and the best way to take the project forward.",
      sortOrder: 5,
    },
  ];

  for (const f of faqs) {
    await prisma.fAQ.create({ data: f });
  }

  // 5. Seed Filmography (Verified from data/filmography.ts)
  console.log("Seeding filmography groups & credits...");
  const filmographyGroups = [
    {
      role: "DIRECTOR & WRITER",
      subtitle: "From the script in my hands to the vision on set.",
      sortOrder: 1,
      items: [
        { title: "Halt & Facsimile", meta: "SILENT FILM", sortOrder: 1 },
        { title: "Nothing's Changed", meta: "SHORT FILM", sortOrder: 2 },
        { title: "Sting: Ace the Night", meta: "ADVERTISEMENT", sortOrder: 3 },
        { title: "A Flower's Tale", meta: "SHORT FILM", sortOrder: 4 },
        { title: "A Golden Boy", meta: "DOCUMENTARY", sortOrder: 5 },
        { title: "Dus by Dus", meta: "SCREENPLAY", sortOrder: 6 },
      ],
    },
    {
      role: "CINEMATOGRAPHER (DOP)",
      subtitle: "How I saw the story through glass, shadows, and natural light.",
      sortOrder: 2,
      items: [
        { title: "Once Was Ours", meta: "SHORT FILM", sortOrder: 1 },
        { title: "Maatchis", meta: "SHORT FILM", sortOrder: 2 },
        { title: "Rajasthan Cinematics", meta: "TRAVEL DOC", sortOrder: 3 },
        { title: "Void", meta: "SHORT FILM", sortOrder: 4 },
        { title: "In The Movement", meta: "AD FILM", sortOrder: 5 },
        { title: "Pole 47", meta: "SHORT FILM", sortOrder: 6 },
      ],
    },
    {
      role: "EDITOR",
      subtitle: "Where the story truly found its heartbeat in the edit room.",
      sortOrder: 3,
      items: [
        { title: "The Book Peddler", meta: "DOCUMENTARY", sortOrder: 1 },
        { title: "O' Sajna", meta: "MUSIC VIDEO", sortOrder: 2 },
        { title: "MULTICAM Music Vid", meta: "MUSIC VIDEO", sortOrder: 3 },
        { title: "Bhag DK Bose", meta: "MUSIC VIDEO", sortOrder: 4 },
        { title: "Mumbai Vibes", meta: "DOCUMENTARY TRAILER", sortOrder: 5 },
      ],
    },
  ];

  for (const g of filmographyGroups) {
    await prisma.filmographyGroup.create({
      data: {
        role: g.role,
        subtitle: g.subtitle,
        sortOrder: g.sortOrder,
        items: {
          create: g.items,
        },
      },
    });
  }

  // 6. Seed Contribution Films (Verified 27 cinema seats from data/experience.ts)
  console.log("Seeding 27 contribution cinema seats...");
  const contributionFilms = [
    // Row A (2023)
    { seat: "A1", title: "The Nightmare", role: "Assistant Camera", year: "2023", category: "Cinematography & Camera", sortOrder: 1 },
    { seat: "A2", title: "Zaayka", role: "Director's Assistant", year: "2023", category: "Direction & AD", sortOrder: 2 },
    { seat: "A3", title: "Junoon", role: "Script Supervisor", year: "2023", category: "Direction & AD", sortOrder: 3 },
    { seat: "A4", title: "Sandwich", role: "Sound Recordist", year: "2023", category: "Sound & Technical", sortOrder: 4 },
    { seat: "A5", title: "Rhythm In Him", role: "Cinematographer", year: "2023", category: "Cinematography & Camera", sortOrder: 5 },
    // Row B (2023)
    { seat: "B1", title: "Chabi", role: "Sound Recordist", year: "2023", category: "Sound & Technical", sortOrder: 6 },
    { seat: "B2", title: "UNreal (PSA Ad)", role: "Production Manager", year: "2023", category: "Production Management", sortOrder: 7 },
    { seat: "B3", title: "Chingari", role: "Production Manager", year: "2023", category: "Production Management", sortOrder: 8 },
    { seat: "B4", title: "The Local Ustad", role: "Assistant Cinematographer", year: "2023", category: "Cinematography & Camera", sortOrder: 9 },
    { seat: "B5", title: "The Book Peddler", role: "Editor", year: "2023", category: "Sound & Technical", sortOrder: 10 },
    // Row C (2024)
    { seat: "C1", title: "NCPA Live Event", role: "DIT", year: "2024", category: "Sound & Technical", sortOrder: 11 },
    { seat: "C2", title: "End Begins", role: "Continuity Supervisor", year: "2024", category: "Direction & AD", sortOrder: 12 },
    { seat: "C3", title: "Kumari", role: "Script Supervisor", year: "2024", category: "Direction & AD", sortOrder: 13 },
    { seat: "C4", title: "Interview", role: "Sound Recordist", year: "2024", category: "Sound & Technical", sortOrder: 14 },
    { seat: "C5", title: "Multicam Music Video", role: "Live Editor & Cinematographer", year: "2024", category: "Cinematography & Camera", sortOrder: 15 },
    // Row D (2024 - 2025)
    { seat: "D1", title: "Action: Fight Sequence", role: "Cinematographer & Production Manager", year: "2024", category: "Cinematography & Camera", sortOrder: 16 },
    { seat: "D2", title: "O Sajna", role: "Production Manager", year: "2024", category: "Production Management", sortOrder: 17 },
    { seat: "D3", title: "Bhag DK Bose", role: "Cinematography", year: "2024", category: "Cinematography & Camera", sortOrder: 18 },
    { seat: "D4", title: "Once Was Ours", role: "Cinematographer & Assistant Director", year: "2025", category: "Cinematography & Camera", sortOrder: 19 },
    { seat: "D5", title: "Ujaad", role: "Assistant Director & Creative Producer", year: "2025", category: "Direction & AD", sortOrder: 20 },
    // Row E (2025 - 2026)
    { seat: "E1", title: "Baap Re Baap", role: "Assistant Director", year: "2025", category: "Direction & AD", sortOrder: 21 },
    { seat: "E2", title: "Maatchis", role: "Cinematographer", year: "2025", category: "Cinematography & Camera", sortOrder: 22 },
    { seat: "E3", title: "Three Mothers", role: "Assistant Director", year: "2025", category: "Direction & AD", sortOrder: 23 },
    { seat: "E4", title: "Mumbai Vibes", role: "Editor (Doc Trailer)", year: "2025", category: "Sound & Technical", sortOrder: 24 },
    { seat: "E5", title: "Void", role: "Cinematographer", year: "2026", category: "Cinematography & Camera", sortOrder: 25 },
    // Row F (2026)
    { seat: "F1", title: "In The Movement", role: "Cinematographer", year: "2026", category: "Cinematography & Camera", sortOrder: 26 },
    { seat: "F2", title: "Pole 47", role: "Cinematographer", year: "2026", category: "Cinematography & Camera", sortOrder: 27 },
  ];

  for (const c of contributionFilms) {
    await prisma.contributionFilm.create({ data: c });
  }

  // 7. Seed Freelance Projects (Verified from data/experience.ts)
  console.log("Seeding freelance projects...");
  const freelanceProjects = [
    {
      title: "Crafting Gifts",
      category: "Commercial Brand Reels",
      sortOrder: 1,
      roles: ["Script Writer", "Director", "Cinematographer", "Editor"],
    },
    {
      title: "Label Fiora",
      category: "Fashion Brand Campaign",
      sortOrder: 2,
      roles: ["Director", "Cinematographer", "Editor"],
    },
    {
      title: "SculptHer",
      category: "Commercial Brand Film",
      sortOrder: 3,
      roles: ["Director", "Cinematographer", "Editor"],
    },
  ];

  for (const fp of freelanceProjects) {
    await prisma.freelanceProject.create({
      data: {
        title: fp.title,
        category: fp.category,
        sortOrder: fp.sortOrder,
        roles: {
          create: fp.roles.map((r, i) => ({ role: r, sortOrder: i + 1 })),
        },
      },
    });
  }

  // 8. Seed Brand Collaborations (Verified from data/about.ts)
  console.log("Seeding brand collaborations...");
  const brandCollaborations = [
    {
      id: "crafting-gifts",
      name: "Crafting Gifts",
      role: "Script Writer • Director • Cinematographer • Editor",
      year: "2024",
      category: "Commercial Brand Reels",
      logo: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=200&q=80",
      sortOrder: 1,
    },
    {
      id: "label-fiora",
      name: "Label Fiora",
      role: "Director • Cinematographer • Editor",
      year: "2024",
      category: "Fashion Brand Campaign",
      logo: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=200&q=80",
      sortOrder: 2,
    },
    {
      id: "sculpther",
      name: "SculptHer",
      role: "Director • Cinematographer • Editor",
      year: "2024",
      category: "Commercial Brand Film",
      logo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      sortOrder: 3,
    },
    {
      id: "three-mothers",
      name: "Three Mothers",
      extra: "Bolti Khidkiyaan : Short Film Festival",
      role: "Short Film • Assistant Director",
      year: "2025",
      category: "Narrative Short",
      logo: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=200&q=80",
      sortOrder: 4,
    },
    {
      id: "baap-re-baap",
      name: "Baap Re Baap",
      extra: "NSFF Mumbai - 2026",
      role: "Short Film • Assistant Director",
      year: "2025",
      category: "Narrative Short",
      logo: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=200&q=80",
      sortOrder: 5,
    },
    {
      id: "ujaad",
      name: "Ujaad",
      role: "Short Film • Assistant Director & Creative Producer",
      year: "2025",
      category: "Narrative Short",
      logo: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=200&q=80",
      sortOrder: 6,
    },
    {
      id: "void-prod",
      name: "Void",
      role: "Short Film • Cinematographer (DOP)",
      year: "2026",
      category: "Narrative Short",
      logo: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=200&q=80",
      sortOrder: 7,
    },
  ];

  for (const bc of brandCollaborations) {
    await prisma.brandCollaboration.create({ data: bc });
  }

  // 9. Seed Projects (Verified from data/projects.ts & data/projects-page.ts)
  console.log("Seeding all 10 verified portfolio projects...");
  const projectsData = [
    {
      id: "a-flowers-tale",
      title: "A Flower's Tale",
      category: "Short Film",
      role: "Director",
      year: "2024",
      duration: "20 min",
      image: "/images/a-flowers-tale.jpg",
      videoUrl: "https://youtu.be/ie-sxhsJYOM",
      synopsis:
        "Amongst the hustle of life, a neglected flower withers away, mirroring the fading love and connection in a relationship; as its petals droop, a realization dawns, prompting a desperate attempt to nurture and revive what was once cherished, before it's too late.",
      client: "Indie Film Festival Selection",
      type: "video",
      featured: true,
      sortOrder: 1,
      categories: ["narrative", "cinematography", "color"],
      deliverables: ["Writer", "Director", "Editor", "Screenplay"],
    },
    {
      id: "sting-ace-the-night",
      title: "Sting - Ace the Night",
      category: "Advertise",
      role: "Director",
      year: "2023",
      duration: "60 sec",
      image: "/images/sting-ace-the-night.png",
      videoUrl: "https://youtu.be/Rf2DR8_XDiI",
      synopsis:
        "When studying late feels like a losing battle, Sting delivers the spark—taking a tired student from barely awake to acing both the exam and the entire night.",
      client: "Sting Energy Drink",
      type: "video",
      featured: true,
      sortOrder: 2,
      categories: ["commercial", "color"],
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
      synopsis:
        "An atmospheric psychological drama captured on anamorphic glass, leaning into heavy shadows and intimate close-ups.",
      client: "Cinematography Case Study",
      type: "behance",
      featured: true,
      sortOrder: 3,
      categories: ["cinematography", "narrative", "color"],
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
        { id: "pole-47-01", url: "/images/pole-47/pole-47-01.jpg", title: "DAY 6 — FOREST OPENING", caption: "Opening daylight canopy framing the silent forest terrain.", aspect: "wide", sortOrder: 1 },
        { id: "pole-47-02", url: "/images/pole-47/pole-47-02.jpg", title: "DAY 6 — CANOPY ILLUMINATION", caption: "Soft top-light breaking through branches and dense foliage.", aspect: "wide", sortOrder: 2 },
        { id: "pole-47-03", url: "/images/pole-47/pole-47-03.jpg", title: "POLE 47 — SHADOW PROFILE", caption: "Chiaroscuro character close-up in natural shadow.", aspect: "wide", sortOrder: 3 },
        { id: "pole-47-04", url: "/images/pole-47/pole-47-04.jpg", title: "DAY 6 — DUSK TWILIGHT", caption: "Natural cool-toned dusk ambient highlighting loneliness.", aspect: "wide", sortOrder: 4 },
        { id: "pole-47-05", url: "/images/pole-47/pole-47-05.jpg", title: "POLE 47 — ANAMORPHIC DEPTH", caption: "Widescreen anamorphic composition with shallow focus bokeh.", aspect: "wide", sortOrder: 5 },
        { id: "pole-47-06", url: "/images/pole-47/pole-47-06.jpg", title: "POLE 47 — LOW ANGLE SILHOUETTE", caption: "Low-angle dramatic silhouette against ambient exterior sky.", aspect: "wide", sortOrder: 6 },
        { id: "pole-47-07", url: "/images/pole-47/pole-47-07.jpg", title: "POLE 47 — NIGHT CORRIDOR STUDY", caption: "Subdued tungsten spill revealing deep interior shadows.", aspect: "wide", sortOrder: 7 },
        { id: "pole-47-08", url: "/images/pole-47/pole-47-08.jpg", title: "DAY 6 — DEEP FOREST TEXTURES", caption: "Tactile natural bark and foliage texture capture.", aspect: "wide", sortOrder: 8 },
        { id: "pole-47-09", url: "/images/pole-47/pole-47-09.jpg", title: "POLE 47 — SATURATED NOCTURNE", caption: "Nocturnal color palette playing with vibrant chromatic tones.", aspect: "wide", sortOrder: 9 },
        { id: "pole-47-10", url: "/images/pole-47/pole-47-10.jpg", title: "POLE 47 — ISOLATED REFLECTION", caption: "Quiet character gaze framed through reflective surfaces.", aspect: "wide", sortOrder: 10 },
        { id: "pole-47-11", url: "/images/pole-47/pole-47-11.jpg", title: "DAY 6 — MORNING SILHOUETTES", caption: "Atmospheric early morning edge lighting against dense canopy.", aspect: "wide", sortOrder: 11 },
        { id: "pole-47-12", url: "/images/pole-47/pole-47-12.jpg", title: "POLE 47 — HIGH CONTRAST INTERIOR", caption: "Cinematic negative fill shaping intimate spatial tension.", aspect: "wide", sortOrder: 12 },
        { id: "pole-47-13", url: "/images/pole-47/pole-47-13.jpg", title: "POLE 47 — THE FINAL FRAME", caption: "Widescreen resolution capturing lingering atmospheric stillness.", aspect: "wide", sortOrder: 13 },
      ],
    },
    {
      id: "a-golden-boy",
      title: "A Golden Boy",
      category: "Documentary",
      role: "Director & Lead Interviewer",
      year: "2024",
      duration: "42 min",
      image: "/images/a-golden-boy.jpg",
      videoUrl: "https://youtu.be/xyckt6YUxBk",
      synopsis:
        "As a golden statue on Juhu Beach, a helpless yet hopeful man uses his unique art to connect with the world, sharing moments of joy amidst his struggles. His ambition to break free from his circumstances inspires not only his life but also the lives of those he touches.",
      client: "National Geographic Youth Grant",
      type: "video",
      featured: true,
      sortOrder: 4,
      categories: ["documentary", "narrative"],
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
      client: "Music Video Release",
      type: "video",
      featured: true,
      sortOrder: 5,
      categories: ["music-video", "color", "cinematography"],
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
      synopsis:
        "An atmospheric narrative study in isolation and introspection, exploring quiet shadows, reflective silhouettes, and psychological depth.",
      client: "Cinematography Case Study",
      type: "behance",
      featured: true,
      sortOrder: 6,
      categories: ["cinematography", "narrative", "color"],
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
        { id: "void-01", url: "/images/void/void-01.jpg", title: "STARTER HERO FRAME", caption: "Opening silhouette frame balancing interior twilight against window practicals.", lighting: "Diffused Window Daylight & Amber Practical", aspect: "wide", sortOrder: 1 },
        { id: "void-02", url: "/images/void/void-02.jpg", title: "THE MIRROR REFLECTION", caption: "Split-plane composition capturing quiet isolation and dual character perspective.", lighting: "Tungsten Rim & Subdued Fill", aspect: "wide", sortOrder: 2 },
        { id: "void-03", url: "/images/void/void-03.jpg", title: "ATMOSPHERIC HORIZON", caption: "Cool-toned twilight exterior exploring loneliness across urban textures.", lighting: "Natural Dusk Ambient & Cyan Undertones", aspect: "wide", sortOrder: 3 },
        { id: "void-04", url: "/images/void/void-04.jpg", title: "CHIAROSCURO PROFILE", caption: "High-contrast edge lighting accentuating emotional tension and subtle gaze.", lighting: "Hard Key Light & Deep Negative Fill", aspect: "wide", sortOrder: 4 },
        { id: "void-05", url: "/images/void/void-05.jpg", title: "CINEMATIC TEXTURES", caption: "Macro focus on tactile details, smoke particles, and warm tungsten warmth.", lighting: "Warm Filament Practical", aspect: "wide", sortOrder: 5 },
        { id: "void-06", url: "/images/void/void-06.jpg", title: "SHADOWS IN THE CORRIDOR", caption: "Geometric leading lines emphasizing physical space and psychological detachment.", lighting: "Top Overhead Softbox & Linear Practical", aspect: "wide", sortOrder: 6 },
        { id: "void-07", url: "/images/void/void-07.jpg", title: "QUIET CONTEMPLATION", caption: "Close-up portrait study emphasizing natural skin tones against midnight blacks.", lighting: "Book-Lit Soft Key & Soft Hair Rim", aspect: "wide", sortOrder: 7 },
        { id: "void-08", url: "/images/void/void-08.png", title: "THE NEON ENIGMA", caption: "Vibrant saturated chromatic contrast highlighting nocturnal mood and solitude.", lighting: "RGB LED Tubes & Fluorescent Spill", aspect: "wide", sortOrder: 8 },
        { id: "void-09", url: "/images/void/void-09.png", title: "THE FINAL FRAME", caption: "Widescreen resolution capturing lingering resonance, depth of field, and stillness.", lighting: "Subtle Anamorphic Flare & Ambient Glow", aspect: "wide", sortOrder: 9 },
      ],
    },
    {
      id: "nothings-changed",
      title: "Nothing's Changed",
      category: "Narrative Short",
      role: "Director",
      year: "2023",
      duration: "7 min",
      image: "/images/nothings-changed.jpg",
      videoUrl: "https://youtu.be/5MlAn8FAHDk",
      synopsis:
        "After a bitter breakup, Abhi's quest for revenge leads him down a dangerous path of mistaken identity and vengeful threats.",
      client: "FTII Student Showcase",
      type: "video",
      featured: false,
      sortOrder: 7,
      categories: ["narrative", "color"],
      deliverables: ["Director", "Writer", "Editor"],
    },
    {
      id: "once-was-ours",
      title: "Once Was Ours",
      category: "Short Film",
      role: "Cinematographer (DOP)",
      year: "2024",
      duration: "Short Film",
      image: "/images/once-was-ours.jpg",
      videoUrl: "https://cdn.pixabay.com/video/2020/05/25/40130-424076663_large.mp4",
      synopsis:
        "An intimate narrative exploring memory, quiet connection, and the lingering emotional warmth of a bond that once was.",
      client: "Narrative Short Film",
      type: "video",
      featured: false,
      sortOrder: 8,
      categories: ["narrative", "cinematography", "color"],
      deliverables: ["Director of Photography", "Lighting Design", "Colorist"],
    },
    {
      id: "multicam-music-vid",
      title: "MULTICAM Music Vid",
      category: "Music Video",
      role: "Director & Editor",
      year: "2024",
      duration: "Music Video",
      image: "/images/multicam-music-vid.jpg",
      videoUrl: "https://cdn.pixabay.com/video/2020/05/25/40130-424076663_large.mp4",
      synopsis:
        "A high-energy multicam music video production balancing multiple synchronized camera angles, dynamic live performances, and punchy editing.",
      client: "Live Music Production",
      type: "video",
      featured: false,
      sortOrder: 9,
      categories: ["music-video", "cinematography", "color"],
      deliverables: ["Multicam Setup", "Cinematography", "Offline & Online Editing"],
    },
    {
      id: "rajasthan-cinematic",
      title: "Rajasthan Cinematics",
      category: "Travel Doc",
      role: "Cinematographer & Colorist",
      year: "2025",
      duration: "18 min",
      image: "/images/rajasthan-cinematic.jpg",
      videoUrl: "https://cdn.pixabay.com/video/2020/05/25/40130-424076663_large.mp4",
      synopsis:
        "A visual ode to desert landscapes, ancient fortresses, and golden hour tones of Western Rajasthan.",
      client: "Rajasthan Tourism Campaign",
      type: "video",
      featured: false,
      sortOrder: 10,
      categories: ["documentary", "cinematography", "color"],
      deliverables: ["Cinematography", "Drone Pilot", "ACES Color Grading"],
    },
  ];

  for (const p of projectsData) {
    const { categories, deliverables, technicalSpecs, stills, ...baseProject } = p;

    await prisma.project.create({
      data: {
        ...baseProject,
        categories: {
          create: categories.map((c) => ({ category: c })),
        },
        deliverables: {
          create: deliverables.map((d, idx) => ({ name: d, sortOrder: idx + 1 })),
        },
        ...(technicalSpecs
          ? {
              technicalSpecs: {
                create: technicalSpecs,
              },
            }
          : {}),
        ...(stills && stills.length > 0
          ? {
              stills: {
                create: stills,
              },
            }
          : {}),
      },
    });
  }

  console.log("==================================================");
  console.log("✅ DATABASE SEED COMPLETE!");
  console.log("Verified records successfully populated:");
  console.log(" - 1 Admin User");
  console.log(" - 9 Site Settings");
  console.log(" - 5 FAQs");
  console.log(" - 3 Filmography Groups & 17 Items");
  console.log(" - 27 Contribution Cinema Seats");
  console.log(" - 3 Freelance Projects & Roles");
  console.log(" - 7 Brand Collaborations");
  console.log(" - 10 Portfolio Projects, Deliverables & Stills");
  console.log("==================================================");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
