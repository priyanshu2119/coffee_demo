"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const menuItems = [
  {
    id: 1,
    category: "Signature",
    name: "Signature Cortado",
    description:
      "Two shots of our house blend, perfectly balanced with steamed whole milk. Smooth, strong, unforgettable.",
    price: "$5.50",
    image:
      "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=1935&auto=format&fit=crop",
  },
  {
    id: 2,
    category: "Pour Over",
    name: "Honey Process Pour-Over",
    description:
      "Single-origin Ethiopia Yirgacheffe, notes of jasmine and stone fruit. Available while supplies last.",
    price: "$7.00",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    category: "Cold Brew",
    name: "Cardamom Cold Brew",
    description:
      "18-hour cold brew infused with green cardamom. Served over hand-carved ice.",
    price: "$6.50",
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=2069&auto=format&fit=crop",
  },
  {
    id: 4,
    category: "Kitchen",
    name: "Ricotta Toast",
    description:
      "House-made sourdough, whipped ricotta, seasonal jam, micro herbs. Served 8am–2pm.",
    price: "$9.00",
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=2080&auto=format&fit=crop",
  },
  {
    id: 5,
    category: "Pastry",
    name: "Almond Croissant",
    description:
      "Twice-baked, filled with almond cream, dusted with powdered sugar. Made fresh daily.",
    price: "$5.00",
    image:
      "https://images.unsplash.com/photo-1623334044303-241021148842?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 6,
    category: "Matcha",
    name: "Matcha Latte",
    description:
      "Ceremonial grade matcha whisked with oat milk. Can be served hot or iced.",
    price: "$6.00",
    image:
      "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=2070&auto=format&fit=crop",
  },
];

export function Menu() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current?.querySelectorAll(".menu-card");

    if (!section || !cards) return;

    // Staggered card entrance
    gsap.from(cards, {
      opacity: 0,
      y: 80,
      stagger: 0.15,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 60%",
      },
    });

    // Add hover animations to each card
    cards.forEach((card) => {
      const image = card.querySelector(".menu-image");
      const info = card.querySelector(".menu-info");

      card.addEventListener("mouseenter", () => {
        gsap.to(image, {
          scale: 1.05,
          duration: 0.6,
          ease: "power2.out",
        });
        gsap.to(info, {
          y: -8,
          duration: 0.4,
          ease: "power2.out",
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(image, {
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
        });
        gsap.to(info, {
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32"
      style={{ backgroundColor: "var(--color-espresso)" }}
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-24">
          <p
            className="text-label text-terracotta mb-4"
            style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
          >
            Our Craft
          </p>
          <h2
            className="text-display text-cream"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 300,
              fontStyle: "italic",
            }}
          >
            A Menu Built Around the Bean
          </h2>
        </div>

        {/* Menu Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {menuItems.map((item) => (
            <article
              key={item.id}
              className="menu-card group cursor-pointer"
            >
              {/* Image */}
              <div className="aspect-portrait rounded-lg overflow-hidden mb-6">
                <div className="menu-image relative w-full h-full">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="menu-info">
                {/* Category */}
                <p
                  className="text-label text-terracotta mb-2"
                  style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
                >
                  {item.category}
                </p>

                {/* Name */}
                <h3
                  className="text-title text-cream mb-3"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontWeight: 500,
                  }}
                >
                  {item.name}
                </h3>

                {/* Description */}
                <p
                  className="text-small text-latte mb-4 line-clamp-2"
                  style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
                >
                  {item.description}
                </p>

                {/* Price */}
                <p
                  className="text-body text-terracotta"
                  style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
                >
                  {item.price}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-cream hover:text-terracotta transition-colors group"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontSize: "var(--text-lead)",
            }}
          >
            View Full Menu
            <span className="inline-block transition-transform group-hover:translate-x-2">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
