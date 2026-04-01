import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Philosophy } from "@/components/sections/Philosophy";
import { Menu } from "@/components/sections/Menu";
import { Story } from "@/components/sections/Story";
import { Gallery } from "@/components/sections/Gallery";
import { Reservation } from "@/components/sections/Reservation";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Philosophy />
        <Menu />
        <Story />
        <Gallery />
        <Reservation />
      </main>
      <Footer />
    </>
  );
}
