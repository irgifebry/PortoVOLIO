"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Shared so PageAnimations can bridge Lenis -> ScrollTrigger.
let instance: Lenis | null = null;

export function getLenis() {
  return instance;
}

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 0.6,
      touchMultiplier: 0.8,
    });
    instance = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Anchor links must go through Lenis or the two fight over scroll position.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -80 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      lenis.destroy();
      instance = null;
    };
  }, []);

  return null;
}