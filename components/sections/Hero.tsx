"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Listen for preloader complete event
    const handlePreloaderComplete = () => {
      setIsLoaded(true);
    };

    window.addEventListener("preloaderComplete", handlePreloaderComplete);

    // If preloader already complete (e.g., navigating back)
    const timeout = setTimeout(() => {
      setIsLoaded(true);
    }, 3000);

    return () => {
      window.removeEventListener("preloaderComplete", handlePreloaderComplete);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const hero = heroRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const scrollIndicator = scrollIndicatorRef.current;

    if (!hero || !image || !content) return;

    // Hero entrance animation timeline
    const tl = gsap.timeline({ delay: 0.2 });

    // Animate eyebrow
    tl.from(".hero-eyebrow", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power2.out",
    });

    // Animate title lines
    tl.from(
      ".hero-title-line",
      {
        opacity: 0,
        y: 60,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      },
      "-=0.2"
    );

    // Animate divider
    tl.from(
      ".hero-divider",
      {
        scaleX: 0,
        transformOrigin: "left",
        duration: 0.8,
        ease: "power2.inOut",
      },
      "-=0.4"
    );

    // Animate body text
    tl.from(
      ".hero-body",
      {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.5"
    );

    // Animate buttons
    tl.from(
      ".hero-buttons",
      {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.4"
    );

    // Animate scroll indicator
    if (scrollIndicator) {
      tl.from(
        scrollIndicator,
        {
          opacity: 0,
          y: -10,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.2"
      );
    }

    // Parallax effect on hero image
    gsap.to(image, {
      yPercent: 40,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Fade out scroll indicator on scroll
    if (scrollIndicator) {
      gsap.to(scrollIndicator, {
        opacity: 0,
        y: -20,
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "20% top",
          scrub: true,
        },
      });
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isLoaded]);

  return (
    <section
      ref={heroRef}
      className="relative h-svh w-full overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        <Image
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop"
          alt="Vesper Coffee interior - warm ambient lighting and cozy atmosphere"
          fill
          priority
          quality={90}
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "var(--color-overlay)" }}
        />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <div className="max-w-4xl mx-auto">
          {/* Eyebrow */}
          <p
            className="hero-eyebrow text-label text-latte mb-6"
            style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
          >
            Est. 2019 · Specialty Coffee
          </p>

          {/* Title */}
          <h1
            className="text-hero text-cream mb-8"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 300,
              fontStyle: "italic",
              lineHeight: "var(--leading-tight)",
              letterSpacing: "var(--tracking-hero)",
            }}
          >
            <span className="hero-title-line block">Where Every Cup</span>
            <span className="hero-title-line block">Tells a Story</span>
          </h1>

          {/* Divider */}
          <div className="hero-divider divider mx-auto mb-8" />

          {/* Body */}
          <p
            className="hero-body text-lead text-cream/90 max-w-md mx-auto mb-10"
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontWeight: 300,
              lineHeight: "var(--leading-normal)",
            }}
          >
            Handcrafted coffee, seasonal ingredients, and a space
            designed to slow you down.
          </p>

          {/* Buttons */}
          <div className="hero-buttons flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/menu" className="btn btn-primary">
              View Our Menu
            </Link>
            <Link href="/story" className="btn btn-secondary group">
              Our Story
              <span className="inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          className="text-micro text-latte tracking-widest uppercase"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Scroll
        </span>
        <div className="w-px h-8 bg-latte/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-terracotta animate-bounce" />
        </div>
        <ChevronDown className="w-4 h-4 text-latte animate-bounce" />
      </div>
    </section>
  );
}
