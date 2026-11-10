import type { Metadata } from "next";
import Background from "@/components/portfolio/Background";
import Nav from "@/components/portfolio/Nav";
import ContactContent from "@/components/contact/ContactContent";
import Footer from "@/components/portfolio/Footer";
import SmoothScroll from "@/components/portfolio/SmoothScroll";

export const metadata: Metadata = {
  title: "Het Patel",
  description:
    "Get in touch with Het Patel for directing, cinematography, editing, commercial campaigns, and narrative film collaborations.",
  openGraph: {
    title: "Het Patel",
    description:
      "Get in touch with Het Patel for directing, cinematography, editing, commercial campaigns, and narrative film collaborations.",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen text-white bg-[#050505] selection:bg-[#FF0000] selection:text-white">
      {/* Cinematic Background Atmosphere Layers */}
      <Background />

      {/* Smooth In-Page Anchor Navigation */}
      <SmoothScroll />

      {/* Fixed Floating Navigation */}
      <Nav />

      {/* Dedicated Contact Content */}
      <ContactContent />

      {/* Footer */}
      <Footer />
    </main>
  );
}
