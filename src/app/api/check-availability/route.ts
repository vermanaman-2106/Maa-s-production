import { NextResponse } from "next/server";
import { availabilitySchema } from "@/lib/validation";
import { sendAvailabilityEmail } from "@/lib/email";
import { sanityWriteClient, canWriteToSanity } from "@/lib/sanity.client";

const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5;

const ipHits = new Map<string, { count: number; first: number }>();

function rateLimit(ip: string) {
  const now = Date.now();
  const existing = ipHits.get(ip);
  if (!existing) {
    ipHits.set(ip, { count: 1, first: now });
    return false;
  }

  if (now - existing.first > RATE_LIMIT_WINDOW_MS) {
    ipHits.set(ip, { count: 1, first: now });
    return false;
  }

  existing.count += 1;
  if (existing.count > RATE_LIMIT_MAX) {
    return true;
  }

  return false;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";

  if (rateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a moment." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const parsed = availabilitySchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return NextResponse.json(
      { error: "Validation failed.", fieldErrors },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Honeypot: if company is filled, silently accept but do nothing.
  if (data.company && data.company.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  try {
    // Save lead to Sanity CMS (if write client is configured)
    if (canWriteToSanity() && sanityWriteClient) {
      try {
        await sanityWriteClient.create({
          _type: "lead",
          name: data.name,
          whatsapp: data.whatsapp,
          weddingDate: data.weddingDate || undefined,
          city: data.city,
          source: "Website form",
        });
      } catch (sanityError) {
        // Log Sanity error but don't fail the request
        // This ensures email still gets sent even if Sanity fails
        console.error("Failed to save lead to Sanity:", sanityError);
      }
    } else {
      console.warn(
        "Sanity write client not configured. Set SANITY_API_WRITE_TOKEN to save leads to Sanity.",
      );
    }

    // Send email notification
    await sendAvailabilityEmail(data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to send availability email", error);
    return NextResponse.json(
      {
        error:
          "We couldn't send your message right now. Please try again in a few minutes or reach out on WhatsApp directly.",
      },
      { status: 500 },
    );
  }
}



