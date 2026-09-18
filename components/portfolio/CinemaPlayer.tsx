"use client";

import React, { useState } from "react";
import { ExternalLink } from "lucide-react";

interface CinemaPlayerProps {
  videoUrl?: string;
  poster?: string;
  title?: string;
  className?: string;
}

export default function CinemaPlayer({
  videoUrl,
  poster,
  title = "Film Showcase",
  className = "w-full h-full",
}: CinemaPlayerProps) {
  const [hasError, setHasError] = useState(false);

  if (!videoUrl) {
    return (
      <div className={`relative w-full aspect-video bg-black flex items-center justify-center ${className}`}>
        {poster && (
          <img src={poster} alt={title} className="w-full h-full object-cover opacity-60" />
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <p className="text-white/70 text-sm font-mono tracking-widest uppercase">
            No video link configured
          </p>
        </div>
      </div>
    );
  }

  // 1. YouTube Match
  const ytMatch = videoUrl.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  if (ytMatch && ytMatch[1]) {
    const ytId = ytMatch[1];
    return (
      <div className={`relative w-full aspect-video bg-black rounded-xl overflow-hidden ${className}`}>
        <iframe
          src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={title}
          className="absolute inset-0 w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
        <a
          href={`https://www.youtube.com/watch?v=${ytId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-3 right-3 z-30 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 hover:bg-red-600 border border-white/20 text-white text-[11px] font-mono tracking-wider transition-colors shadow-lg"
        >
          <span>Watch on YouTube</span>
          <ExternalLink size={12} />
        </a>
      </div>
    );
  }

  // 2. Vimeo Match
  const vimeoMatch = videoUrl.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    const vimeoId = vimeoMatch[1];
    return (
      <div className={`relative w-full aspect-video bg-black rounded-xl overflow-hidden ${className}`}>
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
          title={title}
          className="absolute inset-0 w-full h-full border-0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  // 3. Google Drive Match
  const gDriveMatch = videoUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (gDriveMatch && gDriveMatch[1]) {
    const driveId = gDriveMatch[1];
    return (
      <div className={`relative w-full aspect-video bg-black rounded-xl overflow-hidden ${className}`}>
        <iframe
          src={`https://drive.google.com/file/d/${driveId}/preview`}
          title={title}
          className="absolute inset-0 w-full h-full border-0"
          allow="autoplay"
          allowFullScreen
        />
      </div>
    );
  }

  // 4. Direct video link or local stream
  const fallbackUrl = "https://cdn.pixabay.com/video/2020/05/25/40130-424076663_large.mp4";
  const currentSrc = hasError ? fallbackUrl : videoUrl;

  return (
    <div className={`relative w-full aspect-video bg-black rounded-xl overflow-hidden ${className}`}>
      <video
        controls
        autoPlay
        playsInline
        poster={poster}
        src={currentSrc}
        onError={() => setHasError(true)}
        className="w-full h-full object-cover"
      />
      {hasError && (
        <div className="absolute top-3 left-3 z-20 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[11px] font-mono text-white/80">
          Streaming cinematic demo preview
        </div>
      )}
    </div>
  );
}
