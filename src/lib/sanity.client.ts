import {createClient} from "@sanity/client";
import {createImageUrlBuilder} from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

if (!projectId || !dataset) {
  console.warn(
    "Sanity projectId / dataset are not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET.",
  );
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

// Server-side client with write permissions (for API routes)
// Requires SANITY_API_WRITE_TOKEN environment variable
export const sanityWriteClient = projectId && dataset
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false, // Don't use CDN for writes
      token: process.env.SANITY_API_WRITE_TOKEN,
    })
  : null;

// Helper function to check if write client is available
export function canWriteToSanity(): boolean {
  return (
    !!sanityWriteClient &&
    !!process.env.SANITY_API_WRITE_TOKEN &&
    !!projectId &&
    !!dataset
  );
}

const builder = createImageUrlBuilder({projectId: projectId || "", dataset: dataset || ""});

export function urlForImage(source: any) {
  return builder.image(source).auto("format").fit("max");
}



