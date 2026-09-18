export interface FilmItem {
  title: string;
  meta: string;
}

export interface FilmographyGroup {
  role: string;
  subtitle?: string;
  items: FilmItem[];
}

export const filmographyData: FilmographyGroup[] = [
  {
    role: "DIRECTOR & WRITER",
    subtitle: "From the script in my hands to the vision on set.",
    items: [
      { title: "Halt & Facsimile", meta: "SILENT FILM" },
      { title: "Nothing's Changed", meta: "SHORT FILM" },
      { title: "Sting: Ace the Night", meta: "ADVERTISEMENT" },
      { title: "A Flower's Tale", meta: "SHORT FILM" },
      { title: "A Golden Boy", meta: "DOCUMENTARY" },
      { title: "Dus by Dus", meta: "SCREENPLAY" },
    ],
  },
  {
    role: "CINEMATOGRAPHER (DOP)",
    subtitle: "How I saw the story through glass, shadows, and natural light.",
    items: [
      { title: "Once Was Ours", meta: "SHORT FILM" },
      { title: "Maatchis", meta: "SHORT FILM" },
      { title: "Rajasthan Cinematics", meta: "TRAVEL DOC" },
      { title: "Void", meta: "SHORT FILM" },
      { title: "In The Movement", meta: "AD FILM" },
      { title: "Pole 47", meta: "SHORT FILM" },
    ],
  },
  {
    role: "EDITOR",
    subtitle: "Where the story truly found its heartbeat in the edit room.",
    items: [
      { title: "The Book Peddler", meta: "DOCUMENTARY" },
      { title: "O' Sajna", meta: "MUSIC VIDEO" },
      { title: "MULTICAM Music Vid", meta: "MUSIC VIDEO" },
      { title: "Bhag DK Bose", meta: "MUSIC VIDEO" },
      { title: "Mumbai Vibes", meta: "DOCUMENTARY TRAILER" },
    ],
  },
];
