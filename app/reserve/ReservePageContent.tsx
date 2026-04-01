"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Clock, MapPin, Phone, Mail } from "lucide-react";

export function ReservePageContent() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    occasion: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: "2",
        occasion: "",
        notes: "",
      });
    }, 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* Hero */}
      <div
        className="relative h-[50vh] flex items-center justify-center"
        style={{ backgroundColor: "var(--color-espresso)" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=2070&auto=format&fit=crop"
          alt="Vesper Coffee atmosphere"
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
            Reserve Your Moment
          </p>
          <h1
            className="text-hero text-cream"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 300,
              fontStyle: "italic",
            }}
          >
            Book a Table
          </h1>
        </div>
      </div>

      {/* Content */}
      <section
        className="py-24"
        style={{ backgroundColor: "var(--color-cream)" }}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Form */}
            <div>
              <h2
                className="text-display text-espresso mb-8"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontWeight: 300,
                  fontStyle: "italic",
                }}
              >
                Make a Reservation
              </h2>

              {isSubmitted ? (
                <div
                  className="p-8 rounded-lg text-center"
                  style={{ backgroundColor: "var(--color-parchment)" }}
                >
                  <div
                    className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                    style={{ backgroundColor: "var(--color-sage)" }}
                  >
                    <Check className="w-8 h-8 text-cream" />
                  </div>
                  <h3
                    className="text-title text-espresso mb-4"
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontWeight: 500,
                    }}
                  >
                    Reservation Confirmed!
                  </h3>
                  <p
                    className="text-body text-muted"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    We've sent a confirmation to your email. We look forward to
                    seeing you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="text-label text-espresso mb-2 block"
                        style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
                      >
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="input-minimal input-dark"
                        placeholder="Your full name"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="text-label text-espresso mb-2 block"
                        style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input-minimal input-dark"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="text-label text-espresso mb-2 block"
                        style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="input-minimal input-dark"
                        placeholder="Your phone number"
                      />
                    </div>

                    {/* Guests */}
                    <div>
                      <label
                        htmlFor="guests"
                        className="text-label text-espresso mb-2 block"
                        style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
                      >
                        Party Size *
                      </label>
                      <select
                        id="guests"
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        required
                        className="input-minimal input-dark"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? "Guest" : "Guests"}
                          </option>
                        ))}
                        <option value="8+">Large party (8+)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Date */}
                    <div>
                      <label
                        htmlFor="date"
                        className="text-label text-espresso mb-2 block"
                        style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
                      >
                        Date *
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="input-minimal input-dark"
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>

                    {/* Time */}
                    <div>
                      <label
                        htmlFor="time"
                        className="text-label text-espresso mb-2 block"
                        style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
                      >
                        Time *
                      </label>
                      <select
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                        className="input-minimal input-dark"
                      >
                        <option value="" disabled>
                          Select a time
                        </option>
                        <option value="07:00">7:00 AM</option>
                        <option value="07:30">7:30 AM</option>
                        <option value="08:00">8:00 AM</option>
                        <option value="08:30">8:30 AM</option>
                        <option value="09:00">9:00 AM</option>
                        <option value="09:30">9:30 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="10:30">10:30 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="11:30">11:30 AM</option>
                        <option value="12:00">12:00 PM</option>
                        <option value="12:30">12:30 PM</option>
                        <option value="13:00">1:00 PM</option>
                        <option value="13:30">1:30 PM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="14:30">2:30 PM</option>
                        <option value="15:00">3:00 PM</option>
                        <option value="15:30">3:30 PM</option>
                        <option value="16:00">4:00 PM</option>
                        <option value="16:30">4:30 PM</option>
                        <option value="17:00">5:00 PM</option>
                        <option value="17:30">5:30 PM</option>
                        <option value="18:00">6:00 PM</option>
                        <option value="18:30">6:30 PM</option>
                      </select>
                    </div>
                  </div>

                  {/* Occasion */}
                  <div>
                    <label
                      htmlFor="occasion"
                      className="text-label text-espresso mb-2 block"
                      style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
                    >
                      Special Occasion
                    </label>
                    <select
                      id="occasion"
                      name="occasion"
                      value={formData.occasion}
                      onChange={handleChange}
                      className="input-minimal input-dark"
                    >
                      <option value="">Select if applicable</option>
                      <option value="birthday">Birthday</option>
                      <option value="anniversary">Anniversary</option>
                      <option value="business">Business Meeting</option>
                      <option value="date">Date Night</option>
                      <option value="other">Other Celebration</option>
                    </select>
                  </div>

                  {/* Notes */}
                  <div>
                    <label
                      htmlFor="notes"
                      className="text-label text-espresso mb-2 block"
                      style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
                    >
                      Special Requests
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={4}
                      className="input-minimal input-dark resize-none"
                      placeholder="Any dietary requirements, seating preferences, or other requests?"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="btn btn-dark w-full py-4"
                  >
                    Confirm Reservation
                  </button>

                  <p
                    className="text-small text-muted text-center"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    You'll receive a confirmation email within 24 hours.
                    For same-day reservations, please call us directly.
                  </p>
                </form>
              )}
            </div>

            {/* Info */}
            <div>
              <div
                className="p-8 rounded-lg mb-8"
                style={{ backgroundColor: "var(--color-espresso)" }}
              >
                <h3
                  className="text-title text-cream mb-6"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontWeight: 500,
                  }}
                >
                  Visit Us
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-terracotta flex-shrink-0 mt-1" />
                    <div>
                      <p
                        className="text-cream"
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                      >
                        12 Merchant Lane
                      </p>
                      <p
                        className="text-latte"
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                      >
                        The Old Quarter
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="w-5 h-5 text-terracotta flex-shrink-0 mt-1" />
                    <div>
                      <p
                        className="text-cream"
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                      >
                        Monday – Friday: 7am – 7pm
                      </p>
                      <p
                        className="text-cream"
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                      >
                        Saturday – Sunday: 8am – 8pm
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-terracotta flex-shrink-0 mt-1" />
                    <a
                      href="tel:+15550123456"
                      className="text-cream hover:text-terracotta transition-colors"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      +1 (555) 012-3456
                    </a>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-terracotta flex-shrink-0 mt-1" />
                    <a
                      href="mailto:hello@vespercoffee.com"
                      className="text-cream hover:text-terracotta transition-colors"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      hello@vespercoffee.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div
                className="rounded-lg overflow-hidden h-64 relative"
                style={{ backgroundColor: "var(--color-parchment)" }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop"
                  alt="Location map"
                  fill
                  className="object-cover opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-dark"
                  >
                    Open in Maps
                  </a>
                </div>
              </div>

              {/* Note */}
              <div className="mt-8">
                <h4
                  className="text-lead text-espresso mb-4"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontWeight: 500,
                  }}
                >
                  Good to Know
                </h4>
                <ul
                  className="space-y-2 text-small text-muted"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  <li>• Reservations are held for 15 minutes past the booking time</li>
                  <li>• For parties larger than 8, please call us directly</li>
                  <li>• Dogs are welcome on our outdoor terrace</li>
                  <li>• Free WiFi available throughout the cafe</li>
                  <li>• We're fully accessible with step-free entry</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
