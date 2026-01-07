"use client";

import { useEffect } from "react";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity.client";
import type { SanityImage } from "@/lib/sanity.queries";

type GalleryLightboxProps = {
  isOpen: boolean;
  onClose: () => void;
  image: {
    src: string;
    alt: string;
    title?: string;
  } | null;
};

export function GalleryLightbox({ isOpen, onClose, image }: GalleryLightboxProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen || !image) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-8 md:right-8 text-white/80 hover:text-white transition-colors text-2xl md:text-3xl"
        aria-label="Close lightbox"
      >
        ×
      </button>
      <div
        className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          <div className="relative w-full h-full max-w-full max-h-[85vh] flex items-center justify-center">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-contain"
              sizes="90vw"
              priority
              unoptimized
            />
          </div>
          {image.title && (
            <div className="mt-4 text-center">
              <p className="mp-body text-white/80 text-sm md:text-base">
                {image.title}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

