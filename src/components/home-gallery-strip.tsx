"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/lib/sanity.queries";
import { urlForImage } from "@/lib/sanity.client";

type HomeGalleryStripProps = {
  images: GalleryImage[];
};

const AUTO_SLIDE_INTERVAL = 3000;

export function HomeGalleryStrip({ images }: HomeGalleryStripProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const validImages = images.filter((img) => img.image && img.image.asset);
  const count = validImages.length;

  const scrollToIndex = useCallback(
    (index: number) => {
      if (!containerRef.current || count === 0) return;
      const container = containerRef.current;
      const children = container.children;
      const target = children[index] as HTMLElement | undefined;
      if (!target) return;

      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const containerCenter = containerRect.width / 2;
      const targetCenter =
        target.offsetLeft + targetRect.width / 2 - container.scrollLeft;
      const scrollLeft = target.offsetLeft + targetRect.width / 2 - containerCenter;

      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
      setActiveIndex(index);
    },
    [count],
  );

  const goToNext = useCallback(() => {
    if (count === 0) return;
    setActiveIndex((prev) => {
      const next = (prev + 1) % count;
      scrollToIndex(next);
      return next;
    });
  }, [count, scrollToIndex]);

  // Auto slide
  useEffect(() => {
    if (count === 0 || isInteracting) return;
    const id = setInterval(goToNext, AUTO_SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [count, goToNext, isInteracting]);

  // Snap to closest image after manual scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container || count === 0) return;

    let timeoutId: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      setIsInteracting(true);
      if (timeoutId) clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        const children = container.children;
        let closestIndex = 0;
        let closestDistance = Infinity;
        const containerCenter = container.clientWidth / 2;

        Array.from(children).forEach((child, index) => {
          const el = child as HTMLElement;
          const rect = el.getBoundingClientRect();
          const center =
            rect.left - container.getBoundingClientRect().left + rect.width / 2;
          const distance = Math.abs(center - containerCenter);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });

        scrollToIndex(closestIndex);
        setIsInteracting(false);
      }, 150);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [count, scrollToIndex]);

  if (count === 0) return null;

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar py-2"
      >
        {validImages.map((item, index) => {
          const isActive = index === activeIndex;
          const isHovered = hoveredIndex === index;
          const hasHover = hoveredIndex !== null;
          
          // Determine scale based on hover state
          let scaleClass = "";
          let opacityClass = "";
          
          if (hasHover) {
            // When any image is hovered
            if (isHovered) {
              scaleClass = "scale-105"; // Hovered image scales up
              opacityClass = "opacity-100";
            } else {
              scaleClass = "scale-90"; // Other images scale down
              opacityClass = "opacity-70";
            }
          } else {
            // Default state (no hover) - use active index logic
            if (isActive) {
              scaleClass = "scale-100";
              opacityClass = "opacity-100";
            } else {
              scaleClass = "scale-60";
              opacityClass = "opacity-80";
            }
          }
          
          return (
            <figure
              key={item._id}
              className={`relative aspect-[3/4] flex-shrink-0 snap-center rounded-2xl border border-[var(--mp-border)] bg-[#fffaf7] overflow-hidden transition-all duration-500 ease-out ${scaleClass} ${opacityClass}`}
              style={{
                width: "72vw",
                maxWidth: "420px",
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative w-full h-full mp-image-hover">
                <Image
                  src={urlForImage(item.image).width(800).quality(90).url()}
                  alt={
                    item.image.alt ||
                    item.title ||
                    "Wedding moment by Maa's Production"
                  }
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 72vw, (max-width: 1024px) 40vw, 25vw"
                  unoptimized
                />
              </div>
            </figure>
          );
        })}
      </div>
    </div>
  );
}


