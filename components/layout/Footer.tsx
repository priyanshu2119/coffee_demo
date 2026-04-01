"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/story", label: "Our Story" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reserve", label: "Reserve" },
];

// Custom social icons since lucide-react doesn't include brand icons
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const socialLinks = [
  { href: "https://instagram.com", icon: InstagramIcon, label: "Instagram" },
  { href: "https://facebook.com", icon: FacebookIcon, label: "Facebook" },
  { href: "https://twitter.com", icon: TwitterIcon, label: "Twitter" },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bgText = bgTextRef.current;
    if (!bgText) return;

    gsap.fromTo(
      bgText,
      { yPercent: 50, opacity: 0 },
      {
        yPercent: 0,
        opacity: 0.08,
        ease: "none",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-espresso overflow-hidden"
      style={{ backgroundColor: "var(--color-espresso)" }}
    >
      {/* Large Background Text */}
      <div
        ref={bgTextRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        style={{ opacity: 0 }}
      >
        <span
          className="text-roast whitespace-nowrap"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(8rem, 20vw, 20rem)",
            fontWeight: 300,
            letterSpacing: "-0.02em",
            color: "var(--color-roast)",
          }}
        >
          VESPER
        </span>
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-24 pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link
              href="/"
              className="inline-block font-display text-2xl text-cream"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontWeight: 500,
                letterSpacing: "0.05em",
              }}
            >
              VESPER COFFEE
            </Link>
            <p
              className="text-latte italic max-w-xs"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "var(--text-lead)",
              }}
            >
              Where every cup tells a story
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-latte/30 flex items-center justify-center text-latte hover:border-terracotta hover:text-terracotta transition-colors"
                  aria-label={social.label}
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4
              className="text-label text-terracotta"
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
            >
              Navigate
            </h4>
            <nav className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-cream hover:text-terracotta transition-colors"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Hours */}
          <div className="space-y-6">
            <h4
              className="text-label text-terracotta"
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
            >
              Hours
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between text-cream">
                <span style={{ fontFamily: "var(--font-dm-sans)" }}>
                  Monday – Friday
                </span>
                <span
                  className="text-latte"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  7am – 7pm
                </span>
              </div>
              <div className="flex justify-between text-cream">
                <span style={{ fontFamily: "var(--font-dm-sans)" }}>
                  Saturday – Sunday
                </span>
                <span
                  className="text-latte"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  8am – 8pm
                </span>
              </div>
              <div className="pt-4 border-t border-latte/20">
                <p
                  className="text-small text-muted italic"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  Kitchen closes 30 minutes before close
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4
              className="text-label text-terracotta"
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
            >
              Contact
            </h4>
            <div className="space-y-4">
              <div>
                <p
                  className="text-cream"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  12 Merchant Lane
                </p>
                <p
                  className="text-latte"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  The Old Quarter
                </p>
              </div>
              <div>
                <a
                  href="tel:+15550123456"
                  className="text-cream hover:text-terracotta transition-colors block"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  +1 (555) 012-3456
                </a>
                <a
                  href="mailto:hello@vespercoffee.com"
                  className="text-latte hover:text-terracotta transition-colors block"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  hello@vespercoffee.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-latte/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p
            className="text-micro text-muted"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            © {new Date().getFullYear()} Vesper Coffee. All rights reserved.
          </p>
          <p
            className="text-micro text-muted flex items-center gap-1"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Made with{" "}
            <span className="text-terracotta" aria-label="love">
              ♥
            </span>{" "}
            and Coffee
          </p>
        </div>
      </div>
    </footer>
  );
}
