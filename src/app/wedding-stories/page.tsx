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
    heroImage,
    shortIntro,
  }
`;

type WeddingStory = {
  _id: string;
  title: string;
  slug: string;
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
      {stories.length === 0 ? (
        <section className="mp-section">
          <div className="mp-container">
            <p className="mp-body mp-muted text-[0.85rem]">
              Wedding stories from Maa's Production will appear here once you
              start publishing them in Sanity Studio.
            </p>
          </div>
        </section>
      ) : (
        <div className="w-full">
          {stories.map((story, index) => (
            <section
              key={story._id}
              className={`w-full border-b border-[var(--mp-border)] ${
                index === 0 ? "" : ""
              }`}
            >
              <div className="w-full max-w-[1920px] mx-auto px-6 md:px-8 lg:px-10 xl:px-12 py-12 md:py-16 lg:py-20">
                {/* Top Row: Two Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 mb-8 md:mb-12">
                  {/* Left Column: Large Heading (Bride & Groom Names) */}
                  <div className="flex items-start">
                    <Link href={`/wedding-stories/${story.slug}`}>
                      <h2 className="mp-heading text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.1] tracking-[0.05em] uppercase">
                        {story.title}
                      </h2>
                    </Link>
                  </div>

                  {/* Right Column: Story Text */}
                  <div className="flex items-start">
                    {story.shortIntro ? (
                      <p className="mp-body text-base md:text-lg lg:text-xl leading-relaxed">
                        {story.shortIntro}
                      </p>
                    ) : (
                      <p className="mp-body mp-muted text-base md:text-lg leading-relaxed">
                        A wedding story documented by Maa's Production.
                      </p>
                    )}
                  </div>
                </div>

                {/* Image Area: Large Image Below Text */}
                {story.heroImage && (
                  <div className="w-full relative aspect-[16/10] md:aspect-[16/9] overflow-hidden">
                    <Link href={`/wedding-stories/${story.slug}`}>
                      <Image
                        src={urlForImage(story.heroImage).width(1920).quality(90).url()}
                        alt={
                          story.heroImage.alt ||
                          `${story.title} wedding story by Maa's Production`
                        }
                        fill
                        className="object-cover"
                        sizes="100vw"
                        unoptimized
                      />
                    </Link>
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

