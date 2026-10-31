"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
]

export default function Nav() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navBg, setNavBg] = useState<string>("");
  const [navInk, setNavInk] = useState<string>("");
  const [light, setLight] = useState({ x: 50, y: 0 });

  const luminance = (hex: string) => {
    const m = hex.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!m) return 0.5;
    const [r, g, b] = [Number(m[1]), Number(m[2]), Number(m[3])].map((v) => {
      const c = v / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const y = 72 + 1;
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("main > section"),
      );
      let target: HTMLElement | null = null;
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        if (r.top <= y && r.bottom >= y) {
          target = s;
          break;
        }
      }
      if (target) {
        const cs = getComputedStyle(target);
        const bg = cs.backgroundColor;
        setNavBg(bg);
        setNavInk(luminance(bg) > 0.5 ? "#0a0a0a" : "#f5f5f0");
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setLight({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    const el = document.querySelector(".nav-bar > .shell") as HTMLElement | null;
    if (!el) return;
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );
    links.forEach((l) => {
      const el = document.getElementById(l.href.slice(1));
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`nav-bar${scrolled ? " is-scrolled" : ""}`}
        style={
          scrolled
            ? ({ "--nav-bg": navBg, "--nav-ink": navInk } as React.CSSProperties)
            : ({ "--nav-bg": "var(--c-bg)", "--nav-ink": "var(--c-ink)" } as React.CSSProperties)
        }
      >
        <div className="shell flex items-center justify-between py-2">
          <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-active={active === l.href.slice(1)}
                aria-current={active === l.href.slice(1) ? "true" : undefined}
                className="nav-link"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <a
              href="#contact"
              className="btn btn-accent hidden !py-2.5 !px-5 md:inline-flex"
            >
              Start a project
            </a>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="icon-btn nav-toggle md:hidden"
            >
              {/* The key forces a remount on every swap. Menu and X are both an `svg`
                  to React, so without it the same element is patched in
                  place and the entrance plays once, at mount, instead of
                  on every open and close. */}
              {open ? (
                <X key="x" size={17} aria-hidden="true" />
              ) : (
                <Menu key="menu" size={17} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Drawer. Rendered only while open: a closed overlay sitting in the
          layout is still measured as large text over the page. The drawer is
          the only other thing that touches body.overflow, and never at the
          same time as anything else.

          It stays mounted when shut so it can slide — but the slide alone
          read as a curtain with the contents already painted on it, so the
          links arrive down the list behind it. Delays are declared on the
          open state only, which is why closing is immediate rather than a
          queue of fades running backwards. */}
      <div
        aria-hidden={!open}
        inert={!open}
        className={`nav-drawer fixed inset-0 z-50 origin-top bg-bg md:hidden motion-reduce:transition-none ${open ? "is-open translate-y-0" : "pointer-events-none -translate-y-full"}`}
      >
        <div className="shell flex h-full flex-col justify-between pb-10 pt-24">
          <nav aria-label="Menu" className="flex flex-col">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="nav-drawer__link py-4 font-display text-[13vw] uppercase leading-[0.9] tracking-tight"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <p className="nav-drawer__link text-muted">Available for freelance work.</p>
        </div>
      </div>
    </>
  )
}
