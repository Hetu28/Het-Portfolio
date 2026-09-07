export interface CinemaSeatProject {
  seat: string;
  title: string;
  role: string;
  year: string;
  category: "Direction & AD" | "Cinematography & Camera" | "Production Management" | "Sound & Technical";
}

export interface FreelanceProject {
  title: string;
  category: string;
  roles: string[];
}

export const contributionFilms: CinemaSeatProject[] = [
  // Row A (2023)
  { seat: "A1", title: "The Nightmare", role: "Assistant Camera", year: "2023", category: "Cinematography & Camera" },
  { seat: "A2", title: "Zaayka", role: "Director's Assistant", year: "2023", category: "Direction & AD" },
  { seat: "A3", title: "Junoon", role: "Script Supervisor", year: "2023", category: "Direction & AD" },
  { seat: "A4", title: "Sandwich", role: "Sound Recordist", year: "2023", category: "Sound & Technical" },
  { seat: "A5", title: "Rhythm In Him", role: "Cinematographer", year: "2023", category: "Cinematography & Camera" },

  // Row B (2023)
  { seat: "B1", title: "Chabi", role: "Sound Recordist", year: "2023", category: "Sound & Technical" },
  { seat: "B2", title: "UNreal (PSA Ad)", role: "Production Manager", year: "2023", category: "Production Management" },
  { seat: "B3", title: "Chingari", role: "Production Manager", year: "2023", category: "Production Management" },
  { seat: "B4", title: "The Local Ustad", role: "Assistant Cinematographer", year: "2023", category: "Cinematography & Camera" },
  { seat: "B5", title: "The Book Peddler", role: "Editor", year: "2023", category: "Sound & Technical" },

  // Row C (2024)
  { seat: "C1", title: "NCPA Live Event", role: "DIT", year: "2024", category: "Sound & Technical" },
  { seat: "C2", title: "End Begins", role: "Continuity Supervisor", year: "2024", category: "Direction & AD" },
  { seat: "C3", title: "Kumari", role: "Script Supervisor", year: "2024", category: "Direction & AD" },
  { seat: "C4", title: "Interview", role: "Sound Recordist", year: "2024", category: "Sound & Technical" },
  { seat: "C5", title: "Multicam Music Video", role: "Live Editor & Cinematographer", year: "2024", category: "Cinematography & Camera" },

  // Row D (2024 - 2025)
  { seat: "D1", title: "Action: Fight Sequence", role: "Cinematographer & Production Manager", year: "2024", category: "Cinematography & Camera" },
  { seat: "D2", title: "O Sajna", role: "Production Manager", year: "2024", category: "Production Management" },
  { seat: "D3", title: "Bhag DK Bose", role: "Cinematography", year: "2024", category: "Cinematography & Camera" },
  { seat: "D4", title: "Once Was Ours", role: "Cinematographer & Assistant Director", year: "2025", category: "Cinematography & Camera" },
  { seat: "D5", title: "Ujaad", role: "Assistant Director & Creative Producer", year: "2025", category: "Direction & AD" },

  // Row E (2025 - 2026)
  { seat: "E1", title: "Baap Re Baap", role: "Assistant Director", year: "2025", category: "Direction & AD" },
  { seat: "E2", title: "Maatchis", role: "Cinematographer", year: "2025", category: "Cinematography & Camera" },
  { seat: "E3", title: "Three Mothers", role: "Assistant Director", year: "2025", category: "Direction & AD" },
  { seat: "E4", title: "Mumbai Vibes", role: "Editor (Doc Trailer)", year: "2025", category: "Sound & Technical" },
  { seat: "E5", title: "Void", role: "Cinematographer", year: "2026", category: "Cinematography & Camera" },

  // Row F (2026)
  { seat: "F1", title: "In The Movement", role: "Cinematographer", year: "2026", category: "Cinematography & Camera" },
  { seat: "F2", title: "Pole 47", role: "Cinematographer", year: "2026", category: "Cinematography & Camera" },
];

export const freelanceProjects: FreelanceProject[] = [
  {
    title: "Crafting Gifts",
    category: "Commercial Brand Reels",
    roles: ["Script Writer", "Director", "Cinematographer", "Editor"],
  },
  {
    title: "Label Fiora",
    category: "Fashion Brand Campaign",
    roles: ["Director", "Cinematographer", "Editor"],
  },
  {
    title: "SculptHer",
    category: "Commercial Brand Film",
    roles: ["Director", "Cinematographer", "Editor"],
  },
];
