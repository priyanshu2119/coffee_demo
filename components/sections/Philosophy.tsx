"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const quote = quoteRef.current;
    const text = textRef.current;

    if (!section || !quote || !text) return;

    // Split quote into words for animation
    const words = quote.querySelectorAll(".word");

    // Animate quote words
    gsap.from(words, {
      opacity: 0,
      y: 30,
      stagger: 0.05,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
      },
    });

    // Animate supporting text
    gsap.from(text, {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 60%",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Split text into words
  const quoteText = "Coffee is not just a drink. It's a ritual, a pause, a moment made entirely yours.";
  const words = quoteText.split(" ");

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-48"
      style={{ backgroundColor: "var(--color-cream)" }}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Quote Side */}
          <div className="relative">
            {/* Label */}
            <p
              className="text-label text-terracotta mb-6"
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
            >
              Our Philosophy
            </p>

            {/* Quote */}
            <blockquote
              ref={quoteRef}
              className="text-display text-espresso"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontWeight: 300,
                fontStyle: "italic",
                lineHeight: "var(--leading-tight)",
              }}
            >
              <span className="text-terracotta text-6xl leading-none">"</span>
              {words.map((word, i) => (
                <span key={i} className="word inline-block mr-[0.3em]">
                  {word}
                </span>
              ))}
              <span className="text-terracotta text-6xl leading-none">"</span>
            </blockquote>
          </div>

          {/* Text Side */}
          <div className="relative lg:pl-12">
            {/* Vertical divider - desktop only */}
            <div
              className="hidden lg:block absolute left-0 top-0 bottom-0 w-px"
              style={{ backgroundColor: "var(--color-latte)" }}
            />

            <div ref={textRef} className="space-y-6">
              <p
                className="text-body text-espresso"
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontWeight: 300,
                  lineHeight: "var(--leading-loose)",
                }}
              >
                We opened our doors in 2019 with a simple belief: that great coffee
                deserves great company. Every bean is sourced with intention, every
                cup crafted with care, and every corner of this space designed for
                you to slow down.
              </p>
              <p
                className="text-body text-muted"
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontWeight: 300,
                  lineHeight: "var(--leading-loose)",
                }}
              >
                From the farmers who grow our beans to the hands that pour your
                morning cup, we believe in transparency, sustainability, and the
                simple joy of a perfectly brewed coffee.
              </p>
              <p
                className="text-body text-muted"
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontWeight: 300,
                  lineHeight: "var(--leading-loose)",
                }}
              >
                This isn't just a cafe. It's a community. A sanctuary. A place
                where strangers become friends over shared tables and quiet
                mornings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
