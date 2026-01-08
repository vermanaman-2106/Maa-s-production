"use client";

import { useEffect, useState } from "react";
import type { Testimonial } from "@/lib/sanity.queries";

type HomeTestimonialsProps = {
  testimonials: Testimonial[];
};

const AUTO_SLIDE_INTERVAL = 4000;

export function HomeTestimonials({ testimonials }: HomeTestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);

  const hasTestimonials = testimonials && testimonials.length > 0;

  // Auto-advance between testimonials
  useEffect(() => {
    if (!hasTestimonials || testimonials.length === 1 || isInteracting) return;

    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, AUTO_SLIDE_INTERVAL);

    return () => clearInterval(id);
  }, [hasTestimonials, isInteracting, testimonials.length]);

  // Light interaction pause
  useEffect(() => {
    if (!isInteracting) return;
    const id = setTimeout(() => setIsInteracting(false), 6000);
    return () => clearTimeout(id);
  }, [isInteracting]);

  if (!hasTestimonials) {
    return (
      <section className="mp-section border-t border-[var(--mp-border)]">
        <div className="mp-container">
          <div className="mb-8 text-center">
            <p className="mp-body text-[0.78rem] tracking-[0.26em] uppercase mp-muted mb-3">
              Testimonials
            </p>
            <h2 className="mp-section-title">
              The photos feel like being there again.
            </h2>
          </div>
          <div className="flex justify-center">
            <p className="mp-body mp-muted text-[0.9rem] max-w-xl text-center">
              As couples begin to share their words with Maa&apos;s Production, you&apos;ll
              see them gently appear here.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const current = testimonials[activeIndex];

  return (
    <section className="mp-section border-t border-[var(--mp-border)]">
      <div className="mp-container">
        {/* Section header */}
        <div className="mb-8 text-center">
          <p className="mp-body text-[0.78rem] tracking-[0.26em] uppercase mp-muted mb-3">
            Testimonials
          </p>
          <h2 className="mp-section-title">
            The photos feel like being there again.
          </h2>
        </div>

        {/* Card + controls */}
        <div className="flex flex-col items-center gap-6">
          {/* Card */}
          <figure
            className="w-full max-w-2xl rounded-2xl border border-[var(--mp-border)] bg-[#fffaf7] px-6 py-7 md:px-8 md:py-9 shadow-[0_18px_45px_rgba(0,0,0,0.04)] transition-transform duration-400 ease-out"
            onMouseEnter={() => setIsInteracting(true)}
            onMouseLeave={() => setIsInteracting(false)}
          >
            {/* Header row: names + rating */}
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex flex-col">
                <span className="mp-body text-[0.78rem] tracking-[0.22em] uppercase">
                  {current.coupleNames ?? "A couple in love"}
                </span>
                {current.locationOrContext && (
                  <span className="mp-body text-[0.78rem] mp-muted">
                    {current.locationOrContext}
                  </span>
                )}
              </div>

              {/* Star rating – simple static 5-star display */}
              <div
                className="flex items-center gap-1 text-[0.85rem]"
                aria-label="5 star review"
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <span key={index} className="text-[#E2B46C]">
                    ★
                  </span>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-[var(--mp-border)] mb-4" />

            {/* Testimonial content */}
            <blockquote className="mp-body text-[0.95rem] md:text-base leading-relaxed mp-muted">
              {current.quote}
            </blockquote>
          </figure>

          {/* Slideshow controls - Dots only */}
          {testimonials.length > 1 && (
            <div className="flex items-center justify-center gap-1.5">
              {testimonials.map((t, index) => (
                <button
                  key={t._id}
                  type="button"
                  onClick={() => {
                    setIsInteracting(true);
                    setActiveIndex(index);
                  }}
                  className={`h-1.5 rounded-full transition-all ${
                    index === activeIndex
                      ? "w-4 bg-[var(--mp-text-primary)]"
                      : "w-2 bg-[var(--mp-border)]"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


