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

export const contactSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required.")
    .max(60, "First name is too long."),
  lastName: z
    .string()
    .min(1, "Last name is required.")
    .max(60, "Last name is too long."),
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please enter a valid email address.")
    .max(120, "Email is too long."),
  subject: z
    .string()
    .min(2, "Subject is required.")
    .max(200, "Subject is too long."),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters.")
    .max(2000, "Message is too long."),
  // Honeypot - must remain empty
  company: z.string().optional(),
});

export type ContactPayload = z.infer<typeof contactSchema>;



