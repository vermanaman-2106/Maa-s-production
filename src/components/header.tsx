"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const primaryNavItems = [
  { href: "/wedding-stories", label: "Stories" },
  { href: "/films", label: "Films" },
  { href: "/pre-wedding", label: "Pre-Wedding" },
];

const secondaryNavItems = [
  { href: "/gallery", label: "Gallery" },
  { href: "/albums", label: "Albums" },
];

const socialLinks = [
  { href: "https://instagram.com", label: "Instagram", icon: "IG" }
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b border-[var(--mp-border)] transition-all duration-300 ${
          scrolled
            ? "bg-[var(--mp-bg)]/98 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.02)]"
            : "bg-[var(--mp-bg)]/95 backdrop-blur-sm"
        }`}
      >
        <nav className="w-full max-w-[1920px] mx-auto px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="flex items-center justify-between h-20 md:h-[88px]">
            {/* Left: Primary Navigation */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8 flex-1 min-w-0">
              {primaryNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="mp-body text-[0.7rem] md:text-[0.75rem] tracking-[0.2em] uppercase text-[color:var(--mp-text-secondary)] hover:text-[color:var(--mp-text-primary)] transition-colors duration-300 whitespace-nowrap relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--mp-text-primary)] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Center: Brand Title */}
            <Link
              href="/"
              className="flex flex-col items-center justify-center absolute left-1/2 -translate-x-1/2 z-10 px-4"
            >
              <span className="mp-heading text-xl md:text-2xl lg:text-[1.75rem] tracking-[0.15em] uppercase leading-none">
                Maa's Production
              </span>
              <span className="mp-body text-[0.6rem] md:text-[0.65rem] mp-muted tracking-[0.3em] uppercase mt-1 font-light">
                Photography
              </span>
            </Link>

            {/* Right: Secondary Nav + Social + CTA */}
            <div className="hidden lg:flex items-center gap-5 xl:gap-6 flex-1 justify-end min-w-0">
              {/* Secondary Navigation */}
              <div className="flex items-center gap-5 xl:gap-6">
                {secondaryNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="mp-body text-[0.7rem] md:text-[0.75rem] tracking-[0.2em] uppercase text-[color:var(--mp-text-secondary)] hover:text-[color:var(--mp-text-primary)] transition-colors duration-300 whitespace-nowrap relative group"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--mp-text-primary)] transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
              </div>

              {/* Divider */}
              <div className="w-[1px] h-3 bg-[var(--mp-border)] mx-1" />

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {socialLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mp-body text-[0.65rem] md:text-[0.7rem] tracking-[0.25em] uppercase text-[color:var(--mp-text-secondary)] hover:text-[color:var(--mp-text-primary)] transition-colors duration-300"
                    aria-label={item.label}
                  >
                    {item.icon}
                  </Link>
                ))}
              </div>

              {/* CTA Button */}
              <Link
                href="/check-availability"
                className="mp-button-primary text-[0.7rem] px-4 md:px-5 py-2 md:py-2.5 ml-3 whitespace-nowrap"
              >
                Inquire
              </Link>
            </div>

            {/* Mobile: Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-2 -mr-2 z-50 relative"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <span
                className={`w-5 h-[1.5px] bg-[var(--mp-text-primary)] transition-all duration-300 ${
                  mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`w-5 h-[1.5px] bg-[var(--mp-text-primary)] transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`w-5 h-[1.5px] bg-[var(--mp-text-primary)] transition-all duration-300 ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-[var(--mp-bg)] z-40 lg:hidden transition-opacity duration-500 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`flex flex-col h-full pt-28 px-8 transition-transform duration-500 ease-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <nav className="flex flex-col gap-1">
            {/* Primary Nav */}
            {primaryNavItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="mp-body text-2xl tracking-[0.2em] uppercase text-[color:var(--mp-text-primary)] py-4 border-b border-[var(--mp-border)] transition-colors hover:text-[color:var(--mp-accent)]"
              >
                {item.label}
              </Link>
            ))}

            {/* Secondary Nav */}
            {secondaryNavItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="mp-body text-2xl tracking-[0.2em] uppercase text-[color:var(--mp-text-primary)] py-4 border-b border-[var(--mp-border)] transition-colors hover:text-[color:var(--mp-accent)]"
              >
                {item.label}
              </Link>
            ))}

            {/* Social Links */}
            <div className="flex items-center gap-6 pt-6 pb-4">
              {socialLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mp-body text-sm tracking-[0.25em] uppercase text-[color:var(--mp-text-secondary)] hover:text-[color:var(--mp-text-primary)] transition-colors"
                  aria-label={item.label}
                >
                  {item.icon}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              href="/check-availability"
              onClick={() => setMobileMenuOpen(false)}
              className="mp-button-primary text-[0.875rem] px-8 py-4 mt-6 w-full text-center"
            >
              Check Availability
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}

