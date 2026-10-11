"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenis } from "@/components/SmoothScroll";

gsap.registerPlugin(ScrollTrigger);

export default function PageAnimations() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      /* ---------- bridge Lenis (smooth scroll) into ScrollTrigger ----------
         Without this, ScrollTrigger reads native scroll position, which Lenis
         never updates -> triggers below the fold never fire and content stays
         stuck at opacity 0. */
      const lenis = getLenis();
      if (lenis) {
        // SmoothScroll already drives lenis.raf in its own rAF loop — do NOT
        // add a second one here or the two fight over scroll position.
        lenis.on("scroll", ScrollTrigger.update);
      }

      /* ---------- section reveals ----------
         Each element gets exactly ONE tween. Nested [data-reveal] scopes would
         otherwise tween the same nodes twice and the later tween re-applies
         opacity:0, leaving content permanently invisible. */
      const animated = new WeakSet<Element>();
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((section) => {
        const items = Array.from(
          section.querySelectorAll<HTMLElement>("[data-reveal-item]"),
        ).filter((el) => {
          if (animated.has(el)) return false;
          animated.add(el);
          return true;
        });
        if (items.length) {
          gsap.from(items, {
            y: 40,
            opacity: 0,
            duration: 0.85,
            stagger: 0.07,
            ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 82%", once: true },
          });
        }
      });

      /* ---------- hero headline mask reveal (fires on load, not scroll) ---------- */
      const heroLines = gsap.utils.toArray<HTMLElement>("[data-line-hero]");
      if (heroLines.length) {
        gsap.from(heroLines, {
          yPercent: 110,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.1,
          delay: 0.15,
        });
      }

      /* ---------- counters ----------
         Hero counters animate on load (they're above the fold). Any other
         .count-up still waits for its ScrollTrigger. */
      gsap.utils.toArray<HTMLElement>(".count-up").forEach((el) => {
        const target = Number(el.dataset.value ?? "0");
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          delay: 0.6,
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v));
          },
        });
      });

      /* ---------- parallax float ---------- */
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const depth = Number(el.dataset.parallax ?? "60");
        gsap.to(el, {
          yPercent: depth,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      /* ---------- rotating hero sticker ---------- */
      const sticker = document.querySelector("[data-sticker]");
      if (sticker) {
        gsap.to(sticker, {
          rotate: 360,
          ease: "none",
          scrollTrigger: { trigger: document.body, start: "top top", end: "bottom top", scrub: 1.2 },
        });
      }

      /* ---------- progress bar on section headers ---------- */
      gsap.utils.toArray<HTMLElement>("[data-rule]").forEach((rule) => {
        gsap.from(rule, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: rule, start: "top 92%", once: true },
        });
      });
    });

    ScrollTrigger.refresh();

    /* ---------- safety net ----------
       Never leave content permanently invisible. If a trigger missed (font/layout
       shift, restored scroll position, odd breakpoint), force anything still
       hidden back to visible. NOTE: no ScrollTrigger.refresh() here — refresh
       restarts every `from` tween and replays the reveal. */
    const failsafe = window.setTimeout(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal-item], [data-line-hero]").forEach((el) => {
        const cs = getComputedStyle(el);
        if (parseFloat(cs.opacity) < 0.9) {
          gsap.set(el, { opacity: 1, y: 0, yPercent: 0, clearProps: "transform" });
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