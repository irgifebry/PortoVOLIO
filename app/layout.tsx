import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "@phosphor-icons/web/regular";
import "@phosphor-icons/web/fill";
import "@phosphor-icons/web/bold";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Irgi Febryansyah — Designer & Engineer",
  description:
    "Irgi Febryansyah designs the surface and builds the substrate — one route from interface to infrastructure.",
  metadataBase: new URL("https://portofolio-irgi.vercel.app"),
  openGraph: {
    title: "Irgi Febryansyah — Designer & Engineer",
    description:
      "Designs the surface, builds the substrate — one route from interface to infrastructure.",
    type: "website",
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="min-h-full">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-[var(--color-amber)] focus:px-3 focus:py-2 focus:text-[var(--color-panel)]"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
