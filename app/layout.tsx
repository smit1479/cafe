import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "NOIR & CRÈME — Artisanal Iced Latte Ritual",
  description:
    "A sensory journey through slow-motion liquid physics, single-origin espresso cascades, and velvety organic cream.",
  keywords: ["artisanal coffee", "iced latte", "luxury coffee", "scrollytelling", "specialty espresso"],
  openGraph: {
    title: "NOIR & CRÈME — Artisanal Iced Latte Ritual",
    description: "An extraordinary iced latte crafted in slow motion. Cold. Creamy. Unforgettable.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} bg-[#050505]`}>
      <body className="bg-[#050505] text-[#FAF7F2] font-sans antialiased overflow-x-clip selection:bg-[#6F3E28] selection:text-[#FAF7F2]">
        {children}
      </body>
    </html>
  );
}
