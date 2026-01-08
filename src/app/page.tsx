import Image from "next/image";
import Link from "next/link";
import {
  getFeaturedFilms,
  getFeaturedWeddingStories,
  getHomeTestimonials,
  getHeroImage,
  getAbout,
  getFeaturedGalleryImages,
} from "@/lib/sanity.queries";
import { urlForImage } from "@/lib/sanity.client";
import { HeroSection } from "@/components/hero-section";
import { HomeGalleryStrip } from "@/components/home-gallery-strip";
import { HomeFilmsSection } from "@/components/home-films-section";
import { HomeWeddingStories } from "@/components/home-wedding-stories";
import { HomeContactSection } from "@/components/home-contact-section";
import { HomeTestimonials } from "@/components/home-testimonials";

export default async function Home() {
  const [stories, films, testimonials, heroData, about, galleryImages] =
    await Promise.all([
      getFeaturedWeddingStories().catch(() => []),
      getFeaturedFilms().catch(() => []),
      getHomeTestimonials().catch(() => []),
      getHeroImage().catch(() => null),
      getAbout().catch(() => null),
      getFeaturedGalleryImages().catch(() => []),
    ]);

  return (
    <div className="bg-[var(--mp-bg)]">
      {/* Hero Section */}
      <HeroSection heroData={heroData} />

      {/* Wedding Stories Section */}
      {stories.length > 0 ? (
        <HomeWeddingStories stories={stories} />
      ) : (
        <section className="mp-section border-b border-[var(--mp-border)]">
          <div className="mp-container">
            <p className="mp-body mp-muted text-[0.85rem]">
              Wedding stories from Maa's Production will appear here soon.
            </p>
          </div>
        </section>
      )}

      {/* Featured Films Section */}
      {films.length > 0 ? (
        <HomeFilmsSection films={films} />
      ) : (
        <section className="mp-section border-b border-[var(--mp-border)]">
          <div className="mp-container">
            <p className="mp-body mp-muted text-[0.85rem]">
              Signature wedding films from Maa's Production will appear here
              soon.
            </p>
          </div>
        </section>
      )}

      {/* Gallery Images Section */}
      {galleryImages.length > 0 && (
        <section className="mp-section border-b border-[var(--mp-border)]">
          <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 space-y-6">
            <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mp-body text-[0.78rem] tracking-[0.26em] uppercase mp-muted">
                  Gallery
                </p>
                <h2 className="mp-section-title">
                  A quiet highlight reel
                </h2>
              </div>
              <Link href="/gallery" className="mp-button-ghost">
                View full gallery
              </Link>
            </header>

            <HomeGalleryStrip images={galleryImages} />
          </div>
        </section>
      )}

      {/* About Section */}
      {about && (
        <section className="mp-section border-b border-[var(--mp-border)] bg-[#fffaf7]">
          <div className="mp-container">
            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              {/* Image */}
              {about.mainImage && (
                <div className="relative aspect-[4/5] md:aspect-square overflow-hidden rounded-2xl border border-[var(--mp-border)]">
                  <Image
                    src={urlForImage(about.mainImage).width(1200).quality(90).url()}
                    alt={about.mainImage.alt || "About Maa's Production"}
                    fill
                    className="object-cover mp-image-hover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              )}

              {/* Content */}
              <div className="space-y-6">
                <div>
                  <p className="mp-body text-[0.78rem] tracking-[0.26em] uppercase mp-muted mb-3">
                    About
                  </p>
                  <h2 className="mp-section-title mb-4">{about.title}</h2>
                  {about.intro && (
                    <p className="mp-body text-lg leading-relaxed mb-6">
                      {about.intro}
                    </p>
                  )}
                </div>

                {/* Brief story excerpt */}
                {about.story && about.story.length > 0 && (
                  <div className="space-y-4">
                    {about.story.slice(0, 2).map((block: any, index: number) => {
                      if (block._type === "block") {
                        const text = block.children
                          ?.map((child: any) => child.text)
                          .join("") || "";
                        if (text.trim()) {
                          return (
                            <p
                              key={index}
                              className="mp-body mp-muted leading-relaxed"
                            >
                              {text.length > 200
                                ? `${text.substring(0, 200)}...`
                                : text}
                            </p>
                          );
                        }
                      }
                      return null;
                    })}
                  </div>
                )}

                {/* Values preview */}
                {about.values && about.values.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    {about.values.slice(0, 2).map((value, index) => (
                      <div key={index} className="space-y-1">
                        <h3 className="mp-heading text-sm tracking-[0.18em] uppercase">
                          {value.title}
                        </h3>
                        {value.description && (
                          <p className="mp-body mp-muted text-[0.85rem] leading-relaxed">
                            {value.description.length > 80
                              ? `${value.description.substring(0, 80)}...`
                              : value.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA */}
                <div className="pt-4">
                  <Link href="/about" className="mp-button-ghost">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section with slideshow */}
      <HomeTestimonials testimonials={testimonials} />

      {/* Contact Section */}
      <HomeContactSection />
    </div>
  );
}
