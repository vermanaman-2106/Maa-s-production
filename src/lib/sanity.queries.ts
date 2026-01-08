import groq from "groq";
import { sanityClient } from "./sanity.client";

export type SanityImage = {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  alt?: string;
};

export type WeddingStory = {
  _id: string;
  title: string;
  slug: string;
  location?: string;
  weddingDate?: string;
  heroImage?: SanityImage | null;
  shortIntro?: string;
  featured?: boolean;
};

export type Film = {
  _id: string;
  title: string;
  coupleNames?: string;
  slug: string;
  videoFile?: {
    _type: "file";
    asset: {
      _ref: string;
      _type: "reference";
      url?: string;
      originalFilename?: string;
      mimeType?: string;
      size?: number;
    };
  } | null;
  vimeoId?: string | null;
  thumbnail?: SanityImage | null;
  featured?: boolean;
};

export type Testimonial = {
  _id: string;
  coupleNames: string;
  locationOrContext?: string;
  quote: string;
};

export type HeroImage = {
  _id: string;
  active?: boolean;
  leftImage: SanityImage;
  rightImage: SanityImage;
  mainTagline: string;
  secondaryText?: string;
};

export type About = {
  _id: string;
  title: string;
  intro: string;
  mainImage?: SanityImage | null;
  story?: any[]; // Portable text
  values?: Array<{
    title: string;
    description?: string;
  }>;
  awards?: Array<{
    title?: string;
    year?: string;
    organization?: string;
  }>;
  contactInfo?: {
    email?: string;
    phone?: string;
    location?: string;
    socialLinks?: {
      instagram?: string;
      vimeo?: string;
      website?: string;
    };
  };
};

export type GalleryImage = {
  _id: string;
  title?: string;
  image: SanityImage;
  featured?: boolean;
};

export const featuredStoriesQuery = groq`
  *[_type == "weddingStory" && defined(slug.current) && featured == true]
  | order(weddingDate desc)[0...3]{
    _id,
    title,
    "slug": slug.current,
    location,
    weddingDate,
    heroImage,
    shortIntro,
    featured,
  }
`;

export const featuredFilmsQuery = groq`
  *[_type == "film" && defined(slug.current) && featured == true]
  | order(_createdAt desc)[0...2]{
    _id,
    title,
    coupleNames,
    "slug": slug.current,
    videoFile{
      asset->{
        _id,
        url,
        originalFilename,
        mimeType,
        size
      }
    },
    vimeoId,
    thumbnail{
      asset->{
        _id,
        _ref,
        _type
      },
      alt
    },
    featured,
  }
`;

export const homeTestimonialQuery = groq`
  *[_type == "testimonial" && defined(quote)]
  | order(_createdAt desc)[0]{
    _id,
    coupleNames,
    locationOrContext,
    quote,
  }
`;

export const homeTestimonialsQuery = groq`
  *[_type == "testimonial" && defined(quote)]
  | order(_createdAt desc)[0...5]{
    _id,
    coupleNames,
    locationOrContext,
    quote,
  }
`;

export const heroImageQuery = groq`
  *[_type == "heroImage" && active == true]
  | order(_createdAt desc)[0]{
    _id,
    active,
    leftImage,
    rightImage,
    mainTagline,
    secondaryText,
  }
`;

export async function getFeaturedWeddingStories() {
  return sanityClient.fetch<WeddingStory[]>(featuredStoriesQuery);
}

export async function getFeaturedFilms() {
  return sanityClient.fetch<Film[]>(featuredFilmsQuery);
}

export async function getHomeTestimonial() {
  return sanityClient.fetch<Testimonial | null>(homeTestimonialQuery);
}

export async function getHomeTestimonials() {
  return sanityClient.fetch<Testimonial[]>(homeTestimonialsQuery);
}

export async function getHeroImage() {
  return sanityClient.fetch<HeroImage | null>(heroImageQuery);
}

export const aboutQuery = groq`
  *[_type == "about"][0]{
    _id,
    title,
    intro,
    mainImage,
    story,
    values,
    awards,
    contactInfo,
  }
`;

export async function getAbout() {
  return sanityClient.fetch<About | null>(aboutQuery);
}

export const featuredGalleryImagesQuery = groq`
  *[_type == "galleryImage" && defined(image.asset) && featured == true]
  | order(_createdAt desc)[0...6]{
    _id,
    title,
    image,
    featured,
  }
`;

export async function getFeaturedGalleryImages() {
  return sanityClient.fetch<GalleryImage[]>(featuredGalleryImagesQuery);
}



