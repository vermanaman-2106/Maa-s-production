"use client";

import { FormEvent, useState } from "react";
import { availabilitySchema } from "@/lib/validation";
import { z } from "zod";

const whatsappNumber =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""; // configure in env for production

type FormState = {
  name: string;
  whatsapp: string;
  weddingDate: string;
  city: string;
  company: string; // honeypot
};

const initialState: FormState = {
  name: "",
  whatsapp: "",
  weddingDate: "",
  city: "",
  company: "",
};

export default function CheckAvailabilityPage() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleChange = (
    field: keyof FormState,
    value: string,
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setServerError(null);

    const parsed = availabilitySchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const nextErrors: Partial<Record<keyof FormState, string>> = {};
      (Object.keys(fieldErrors) as (keyof FormState)[]).forEach((key) => {
        const message = fieldErrors[key]?.[0];
        if (message) nextErrors[key] = message;
      });
      setErrors(nextErrors);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/check-availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (!res.ok) {
        const message = data?.error || "Something went wrong.";
        setServerError(message);
        return;
      }

      setSuccess(true);

      // Build WhatsApp message and redirect
      if (whatsappNumber) {
        const message =
          `Hi Maa's Production, we just filled your website form to check availability.\n\n` +
          `Name: ${values.name}\n` +
          `WhatsApp: ${values.whatsapp}\n` +
          `Wedding Date: ${values.weddingDate}\n` +
          `City: ${values.city}`;

        const url = `https://wa.me/${encodeURIComponent(
          whatsappNumber.replace(/[^0-9]/g, ""),
        )}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank", "noopener,noreferrer");
      }

      setValues(initialState);
    } catch (error) {
      console.error(error);
      setServerError(
        "We couldn't send your request right now. Please try again or reach out on WhatsApp directly.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[var(--mp-bg)]">
      <section className="mp-section">
        <div className="mp-container max-w-xl">
          <p className="mp-body text-[0.8rem] tracking-[0.26em] uppercase mp-muted mb-3">
            Check Availability
          </p>
          <h1 className="mp-heading text-3xl sm:text-4xl md:text-5xl leading-[1.15] mb-4">
            Let’s see if Maa’s Production can be there.
          </h1>
          <p className="mp-body mp-muted mb-8">
            Share a few gentle details about your celebration. We’ll reply on
            WhatsApp with availability and next steps. Maa’s Production takes on
            a limited number of weddings each year to stay fully present with
            every family.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-2xl border border-[var(--mp-border)] bg-[#fffaf7] p-6 md:p-7"
            noValidate
          >
            <div className="space-y-1">
              <label
                htmlFor="name"
                className="mp-body text-[0.85rem] font-medium">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={values.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full rounded-xl border border-[var(--mp-border)] bg-[#fffaf7] px-3.5 py-2.5 mp-body text-[0.9rem] focus:outline-none focus:border-[var(--mp-accent-secondary)]"
                aria-invalid={Boolean(errors.name) || undefined}
              />
              {errors.name && (
                <p className="mp-body text-[0.8rem] text-[var(--mp-text-secondary)]">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label
                htmlFor="whatsapp"
                className="mp-body text-[0.85rem] font-medium">
                WhatsApp Number
              </label>
              <input
                id="whatsapp"
                name="whatsapp"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="Include country code, e.g. +91…"
                value={values.whatsapp}
                onChange={(e) => handleChange("whatsapp", e.target.value)}
                className="w-full rounded-xl border border-[var(--mp-border)] bg-[#fffaf7] px-3.5 py-2.5 mp-body text-[0.9rem] focus:outline-none focus:border-[var(--mp-accent-secondary)]"
                aria-invalid={Boolean(errors.whatsapp) || undefined}
              />
              {errors.whatsapp && (
                <p className="mp-body text-[0.8rem] text-[var(--mp-text-secondary)]">
                  {errors.whatsapp}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label
                htmlFor="weddingDate"
                className="mp-body text-[0.85rem] font-medium">
                Wedding Date
              </label>
              <input
                id="weddingDate"
                name="weddingDate"
                type="date"
                value={values.weddingDate}
                onChange={(e) => handleChange("weddingDate", e.target.value)}
                className="w-full rounded-xl border border-[var(--mp-border)] bg-[#fffaf7] px-3.5 py-2.5 mp-body text-[0.9rem] focus:outline-none focus:border-[var(--mp-accent-secondary)]"
                aria-invalid={Boolean(errors.weddingDate) || undefined}
              />
              {errors.weddingDate && (
                <p className="mp-body text-[0.8rem] text-[var(--mp-text-secondary)]">
                  {errors.weddingDate}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label
                htmlFor="city"
                className="mp-body text-[0.85rem] font-medium">
                City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                autoComplete="address-level2"
                value={values.city}
                onChange={(e) => handleChange("city", e.target.value)}
                className="w-full rounded-xl border border-[var(--mp-border)] bg-[#fffaf7] px-3.5 py-2.5 mp-body text-[0.9rem] focus:outline-none focus:border-[var(--mp-accent-secondary)]"
                aria-invalid={Boolean(errors.city) || undefined}
              />
              {errors.city && (
                <p className="mp-body text-[0.8rem] text-[var(--mp-text-secondary)]">
                  {errors.city}
                </p>
              )}
            </div>

            {/* Honeypot field */}
            <div className="hidden">
              <label htmlFor="company">Company</label>
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="off"
                value={values.company}
                onChange={(e) => handleChange("company", e.target.value)}
              />
            </div>

            {serverError && (
              <p className="mp-body text-[0.82rem] text-[var(--mp-text-secondary)]">
                {serverError}
              </p>
            )}

            {success && !serverError && (
              <p className="mp-body text-[0.82rem] text-[var(--mp-text-secondary)]">
                Thank you for reaching out to Maa’s Production. Your details were
                sent, and a WhatsApp window should open shortly. If it doesn’t,
                you can send us a message directly.
              </p>
            )}

            <div className="flex items-center justify-between gap-4 pt-2">
              <button
                type="submit"
                className="mp-button-primary disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={submitting}
              >
                {submitting ? "Sending…" : "Send & Open WhatsApp"}
              </button>
              <p className="mp-body text-[0.72rem] mp-muted max-w-[220px]">
                Your details are used only so Maa’s Production can respond
                personally. No newsletters, no sharing.
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}


