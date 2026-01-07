import Image from "next/image";
import { urlForImage } from "@/lib/sanity.client";
import { sanityClient } from "@/lib/sanity.client";
import groq from "groq";

type GalleryImageDoc = {
  _id: string;
  title?: string;
  image: {
    _type: "image";
    asset?: { _ref: string; _type: "reference" };
    alt?: string;
  };
};

const galleryQuery = groq`
  *[_type == "galleryImage" && defined(image.asset)]
  | order(_createdAt desc){
    _id,
    title,
    image,
  }
`;

export const revalidate = 60; // keep gallery reasonably fresh

export default async function GalleryPage() {
  const images = await sanityClient.fetch<GalleryImageDoc[]>(galleryQuery).catch(
    () => [],
  );

  return (
    <div className="bg-[var(--mp-bg)]">
      <section className="mp-section">
        <div className="mp-container">
          <p className="mp-body text-[0.8rem] tracking-[0.26em] uppercase mp-muted mb-3">
            Gallery
          </p>
          <h1 className="mp-heading text-3xl sm:text-4xl md:text-5xl leading-[1.15] mb-4">
            A quiet highlight reel of Maa’s Production.
          </h1>
          <p className="mp-body mp-muted max-w-2xl mb-10">
            A curated selection of images from weddings, pre-weddings and family
            moments we’ve documented. Soft light, honest expressions and the way
            people hold each other when they think no one is looking.
          </p>

          {images.length === 0 ? (
            <p className="mp-body mp-muted text-[0.9rem]">
              As soon as you publish gallery images in Sanity, they’ll appear
              here automatically.
            </p>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {images
                .filter((item) => item.image && item.image.asset)
                .map((item) => (
                  <figure
                    key={item._id}
                    className="relative mb-4 overflow-hidden rounded-2xl border border-[var(--mp-border)] bg-[#fffaf7] break-inside-avoid"
                  >
                    <div className="relative w-full overflow-hidden mp-image-hover">
                    <Image
                      src={urlForImage(item.image).width(1400).url()}
                      alt={
                        item.image.alt ||
                        item.title ||
                        "Wedding moment by Maa's Production"
                      }
                      width={900}
                      height={1200}
                      className="h-auto w-full object-cover"
                      loading="lazy"
                      unoptimized
                    />
                    </div>
                    {item.title && (
                      <figcaption className="mp-body mp-muted text-[0.78rem] px-3.5 py-2.5">
                        {item.title}
                      </figcaption>
                    )}
                  </figure>
                ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}



