import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

const BASE_URL = "https://irgifebry.vercel.app";

const TITLE = "Irgi Febryansyah — UI/UX design and engineering, one person";
const DESCRIPTION =
  "UI/UX designer and full-stack engineer in Indonesia. The same person draws the interface, writes the code and keeps it running. Available for freelance and collaboration.";

/**
 * One family for the whole page. Archivo's `wdth` axis does the work that
 * three separate faces used to do: headlines are set at the narrowest cut and
 * the heaviest weight, running text relaxes back to normal width. The axis is
 * loaded explicitly -- without `axes: ["wdth"]` next/font serves the static
 * cut and `font-stretch` below is silently ignored.
 *
 * Both variable names survive from the previous build so that nothing
 * downstream has to churn.
 */
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--f-display",
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
    <html lang="en" className={`dark ${archivo.variable}`} suppressHydrationWarning>
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
            /* Marks the document before first paint, so the hero's
               masked-line reveal never flashes: the lines are already
               below their clip when the page first renders, and with no
               JavaScript at all the class is never set and the hero is
               visible and simply still. */
            __html: `document.documentElement.classList.add('js-lines');`,
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