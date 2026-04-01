"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const menuCategories = [
  {
    name: "Espresso",
    description: "Our house blend, roasted in small batches locally",
    items: [
      {
        name: "Espresso",
        description: "Double shot of our signature blend",
        price: "$4.00",
      },
      {
        name: "Americano",
        description: "Espresso with hot water",
        price: "$4.50",
      },
      {
        name: "Cortado",
        description: "Equal parts espresso and steamed milk",
        price: "$5.50",
      },
      {
        name: "Flat White",
        description: "Double ristretto with velvety microfoam",
        price: "$5.50",
      },
      {
        name: "Cappuccino",
        description: "Espresso with steamed milk and foam",
        price: "$5.50",
      },
      {
        name: "Latte",
        description: "Espresso with steamed milk",
        price: "$6.00",
      },
    ],
  },
  {
    name: "Pour Over",
    description: "Single origin coffees, brewed to order",
    items: [
      {
        name: "Ethiopia Yirgacheffe",
        description: "Notes of jasmine, bergamot, and stone fruit",
        price: "$7.00",
      },
      {
        name: "Colombia Huila",
        description: "Caramel, red apple, and chocolate",
        price: "$6.50",
      },
      {
        name: "Kenya AA",
        description: "Bright acidity, blackcurrant, and citrus",
        price: "$7.50",
      },
      {
        name: "Guatemala Antigua",
        description: "Cocoa, brown sugar, and orange zest",
        price: "$6.50",
      },
    ],
  },
  {
    name: "Cold Drinks",
    description: "Refreshing options for warmer days",
    items: [
      {
        name: "Cold Brew",
        description: "18-hour steeped, smooth and bold",
        price: "$5.50",
      },
      {
        name: "Cardamom Cold Brew",
        description: "Infused with green cardamom, over hand-carved ice",
        price: "$6.50",
      },
      {
        name: "Iced Latte",
        description: "Espresso with cold milk over ice",
        price: "$6.00",
      },
      {
        name: "Shakerato",
        description: "Espresso shaken with ice and simple syrup",
        price: "$6.00",
      },
    ],
  },
  {
    name: "Not Coffee",
    description: "For those seeking something different",
    items: [
      {
        name: "Matcha Latte",
        description: "Ceremonial grade matcha with oat milk",
        price: "$6.00",
      },
      {
        name: "Chai Latte",
        description: "House-made spiced chai concentrate",
        price: "$5.50",
      },
      {
        name: "Hot Chocolate",
        description: "Belgian chocolate with steamed milk",
        price: "$5.00",
      },
      {
        name: "Golden Milk",
        description: "Turmeric, ginger, and honey with steamed milk",
        price: "$5.50",
      },
    ],
  },
  {
    name: "Kitchen",
    description: "Served 8am – 2pm daily",
    items: [
      {
        name: "Ricotta Toast",
        description: "Sourdough, whipped ricotta, seasonal jam, micro herbs",
        price: "$9.00",
      },
      {
        name: "Avocado Toast",
        description: "Multigrain, smashed avocado, poached eggs, chili flakes",
        price: "$12.00",
      },
      {
        name: "Granola Bowl",
        description: "House-made granola, Greek yogurt, seasonal fruit, honey",
        price: "$10.00",
      },
      {
        name: "Breakfast Sandwich",
        description: "Brioche, scrambled eggs, aged cheddar, bacon or sausage",
        price: "$11.00",
      },
    ],
  },
  {
    name: "Pastries",
    description: "Baked fresh every morning",
    items: [
      {
        name: "Almond Croissant",
        description: "Twice-baked, filled with almond cream",
        price: "$5.00",
      },
      {
        name: "Pain au Chocolat",
        description: "Flaky pastry with dark chocolate batons",
        price: "$4.50",
      },
      {
        name: "Banana Bread",
        description: "Walnut, brown butter, served warm",
        price: "$4.00",
      },
      {
        name: "Seasonal Scone",
        description: "Ask your barista for today's flavor",
        price: "$4.00",
      },
    ],
  },
];

export function MenuPageContent() {
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = sectionsRef.current?.querySelectorAll(".menu-section");
    if (!sections) return;

    sections.forEach((section) => {
      const items = section.querySelectorAll(".menu-item");

      gsap.from(items, {
        opacity: 0,
        y: 30,
        stagger: 0.08,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* Hero */}
      <div
        ref={heroRef}
        className="relative h-[60vh] flex items-center justify-center"
        style={{ backgroundColor: "var(--color-espresso)" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=2078&auto=format&fit=crop"
          alt="Coffee preparation"
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="relative z-10 text-center px-6">
          <p
            className="text-label text-terracotta mb-4"
            style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
          >
            Our Offerings
          </p>
          <h1
            className="text-hero text-cream"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 300,
              fontStyle: "italic",
            }}
          >
            The Menu
          </h1>
        </div>
      </div>

      {/* Menu Content */}
      <div
        ref={sectionsRef}
        className="py-24"
        style={{ backgroundColor: "var(--color-cream)" }}
      >
        <div className="container mx-auto px-6 lg:px-12">
          {menuCategories.map((category, categoryIndex) => (
            <section
              key={category.name}
              className={`menu-section ${
                categoryIndex < menuCategories.length - 1
                  ? "mb-24 pb-24 border-b"
                  : ""
              }`}
              style={{ borderColor: "var(--color-latte)" }}
            >
              {/* Category Header */}
              <div className="mb-12">
                <h2
                  className="text-display text-espresso mb-2"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontWeight: 400,
                  }}
                >
                  {category.name}
                </h2>
                <p
                  className="text-lead text-muted"
                  style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
                >
                  {category.description}
                </p>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="menu-item flex justify-between items-baseline gap-4"
                  >
                    <div className="flex-1">
                      <h3
                        className="text-title text-espresso mb-1"
                        style={{
                          fontFamily: "var(--font-cormorant)",
                          fontWeight: 500,
                          fontSize: "var(--text-lead)",
                        }}
                      >
                        {item.name}
                      </h3>
                      <p
                        className="text-small text-muted"
                        style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
                      >
                        {item.description}
                      </p>
                    </div>
                    <span
                      className="text-body text-terracotta whitespace-nowrap"
                      style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
                    >
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Note */}
          <div className="mt-16 text-center">
            <p
              className="text-small text-muted italic"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Oat, almond, and soy milk available for an additional $0.75
            </p>
            <p
              className="text-small text-muted italic mt-2"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Please inform your barista of any allergies or dietary requirements
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
