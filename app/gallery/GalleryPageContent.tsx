"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=2070&auto=format&fit=crop",
    alt: "The morning ritual - Coffee being poured",
    category: "Ritual",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=2187&auto=format&fit=crop",
    alt: "Every bean has a story - Raw coffee beans",
    category: "Origin",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop",
    alt: "Our space - Cafe interior",
    category: "Space",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=2187&auto=format&fit=crop",
    alt: "The pour - Latte art being created",
    category: "Craft",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop",
    alt: "Small batch roasting - Coffee roaster",
    category: "Roasting",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=2070&auto=format&fit=crop",
    alt: "Community table - People enjoying coffee",
    category: "Community",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop",
    alt: "Afternoon light - Warm cafe atmosphere",
    category: "Space",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=2069&auto=format&fit=crop",
    alt: "Cold brew preparation",
    category: "Craft",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=2080&auto=format&fit=crop",
    alt: "Fresh pastries display",
    category: "Kitchen",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1559305616-3f99cd43e353?q=80&w=2070&auto=format&fit=crop",
    alt: "Barista at work",
    category: "Team",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=2232&auto=format&fit=crop",
    alt: "Coffee and conversation",
    category: "Community",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=2070&auto=format&fit=crop",
    alt: "Evening ambiance",
    category: "Space",
  },
];

const categories = ["All", "Space", "Craft", "Community", "Origin", "Kitchen", "Team", "Ritual", "Roasting"];

export function GalleryPageContent() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredImages =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  useEffect(() => {
    const items = gridRef.current?.querySelectorAll(".gallery-item");
    if (!items) return;

    gsap.from(items, {
      opacity: 0,
      y: 50,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: gridRef.current,
        start: "top 80%",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [activeCategory]);

  return (
    <>
      {/* Hero */}
      <div
        className="relative h-[50vh] flex items-center justify-center"
        style={{ backgroundColor: "var(--color-espresso)" }}
      >
        <div className="relative z-10 text-center px-6">
          <p
            className="text-label text-terracotta mb-4"
            style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
          >
            Visual Stories
          </p>
          <h1
            className="text-hero text-cream"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 300,
              fontStyle: "italic",
            }}
          >
            Gallery
          </h1>
        </div>
      </div>

      {/* Filter */}
      <div
        className="py-8 sticky top-0 z-50"
        style={{ backgroundColor: "var(--color-ivory)" }}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-small tracking-wider uppercase transition-colors ${
                  activeCategory === category
                    ? "text-cream"
                    : "text-muted hover:text-espresso"
                }`}
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontWeight: 500,
                  backgroundColor:
                    activeCategory === category
                      ? "var(--color-terracotta)"
                      : "transparent",
                  borderRadius: "var(--radius-pill)",
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <section
        className="py-16"
        style={{ backgroundColor: "var(--color-ivory)" }}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="gallery-item cursor-pointer group relative aspect-square overflow-hidden rounded-lg"
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
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
                    {image.category}
                  </span>
                  <span
                    className="text-cream"
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontStyle: "italic",
                      fontSize: "var(--text-lead)",
                    }}
                  >
                    View
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-modal flex items-center justify-center p-6"
          style={{ backgroundColor: "rgba(28, 17, 8, 0.95)" }}
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-cream hover:text-terracotta transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>
          <div
            className="relative max-w-5xl w-full max-h-[80vh] aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
            <p
              className="text-label text-terracotta mb-1"
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
            >
              {selectedImage.category}
            </p>
            <p
              className="text-cream"
              style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic" }}
            >
              {selectedImage.alt}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
