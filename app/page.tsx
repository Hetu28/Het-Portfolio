import Background from "@/components/portfolio/Background";
import Nav from "@/components/portfolio/Nav";
import Hero from "@/components/portfolio/Hero";
import MarqueeBanner from "@/components/portfolio/MarqueeBanner";
import Showreel from "@/components/portfolio/Showreel";
import FeaturedWork from "@/components/portfolio/FeaturedWork";
import FAQ from "@/components/portfolio/FAQ";
import Experience from "@/components/portfolio/Experience";
import Software from "@/components/portfolio/Software";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";
import SmoothScroll from "@/components/portfolio/SmoothScroll";

export default function Home() {
  return (
    <main className="relative min-h-screen text-white bg-[#050505]">
      {/* Cinematic Background Atmosphere Layers */}
      <Background />

      {/* Smooth In-Page Anchor Navigation */}
      <SmoothScroll />

      {/* Fixed Floating Navigation */}
      <Nav />

      {/* 1. Hero with Infinite Dual-Column Masonry */}
      <Hero />

      {/* 2. Category Marquee Banner */}
      <MarqueeBanner />

      {/* 3 & 4. Showreel Widescreen Showcase */}
      <Showreel />

      {/* 5. Featured / Curated Frames */}
      <FeaturedWork />

      {/* 7. On Set Experience (My Contributions) */}
      <Experience />

      {/* 9. FAQ (Frequently Asked Questions) */}
      <FAQ />

      {/* 10. Software Toolkit */}
      <Software />

      {/* 11. Contact Enquiry Form */}
      <Contact />

      {/* 12. Footer */}
      <Footer />
    </main>
  );
}
