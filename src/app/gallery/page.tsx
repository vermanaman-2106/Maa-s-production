import { sanityClient } from "@/lib/sanity.client";
import groq from "groq";
import { GalleryGrid } from "@/components/gallery-grid";

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
  const images = await sanityClient
    .fetch<GalleryImageDoc[]>(galleryQuery)
    .catch(() => []);

  return (
    <div className="bg-[var(--mp-bg)]">
      <section className="mp-section">
        <div className="mp-container mb-12">
          <p className="mp-body text-[0.8rem] tracking-[0.26em] uppercase mp-muted mb-3">
            Gallery
          </p>
          <h1 className="mp-heading text-3xl sm:text-4xl md:text-5xl leading-[1.15] mb-4">
            A quiet highlight reel of Maa's Production.
          </h1>
          <p className="mp-body mp-muted max-w-2xl mb-10">
            A curated selection of images from weddings, pre-weddings and family
            moments we've documented. Soft light, honest expressions and the way
            people hold each other when they think no one is looking.
          </p>
        </div>

        <GalleryGrid images={images} />
      </section>
    </div>
  );
}



