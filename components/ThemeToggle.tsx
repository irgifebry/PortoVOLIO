"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const root = document.documentElement;
    setTheme(root.classList.contains("light") ? "light" : "dark");
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = root.classList.contains("light") ? "dark" : "light";
    root.classList.toggle("light", next === "light");
    root.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* ignore */
    }
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className={`btn btn-ghost !px-3.5 !py-2.5 ${className}`}
    >
      <span className="relative block h-4 w-4">
        <Sun
          size={16}
          aria-hidden="true"
          className={`absolute inset-0 transition-all duration-300 ${
            theme === "dark" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"
          }`}
        />
        <Moon
          size={16}
          aria-hidden="true"
          className={`absolute inset-0 transition-all duration-300 ${
            theme === "dark" ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"
          }`}
        />
      </span>
    </button>
  );
}