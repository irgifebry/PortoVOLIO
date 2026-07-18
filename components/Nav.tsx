"use client";

import { useEffect, useState, useRef } from "react";
import { Sun, Moon } from "lucide-react";

const links = [
  { href: "#top", label: "Top" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

const sectionIds = ["top", "about", "experience", "work", "contact"];

export default function Nav() {
  const [active, setActive] = useState("top");
  const navRef = useRef<HTMLElement>(null);
  const [dotStyle, setDotStyle] = useState({ left: 0, opacity: 0 });
  const [theme, setTheme] = useState("light");

  useEffect(() => {
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
    return () => io.disconnect();
  }, []);

  const activeIndex = links.findIndex((l) => l.href.slice(1) === active);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav || activeIndex === -1) return;
    const activeEl = nav.children[activeIndex] as HTMLElement;
    if (activeEl) {
      const left = activeEl.offsetLeft + activeEl.offsetWidth / 2 - 2;
      setDotStyle({ left, opacity: 1 });
    }
  }, [active, activeIndex]);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2">
      <div className="status-bar px-5 py-2.5 shadow-2xl flex items-center gap-4 transition-all duration-300 hover:shadow-xl">
        <nav
          ref={navRef}
          className="relative flex items-center gap-4 sm:gap-6"
          aria-label="Main navigation"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => scrollTo(e, l.href.slice(1))}
              aria-current={active === l.href.slice(1) ? "true" : undefined}
              className={`relative telemetry text-[11px] font-semibold transition-all duration-200 uppercase pb-1 hover:scale-[1.05] active:scale-95 ${
                active === l.href.slice(1)
                  ? "text-signal"
                  : "text-steel hover:text-ink"
              }`}
            >
              {l.label}
            </a>
          ))}
          <span
            className="absolute bottom-0 h-1 w-1 rounded-full bg-signal transition-all duration-300 ease-out pointer-events-none"
            style={{
              transform: `translateX(${dotStyle.left}px)`,
              opacity: dotStyle.opacity,
            }}
          />
        </nav>

        <div className="h-4 w-px bg-hair" />

        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle color theme"
          className="text-steel hover:text-ink transition-colors duration-200 cursor-pointer flex items-center"
        >
          {theme === "dark" ? <Sun size={13} aria-hidden="true" /> : <Moon size={13} aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}
