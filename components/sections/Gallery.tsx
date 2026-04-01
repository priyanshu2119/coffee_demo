"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=2070&auto=format&fit=crop",
    alt: "The morning ritual - Coffee being poured",
    category: "Ritual",
    aspectRatio: "portrait",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=2187&auto=format&fit=crop",
    alt: "Every bean has a story - Raw coffee beans",
    category: "Origin",
    aspectRatio: "landscape",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop",
    alt: "Our space - Cafe interior",
    category: "Space",
    aspectRatio: "portrait",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=2187&auto=format&fit=crop",
    alt: "The pour - Latte art being created",
    category: "Craft",
    aspectRatio: "square",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop",
    alt: "Small batch roasting - Coffee roaster",
    category: "Roasting",
    aspectRatio: "landscape",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=2070&auto=format&fit=crop",
    alt: "Community table - People enjoying coffee",
    category: "Community",
    aspectRatio: "portrait",
  },
];

export function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const items = gridRef.current?.querySelectorAll(".gallery-item");

    if (!section || !items) return;

    // Clip-path reveal animation
    gsap.from(items, {
      clipPath: "inset(100% 0 0 0)",
      duration: 1.2,
      ease: "power3.inOut",
      stagger: {
        amount: 0.8,
        from: "start",
      },
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32"
      style={{ backgroundColor: "var(--color-ivory)" }}
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-24">
          <p
            className="text-label text-terracotta mb-4"
            style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
          >
            Visual Stories
          </p>
          <h2
            className="text-display text-espresso"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 300,
              fontStyle: "italic",
            }}
          >
            A Glimpse Inside
          </h2>
        </div>

        {/* Masonry Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              className={`gallery-item cursor-view group relative overflow-hidden rounded-lg ${
                item.aspectRatio === "portrait"
                  ? "row-span-2"
                  : item.aspectRatio === "landscape"
                  ? "col-span-1 lg:col-span-2"
                  : ""
              }`}
              style={{
                aspectRatio:
                  item.aspectRatio === "portrait"
                    ? "3/4"
                    : item.aspectRatio === "landscape"
                    ? "16/9"
                    : "1/1",
              }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* Hover Overlay */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ backgroundColor: "var(--color-overlay)" }}
              >
                <span
                  className="text-label text-terracotta mb-2"
                  style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
                >
                  {item.category}
                </span>
                <span
                  className="text-cream flex items-center gap-2"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontStyle: "italic",
                    fontSize: "var(--text-lead)",
                  }}
                >
                  View
                  <span className="inline-block transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
