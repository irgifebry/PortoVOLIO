"use client";

import { useEffect, useRef } from "react";
import { Play } from "lucide-react";

type VideoCardProps = {
  src: string;
  label: string;
  slug: string;
};

export default function VideoCard({ src, label, slug }: VideoCardProps) {
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

  function open(e: React.MouseEvent) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    window.dispatchEvent(
      new CustomEvent("open-video", {
        detail: { src, slug, rect },
      }),
    );
  }

  return (
    <button
      type="button"
      onClick={open}
      aria-label={`Play ${label} demo video`}
      className="group relative block w-full overflow-hidden bg-zinc-950 cursor-pointer"
      data-flip-id={`video-${slug}`}
    >
      <span className="aspect-[16/9] block" />
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
        data-flip-id={`video-el-${slug}`}
      />
      <span className="absolute inset-0 grid place-items-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="grid h-12 w-12 place-items-center bg-signal text-white shadow-xl">
          <Play size={20} aria-hidden="true" fill="currentColor" />
        </span>
      </span>
    </button>
  );
}
