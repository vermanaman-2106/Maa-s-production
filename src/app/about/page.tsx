import Image from "next/image";
import Link from "next/link";
import { getAbout } from "@/lib/sanity.queries";
import { urlForImage } from "@/lib/sanity.client";

export const revalidate = 60;

export default async function AboutPage() {
  const about = await getAbout().catch(() => null);

  if (!about) {
    return (
      <div className="bg-[var(--mp-bg)] min-h-screen">
        <section className="mp-section">
          <div className="mp-container">
            <p className="mp-body mp-muted">
              About content will appear here once it's added in Sanity Studio.
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-[var(--mp-bg)]">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden border-b border-[var(--mp-border)]">
        {about.mainImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={urlForImage(about.mainImage).width(1920).quality(90).url()}
              alt={about.mainImage.alt || "About Maa's Production"}
              fill
              priority
              className="object-cover"
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
          </div>
        )}

        <div className="relative z-10 mp-container px-6 md:px-8 text-center">
          <h1 className="mp-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-4 tracking-[0.12em] uppercase">
            {about.title}
          </h1>
          {about.intro && (
            <p className="mp-body text-white/90 text-lg md:text-xl max-w-2xl mx-auto">
              {about.intro}
            </p>
          )}
        </div>
      </section>

      {/* Story Section */}
      {about.story && about.story.length > 0 && (
        <section className="mp-section border-b border-[var(--mp-border)]">
          <div className="mp-container max-w-3xl">
            <div className="prose prose-lg max-w-none">
              {about.story.map((block: any, index: number) => {
                if (block._type === "block") {
                  const text = block.children
                    ?.map((child: any) => child.text)
                    .join("") || "";
                  
                  if (block.style === "h2") {
                    return (
                      <h2
                        key={index}
                        className="mp-heading text-2xl md:text-3xl mb-4 mt-8 tracking-[0.08em] uppercase"
                      >
                        {text}
                      </h2>
                    );
                  }
                  if (block.style === "h3") {
                    return (
                      <h3
                        key={index}
                        className="mp-heading text-xl md:text-2xl mb-3 mt-6 tracking-[0.08em] uppercase"
                      >
                        {text}
                      </h3>
                    );
                  }
                  return (
                    <p key={index} className="mp-body mb-4 leading-relaxed">
                      {text}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </section>
      )}

      {/* Values Section */}
      {about.values && about.values.length > 0 && (
        <section className="mp-section border-b border-[var(--mp-border)] bg-[#fffaf7]">
          <div className="mp-container">
            <h2 className="mp-section-title text-center mb-12">
              Our Philosophy
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              {about.values.map((value, index) => (
                <div
                  key={index}
                  className="space-y-3 border border-[var(--mp-border)] rounded-2xl p-6 bg-white"
                >
                  <h3 className="mp-heading text-lg tracking-[0.18em] uppercase">
                    {value.title}
                  </h3>
                  {value.description && (
                    <p className="mp-body mp-muted text-sm leading-relaxed">
                      {value.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Awards Section */}
      {about.awards && about.awards.length > 0 && (
        <section className="mp-section border-b border-[var(--mp-border)]">
          <div className="mp-container max-w-3xl">
            <h2 className="mp-section-title text-center mb-12">
              Recognition
            </h2>
            <div className="space-y-6">
              {about.awards.map((award, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 pb-6 border-b border-[var(--mp-border)] last:border-0"
                >
                  <div>
                    <h3 className="mp-heading text-base tracking-[0.18em] uppercase">
                      {award.title}
                    </h3>
                    {award.organization && (
                      <p className="mp-body mp-muted text-sm mt-1">
                        {award.organization}
                      </p>
                    )}
                  </div>
                  {award.year && (
                    <span className="mp-body mp-muted text-sm">{award.year}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {about.contactInfo && (
        <section className="mp-section">
          <div className="mp-container max-w-3xl">
            <h2 className="mp-section-title text-center mb-12">Get in Touch</h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-4">
                {about.contactInfo.location && (
                  <div>
                    <p className="mp-body text-[0.75rem] tracking-[0.18em] uppercase mp-muted mb-1">
                      Location
                    </p>
                    <p className="mp-body">{about.contactInfo.location}</p>
                  </div>
                )}
                {about.contactInfo.email && (
                  <div>
                    <p className="mp-body text-[0.75rem] tracking-[0.18em] uppercase mp-muted mb-1">
                      Email
                    </p>
                    <a
                      href={`mailto:${about.contactInfo.email}`}
                      className="mp-body hover:text-[var(--mp-accent)] transition-colors"
                    >
                      {about.contactInfo.email}
                    </a>
                  </div>
                )}
                {about.contactInfo.phone && (
                  <div>
                    <p className="mp-body text-[0.75rem] tracking-[0.18em] uppercase mp-muted mb-1">
                      Phone
                    </p>
                    <a
                      href={`tel:${about.contactInfo.phone}`}
                      className="mp-body hover:text-[var(--mp-accent)] transition-colors"
                    >
                      {about.contactInfo.phone}
                    </a>
                  </div>
                )}
              </div>

              {about.contactInfo.socialLinks && (
                <div className="space-y-4">
                  <p className="mp-body text-[0.75rem] tracking-[0.18em] uppercase mp-muted mb-1">
                    Connect
                  </p>
                  <div className="flex flex-col gap-3">
                    {about.contactInfo.socialLinks.instagram && (
                      <a
                        href={about.contactInfo.socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mp-body hover:text-[var(--mp-accent)] transition-colors"
                      >
                        Instagram
                      </a>
                    )}
                    {about.contactInfo.socialLinks.vimeo && (
                      <a
                        href={about.contactInfo.socialLinks.vimeo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mp-body hover:text-[var(--mp-accent)] transition-colors"
                      >
                        Vimeo
                      </a>
                    )}
                    {about.contactInfo.socialLinks.website && (
                      <a
                        href={about.contactInfo.socialLinks.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mp-body hover:text-[var(--mp-accent)] transition-colors"
                      >
                        Website
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/check-availability"
                className="mp-button-primary inline-block"
              >
                Check Availability
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

