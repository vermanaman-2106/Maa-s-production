"use client";

import { FormEvent, useState } from "react";
import { contactSchema } from "@/lib/validation";
import { z } from "zod";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  company: string; // honeypot
};

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  subject: "",
  message: "",
  company: "",
};

export function HomeContactSection() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleChange = (field: keyof FormState, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setServerError(null);

    const parsed = contactSchema.safeParse(values);
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
      const res = await fetch("/api/contact", {
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
      setValues(initialState);
    } catch (error) {
      console.error(error);
      setServerError(
        "We couldn't send your message right now. Please try again later.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="w-full border-b border-[var(--mp-border)] bg-[var(--mp-bg)]">
      <div className="w-full max-w-[1920px] mx-auto px-8 md:px-12 lg:px-16 xl:px-20 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
          {/* Left Column: Text Area */}
          <div className="flex flex-col justify-center">
            <h2 className="mp-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] tracking-[0.05em] uppercase mb-6 md:mb-8">
              <span className="block">LET'S</span>
              <span className="block">WORK</span>
              <span className="block">TOGETHER</span>
            </h2>
            <p className="mp-body text-base md:text-lg lg:text-xl leading-relaxed max-w-xl">
              Have a question or want to discuss your wedding plans? We'd love to
              hear from you. Reach out and let's start a conversation about
              capturing your special day.
            </p>
          </div>

          {/* Right Column: Form Area */}
          <div>
            <form
              onSubmit={handleSubmit}
              className="space-y-6 rounded-2xl border border-[var(--mp-border)] bg-[#fffaf7] p-6 md:p-8"
              noValidate
            >
              {/* First Name and Last Name side by side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label
                    htmlFor="firstName"
                    className="mp-body text-[0.85rem] font-medium"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    value={values.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    className="w-full rounded-xl border border-[var(--mp-border)] bg-white px-3.5 py-2.5 mp-body text-[0.9rem] focus:outline-none focus:border-[var(--mp-accent-secondary)] transition-colors"
                    aria-invalid={Boolean(errors.firstName) || undefined}
                  />
                  {errors.firstName && (
                    <p className="mp-body text-[0.8rem] text-[var(--mp-text-secondary)]">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="lastName"
                    className="mp-body text-[0.85rem] font-medium"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    value={values.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    className="w-full rounded-xl border border-[var(--mp-border)] bg-white px-3.5 py-2.5 mp-body text-[0.9rem] focus:outline-none focus:border-[var(--mp-accent-secondary)] transition-colors"
                    aria-invalid={Boolean(errors.lastName) || undefined}
                  />
                  {errors.lastName && (
                    <p className="mp-body text-[0.8rem] text-[var(--mp-text-secondary)]">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="mp-body text-[0.85rem] font-medium"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full rounded-xl border border-[var(--mp-border)] bg-white px-3.5 py-2.5 mp-body text-[0.9rem] focus:outline-none focus:border-[var(--mp-accent-secondary)] transition-colors"
                  aria-invalid={Boolean(errors.email) || undefined}
                />
                {errors.email && (
                  <p className="mp-body text-[0.8rem] text-[var(--mp-text-secondary)]">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Subject */}
              <div className="space-y-1">
                <label
                  htmlFor="subject"
                  className="mp-body text-[0.85rem] font-medium"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={values.subject}
                  onChange={(e) => handleChange("subject", e.target.value)}
                  className="w-full rounded-xl border border-[var(--mp-border)] bg-white px-3.5 py-2.5 mp-body text-[0.9rem] focus:outline-none focus:border-[var(--mp-accent-secondary)] transition-colors"
                  aria-invalid={Boolean(errors.subject) || undefined}
                />
                {errors.subject && (
                  <p className="mp-body text-[0.8rem] text-[var(--mp-text-secondary)]">
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label
                  htmlFor="message"
                  className="mp-body text-[0.85rem] font-medium"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={values.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  className="w-full rounded-xl border border-[var(--mp-border)] bg-white px-3.5 py-2.5 mp-body text-[0.9rem] focus:outline-none focus:border-[var(--mp-accent-secondary)] transition-colors resize-none"
                  aria-invalid={Boolean(errors.message) || undefined}
                />
                {errors.message && (
                  <p className="mp-body text-[0.8rem] text-[var(--mp-text-secondary)]">
                    {errors.message}
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

              {/* Error message */}
              {serverError && (
                <p className="mp-body text-[0.82rem] text-[var(--mp-text-secondary)]">
                  {serverError}
                </p>
              )}

              {/* Success message */}
              {success && !serverError && (
                <div className="rounded-xl border border-[var(--mp-accent)] bg-[#fffaf7] p-4">
                  <p className="mp-body text-[0.9rem] text-[var(--mp-text-primary)]">
                    Thank you for reaching out! We've received your message and will
                    get back to you soon.
                  </p>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                className="w-full mp-button-primary disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                disabled={submitting}
              >
                {submitting ? "Sending…" : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

