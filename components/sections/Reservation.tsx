"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Reservation() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    guests: "2",
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  useEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;

    if (!section || !form) return;

    // Animate form elements on scroll
    const elements = form.querySelectorAll(".form-element");
    gsap.from(elements, {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.8,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", date: "", time: "", guests: "2" });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen lg:h-screen overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
        {/* Left Side - Form */}
        <div
          className="relative z-10 flex items-center py-24 lg:py-0 px-6 lg:px-16"
          style={{ backgroundColor: "var(--color-espresso)" }}
        >
          <div className="w-full max-w-md mx-auto">
            {/* Header */}
            <p
              className="form-element text-label text-terracotta mb-4"
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
            >
              Reserve Your Moment
            </p>
            <h2
              className="form-element text-display text-cream mb-12"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontWeight: 300,
                fontStyle: "italic",
              }}
            >
              Come in.
              <br />
              Stay a while.
            </h2>

            {/* Form */}
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
              {/* Name */}
              <div className="form-element">
                <label
                  htmlFor="name"
                  className="text-label text-latte mb-2 block"
                  style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-minimal"
                  placeholder="Your name"
                />
              </div>

              {/* Date */}
              <div className="form-element">
                <label
                  htmlFor="date"
                  className="text-label text-latte mb-2 block"
                  style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
                >
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="input-minimal"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              {/* Time */}
              <div className="form-element">
                <label
                  htmlFor="time"
                  className="text-label text-latte mb-2 block"
                  style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
                >
                  Time
                </label>
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="input-minimal"
                  style={{ color: formData.time ? "var(--color-cream)" : "var(--color-text-muted)" }}
                >
                  <option value="" disabled>
                    Select a time
                  </option>
                  <option value="07:00">7:00 AM</option>
                  <option value="08:00">8:00 AM</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                  <option value="17:00">5:00 PM</option>
                  <option value="18:00">6:00 PM</option>
                </select>
              </div>

              {/* Guests */}
              <div className="form-element">
                <label
                  htmlFor="guests"
                  className="text-label text-latte mb-2 block"
                  style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
                >
                  Party Size
                </label>
                <select
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  required
                  className="input-minimal"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <div className="form-element pt-4">
                <button
                  type="submit"
                  className="w-full py-4 rounded-lg text-cream text-label transition-all duration-300 relative overflow-hidden"
                  style={{
                    backgroundColor: isSubmitted
                      ? "var(--color-sage)"
                      : "var(--color-terracotta)",
                    fontFamily: "var(--font-dm-sans)",
                    fontWeight: 500,
                  }}
                  disabled={isSubmitted}
                >
                  {isSubmitted ? (
                    <span className="flex items-center justify-center gap-2">
                      <Check className="w-5 h-5" />
                      Reservation Confirmed
                    </span>
                  ) : (
                    "Reserve Now"
                  )}
                </button>
              </div>
            </form>

            {/* Note */}
            <p
              className="form-element text-small text-muted mt-6 text-center"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              We'll send a confirmation to your email within 24 hours.
            </p>
          </div>
        </div>

        {/* Right Side - Image */}
        <motion.div
          ref={imageRef}
          className="relative hidden lg:block"
          style={{ y: imageY }}
        >
          <Image
            src="https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=2070&auto=format&fit=crop"
            alt="Vesper Coffee atmosphere"
            fill
            className="object-cover"
            sizes="50vw"
          />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(28, 17, 8, 0.3)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
