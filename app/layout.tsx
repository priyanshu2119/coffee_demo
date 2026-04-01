import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Preloader } from "@/components/layout/Preloader";
import { ScrollProgressBar } from "@/components/layout/ScrollProgressBar";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  preload: true,
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Vesper Coffee | Where Every Cup Tells a Story",
  description: "Handcrafted coffee, seasonal ingredients, and a space designed to slow you down. Est. 2019 · Specialty Coffee in The Old Quarter.",
  keywords: ["specialty coffee", "cafe", "artisan coffee", "pour over", "cold brew", "pastries", "breakfast"],
  authors: [{ name: "Vesper Coffee" }],
  openGraph: {
    title: "Vesper Coffee | Where Every Cup Tells a Story",
    description: "Handcrafted coffee, seasonal ingredients, and a space designed to slow you down.",
    url: "https://vespercoffee.com",
    siteName: "Vesper Coffee",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vesper Coffee | Where Every Cup Tells a Story",
    description: "Handcrafted coffee, seasonal ingredients, and a space designed to slow you down.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1C1108",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${playfair.variable}`}
    >
      <body className="min-h-screen bg-espresso text-cream antialiased">
        <Preloader />
        <SmoothScrollProvider>
          <CustomCursor />
          <ScrollProgressBar />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
