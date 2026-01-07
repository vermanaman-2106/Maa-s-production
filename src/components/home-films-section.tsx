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

  // Take first 3 films for the layout
  const [leftTop, leftBottom, rightLarge] = filmsWithThumbnails.slice(0, 3);

  // Show section even if no films, but with message
  if (filmsWithThumbnails.length === 0) {
    return (
      <section className="w-full border-b border-[var(--mp-border)] bg-[var(--mp-bg)]">
        <div className="w-full max-w-[1920px] mx-auto px-8 md:px-12 lg:px-16 xl:px-20 py-16 md:py-24 lg:py-32">
          <div className="mb-8 md:mb-12">
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
    <section className="w-full border-b border-[var(--mp-border)] bg-[var(--mp-bg)]">
      <div className="w-full max-w-[1920px] mx-auto px-8 md:px-12 lg:px-16 xl:px-20 py-16 md:py-24 lg:py-32">
        {/* Header */}
        <div className="mb-12 md:mb-16 lg:mb-20">
          <p className="mp-body text-[0.78rem] tracking-[0.26em] uppercase mp-muted mb-3">
            Films
          </p>
          <h2 className="mp-section-title">Moving, not just moving images</h2>
          <p className="mp-body mp-muted max-w-2xl mt-4">
            A collection of cinematic wedding films that capture the emotion and
            essence of each celebration.
          </p>
        </div>

        {/* Editorial Split-Grid Layout - Row-wise */}
        <div className="flex flex-col gap-8 md:gap-12 lg:gap-16">
          {/* Top Row: Two images side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            {/* Left image */}
            {leftTop && (
              <Link
                href={`/films#${leftTop.slug}`}
                className="relative w-full overflow-hidden rounded-2xl border border-[var(--mp-border)] bg-[#fffaf7] group cursor-pointer block"
              >
                <div className="relative w-full aspect-[4/5] md:aspect-[3/4]">
                  <Image
                    src={urlForImage(leftTop.thumbnail!).width(1200).quality(90).url()}
                    alt={
                      leftTop.thumbnail?.alt ||
                      `${leftTop.title} wedding film by Maa's Production`
                    }
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                  />
                </div>
                {/* Overlay with title */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <h3 className="mp-heading text-white text-base md:text-lg tracking-[0.15em] uppercase">
                    {leftTop.title}
                  </h3>
                </div>
              </Link>
            )}

            {/* Right image */}
            {leftBottom && (
              <Link
                href={`/films#${leftBottom.slug}`}
                className="relative w-full overflow-hidden rounded-2xl border border-[var(--mp-border)] bg-[#fffaf7] group cursor-pointer block"
              >
                <div className="relative w-full aspect-[4/5] md:aspect-[3/4]">
                  <Image
                    src={urlForImage(leftBottom.thumbnail!).width(1200).quality(90).url()}
                    alt={
                      leftBottom.thumbnail?.alt ||
                      `${leftBottom.title} wedding film by Maa's Production`
                    }
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                  />
                </div>
                {/* Overlay with title */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <h3 className="mp-heading text-white text-base md:text-lg tracking-[0.15em] uppercase">
                    {leftBottom.title}
                  </h3>
                </div>
              </Link>
            )}
          </div>

          {/* Bottom Row: One large image spanning full width */}
          {rightLarge && (
            <Link
              href={`/films#${rightLarge.slug}`}
              className="relative w-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px] overflow-hidden rounded-2xl border border-[var(--mp-border)] bg-[#fffaf7] group cursor-pointer block"
            >
              <div className="relative w-full h-full">
                <Image
                  src={urlForImage(rightLarge.thumbnail!).width(1600).quality(90).url()}
                  alt={
                    rightLarge.thumbnail?.alt ||
                    `${rightLarge.title} wedding film by Maa's Production`
                  }
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  sizes="100vw"
                  unoptimized
                />
              </div>
              {/* Overlay with title */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <h3 className="mp-heading text-white text-xl md:text-2xl lg:text-3xl tracking-[0.12em] uppercase">
                  {rightLarge.title}
                </h3>
              </div>
            </Link>
          )}
        </div>

        {/* View all link */}
        {filmsWithThumbnails.length > 3 && (
          <div className="mt-16 md:mt-20 lg:mt-24 text-center">
            <Link href="/films" className="mp-button-ghost">
              View all films
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

