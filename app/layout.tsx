import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";

export const viewport: Viewport = {
  themeColor: "#070707",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Het Patel — Filmmaker, Director & Cinematographer",
  description:
    "Independent filmmaker based in India. Direction, cinematography and editing for narrative shorts, commercials, documentaries and music videos.",
  openGraph: {
    title: "Het Patel — Filmmaker Portfolio",
    description: "Creating stories that deserve to be remembered.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Het Patel — Filmmaker Portfolio",
    description: "Creating stories that deserve to be remembered.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-[#050505] text-[#F4F4F4] antialiased">
        {children}
      </body>
    </html>
  );
}
