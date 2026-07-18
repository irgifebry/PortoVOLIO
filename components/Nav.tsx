"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#profile", label: "profile" },
  { href: "#capabilities", label: "stack" },
  { href: "#fieldlog", label: "field log" },
  { href: "#delivered", label: "delivered" },
  { href: "#contact", label: "contact" },
];

const sectionIds = ["main", "profile", "capabilities", "fieldlog", "delivered", "contact"];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("main");

  useEffect(() => {
    function onScroll() {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[var(--color-line)] bg-[var(--color-panel)]/85 backdrop-blur">
      <div className="relative mx-auto flex h-14 max-w-[var(--maxw)] items-center justify-between px-5">
        <a
          href="#top"
          className="font-[var(--font-display)] text-base font-semibold tracking-tight"
        >
          Irgi<span className="text-[var(--color-amber)]">.</span>
        </a>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Sections">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`group font-[var(--font-mono)] text-xs tracking-wide transition ${
                active === l.href.slice(1)
                  ? "text-[var(--color-text)]"
                  : "text-[var(--color-dim)] hover:text-[var(--color-text)]"
              }`}
            >
              {active === l.href.slice(1) && (
                <span className="mr-1 text-[var(--color-amber)]">▸</span>
              )}
              {l.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="grid h-9 w-9 place-items-center rounded-md border border-[var(--color-line)] text-[var(--color-text)] md:hidden"
        >
          {open ? (
            <i className="ph ph-x" aria-hidden="true" />
          ) : (
            <i className="ph ph-list" aria-hidden="true" />
          )}
        </button>
        <span
          className="absolute bottom-0 left-0 h-0.5 bg-[var(--color-amber)] transition-[width]"
          style={{ width: `${progress}%` }}
          aria-hidden="true"
        />
      </div>
      {open && (
        <nav
          className="border-t border-[var(--color-line)] bg-[var(--color-panel)] px-5 py-3 md:hidden"
          aria-label="Mobile sections"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 py-2 font-[var(--font-mono)] text-xs text-[var(--color-dim)]"
            >
              <span className="text-[var(--color-amber)]">▸</span>
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
