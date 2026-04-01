import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MenuPageContent } from "./MenuPageContent";

export const metadata = {
  title: "Menu | Vesper Coffee",
  description: "Explore our carefully crafted menu of specialty coffee, seasonal drinks, and artisan pastries.",
};

export default function MenuPage() {
  return (
    <>
      <Navbar />
      <main>
        <MenuPageContent />
      </main>
      <Footer />
    </>
  );
}
