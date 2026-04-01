"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const storyChapters = [
  {
    number: "01",
    title: "Origin",
    quote: "It started with a single cup shared between two friends...",
    text: "In 2019, two coffee lovers with a dream decided that their city deserved better coffee. Not coffee that was just good, but coffee that meant something. Coffee that connected people.",
  },
  {
    number: "02",
    title: "Craft",
    quote: "Every bean is sourced directly from farmers we've met in person...",
    text: "We travel to origin countries twice a year. We know the families who grow our coffee. We taste hundreds of samples to find the ones that make us stop and say 'this is it.'",
  },
  {
    number: "03",
    title: "Community",
    quote: "This is more than a cafe. It's your living room...",
    text: "We've hosted first dates, business deals, study sessions, and life-changing conversations. Our tables have heard secrets, celebrated wins, and comforted losses. This is what we built Vesper for.",
  },
];

export function Story() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const progress = progressRef.current;

    if (!section || !container || !progress) return;

    // Check if mobile
    const isMobile = window.innerWidth < 1024;

    if (isMobile) {
      // Simple fade-in animations for mobile
      const chapters = container.querySelectorAll(".story-chapter");
      chapters.forEach((chapter) => {
        gsap.from(chapter, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: chapter,
            start: "top 80%",
          },
        });
      });
      return;
    }

    // Desktop: Pinned scroll experience
    const chapters = container.querySelectorAll(".story-chapter");
    const totalChapters = chapters.length;

    // Pin the section
    const pinTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${totalChapters * 100}%`,
      pin: true,
      scrub: 1.5,
    });

    // Create timeline for chapter transitions
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${totalChapters * 100}%`,
        scrub: 1.5,
      },
    });

    // Animate each chapter
    chapters.forEach((chapter, index) => {
      const content = chapter.querySelector(".chapter-content");
      const number = chapter.querySelector(".chapter-number");

      if (index === 0) {
        // First chapter starts visible
        gsap.set(chapter, { opacity: 1, zIndex: 10 });
      } else {
        // Other chapters start hidden
        gsap.set(chapter, { opacity: 0, zIndex: index });
      }

      if (index > 0) {
        // Fade in current chapter
        tl.to(
          chapter,
          {
            opacity: 1,
            duration: 0.5,
          },
          `chapter${index}`
        );

        // Fade out previous chapter
        tl.to(
          chapters[index - 1],
          {
            opacity: 0,
            duration: 0.5,
          },
          `chapter${index}`
        );
      }

      // Animate content elements
      if (content) {
        tl.from(
          content.querySelectorAll(".animate-in"),
          {
            opacity: 0,
            y: 30,
            stagger: 0.1,
            duration: 0.3,
          },
          `chapter${index}+=0.2`
        );
      }
    });

    // Progress bar animation
    gsap.to(progress, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${totalChapters * 100}%`,
        scrub: true,
      },
    });

    return () => {
      pinTrigger.kill();
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen lg:h-screen overflow-hidden"
      style={{ backgroundColor: "var(--color-roast)" }}
    >
      {/* Background Image with blur effect */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=2232&auto=format&fit=crop"
          alt="Coffee shop atmosphere"
          fill
          className="object-cover"
          style={{ filter: "blur(2px)" }}
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(28, 17, 8, 0.85)" }}
        />
      </div>

      {/* Progress Indicator - Desktop only */}
      <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 z-20">
        <div
          className="w-0.5 h-32 rounded-full overflow-hidden"
          style={{ backgroundColor: "rgba(212, 184, 150, 0.2)" }}
        >
          <div
            ref={progressRef}
            className="w-full h-full origin-top"
            style={{
              backgroundColor: "var(--color-terracotta)",
              transform: "scaleY(0)",
            }}
          />
        </div>
      </div>

      {/* Chapters Container */}
      <div ref={containerRef} className="relative z-10 h-full">
        {storyChapters.map((chapter, index) => (
          <div
            key={chapter.number}
            className={`story-chapter ${
              index === 0
                ? "lg:absolute lg:inset-0"
                : "lg:absolute lg:inset-0"
            } flex items-center py-24 lg:py-0`}
          >
            <div className="container mx-auto px-6 lg:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                {/* Chapter Number */}
                <div className="chapter-number relative">
                  <span
                    className="text-terracotta select-none"
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontSize: "clamp(6rem, 15vw, 12rem)",
                      fontWeight: 300,
                      opacity: 0.3,
                      lineHeight: 1,
                    }}
                  >
                    {chapter.number}
                  </span>
                  <p
                    className="text-label text-terracotta mt-4"
                    style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
                  >
                    {chapter.title}
                  </p>
                </div>

                {/* Chapter Content */}
                <div className="chapter-content space-y-8">
                  <blockquote
                    className="animate-in text-display text-cream"
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontWeight: 300,
                      fontStyle: "italic",
                      lineHeight: "var(--leading-tight)",
                    }}
                  >
                    "{chapter.quote}"
                  </blockquote>
                  <p
                    className="animate-in text-lead text-latte"
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontWeight: 300,
                      lineHeight: "var(--leading-normal)",
                    }}
                  >
                    {chapter.text}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
