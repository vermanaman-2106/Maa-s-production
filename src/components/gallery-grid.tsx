"use client";

import { useState } from "react";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity.client";
import { GalleryLightbox } from "./gallery-lightbox";

type GalleryImageDoc = {
  _id: string;
  title?: string;
  image: {
    _type: "image";
    asset?: { _ref: string; _type: "reference" };
    alt?: string;
  };
};

type GalleryGridProps = {
  images: GalleryImageDoc[];
};

export function GalleryGrid({ images }: GalleryGridProps) {
  const [lightboxImage, setLightboxImage] = useState<{
    src: string;
    alt: string;
    title?: string;
  } | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const validImages = images.filter((item) => item.image && item.image.asset);

  const handleImageClick = (item: GalleryImageDoc) => {
    if (!item.image || !item.image.asset) return;
    setLightboxImage({
      src: urlForImage(item.image).width(1920).quality(90).url(),
      alt: item.image.alt || item.title || "Wedding moment by Maa's Production",
      title: item.title,
    });
    setIsLightboxOpen(true);
  };

  if (validImages.length === 0) {
    return (
      <div className="mp-container">
        <p className="mp-body mp-muted text-[0.9rem]">
          As soon as you publish gallery images in Sanity, they'll appear here
          automatically.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Full-width masonry gallery */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-0">
          {validImages.map((item) => (
            <figure
              key={item._id}
              className="relative mb-0 overflow-hidden rounded-2xl border border-[var(--mp-border)] bg-[#fffaf7] break-inside-avoid cursor-pointer group"
              onClick={() => handleImageClick(item)}
            >
              <div className="relative w-full overflow-hidden">
                <Image
                  src={urlForImage(item.image).width(1200).quality(90).url()}
                  alt={
                    item.image.alt ||
                    item.title ||
                    "Wedding moment by Maa's Production"
                  }
                  width={800}
                  height={1200}
                  className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  unoptimized
                />
              </div>
              {item.title && (
                <figcaption className="mp-body mp-muted text-[0.78rem] px-3.5 py-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.title}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <GalleryLightbox
        isOpen={isLightboxOpen}
        onClose={() => {
          setIsLightboxOpen(false);
          setLightboxImage(null);
        }}
        image={lightboxImage}
      />
    </>
  );
}

