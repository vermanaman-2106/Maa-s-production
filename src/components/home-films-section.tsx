import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/lib/sanity.client";
import type { Film } from "@/lib/sanity.queries";

type HomeFilmsSectionProps = {
  films: Film[];
};

export function HomeFilmsSection({ films }: HomeFilmsSectionProps) {
  // Filter films with thumbnails - check if thumbnail exists and has asset reference
  const filmsWithThumbnails = films.filter((film) => {
    if (!film.thumbnail) return false;
    const asset = film.thumbnail.asset;
    return asset && (asset._ref || (typeof asset === 'object' && '_ref' in asset));
  });

  // Take first 2 films: primary (left) and secondary (right)
  const [primaryFilm, secondaryFilm] = filmsWithThumbnails.slice(0, 2);

  // Show section even if no films, but with message
  if (filmsWithThumbnails.length === 0) {
    return (
      <section className="mp-section border-b border-[var(--mp-border)] bg-[var(--mp-bg)]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="mb-6">
            <p className="mp-body text-[0.78rem] tracking-[0.26em] uppercase mp-muted mb-3">
              Films
            </p>
            <h2 className="mp-section-title">Moving, not just moving images</h2>
            <p className="mp-body mp-muted max-w-2xl mt-4">
              A collection of cinematic wedding films that capture the emotion and
              essence of each celebration.
            </p>
          </div>
          <div className="space-y-2">
            <p className="mp-body mp-muted text-[0.85rem]">
              {films.length === 0
                ? "Signature wedding films from Maa's Production will appear here soon."
                : `Found ${films.length} featured film${films.length !== 1 ? 's' : ''}, but ${films.length - filmsWithThumbnails.length} ${films.length - filmsWithThumbnails.length === 1 ? 'is' : 'are'} missing poster images.`}
            </p>
            {films.length > 0 && filmsWithThumbnails.length === 0 && (
              <p className="mp-body mp-muted text-[0.8rem]">
                To display films here: 1) Mark films as "featured" in Sanity Studio, 2) Upload a "Poster image" (thumbnail) for each film, 3) Publish the films.
              </p>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mp-section border-b border-[var(--mp-border)] bg-[var(--mp-bg)]">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mp-body text-[0.78rem] tracking-[0.26em] uppercase mp-muted mb-3">
              Films
            </p>
            <h2 className="mp-section-title">Moving, not just moving images</h2>
            <p className="mp-body mp-muted max-w-2xl mt-4">
              A collection of cinematic wedding films that capture the emotion and
              essence of each celebration.
            </p>
          </div>
        </div>

        {/* Two-Film Layout: Primary (Left) & Secondary (Right) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {/* Primary Film - Left Column */}
          {primaryFilm && (
            <Link
              href={`/films#${primaryFilm.slug}`}
              className="relative w-full overflow-hidden rounded-2xl border border-[var(--mp-border)] bg-[#fffaf7] group cursor-pointer block"
            >
              {/* Primary Film Image - Larger height */}
              <div className="relative w-full" style={{ height: 'clamp(380px, 28vw, 420px)' }}>
                <Image
                  src={urlForImage(primaryFilm.thumbnail!).width(1200).quality(90).url()}
                  alt={
                    primaryFilm.thumbnail?.alt ||
                    `${primaryFilm.title} wedding film by Maa's Production`
                  }
                  fill
                  className="object-cover transition-all duration-500 ease-out group-hover:scale-[1.02] group-hover:opacity-95"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                />
              </div>

              {/* Content Overlay - Always visible, minimal */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
                <h3 className="mp-heading text-white text-lg md:text-xl tracking-[0.12em] uppercase mb-1">
                  {primaryFilm.title}
                </h3>
                {primaryFilm.coupleNames && (
                  <p className="mp-body text-white/90 text-sm md:text-base">
                    {primaryFilm.coupleNames}
                  </p>
                )}
              </div>
            </Link>
          )}

          {/* Secondary Film - Right Column */}
          {secondaryFilm && (
            <Link
              href={`/films#${secondaryFilm.slug}`}
              className="relative w-full overflow-hidden rounded-2xl border border-[var(--mp-border)] bg-[#fffaf7] group cursor-pointer block md:mt-8"
            >
              {/* Secondary Film Image - Smaller height */}
              <div className="relative w-full" style={{ height: 'clamp(280px, 20vw, 320px)' }}>
                <Image
                  src={urlForImage(secondaryFilm.thumbnail!).width(1200).quality(90).url()}
                  alt={
                    secondaryFilm.thumbnail?.alt ||
                    `${secondaryFilm.title} wedding film by Maa's Production`
                  }
                  fill
                  className="object-cover transition-all duration-500 ease-out group-hover:scale-[1.02] group-hover:opacity-95"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                />
              </div>

              {/* Content Overlay - Always visible, minimal */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-5 pointer-events-none">
                <h3 className="mp-heading text-white text-base md:text-lg tracking-[0.12em] uppercase mb-1">
                  {secondaryFilm.title}
                </h3>
                {secondaryFilm.coupleNames && (
                  <p className="mp-body text-white/90 text-sm">
                    {secondaryFilm.coupleNames}
                  </p>
                )}
              </div>
            </Link>
          )}
        </div>

        {/* View all link - only show if more than 2 films */}
        {filmsWithThumbnails.length > 2 && (
          <div className="pt-4 text-center">
            <Link href="/films" className="mp-button-ghost">
              View all films
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
