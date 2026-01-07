import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { PageTransition } from "../components/page-transition";
import { Header } from "../components/header";

export const metadata: Metadata = {
  title: "Maa's Production — Wedding Photography & Films",
  description:
    "Maa's Production is a Delhi-based wedding photography and filmmaking studio, crafting emotional, timeless stories for couples and families.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400&family=Cormorant+Garamond:wght@300;400&family=Bodoni+Moda:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-background text-foreground">
        <div className="flex min-h-svh flex-col bg-[var(--mp-bg)] text-[var(--mp-text-primary)]">
          <Header />

          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>

          <footer className="border-t border-[var(--mp-border)]">
            <div className="mp-container flex flex-col gap-4 py-8 text-xs md:flex-row md:items-center md:justify-between">
              <p className="mp-body mp-muted">
                © {new Date().getFullYear()} Maa's Production. Crafted in Delhi
                with love for families and timeless wedding stories.
              </p>
              <p className="mp-body mp-muted">
                Limited weddings accepted per year to maintain quality.
              </p>
            </div>
          </footer>

          {/* Sticky mobile CTA */}
          <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--mp-border)] bg-[var(--mp-bg)]/95 backdrop-blur-sm md:hidden">
            <div className="mp-container flex items-center justify-between gap-3 py-3">
              <div className="flex flex-col">
                <span className="mp-body text-[0.78rem] mp-muted uppercase tracking-[0.2em]">
                  Ready to talk about your wedding?
                </span>
                <span className="mp-body text-[0.8rem]">
                  Check dates for Maa's Production.
                </span>
              </div>
              <Link
                href="/check-availability"
                className="mp-button-primary whitespace-nowrap text-[0.75rem] px-4 py-2"
              >
                Check Availability
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
