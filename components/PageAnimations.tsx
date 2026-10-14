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

    /* Every reveal group, with the trigger that owns it. The failsafe below
       needs this: it can only rescue content that was SUPPOSED to be on
       screen by now, and the trigger is the only thing that knows. */
    const reveals: { trigger: ScrollTrigger | null; items: HTMLElement[] }[] = [];

    const ctx = gsap.context(() => {
      const lenis = getLenis();
      if (lenis) lenis.on("scroll", ScrollTrigger.update);

      const animated = new WeakSet<Element>();

      /* ------------------------------------------------------------
         THE HERO — the masked line reveal.

         `gsap.from`, not `gsap.to`. The lines are parked below their
         mask by a CSS rule scoped to the `js-lines` class, which a
         blocking script in app/layout.tsx sets before first paint. `from`
         animates back to wherever the element already is, so the resting
         state and the animation's end state are the same declaration --
         there is no second place to keep in sync, and if the CSS rule is
         ever dropped the text is simply already in place.

         A plain load timeline, deliberately NOT a ScrollTrigger: the hero
         is above the fold, and a trigger here would either fire late or
         need a refresh() that replays every reveal below it.
         ------------------------------------------------------------ */
      const heroLines = gsap.utils.toArray<HTMLElement>("[data-hero-line]");

      /* Measured, not assumed: at 768px the hero line sat 72px below
         its own mask, which put the fixed nav on top of the name. The
         nav is 76px tall and the masthead only clears it by padding, so
         anything still descending at capture time is genuinely hidden.

         The failsafe below already force-reveals every [data-reveal-item]
         after four seconds; this extends the same guarantee to the hero
         lines, which are not reveal items and so were never covered by
         it. A stuck hero is the worst possible failure on this page --
         the name IS the page. */
      /* Sets the resting transform and LEAVES it inline. `clearProps` here
         is a trap: stripping the inline transform hands control straight
         back to the `html.js-lines` rule, which is translateY(105%) --
         so the settle would park the hero below its own mask again.
         That is exactly the bug this replaced. */
      const settleHero = () => {
        heroLines.forEach((el) => {
          if (el.getBoundingClientRect().top > window.innerHeight) return;
          gsap.set(el, { yPercent: 0, y: 0 });
        });
      };
      window.setTimeout(settleHero, 1600);
      window.addEventListener("load", settleHero, { once: true });

      /* Both `yPercent: 105` AND `y: 0` are required, and the reason is
         worth writing down because it is invisible otherwise.

         The hidden state lives in CSS as `transform: translateY(105%)`.
         GSAP parses that as a `y` of 72.81px -- pixels, not a percent.
         So a tween that animates only `yPercent` drives it to 0 while
         `y` stays parked at 72.81px, the two are composed, and the name
         never rises. Measured, not guessed: the inline style read
         `translate(0%, 0%) translate3d(0px, 72.81px, 0px)`.

         Declaring `y: 0` tells GSAP to use zero rather than the value it
         parsed out of the CSS, so the percent owns the offset outright. */
      gsap.set(heroLines, { yPercent: 105, y: 0 });

      gsap.to(heroLines, {
        yPercent: 0,
        y: 0,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.11,
        onComplete: settleHero,
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((section) => {
        const items = Array.from(
          section.querySelectorAll<HTMLElement>("[data-reveal-item]"),
        ).filter((el) => {
          if (animated.has(el)) return false;
          animated.add(el);
          return true;
        });
        if (!items.length) return;

        /* `immediateRender: true` is load-bearing, not a tweak.

           A `from()` tween is made of two tweens: the "from" values and
           the tween itself. GSAP marks the from-half LAZY, so it only
           renders when the tween actually starts -- and with a
           ScrollTrigger that start is deferred until the trigger
           fires. The result is the page paints every section already
           visible, and then the section snaps back to opacity 0 the
           moment it crosses 82% of the viewport and animates in again.
           Measured on a real scroll-through: 28 elements went 1 -> ~0
           and replayed. That is the "it reloads twice" feel.

           Forcing the from-half to render now parks every reveal item
           at opacity 0 from the first paint, so the only thing a
           visitor ever sees is one entrance. Triggers whose start is
           already behind the scroll position still fire on mount, so
           above-the-fold sections are unaffected. */
        const tween = gsap.from(items, {
          y: 28,
          opacity: 0,
          duration: 0.8,
          stagger: 0.075,
          ease: "power3.out",
          immediateRender: true,
          scrollTrigger: { trigger: section, start: "top 82%", once: true },
        });

        reveals.push({ trigger: tween.scrollTrigger ?? null, items });
      });
    });

    /* Safety net. Font swap, a restored scroll position or an odd
       breakpoint can all mean a trigger never fires. Nothing may stay
       invisible -- so anything still hidden after four seconds is put back.
       No refresh() here: that would restart every `from` tween.

       The `pending` test is the whole point, and getting it wrong is what
       made the page look like it reloaded twice. The previous version
       rescued *every* item under 0.9 opacity, which at four seconds means
       every section the visitor had not scrolled to yet -- the failsafe
       revealed the entire page at once, and then each section's own
       trigger fired on the way down and replayed its entrance. Measured:
       with no scrolling at all, 23 of 23 items jumped to visible at 4s.

       So a group is only rescued when its trigger is GONE. A live trigger
       is either still waiting for the section to arrive -- which is the
       whole point -- or due this very frame, in which case ScrollTrigger
       releases it on its next update and the entrance plays normally.
       Racing it here instead is what left the Index bars flashing: a
       scroll fast enough to cross the section inside the four seconds
       got its items rescued on the way past, then the trigger fired and
       put them back to zero. */
    const failsafe = window.setTimeout(() => {
      const live = new Set(ScrollTrigger.getAll());
      reveals.forEach(({ trigger, items }) => {
        if (trigger && live.has(trigger)) return;
        items.forEach((el) => {
          if (parseFloat(getComputedStyle(el).opacity) < 0.9) {
            gsap.set(el, { opacity: 1, y: 0, clearProps: "transform" });
          }
        });
      });

      /* The hero lines are not reveal items, so the loop above never
         reached them. They get the same guarantee, and without it a
         missed trigger leaves the page's name sitting below its mask. */
      gsap.utils.toArray<HTMLElement>("[data-hero-line]").forEach((el) => {
        /* No clearProps: see settleHero. The inline transform has to
           stay, or the hidden-state CSS rule re-applies. `y: 0` is
           required alongside `yPercent: 0` -- see the note above. */
        gsap.set(el, { yPercent: 0, y: 0 });
      });
    }, 4000);

    return () => {
      window.clearTimeout(failsafe);
      ctx.revert();
    };
  }, []);

  return null;
}