import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const BASE_URL = "https://irgifebry.vercel.app";

const TITLE = "Irgi Febryansyah — UI/UX Designer & Full-Stack Engineer";
const DESCRIPTION =
  "UI/UX designer dan full-stack engineer spesialis React, React Native, dan Android. Tersedia untuk proyek freelance dan kolaborasi.";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-display",
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL(BASE_URL),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: BASE_URL,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Irgi Febryansyah — Designer / Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  icons: { icon: "/favicon.svg" },
};

import SmoothScroll from "@/components/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`dark ${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
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
                var stored = localStorage.getItem('theme');
                var isLight = stored === 'light';
                document.documentElement.classList.toggle('light', isLight);
                document.documentElement.classList.toggle('dark', !isLight);
              } catch (_) {
                document.documentElement.classList.remove('light');
                document.documentElement.classList.add('dark');
              }
            `,
          }}
        />
      </head>
      <body className="min-h-full antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {/* Must mount BEFORE PageAnimations so getLenis() resolves in its effect */}
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}