import Image from "next/image";
import Link from "next/link";
import { sanityClient } from "@/lib/sanity.client";
import { urlForImage } from "@/lib/sanity.client";
import groq from "groq";

const preWeddingQuery = groq`
  *[_type == "preWeddingShoot" && defined(slug.current)]
  | order(_createdAt desc){
    _id,
    title,
    "slug": slug.current,
    location,
    heroImage,
    story,
  }
`;

type PreWeddingShoot = {
  _id: string;
  title: string;
  slug: string;
  location?: string;
  heroImage?: {
    _type: "image";
    asset: { _ref: string; _type: "reference" };
    alt?: string;
  } | null;
  story?: string;
};

export const revalidate = 60;

export default async function PreWeddingPage() {
  const shoots = await sanityClient
    .fetch<PreWeddingShoot[]>(preWeddingQuery)
    .catch(() => []);

  return (
    <div className="bg-[var(--mp-bg)]">
      <section className="mp-section border-b border-[var(--mp-border)]">
        <div className="mp-container space-y-8">
          <header>
            <p className="mp-body text-[0.78rem] tracking-[0.26em] uppercase mp-muted mb-3">
              Pre-Wedding
            </p>
            <h1 className="mp-section-title">Pre-Wedding Shoots</h1>
            <p className="mp-body mp-muted max-w-2xl mt-4">
              Intimate pre-wedding sessions that capture the connection and
              anticipation before the big day. Each shoot tells a unique story
              of love and preparation.
            </p>
          </header>

          {shoots.length === 0 ? (
            <p className="mp-body mp-muted text-[0.85rem]">
              Pre-wedding shoots from Maa's Production will appear here once
              you start publishing them in Sanity Studio.
            </p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {shoots.map((shoot) => (
                <article
                  key={shoot._id}
                  className="space-y-3 border border-[var(--mp-border)] rounded-2xl overflow-hidden bg-[#fffaf7]"
                >
                  <Link
                    href={`/pre-wedding/${shoot.slug}`}
                    className="block"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      {shoot.heroImage ? (
                        <Image
                          src={urlForImage(shoot.heroImage).width(900).url()}
                          alt={
                            shoot.heroImage.alt ||
                            `${shoot.title} pre-wedding shoot by Maa's Production`
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
                        {shoot.title}
                      </h3>
                      {shoot.location && (
                        <p className="mp-body mp-muted text-[0.8rem]">
                          {shoot.location}
                        </p>
                      )}
                      {shoot.story && (
                        <p className="mp-body mp-muted text-[0.8rem] mt-2 line-clamp-2">
                          {shoot.story}
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

