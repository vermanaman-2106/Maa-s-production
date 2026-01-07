"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { urlForImage } from "@/lib/sanity.client";
import type { HeroImage } from "@/lib/sanity.queries";

interface HeroSectionProps {
  heroData: HeroImage | null;
}

export function HeroSection({ heroData }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  // Fade-in on load
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Parallax effect on scroll (optimized with requestAnimationFrame)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (heroRef.current) {
            const rect = heroRef.current.getBoundingClientRect();
            // Only apply parallax when hero is in viewport
            if (rect.bottom > 0 && rect.top < window.innerHeight) {
              setScrollY(window.scrollY);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!heroData) {
    return null;
  }

  const parallaxOffset = scrollY * 0.3;

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen md:min-h-[100vh] flex flex-col md:flex-row overflow-hidden"
    >
      {/* Left Image - Lifestyle / Storytelling */}
      <div className="relative w-full md:w-1/2 h-[50vh] md:h-screen overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-700 ease-out"
          style={{
            transform: `translateY(${parallaxOffset * 0.5}px) scale(1.02)`,
          }}
        >
          <Image
            src={urlForImage(heroData.leftImage).width(1920).quality(90).url()}
            alt={
              heroData.leftImage.alt ||
              "Lifestyle wedding photography by Maa's Production"
            }
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            quality={90}
          />
        </div>
        {/* Subtle overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
      </div>

      {/* Right Image - Intimate / Close-up */}
      <div className="relative w-full md:w-1/2 h-[50vh] md:h-screen overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-700 ease-out"
          style={{
            transform: `translateY(${parallaxOffset * 0.3}px) scale(1.02)`,
          }}
        >
          <Image
            src={urlForImage(heroData.rightImage).width(1920).quality(90).url()}
            alt={
              heroData.rightImage.alt ||
              "Intimate wedding moment by Maa's Production"
            }
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            quality={90}
          />
        </div>
        {/* Subtle overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
      </div>

      {/* Centered Text Overlay */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div
          className={`text-center px-6 md:px-8 lg:px-12 max-w-4xl transition-opacity duration-1000 ease-out ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transform: isVisible
              ? "translateY(0)"
              : "translateY(20px)",
            transition: "opacity 1s ease-out, transform 1s ease-out",
          }}
        >
          {/* Main Tagline - Editorial Serif Style with Creative Effects */}
          <h1 className="mp-hero-tagline mb-4 md:mb-6">
            {heroData.mainTagline
              .toUpperCase()
              .split("\n")
              .map((line, lineIndex) => (
                <span
                  key={lineIndex}
                  className="mp-hero-tagline-line"
                  style={{
                    animationDelay: `${lineIndex * 0.2}s`,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible
                      ? "translateY(0) scale(1)"
                      : "translateY(30px) scale(0.95)",
                    transition: `opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1) ${lineIndex * 0.2}s, transform 1.2s cubic-bezier(0.4, 0, 0.2, 1) ${lineIndex * 0.2}s`,
                  }}
                >
                  {line.split(" ").map((word, wordIndex) => (
                    <span
                      key={wordIndex}
                      className="mp-hero-tagline-word"
                      style={{
                        animationDelay: `${lineIndex * 0.2 + wordIndex * 0.05}s`,
                      }}
                    >
                      {word}
                      {wordIndex < line.split(" ").length - 1 && "\u00A0"}
                    </span>
                  ))}
                  {lineIndex < heroData.mainTagline.split("\n").length - 1 && (
                    <br />
                  )}
                </span>
              ))}
          </h1>

          {/* Secondary Text (if provided) */}
          {heroData.secondaryText && (
            <p
              className={`mp-body text-white/90 text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto transition-opacity duration-1000 ease-out delay-300 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
              style={{
                transform: isVisible
                  ? "translateY(0)"
                  : "translateY(15px)",
                transition: "opacity 1.2s ease-out 0.3s, transform 1.2s ease-out 0.3s",
              }}
            >
              {heroData.secondaryText}
            </p>
          )}
        </div>
      </div>

      {/* Subtle gradient overlay for better text contrast */}
      <div className="absolute inset-0 z-[5] bg-gradient-to-b from-black/5 via-transparent to-black/10 pointer-events-none" />
    </section>
  );
}

