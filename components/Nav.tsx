"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "#top", label: "Home", num: "01" },
  { href: "#about", label: "About", num: "02" },
  { href: "#services", label: "Services", num: "03" },
  { href: "#experience", label: "Experience", num: "04" },
  { href: "#work", label: "Work", num: "05" },
  { href: "#contact", label: "Contact", num: "06" },
];

const sectionIds = links.map((l) => l.href.slice(1));

export default function Nav() {
  const [active, setActive] = useState("top");
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
      setScrolled(h.scrollTop > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    // SmoothScroll owns anchor scrolling (Lenis); only close the drawer here.
    if (!document.getElementById(id)) return;
    setOpen(false);
  };

  return (
    <>
      <div className="scroll-progress" style={{ width: `${progress}%` }} aria-hidden="true" />

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "py-2.5" : "py-4 sm:py-6"
        }`}
      >
        <div
          aria-hidden="true"
          className={`nav-scrim ${scrolled ? "is-scrolled" : ""}`}
        />
        <div
          aria-hidden="true"
          className={`nav-shade ${scrolled ? "is-scrolled" : ""}`}
        />
        <div
          aria-hidden="true"
          className={`nav-blur ${scrolled ? "is-scrolled" : ""}`}
        />
        <div
          aria-hidden="true"
          className={`nav-line ${scrolled ? "is-scrolled" : ""}`}
        />

        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-end gap-4 px-4 sm:px-6 lg:justify-center lg:px-10">
          <nav
            aria-label="Main navigation"
            className={`nav-shell hidden items-center gap-0.5 p-1.5 pl-2.5 transition-all duration-500 lg:flex ${
              scrolled ? "opacity-100" : "opacity-90"
            }`}
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => go(e, l.href.slice(1))}
                data-active={active === l.href.slice(1)}
                aria-current={active === l.href.slice(1) ? "true" : undefined}
                className="nav-link"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <a href="mailto:irgifebry2006@gmail.com" className="btn btn-primary hidden !py-2.5 !px-5 !text-sm sm:inline-flex">
              Email
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="btn btn-ghost !px-3 !py-2.5 lg:hidden"
            >
              {open ? <X size={16} aria-hidden="true" /> : <Menu size={16} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-canvas/95 backdrop-blur-2xl transition-opacity duration-400 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <nav
          aria-label="Mobile navigation"
          className={`absolute inset-x-4 top-24 flex max-h-[calc(100dvh-7rem)] flex-col gap-2 overflow-y-auto overscroll-contain transition-all duration-500 ${
            open ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}
        >
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => go(e, l.href.slice(1))}
              style={{ transitionDelay: `${open ? 120 + i * 50 : 0}ms` }}
              className={`flex shrink-0 items-center justify-between rounded-3xl border px-5 py-4 transition-all duration-500 sm:px-6 sm:py-5 ${
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              } ${
                active === l.href.slice(1)
                  ? "border-signal bg-signal text-on-accent"
                  : "border-hair bg-panel text-ink"
              }`}
            >
              <span className="font-display text-xl font-bold tracking-tight sm:text-2xl">
                {l.label}
              </span>
              <span className="font-mono text-[11px] opacity-60">{l.num}</span>
            </a>
          ))}
          <a
            href="mailto:irgifebry2006@gmail.com"
            className="btn btn-pop mt-2 shrink-0 !py-4 text-sm"
            onClick={() => setOpen(false)}
          >
            irgifebry2006@gmail.com
          </a>
        </nav>
      </div>
    </>
  );
}