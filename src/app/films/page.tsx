import { sanityClient } from "@/lib/sanity.client";
import groq from "groq";
import { VideoPlayer } from "@/components/video-player";

const filmsQuery = groq`
  *[_type == "film" && defined(slug.current)]
  | order(_createdAt desc){
    _id,
    title,
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
    thumbnail,
  }
`;

type Film = {
  _id: string;
  title: string;
  slug: string;
  videoFile?: {
    asset: {
      _id: string;
      url: string;
      originalFilename?: string;
      mimeType?: string;
      size?: number;
    };
  } | null;
  vimeoId?: string | null;
  thumbnail?: {
    _type: "image";
    asset: { _ref: string; _type: "reference" };
    alt?: string;
  } | null;
};

export const revalidate = 60;

export default async function FilmsPage() {
  const films = await sanityClient.fetch<Film[]>(filmsQuery).catch(() => []);

  return (
    <div className="bg-[var(--mp-bg)]">
      <section className="mp-section border-b border-[var(--mp-border)]">
        <div className="mp-container space-y-8">
          <header>
            <p className="mp-body text-[0.78rem] tracking-[0.26em] uppercase mp-muted mb-3">
              Films
            </p>
            <h1 className="mp-section-title">Wedding Films</h1>
            <p className="mp-body mp-muted max-w-2xl mt-4">
              Moving, not just moving images. A collection of cinematic wedding
              films that capture the emotion and essence of each celebration.
            </p>
          </header>

          {films.length === 0 ? (
            <p className="mp-body mp-muted text-[0.85rem]">
              Wedding films from Maa's Production will appear here once you
              start publishing them in Sanity Studio.
            </p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {films.map((film) => (
                <article
                  key={film._id}
                  className="space-y-3 rounded-2xl border border-[var(--mp-border)] bg-[#fffaf7] p-4"
                >
                  <div className="space-y-3">
                    <VideoPlayer
                      videoUrl={film.videoFile?.asset?.url || null}
                      vimeoId={film.vimeoId || null}
                      thumbnail={film.thumbnail || null}
                      title={film.title}
                      className="border border-[var(--mp-border)]"
                    />
                    <div className="space-y-1">
                      <h3 className="mp-heading text-sm tracking-[0.18em] uppercase">
                        {film.title}
                      </h3>
                      <p className="mp-body mp-muted text-[0.8rem]">
                        A gentle, cinematic glimpse into the day your families
                        become one.
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

