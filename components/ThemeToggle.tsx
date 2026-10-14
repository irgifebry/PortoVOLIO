"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { Sun, Moon } from "lucide-react";

/**
 * Mutates the <html> classes and localStorage directly — the blocking
 * inline script in app/layout.tsx is the source of truth, so there is
 * deliberately no theme context competing with it.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("light") ? "light" : "dark");
  }, []);

  const toggle = (event: MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement;
    const next = root.classList.contains("light") ? "dark" : "light";
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const applyTheme = () => {
      root.classList.toggle("light", next === "light");
      root.classList.toggle("dark", next === "dark");
      try {
        localStorage.setItem("theme", next);
      } catch {
        /* private mode — the toggle still works for this session */
      }
    };

    if (document.startViewTransition && !reduceMotion) {
      root.style.setProperty("--theme-x", `${event.clientX}px`);
      root.style.setProperty("--theme-y", `${event.clientY}px`);
      document.startViewTransition(applyTheme);
    } else {
      applyTheme();
    }
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className="icon-btn"
    >
      {theme === "dark" ? (
        <Sun size={17} aria-hidden="true" />
      ) : (
        <Moon size={17} aria-hidden="true" />
      )}
    </button>
  );
}
