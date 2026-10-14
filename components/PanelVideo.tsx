"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string
  poster: string
  alt: string
  /** Only the panel nearest the middle of the viewport is allowed to play. */
  active: boolean
};

/**
 * One project panel's moving picture.
 *
 * The <video> element is rendered with no `src`: the file is only assigned
 * once the panel is close to the viewport, so four panels cost one clip
 * instead of four. With reduced motion the source is never assigned at all
 * and the poster frame stays — the panel still reads as a picture.
 */
export default function PanelVideo({ src, poster, alt, active }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [attached, setAttached] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAttached(true);
      },
      { rootMargin: "60% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !attached) return;
    if (active) {
      void el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [active, attached]);

  return (
    <video
      ref={ref}
      className="poster-media"
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={alt}
      tabIndex={-1}
    >
      {attached && <source src={src} type="video/mp4" />}
    </video>
  )
}