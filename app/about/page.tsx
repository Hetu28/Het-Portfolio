import type { Metadata } from "next";
import Background from "@/components/portfolio/Background";
import Nav from "@/components/portfolio/Nav";
import AboutContent from "@/components/about/AboutContent";
import Footer from "@/components/portfolio/Footer";

export const metadata: Metadata = {
  title: "About — Het Patel | Filmmaker, Director & Cinematographer",
  description:
    "Discover the cinematic journey, visual philosophy, camera craft, and production history of filmmaker & director Het Patel.",
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen text-white bg-[#050505] selection:bg-[#FF2800] selection:text-white">
      {/* Cinematic Background Atmosphere Layers */}
      <Background />

      {/* Fixed Floating Navigation */}
      <Nav />

      {/* Dedicated Interactive About Section Content */}
      <AboutContent />

      {/* Footer */}
      <Footer />
    </main>
  );
}
