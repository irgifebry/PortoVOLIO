"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenis } from "@/components/SmoothScroll";

gsap.registerPlugin(ScrollTrigger);

/**
 * The motion layer. Three jobs, nothing else:
 *
 *   1. bridge Lenis into ScrollTrigger, or every trigger below the fold
 *      reads a scroll position that never moves;
 *   2. give each [data-reveal-item] exactly one entrance tween;
 *   3. never leave content invisible if a trigger is missed.
 *
 * The pinned poster is NOT animated here — it is `position: sticky` in CSS
 * and driven by ordinary scrolling.
 *
 * Invariants that are easy to break and expensive to debug:
 *   - never nest [data-reveal] scopes (a second tween re-applies opacity:0);
 *   - never add a second rAF loop or call ScrollTrigger.refresh() after mount
 *     (SmoothScroll already owns the frame, and refresh replays every reveal);
 *   - never gate this on a device check rather than the reduced-motion query.
 */
export default function PageAnimations() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const lenis = getLenis();
      if (lenis) lenis.on("scroll", ScrollTrigger.update);

      const animated = new WeakSet<Element>();

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((section) => {
        const items = Array.from(
          section.querySelectorAll<HTMLElement>("[data-reveal-item]"),
        ).filter((el) => {
          if (animated.has(el)) return false;
          animated.add(el);
          return true;
        });
        if (!items.length) return;

        gsap.from(items, {
          y: 28,
          opacity: 0,
          duration: 0.8,
          stagger: 0.075,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 82%", once: true },
        });
      });
    });

    /* Safety net. Font swap, a restored scroll position or an odd
       breakpoint can all mean a trigger never fires. Nothing may stay
       invisible — so anything still hidden after four seconds is put back.
       No refresh() here: that would restart every `from` tween. */
    const failsafe = window.setTimeout(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal-item]").forEach((el) => {
        if (parseFloat(getComputedStyle(el).opacity) < 0.9) {
          gsap.set(el, { opacity: 1, y: 0, clearProps: "transform" });
        }
      });
    }, 4000);

    return () => {
      window.clearTimeout(failsafe);
      ctx.revert();
    };
  }, []);

  return null;
}