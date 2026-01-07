"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity.client";

type VideoPlayerProps = {
  videoUrl?: string | null;
  vimeoId?: string | null;
  thumbnail?: {
    _type: "image";
    asset: { _ref: string; _type: "reference" };
    alt?: string;
  } | null;
  title: string;
  autoplay?: boolean;
  controls?: boolean;
  className?: string;
};

export function VideoPlayer({
  videoUrl,
  vimeoId,
  thumbnail,
  title,
  autoplay = false,
  controls = true,
  className = "",
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(true);

  // Handle play/pause
  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
      setShowThumbnail(false);
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Vimeo embed
  if (vimeoId && !videoUrl) {
    return (
      <div className={`relative w-full ${className}`}>
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            src={`https://player.vimeo.com/video/${vimeoId}?autoplay=${autoplay ? 1 : 0}&controls=${controls ? 1 : 0}&title=0&byline=0&portrait=0`}
            className="absolute inset-0 w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={title}
          />
        </div>
      </div>
    );
  }

  // Direct video file
  if (videoUrl) {
    return (
      <div className={`relative w-full overflow-hidden rounded-xl ${className}`}>
        {/* Thumbnail overlay */}
        {showThumbnail && thumbnail && (
          <div
            className="relative w-full cursor-pointer group"
            onClick={handlePlay}
          >
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <Image
                src={urlForImage(thumbnail).width(1920).quality(90).url()}
                alt={thumbnail.alt || `${title} video thumbnail`}
                fill
                className="object-cover"
                unoptimized
              />
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:bg-white transition-colors">
                  <svg
                    className="w-6 h-6 md:w-8 md:h-8 text-[var(--mp-text-primary)] ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Video element */}
        <video
          ref={videoRef}
          src={videoUrl}
          controls={controls}
          className="w-full h-auto"
          onPlay={() => {
            setIsPlaying(true);
            setShowThumbnail(false);
          }}
          onPause={() => setIsPlaying(false)}
          playsInline
        >
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  // Fallback if no video source
  return (
    <div className={`relative w-full bg-[#f2e3d7] flex items-center justify-center ${className}`} style={{ minHeight: "200px" }}>
      <span className="mp-body mp-muted text-sm">No video available</span>
    </div>
  );
}

