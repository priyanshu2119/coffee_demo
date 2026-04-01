"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/story", label: "Our Story" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reserve", label: "Reserve" },
];

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      
      // Animate menu items
      const items = mobileMenuRef.current?.querySelectorAll(".mobile-nav-item");
      if (items) {
        gsap.fromTo(
          items,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
            delay: 0.2,
          }
        );
      }
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-navigation transition-all duration-500 ${
          isScrolled
            ? "bg-surface-dark backdrop-blur-md py-4"
            : "bg-transparent py-6"
        }`}
        style={{
          backgroundColor: isScrolled ? "var(--color-surface-dark)" : "transparent",
        }}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="font-display text-lg tracking-widest uppercase text-cream hover:text-latte transition-colors"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 500 }}
            >
              Vesper Coffee
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link text-cream text-small tracking-widest uppercase transition-colors hover:text-latte"
                  style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA Button - Desktop */}
            <Link
              href="/reserve"
              className="hidden lg:inline-flex btn btn-secondary text-small"
            >
              Book a Table
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden relative w-8 h-6 flex flex-col justify-between items-center"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <span
                className={`w-full h-0.5 bg-cream transition-all duration-300 origin-left ${
                  isMobileMenuOpen ? "rotate-45 translate-x-0.5" : ""
                }`}
              />
              <span
                className={`w-full h-0.5 bg-cream transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`w-full h-0.5 bg-cream transition-all duration-300 origin-left ${
                  isMobileMenuOpen ? "-rotate-45 translate-x-0.5" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        className={`fixed inset-0 z-modal lg:hidden transition-all duration-500 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: "var(--color-espresso)" }}
      >
        <div className="container mx-auto px-6 pt-24 pb-12 h-full flex flex-col">
          {/* Mobile Nav Links */}
          <nav className="flex-1 flex flex-col justify-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="mobile-nav-item text-display text-cream hover:text-terracotta transition-colors"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontWeight: 300,
                  fontStyle: "italic",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Footer Info */}
          <div className="border-t border-latte/20 pt-8 space-y-4">
            <div className="flex flex-col gap-1">
              <span
                className="text-label text-latte"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Location
              </span>
              <span className="text-cream">12 Merchant Lane, The Old Quarter</span>
            </div>
            <div className="flex flex-col gap-1">
              <span
                className="text-label text-latte"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Hours
              </span>
              <span className="text-cream">Mon–Fri 7am–7pm</span>
              <span className="text-cream">Sat–Sun 8am–8pm</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
