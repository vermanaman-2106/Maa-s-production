"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type { WeddingStory } from "@/lib/sanity.queries";
import { urlForImage } from "@/lib/sanity.client";

type HomeWeddingStoriesProps = {
  stories: WeddingStory[];
};

const AUTO_SLIDE_INTERVAL = 3000;

export function HomeWeddingStories({ stories }: HomeWeddingStoriesProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);

  const validStories = stories.filter((story) => story.heroImage && story.heroImage.asset);
  const count = validStories.length;

  // Auto-advance stories
  useEffect(() => {
    if (count === 0 || count === 1 || isInteracting) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % count);
    }, AUTO_SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [count, isInteracting]);

  // Reset interaction timer
  useEffect(() => {
    if (isInteracting) {
      const timer = setTimeout(() => setIsInteracting(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [isInteracting]);

  if (count === 0) return null;

  const currentStory = validStories[activeIndex];
  const titleWords = currentStory.title.split(" ");

  // Split title into two parts for side-by-side display
  const midPoint = Math.ceil(titleWords.length / 2);
  const firstPart = titleWords.slice(0, midPoint).join(" ");
  const secondPart = titleWords.slice(midPoint).join(" ");

  return (
    <section className="w-full border-b border-[var(--mp-border)] bg-[var(--mp-bg)]">
      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-8 lg:px-10 xl:px-12 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
          {/* Left Column: Visual Block - Framed Image */}
          <div className="w-full flex justify-center md:justify-start">
            <div className="relative w-full max-w-md aspect-[3/4] border border-[var(--mp-border)] bg-[#fffaf7] overflow-hidden">
              {currentStory.heroImage && (
                <Link href={`/wedding-stories/${currentStory.slug}`}>
                  <Image
                    src={urlForImage(currentStory.heroImage).width(800).quality(90).url()}
                    alt={
                      currentStory.heroImage.alt ||
                      `${currentStory.title} wedding story by Maa's Production`
                    }
                    fill
                    className="object-cover transition-opacity duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                  />
                </Link>
              )}
            </div>
          </div>

          {/* Right Column: Content Area */}
          <div className="w-full flex flex-col justify-between min-h-[400px] md:min-h-[500px]">
            {/* Metadata Area - Top */}
            <div className="flex items-start mb-6 md:mb-8">
              <div className="flex flex-col gap-2">
                {currentStory.location && (
                  <span className="mp-body text-[0.7rem] tracking-[0.2em] uppercase mp-muted">
                    {currentStory.location}
                  </span>
                )}
                {currentStory.weddingDate && (
                  <span className="mp-body text-[0.7rem] tracking-[0.2em] uppercase mp-muted">
                    {new Date(currentStory.weddingDate).getFullYear()}
                  </span>
                )}
              </div>
            </div>

            {/* Heading Row: Two Large Text Elements Side by Side */}
            <div className="mb-6 md:mb-8">
              <Link href={`/wedding-stories/${currentStory.slug}`}>
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  <h2 className="mp-heading text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.1] tracking-[0.05em] uppercase">
                    {firstPart}
                  </h2>
                  <h2 className="mp-heading text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.1] tracking-[0.05em] uppercase">
                    {secondPart}
                  </h2>
                </div>
              </Link>
            </div>

            {/* Story Text Paragraph */}
            <div className="mb-8 md:mb-12">
              <p className="mp-body text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl">
                {currentStory.shortIntro ||
                  "A quiet, emotional wedding story documented by Maa's Production. Each celebration tells its own unique story of love, family, and timeless moments."}
              </p>
            </div>

            {/* View Story Link */}
            <div className="mt-6">
              <Link
                href={`/wedding-stories/${currentStory.slug}`}
                className="mp-button-ghost inline-block"
              >
                View full story
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

