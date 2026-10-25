export interface CinemaSeatProject {
  seat: string;
  title: string;
  role: string;
  year: string;
  category: "Director & Writer" | "Cinematography & Camera" | "Assistant Director (AD)" | "Production Management" | "Sound & Technical";
}

export interface FreelanceProject {
  title: string;
  category: string;
  roles: string[];
}

export const contributionFilms: CinemaSeatProject[] = [
  // Row A (2022 - 2023)
  { seat: "A1", title: "Halt", role: "Writer · Director · Editor", year: "2022", category: "Director & Writer" },
  { seat: "A2", title: "The Nightmare", role: "Assistant Camera", year: "2023", category: "Cinematography & Camera" },
  { seat: "A3", title: "Zaayka", role: "Director's Assistant", year: "2023", category: "Assistant Director (AD)" },
  { seat: "A4", title: "Facsimile", role: "Writer · Director · Editor", year: "2023", category: "Director & Writer" },
  { seat: "A5", title: "Nothing's Changed", role: "Writer · Director · Editor", year: "2023", category: "Director & Writer" },

  // Row B (2023)
  { seat: "B1", title: "Junoon", role: "Script Supervisor", year: "2023", category: "Assistant Director (AD)" },
  { seat: "B2", title: "Sandwich", role: "Sound Recordist", year: "2023", category: "Sound & Technical" },
  { seat: "B3", title: "Rhythm In Him", role: "Cinematographer", year: "2023", category: "Cinematography & Camera" },
  { seat: "B4", title: "Chabi", role: "Sound Recordist", year: "2023", category: "Sound & Technical" },
  { seat: "B5", title: "Sting: Ace the Night", role: "Writer · Director · Editor", year: "2023", category: "Director & Writer" },

  // Row C (2023 - 2024)
  { seat: "C1", title: "UNreal (PSA Ad)", role: "Production Manager", year: "2023", category: "Production Management" },
  { seat: "C2", title: "Chingari", role: "Production Manager", year: "2023", category: "Production Management" },
  { seat: "C3", title: "The Local Ustad", role: "Assistant Cinematographer", year: "2023", category: "Cinematography & Camera" },
  { seat: "C4", title: "The Book Peddler", role: "Editor", year: "2023", category: "Sound & Technical" },
  { seat: "C5", title: "NCPA Live Event", role: "DIT", year: "2024", category: "Sound & Technical" },

  // Row D (2024)
  { seat: "D1", title: "End Begins", role: "Continuity Supervisor", year: "2024", category: "Assistant Director (AD)" },
  { seat: "D2", title: "Kumari", role: "Script Supervisor", year: "2024", category: "Assistant Director (AD)" },
  { seat: "D3", title: "A Flower's Tale", role: "Writer · Director · Editor", year: "2024", category: "Director & Writer" },
  { seat: "D4", title: "Interview", role: "Sound Recordist", year: "2024", category: "Sound & Technical" },
  { seat: "D5", title: "Multicam Music Video", role: "Live Editor & Cinematographer", year: "2024", category: "Cinematography & Camera" },

  // Row E (2024 - 2025)
  { seat: "E1", title: "Action: Fight Sequence", role: "Cinematographer & PM", year: "2024", category: "Cinematography & Camera" },
  { seat: "E2", title: "O Sajna", role: "Production Manager", year: "2024", category: "Production Management" },
  { seat: "E3", title: "Bhag DK Bose", role: "Cinematography", year: "2024", category: "Cinematography & Camera" },
  { seat: "E4", title: "A Golden Boy", role: "Writer · Director · Editor", year: "2024", category: "Director & Writer" },
  { seat: "E5", title: "Once Was Ours", role: "Cinematographer & AD", year: "2025", category: "Cinematography & Camera" },

  // Row F (2025)
  { seat: "F1", title: "Dus by Dus", role: "Writer", year: "2025", category: "Director & Writer" },
  { seat: "F2", title: "Ujaad", role: "Assistant Director & CP", year: "2025", category: "Assistant Director (AD)" },
  { seat: "F3", title: "Baap Re Baap", role: "Assistant Director", year: "2025", category: "Assistant Director (AD)" },
  { seat: "F4", title: "Maatchis", role: "Cinematographer", year: "2025", category: "Cinematography & Camera" },
  { seat: "F5", title: "Mumbai Vibes", role: "Editor (Doc Trailer)", year: "2025", category: "Sound & Technical" },

  // Row G (2025 - 2026)
  { seat: "G1", title: "Three Mothers", role: "Assistant Director", year: "2025", category: "Assistant Director (AD)" },
  { seat: "G2", title: "Rajasthan Cinematics", role: "Cinematographer (DOP)", year: "2025", category: "Cinematography & Camera" },
  { seat: "G3", title: "Void", role: "Cinematographer", year: "2026", category: "Cinematography & Camera" },
  { seat: "G4", title: "In The Movement", role: "Cinematographer", year: "2026", category: "Cinematography & Camera" },
  { seat: "G5", title: "Pole 47", role: "Cinematographer", year: "2026", category: "Cinematography & Camera" },
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
