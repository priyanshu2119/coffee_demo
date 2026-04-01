import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StoryPageContent } from "./StoryPageContent";

export const metadata = {
  title: "Our Story | Vesper Coffee",
  description: "Discover the story behind Vesper Coffee - from our origins to our commitment to quality and community.",
};

export default function StoryPage() {
  return (
    <>
      <Navbar />
      <main>
        <StoryPageContent />
      </main>
      <Footer />
    </>
  );
}
