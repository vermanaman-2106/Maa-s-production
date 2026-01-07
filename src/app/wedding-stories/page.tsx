import Image from "next/image";
import Link from "next/link";
import { sanityClient } from "@/lib/sanity.client";
import { urlForImage } from "@/lib/sanity.client";
import groq from "groq";

const weddingStoriesQuery = groq`
  *[_type == "weddingStory" && defined(slug.current)]
  | order(weddingDate desc){
    _id,
    title,
    "slug": slug.current,
    location,
    weddingDate,
    heroImage,
    shortIntro,
  }
`;

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
};

export const revalidate = 60;

export default async function WeddingStoriesPage() {
  const stories = await sanityClient
    .fetch<WeddingStory[]>(weddingStoriesQuery)
    .catch(() => []);

  return (
    <div className="bg-[var(--mp-bg)]">
      <section className="mp-section border-b border-[var(--mp-border)]">
        <div className="mp-container space-y-8">
          <header>
            <p className="mp-body text-[0.78rem] tracking-[0.26em] uppercase mp-muted mb-3">
              Wedding Stories
            </p>
            <h1 className="mp-section-title">All Wedding Stories</h1>
            <p className="mp-body mp-muted max-w-2xl mt-4">
              A collection of quiet, timeless wedding stories documented by
              Maa's Production. Each celebration tells its own story.
            </p>
          </header>

          {stories.length === 0 ? (
            <p className="mp-body mp-muted text-[0.85rem]">
              Wedding stories from Maa's Production will appear here once you
              start publishing them in Sanity Studio.
            </p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {stories.map((story) => (
                <article
                  key={story._id}
                  className="space-y-3 border border-[var(--mp-border)] rounded-2xl overflow-hidden bg-[#fffaf7]"
                >
                  <Link
                    href={`/wedding-stories/${story.slug}`}
                    className="block"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      {story.heroImage ? (
                        <Image
                          src={urlForImage(story.heroImage).width(900).url()}
                          alt={
                            story.heroImage.alt ||
                            `${story.title} wedding story by Maa's Production`
                          }
                          fill
                          className="object-cover mp-image-hover"
                        />
                      ) : (
                        <div className="h-full w-full bg-[#f2e3d7]" />
                      )}
                    </div>
                    <div className="space-y-1 px-4 pb-4 pt-3">
                      <h3 className="mp-heading text-sm tracking-[0.18em] uppercase">
                        {story.title}
                      </h3>
                      <p className="mp-body mp-muted text-[0.8rem]">
                        {[story.location, story.weddingDate]
                          .filter(Boolean)
                          .join(" · ") || "A wedding story by Maa's Production"}
                      </p>
                      {story.shortIntro && (
                        <p className="mp-body mp-muted text-[0.8rem] mt-2 line-clamp-2">
                          {story.shortIntro}
                        </p>
                      )}
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

