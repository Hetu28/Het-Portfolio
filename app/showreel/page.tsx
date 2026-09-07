import type { Metadata } from "next";
import Background from "@/components/portfolio/Background";
import Nav from "@/components/portfolio/Nav";
import ShowreelContent from "@/components/showreel/ShowreelContent";
import Footer from "@/components/portfolio/Footer";
import SmoothScroll from "@/components/portfolio/SmoothScroll";

export const metadata: Metadata = {
  title: "Showreel — Het Patel | Filmmaker, Director & Cinematographer",
  description:
    "Watch the 4K DCI master showreel of Het Patel — featuring highlights across narrative films, commercials, documentaries, and cinematography.",
  openGraph: {
    title: "Showreel — Het Patel | Master Filmmaker Reel",
    description:
      "Watch the 4K DCI master showreel of Het Patel — featuring highlights across narrative films, commercials, documentaries, and cinematography.",
    type: "video.other",
  },
};

export default function ShowreelPage() {
  return (
    <main className="relative min-h-screen text-white bg-[#050505] selection:bg-[#FF2800] selection:text-white">
      {/* Cinematic Background Atmosphere Layers */}
      <Background />

      {/* Smooth In-Page Anchor Navigation */}
      <SmoothScroll />

      {/* Fixed Floating Navigation */}
      <Nav />

      {/* Dedicated Showreel Showcase Body */}
      <ShowreelContent />

      {/* Footer */}
      <Footer />
    </main>
  );
}
