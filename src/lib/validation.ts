import { z } from "zod";

export const availabilitySchema = z.object({
  name: z
    .string()
    .min(2, "Please share your full name.")
    .max(120, "Name feels a little too long."),
  whatsapp: z
    .string()
    .min(8, "Please enter a valid WhatsApp number.")
    .max(20, "WhatsApp number looks too long.")
    .regex(/^[+0-9\s-]+$/, "Use digits only, with country code if needed."),
  weddingDate: z.string().refine((value) => {
    if (!value) return false;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return false;
    const now = new Date();
    // allow same-day and future dates
    return date >= new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }, "Please choose a valid wedding date (today or later)."),
  city: z
    .string()
    .min(2, "Which city are you celebrating in?")
    .max(120, "City name feels a little too long."),
  // Honeypot - must remain empty
  company: z.string().optional(),
});

export type AvailabilityPayload = z.infer<typeof availabilitySchema>;


