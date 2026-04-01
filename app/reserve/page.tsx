import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ReservePageContent } from "./ReservePageContent";

export const metadata = {
  title: "Reserve | Vesper Coffee",
  description: "Book a table at Vesper Coffee. Join us for exceptional coffee and a warm atmosphere.",
};

export default function ReservePage() {
  return (
    <>
      <Navbar />
      <main>
        <ReservePageContent />
      </main>
      <Footer />
    </>
  );
}
