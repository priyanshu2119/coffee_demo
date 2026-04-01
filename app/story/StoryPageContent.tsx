"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const timeline = [
  {
    year: "2019",
    title: "The Beginning",
    description:
      "Two friends with a shared passion for exceptional coffee decide to bring something new to the neighborhood. We signed the lease on a small corner space in The Old Quarter.",
  },
  {
    year: "2020",
    title: "The Challenge",
    description:
      "The world changed, but our commitment didn't. We pivoted to takeaway and delivery, connecting with our community in new ways. Our regulars became family.",
  },
  {
    year: "2021",
    title: "Growing Roots",
    description:
      "We expanded our kitchen, launched our roasting program, and made our first trip to origin — meeting the farmers behind our beans in Ethiopia and Colombia.",
  },
  {
    year: "2022",
    title: "Community",
    description:
      "We hosted our first latte art competition, started monthly cupping sessions open to the public, and launched our barista training program for aspiring coffee professionals.",
  },
  {
    year: "2023",
    title: "Recognition",
    description:
      "Named 'Best Specialty Coffee Shop' by the local press. More importantly, we celebrated serving our one millionth cup to a community that feels like home.",
  },
  {
    year: "Today",
    title: "The Journey Continues",
    description:
      "Every day we wake up excited to brew, create, and connect. The story isn't finished — you're a part of it every time you walk through our doors.",
  },
];

const values = [
  {
    title: "Quality Without Compromise",
    description:
      "Every bean is sourced with intention. We roast in small batches, calibrate daily, and taste obsessively. Mediocre coffee has no place here.",
  },
  {
    title: "Transparency",
    description:
      "We know where our coffee comes from, who grew it, and how much they were paid. We share this information because it matters.",
  },
  {
    title: "Sustainability",
    description:
      "Compostable cups, carbon-offset shipping, and direct relationships that ensure fair prices for farmers. Coffee can be a force for good.",
  },
  {
    title: "Community",
    description:
      "A cafe is only as good as the people in it. We create space for connection, conversation, and belonging. Everyone is welcome.",
  },
];

export function StoryPageContent() {
  const heroRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Timeline animation
    const timelineItems = timelineRef.current?.querySelectorAll(".timeline-item");
    if (timelineItems) {
      timelineItems.forEach((item, index) => {
        gsap.from(item, {
          opacity: 0,
          x: index % 2 === 0 ? -50 : 50,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
          },
        });
      });
    }

    // Values animation
    const valueItems = valuesRef.current?.querySelectorAll(".value-item");
    if (valueItems) {
      gsap.from(valueItems, {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: valuesRef.current,
          start: "top 70%",
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* Hero */}
      <div
        ref={heroRef}
        className="relative h-[70vh] flex items-center justify-center"
        style={{ backgroundColor: "var(--color-espresso)" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1559305616-3f99cd43e353?q=80&w=2070&auto=format&fit=crop"
          alt="Coffee shop interior"
          fill
          priority
          className="object-cover opacity-50"
          sizes="100vw"
        />
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <p
            className="text-label text-terracotta mb-4"
            style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
          >
            Since 2019
          </p>
          <h1
            className="text-hero text-cream mb-8"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 300,
              fontStyle: "italic",
            }}
          >
            Our Story
          </h1>
          <p
            className="text-lead text-cream/80"
            style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
          >
            A passion project that became a community cornerstone.
            This is how Vesper Coffee came to be.
          </p>
        </div>
      </div>

      {/* Intro Section */}
      <section
        className="py-24 lg:py-32"
        style={{ backgroundColor: "var(--color-cream)" }}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div>
              <Image
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop"
                alt="Founders of Vesper Coffee"
                width={600}
                height={700}
                className="rounded-lg object-cover"
              />
            </div>
            <div>
              <blockquote
                className="text-display text-espresso mb-8"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontWeight: 300,
                  fontStyle: "italic",
                  lineHeight: "var(--leading-tight)",
                }}
              >
                "We didn't just want to serve great coffee. We wanted to build a place where people felt they belonged."
              </blockquote>
              <p
                className="text-body text-muted mb-6"
                style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300, lineHeight: "var(--leading-loose)" }}
              >
                When we opened our doors in 2019, we had a simple mission: to create a space where exceptional coffee and genuine human connection could coexist. We'd worked in coffee for years, but always felt something was missing — the warmth, the intentionality, the sense of place.
              </p>
              <p
                className="text-body text-muted"
                style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300, lineHeight: "var(--leading-loose)" }}
              >
                Vesper was our answer. Named after the evening star — that quiet moment between day and night — we wanted to create a space for pause. A place where you could slow down, even just for the time it takes to drink a cup of coffee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section
        className="py-24 lg:py-32"
        style={{ backgroundColor: "var(--color-roast)" }}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 lg:mb-24">
            <p
              className="text-label text-terracotta mb-4"
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
            >
              Our Journey
            </p>
            <h2
              className="text-display text-cream"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontWeight: 300,
                fontStyle: "italic",
              }}
            >
              Milestones Along the Way
            </h2>
          </div>

          <div ref={timelineRef} className="relative">
            {/* Timeline line */}
            <div
              className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
              style={{ backgroundColor: "var(--color-hazel)" }}
            />

            {timeline.map((item, index) => (
              <div
                key={item.year}
                className={`timeline-item relative mb-16 lg:mb-24 ${
                  index % 2 === 0 ? "lg:pr-[55%]" : "lg:pl-[55%]"
                }`}
              >
                {/* Year badge */}
                <div
                  className={`hidden lg:flex absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full items-center justify-center`}
                  style={{ backgroundColor: "var(--color-terracotta)" }}
                >
                  <span
                    className="text-cream text-small font-medium"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {item.year}
                  </span>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 0 ? "lg:text-right" : "lg:text-left"}`}>
                  <span
                    className="lg:hidden text-label text-terracotta mb-2 block"
                    style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
                  >
                    {item.year}
                  </span>
                  <h3
                    className="text-title text-cream mb-4"
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontWeight: 500,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-body text-latte"
                    style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        className="py-24 lg:py-32"
        style={{ backgroundColor: "var(--color-cream)" }}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 lg:mb-24">
            <p
              className="text-label text-terracotta mb-4"
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
            >
              What We Stand For
            </p>
            <h2
              className="text-display text-espresso"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontWeight: 300,
                fontStyle: "italic",
              }}
            >
              Our Values
            </h2>
          </div>

          <div ref={valuesRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {values.map((value) => (
              <div key={value.title} className="value-item">
                <h3
                  className="text-title text-espresso mb-4"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontWeight: 500,
                  }}
                >
                  {value.title}
                </h3>
                <p
                  className="text-body text-muted"
                  style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300, lineHeight: "var(--leading-loose)" }}
                >
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-24 text-center"
        style={{ backgroundColor: "var(--color-espresso)" }}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <h2
            className="text-display text-cream mb-8"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 300,
              fontStyle: "italic",
            }}
          >
            Come Write the Next Chapter With Us
          </h2>
          <a
            href="/reserve"
            className="btn btn-primary"
          >
            Reserve a Table
          </a>
        </div>
      </section>
    </>
  );
}
