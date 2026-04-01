"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const marqueeText = "Specialty Coffee · Seasonal Menu · Fresh Pastries · Est. 2019 · Single Origin · ";

export function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Create smooth infinite scroll with GSAP
    const tween = gsap.to(track, {
      xPercent: -50,
      ease: "none",
      duration: 30,
      repeat: -1,
    });

    // Pause on hover
    const handleMouseEnter = () => tween.pause();
    const handleMouseLeave = () => tween.play();

    track.addEventListener("mouseenter", handleMouseEnter);
    track.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      tween.kill();
      track.removeEventListener("mouseenter", handleMouseEnter);
      track.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section
      className="py-4 overflow-hidden"
      style={{ backgroundColor: "var(--color-roast)" }}
      aria-label="Marquee banner"
    >
      <div ref={trackRef} className="flex whitespace-nowrap">
        {/* Duplicate text for seamless loop */}
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="text-latte mx-4"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontSize: "1rem",
              letterSpacing: "0.05em",
            }}
          >
            {marqueeText}
          </span>
        ))}
      </div>
    </section>
  );
}
