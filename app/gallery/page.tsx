import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GalleryPageContent } from "./GalleryPageContent";

export const metadata = {
  title: "Gallery | Vesper Coffee",
  description: "A visual journey through Vesper Coffee - our space, our craft, our community.",
};

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main>
        <GalleryPageContent />
      </main>
      <Footer />
    </>
  );
}
