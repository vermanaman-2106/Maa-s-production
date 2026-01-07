import Image from "next/image";
import { sanityClient } from "@/lib/sanity.client";
import { urlForImage } from "@/lib/sanity.client";
import groq from "groq";

const albumsQuery = groq`
  *[_type == "album"]
  | order(_createdAt desc){
    _id,
    name,
    description,
    coverImage,
    detailImages,
  }
`;

type Album = {
  _id: string;
  name: string;
  description?: string;
  coverImage?: {
    _type: "image";
    asset: { _ref: string; _type: "reference" };
    alt?: string;
  } | null;
  detailImages?: Array<{
    _type: "image";
    asset: { _ref: string; _type: "reference" };
    alt?: string;
  }>;
};

export const revalidate = 60;

export default async function AlbumsPage() {
  const albums = await sanityClient.fetch<Album[]>(albumsQuery).catch(() => []);

  return (
    <div className="bg-[var(--mp-bg)]">
      <section className="mp-section border-b border-[var(--mp-border)]">
        <div className="mp-container space-y-8">
          <header>
            <p className="mp-body text-[0.78rem] tracking-[0.26em] uppercase mp-muted mb-3">
              Albums
            </p>
            <h1 className="mp-section-title">Albums & Photobooks</h1>
            <p className="mp-body mp-muted max-w-2xl mt-4">
              Handcrafted albums and photobooks that preserve your wedding
              story in a tangible, timeless format. Each album is carefully
              designed to reflect the emotion and beauty of your celebration.
            </p>
          </header>

          {albums.length === 0 ? (
            <p className="mp-body mp-muted text-[0.85rem]">
              Albums from Maa's Production will appear here once you start
              publishing them in Sanity Studio.
            </p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {albums.map((album) => (
                <article
                  key={album._id}
                  className="space-y-3 border border-[var(--mp-border)] rounded-2xl overflow-hidden bg-[#fffaf7]"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    {album.coverImage ? (
                      <Image
                        src={urlForImage(album.coverImage).width(900).url()}
                        alt={
                          album.coverImage.alt ||
                          `${album.name} album by Maa's Production`
                        }
                        fill
                        className="object-cover mp-image-hover"
                      />
                    ) : (
                      <div className="h-full w-full bg-[#f2e3d7]" />
                    )}
                  </div>
                  <div className="space-y-2 px-4 pb-4 pt-3">
                    <h3 className="mp-heading text-sm tracking-[0.18em] uppercase">
                      {album.name}
                    </h3>
                    {album.description && (
                      <p className="mp-body mp-muted text-[0.8rem] leading-relaxed">
                        {album.description}
                      </p>
                    )}
                    {album.detailImages && album.detailImages.length > 0 && (
                      <p className="mp-body mp-muted text-[0.75rem]">
                        {album.detailImages.length} detail
                        {album.detailImages.length !== 1 ? "s" : ""}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

