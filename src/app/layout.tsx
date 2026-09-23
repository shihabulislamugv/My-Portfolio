import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Nav } from "@/components/Nav";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { CustomCursor } from "@/components/CustomCursor";
import { BackToTop } from "@/components/BackToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SHIHAB | Senior UX/UI & Product Designer",
  description: "Senior UX/UI & Product Designer crafting bold, high-converting digital products, design systems, and web experiences.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f8f8f5] text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white">
        <Providers>
          <ScrollProgressBar />
          <CustomCursor />
          <Nav />
          {children}
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}
