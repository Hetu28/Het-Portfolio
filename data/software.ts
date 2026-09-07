export interface SoftwareItem {
  id: string;
  name: string;
  short: string;
  category: string;
  color: string;
  logo: string;
}

export const softwareList: SoftwareItem[] = [
  {
    id: "premiere",
    name: "Adobe Premiere Pro",
    short: "Pr",
    category: "Editing",
    color: "#9999FF",
    logo: "/logos/premiere-pro.png",
  },
  {
    id: "after-effects",
    name: "Adobe After Effects",
    short: "Ae",
    category: "VFX & Motion",
    color: "#C9A6FF",
    logo: "/logos/after-effects.png",
  },
  {
    id: "davinci",
    name: "DaVinci Resolve",
    short: "Dv",
    category: "Color & Finish",
    color: "#FF7A45",
    logo: "/logos/davinci-resolve.png",
  },
  {
    id: "photoshop",
    name: "Adobe Photoshop",
    short: "Ps",
    category: "Look Dev",
    color: "#31A8FF",
    logo: "/logos/photoshop.png",
  },
  {
    id: "final-draft",
    name: "Final Draft",
    short: "Fd",
    category: "Screenwriting",
    color: "#4CAF50",
    logo: "/logos/final-draft.png",
  },
];
