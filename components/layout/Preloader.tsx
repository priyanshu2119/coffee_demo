"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barFillRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const preloader = preloaderRef.current;
    const counter = counterRef.current;
    const barFill = barFillRef.current;

    if (!preloader || !counter || !barFill) return;

    // Prevent scroll during preloader
    document.body.style.overflow = "hidden";

    // Counter animation object
    const counterObj = { value: 0 };

    // Create timeline
    const tl = gsap.timeline({
      onComplete: () => {
        // Slide preloader up
        gsap.to(preloader, {
          yPercent: -100,
          duration: 0.8,
          ease: "power3.inOut",
          onComplete: () => {
            setIsComplete(true);
            document.body.style.overflow = "";
            // Dispatch custom event to trigger hero animation
            window.dispatchEvent(new CustomEvent("preloaderComplete"));
          },
        });
      },
    });

    // Animate counter from 0 to 100
    tl.to(counterObj, {
      value: 100,
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: () => {
        counter.textContent = Math.floor(counterObj.value).toString().padStart(2, "0");
      },
    });

    // Animate progress bar in parallel
    tl.to(
      barFill,
      {
        scaleX: 1,
        duration: 2.5,
        ease: "power2.inOut",
      },
      0
    );

    return () => {
      tl.kill();
    };
  }, []);

  if (isComplete) return null;

  return (
    <div
      ref={preloaderRef}
      className="preloader"
      aria-label="Loading"
      role="progressbar"
      aria-valuenow={0}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Logo */}
      <div className="preloader-logo">
        <svg
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Coffee cup outline */}
          <path
            d="M10 20C10 18.8954 10.8954 18 12 18H38C39.1046 18 40 18.8954 40 20V38C40 44.6274 34.6274 50 28 50H22C15.3726 50 10 44.6274 10 38V20Z"
            stroke="var(--color-cream)"
            strokeWidth="1.5"
          />
          {/* Handle */}
          <path
            d="M40 24H44C47.3137 24 50 26.6863 50 30V30C50 33.3137 47.3137 36 44 36H40"
            stroke="var(--color-cream)"
            strokeWidth="1.5"
          />
          {/* Steam lines */}
          <path
            d="M18 8C18 8 20 12 18 14C16 16 18 18 18 18"
            stroke="var(--color-latte)"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.6"
          />
          <path
            d="M25 10C25 10 27 13 25 15C23 17 25 18 25 18"
            stroke="var(--color-latte)"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.6"
          />
          <path
            d="M32 8C32 8 34 12 32 14C30 16 32 18 32 18"
            stroke="var(--color-latte)"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Counter */}
      <div className="preloader-counter">
        <span ref={counterRef}>00</span>
      </div>

      {/* Progress bar */}
      <div className="preloader-bar">
        <div
          ref={barFillRef}
          className="preloader-bar-fill"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {/* Cafe name */}
      <p
        className="mt-8 text-label text-latte opacity-60"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        Vesper Coffee
      </p>
    </div>
  );
}
