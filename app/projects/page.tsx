import type { Metadata } from "next";
import Background from "@/components/portfolio/Background";
import Nav from "@/components/portfolio/Nav";
import ProjectsContent from "@/components/projects/ProjectsContent";
import Footer from "@/components/portfolio/Footer";
import SmoothScroll from "@/components/portfolio/SmoothScroll";

export const metadata: Metadata = {
  title: "Projects — Het Patel | Filmmaker, Director & Cinematographer",
  description:
    "Explore the curated filmography, commercial campaigns, narrative shorts, and cinematography portfolio of Het Patel.",
  openGraph: {
    title: "Projects — Het Patel | Curated Films & Commercials",
    description:
      "Explore the curated filmography, commercial campaigns, narrative shorts, and cinematography portfolio of Het Patel.",
    type: "website",
  },
};

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen text-white bg-[#050505] selection:bg-[#FF2800] selection:text-white">
      {/* Background Atmosphere Layers (Blueprint grid, dust motes & spotlight) */}
      <Background />

      {/* Smooth In-Page Anchor Navigation */}
      <SmoothScroll />

      {/* Fixed Floating Navigation */}
      <Nav />

      {/* Curated Projects Body */}
      <ProjectsContent />

      {/* Footer */}
      <Footer />
    </main>
  );
}
