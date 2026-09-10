import type { Metadata } from "next";
import { Instrument_Serif, Inter, Space_Mono } from "next/font/google";
import "./globals.css";

const BASE_URL = "https://irgifebry.vercel.app";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Irgi Febryansyah — UI/UX Designer & Full-Stack Engineer",
  description:
    "UI/UX designer dan full-stack engineer spesialis React, React Native, dan Android. Tersedia untuk proyek freelance dan kolaborasi.",
  metadataBase: new URL(BASE_URL),
  openGraph: {
    title: "Irgi Febryansyah — UI/UX Designer & Full-Stack Engineer",
    description:
      "UI/UX designer dan full-stack engineer spesialis React, React Native, dan Android. Tersedia untuk proyek freelance dan kolaborasi.",
    type: "website",
    url: BASE_URL,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Irgi Febryansyah — Designer / Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Irgi Febryansyah — UI/UX Designer & Full-Stack Engineer",
    description:
      "UI/UX designer dan full-stack engineer spesialis React, React Native, dan Android.",
  },
  icons: { icon: "/favicon.svg" },
};

import SmoothScroll from "@/components/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Irgi Febryansyah",
              jobTitle: "UI/UX Designer & Full-Stack Engineer",
              email: "irgifebry2006@gmail.com",
              url: BASE_URL,
              sameAs: [
                "https://github.com/irgifebry",
                "https://www.instagram.com/irgi.syh/",
              ],
              knowsAbout: [
                "UI/UX Design",
                "React",
                "React Native",
                "Android",
                "Figma",
                "Laravel",
                "Network Administration",
              ],
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-rose-500 focus:px-3 focus:py-2 focus:text-white focus:rounded-md"
        >
          Skip to content
        </a>
        {children}
        <SmoothScroll />
      </body>
    </html>
  );
}
