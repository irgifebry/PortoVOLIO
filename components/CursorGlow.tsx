"use client";

import { useEffect, useRef } from "react";

/**
 * Pointer-following accent glow + magnetic pull on elements marked [data-magnetic].
 * Both are decorative and fully disabled for reduced-motion / touch devices.
 */
export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const glow = glowRef.current;
    if (reduced || !fine) {
      if (glow) glow.style.display = "none";
      return;
    }

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;
    let raf = 0;

    const loop = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      if (glow) glow.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;

      const magnetic = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-magnetic]");
      if (magnetic) {
        const r = magnetic.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
        const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
        magnetic.style.transform = `translate(${dx * 10}px, ${dy * 8}px)`;
      }
    };

    const onOver = (e: MouseEvent) => {
      const magnetic = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-magnetic]");
      if (magnetic) magnetic.style.transition = "transform 0.12s ease-out";
    };
    const onOut = (e: MouseEvent) => {
      const magnetic = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-magnetic]");
      if (magnetic) {
        magnetic.style.transition = "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)";
        magnetic.style.transform = "translate(0px, 0px)";
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] h-[420px] w-[420px] rounded-full opacity-[0.16] mix-blend-screen"
      style={{
        background: "radial-gradient(circle, var(--color-signal) 0%, transparent 65%)",
        filter: "blur(30px)",
      }}
    />
  );
}