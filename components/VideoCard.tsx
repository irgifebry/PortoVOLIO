"use client";

import { useEffect, useRef } from "react";

type VideoCardProps = {
  src: string;
  label: string;
};

export default function VideoCard({ src, label }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!video.src) video.src = src;
            if (!reduced) video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { rootMargin: "200px 0px", threshold: 0.1 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [src]);

  function open() {
    window.dispatchEvent(new CustomEvent("open-video", { detail: src }));
  }

  return (
    <button
      type="button"
      onClick={open}
      aria-label={`Play ${label} demo video`}
      className="group relative block h-full w-full overflow-hidden rounded-lg border border-[var(--color-line)] bg-[var(--color-panel)] aspect-[16/10] transition hover:border-[var(--color-teal)]"
    >
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        className="h-full w-full object-cover"
      />
      <span className="absolute inset-0 grid place-items-center bg-[var(--color-panel)]/30 transition group-hover:bg-[var(--color-panel)]/10">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-[var(--color-amber)] text-[var(--color-panel)] shadow-md transition group-hover:scale-105">
          <i className="ph-fill ph-play text-lg" aria-hidden="true" />
        </span>
      </span>
      <span className="absolute left-3 top-3 h-2 w-2 rounded-full bg-[var(--color-amber)]" aria-hidden="true" />
    </button>
  );
}
