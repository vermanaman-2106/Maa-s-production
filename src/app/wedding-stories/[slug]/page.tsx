import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityClient } from "@/lib/sanity.client";
import { urlForImage } from "@/lib/sanity.client";
import groq from "groq";

type WeddingStory = {
  _id: string;
  title: string;
  slug: string;
  location?: string;
  weddingDate?: string;
  heroImage?: {
    _type: "image";
    asset: { _ref: string; _type: "reference" };
    alt?: string;
  } | null;
  shortIntro?: string;
  gallery?: Array<{
    _key: string;
    _type?: "image";
    asset?: { _ref: string; _type: "reference" };
    alt?: string;
  }>;
};

const storyBySlugQuery = (slug: string) => groq`
  *[_type == "weddingStory" && slug.current == "${slug}"][0]{
    _id,
    title,
    "slug": slug.current,
    location,
    weddingDate,
    heroImage,
    shortIntro,
    gallery
  }
`;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: PageProps,
): Promise<Metadata> {
  const { slug } = await params;

  const story = await sanityClient.fetch<WeddingStory | null>(
    storyBySlugQuery(slug),
  );

  if (!story) {
    return {
      title: "Wedding story not found – Maa's Production",
    };
  }

  const baseTitle = story.title;
  const locationPart = story.location ? ` – ${story.location}` : "";

  return {
    title: `${baseTitle}${locationPart} | Wedding Story – Maa's Production`,
    description:
      story.shortIntro ||
      "A quiet, emotional wedding story documented by Maa's Production.",
  };
}

export default async function WeddingStoryPage({ params }: PageProps) {
  const { slug } = await params;

  const story = await sanityClient.fetch<WeddingStory | null>(
    storyBySlugQuery(slug),
  );

  if (!story) {
    console.warn(
      `Wedding story not found for slug "${slug}". Check Sanity document slug and publish status.`,
    );
    return (
      <div className="bg-[var(--mp-bg)]">
        <section className="mp-section">
          <div className="mp-container space-y-4">
            <p className="mp-body text-[0.8rem] tracking-[0.26em] uppercase mp-muted">
              Wedding Story
            </p>
            <h1 className="mp-section-title">Story coming soon</h1>
            <p className="mp-body mp-muted max-w-xl">
              We couldn&apos;t find this wedding story yet. Please confirm that the story is
              published in Sanity Studio and that its slug exactly matches
              <code className="ml-1 rounded bg-black/5 px-1.5 py-0.5 text-[0.8rem]">
                {params.slug}
              </code>
              .
            </p>
          </div>
        </section>
      </div>
    );
  }

  const hasGallery =
    story.gallery && story.gallery.some((item) => item && item.asset);

  return (
    <div className="bg-[var(--mp-bg)]">
      {/* Hero section */}
      <section className="relative w-full min-h-[60vh] flex items-end overflow-hidden border-b border-[var(--mp-border)]">
        {story.heroImage && (
          <Image
            src={urlForImage(story.heroImage).width(1920).quality(90).url()}
            alt={
              story.heroImage.alt ||
              `${story.title} wedding story by Maa's Production`
            }
            fill
            priority
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/0" />
        <div className="relative z-10 mp-container py-16 space-y-3 text-white">
          <p className="mp-body text-[0.78rem] tracking-[0.26em] uppercase text-white/80">
            Wedding Story
          </p>
          <h1 className="mp-section-title text-white">
            {story.title}
          </h1>
          <p className="mp-body text-white/85 text-sm md:text-base">
            {[story.location, story.weddingDate]
              .filter(Boolean)
              .join(" · ") || "A wedding documented by Maa's Production"}
          </p>
          {story.shortIntro && (
            <p className="mp-body text-white/85 max-w-2xl mt-4 text-sm md:text-base">
              {story.shortIntro}
            </p>
          )}
        </div>
      </section>

      {/* Gallery section */}
      {hasGallery && (
        <section className="mp-section border-b border-[var(--mp-border)]">
          <div className="mp-container space-y-6">
            <h2 className="mp-heading text-xs tracking-[0.26em] uppercase mp-muted">
              Story Gallery
            </h2>

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {story.gallery
                ?.filter((item) => item && item.asset)
                .map((item) => (
                  <figure
                    key={item._key}
                    className="relative mb-4 overflow-hidden rounded-2xl border border-[var(--mp-border)] bg-[#fffaf7] break-inside-avoid"
                  >
                    <div className="relative w-full overflow-hidden mp-image-hover">
                      <Image
                        src={urlForImage(item).width(1400).url()}
                        alt={
                          item.alt ||
                          `${story.title} wedding moment by Maa's Production`
                        }
                        width={900}
                        height={1200}
                        className="h-auto w-full object-cover"
                        loading="lazy"
                        unoptimized
                      />
                    </div>
                  </figure>
                ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}


