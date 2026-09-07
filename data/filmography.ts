export interface FilmItem {
  title: string;
  meta: string;
}

export interface FilmographyGroup {
  role: string;
  subtitle: string;
  items: FilmItem[];
}

export const filmographyData: FilmographyGroup[] = [
  {
    role: "DIRECTOR & WRITER",
    subtitle: "6 credits across shorts, commercials & documentaries.",
    items: [
      { title: "Halt & Facsimile", meta: "5 MIN • SHORT FILM" },
      { title: "Nothing's Changed", meta: "7 MIN • NARRATIVE SHORT" },
      { title: "Sting: Ace the Night", meta: "COMMERCIAL BRAND AD" },
      { title: "A Flower's Tale", meta: "20 MIN • NARRATIVE SHORT" },
      { title: "A Golden Boy", meta: "DOCUMENTARY FILM" },
      { title: "Dus by Dus", meta: "WRITTEN" },
    ],
  },
  {
    role: "CINEMATOGRAPHER (DOP)",
    subtitle: "Visual worldbuilding on narrative & commercial sets.",
    items: [
      { title: "Once Was Ours", meta: "SHORT FILM" },
      { title: "Maatchis", meta: "7 MIN • SHORT FILM" },
      { title: "Rajasthan Cinematics", meta: "SHORT FILM" },
      { title: "Void", meta: "5 MIN • SHORT FILM" },
      { title: "In The Movement", meta: "COMMERCIAL BRAND AD" },
      { title: "Pole 47", meta: "25 MIN • SHORT FILM" },
    ],
  },
  {
    role: "EDITOR",
    subtitle: "Post-production rhythm, pacing & sound architecture.",
    items: [
      { title: "The Book Peddler", meta: "DOCUMENTARY" },
      { title: "O Sajna", meta: "MUSIC VIDEO" },
      { title: "Action Sequence", meta: "ACTION EDIT" },
      { title: "Bhag DK Bose", meta: "MUSIC VIDEO" },
      { title: "Mumbai Vibes", meta: "DOCUMENTARY TRAILER" },
    ],
  },
];
