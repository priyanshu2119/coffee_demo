"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isImageHover, setIsImageHover] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if touch device
    const checkTouch = () => {
      setIsTouchDevice(
        "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          window.matchMedia("(hover: none)").matches
      );
    };
    checkTouch();

    if (isTouchDevice) return;

    // Enable custom cursor class on html
    document.documentElement.classList.add("custom-cursor-enabled");

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    if (!cursor || !cursorDot) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Animate cursor following mouse
    const animateCursor = () => {
      // Outer ring - smooth follow
      cursorX += (mouseX - cursorX) * 0.08;
      cursorY += (mouseY - cursorY) * 0.08;

      // Inner dot - faster follow
      dotX += (mouseX - dotX) * 0.15;
      dotY += (mouseY - dotY) * 0.15;

      gsap.set(cursor, {
        x: cursorX - 20,
        y: cursorY - 20,
      });

      gsap.set(cursorDot, {
        x: dotX - 3,
        y: dotY - 3,
      });

      requestAnimationFrame(animateCursor);
    };

    animateCursor();

    // Handle hover states
    const handleLinkEnter = () => setIsHovering(true);
    const handleLinkLeave = () => setIsHovering(false);
    const handleImageEnter = () => setIsImageHover(true);
    const handleImageLeave = () => setIsImageHover(false);

    // Add listeners for links and buttons
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select'
    );
    const imageElements = document.querySelectorAll(
      ".cursor-view, .gallery-item"
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleLinkEnter);
      el.addEventListener("mouseleave", handleLinkLeave);
    });

    imageElements.forEach((el) => {
      el.addEventListener("mouseenter", handleImageEnter);
      el.addEventListener("mouseleave", handleImageLeave);
    });

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Mutation observer to handle dynamically added elements
    const observer = new MutationObserver(() => {
      const newInteractive = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select'
      );
      const newImages = document.querySelectorAll(".cursor-view, .gallery-item");

      newInteractive.forEach((el) => {
        el.removeEventListener("mouseenter", handleLinkEnter);
        el.removeEventListener("mouseleave", handleLinkLeave);
        el.addEventListener("mouseenter", handleLinkEnter);
        el.addEventListener("mouseleave", handleLinkLeave);
      });

      newImages.forEach((el) => {
        el.removeEventListener("mouseenter", handleImageEnter);
        el.removeEventListener("mouseleave", handleImageLeave);
        el.addEventListener("mouseenter", handleImageEnter);
        el.addEventListener("mouseleave", handleImageLeave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.classList.remove("custom-cursor-enabled");
      observer.disconnect();
    };
  }, [isTouchDevice, isVisible]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Outer ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-cursor mix-blend-difference"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s ease, width 0.3s ease, height 0.3s ease",
          width: isImageHover ? 80 : isHovering ? 60 : 40,
          height: isImageHover ? 80 : isHovering ? 60 : 40,
        }}
      >
        <div
          className="w-full h-full rounded-full border transition-all duration-300"
          style={{
            borderColor: "var(--color-cream)",
            borderWidth: isHovering || isImageHover ? 1 : 1,
            transform: `translate(-${isImageHover ? 20 : isHovering ? 10 : 0}px, -${isImageHover ? 20 : isHovering ? 10 : 0}px)`,
          }}
        />
        {/* View text for image hover */}
        <span
          ref={cursorTextRef}
          className="absolute inset-0 flex items-center justify-center text-micro font-medium tracking-widest transition-opacity duration-300"
          style={{
            color: "var(--color-cream)",
            opacity: isImageHover ? 1 : 0,
            transform: `translate(-${isImageHover ? 20 : 0}px, -${isImageHover ? 20 : 0}px)`,
          }}
        >
          VIEW
        </span>
      </div>

      {/* Inner dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-cursor"
        style={{
          backgroundColor: "var(--color-terracotta)",
          opacity: isVisible && !isImageHover ? 1 : 0,
          transition: "opacity 0.3s ease",
          transform: isHovering ? "scale(0)" : "scale(1)",
        }}
      />
    </>
  );
}
