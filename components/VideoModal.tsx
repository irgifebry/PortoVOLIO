"use client";

import { useEffect, useRef, useState } from "react";

function fmt(s: number) {
  if (isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec < 10 ? "0" : ""}${sec}`;
}

export default function VideoModal() {
  const [src, setSrc] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const seekRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    function onOpen(e: Event) {
      const detail = (e as CustomEvent<string>).detail;
      setSrc(detail);
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("open-video", onOpen);
    return () => window.removeEventListener("open-video", onOpen);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    if (src) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [src]);

  function close() {
    const v = videoRef.current;
    if (v) v.pause();
    setSrc(null);
    document.body.style.overflow = "";
  }

  function toggle() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  }

  function syncIcons() {
    const v = videoRef.current;
    if (!v) return;
    const play = v.parentElement?.parentElement?.querySelector(".play-icon");
    const pause = v.parentElement?.parentElement?.querySelector(".pause-icon");
    if (play && pause) {
      play.classList.toggle("hidden", !v.paused);
      pause.classList.toggle("hidden", v.paused);
    }
  }

  function onTime() {
    const v = videoRef.current;
    if (!v || !seekRef.current || !timeRef.current) return;
    if (v.duration) {
      seekRef.current.value = String((v.currentTime / v.duration) * 100);
      timeRef.current.textContent = `${fmt(v.currentTime)} / ${fmt(v.duration)}`;
    }
  }

  function onSeek(e: React.ChangeEvent<HTMLInputElement>) {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    v.currentTime = (Number(e.target.value) / 100) * v.duration;
  }

  if (!src) return null;

  return (
    <div
      role="dialog"
      aria-label="Video player"
      aria-modal="true"
      onClick={close}
      className="fixed inset-0 z-50 grid place-items-center bg-[var(--color-panel)]/80 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl overflow-hidden rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] shadow-xl"
      >
        <div className="relative">
          <video
            ref={videoRef}
            src={src}
            muted
            loop
            playsInline
            autoPlay
            onTimeUpdate={onTime}
            onPlay={syncIcons}
            onPause={syncIcons}
            className="aspect-video w-full bg-black"
          />
          <button
            type="button"
            onClick={close}
            aria-label="Close video"
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-[var(--color-panel)]/60 text-[var(--color-text)] hover:bg-[var(--color-panel)]"
          >
            <i className="ph ph-x" aria-hidden="true" />
          </button>
        </div>
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            type="button"
            onClick={toggle}
            aria-label="Play or pause"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--color-panel)] text-[var(--color-amber)] hover:opacity-85"
          >
            <i className="ph-fill ph-play play-icon" aria-hidden="true" />
            <i className="ph-fill ph-pause pause-icon hidden" aria-hidden="true" />
          </button>
          <input
            ref={seekRef}
            type="range"
            min={0}
            max={100}
            defaultValue={0}
            step={0.1}
            onChange={onSeek}
            aria-label="Seek"
            className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-[var(--color-line)]"
            style={{ accentColor: "var(--color-amber)" }}
          />
          <span
            ref={timeRef}
            className="shrink-0 font-[var(--font-mono)] text-xs text-[var(--color-dim)]"
          >
            0:00 / 0:00
          </span>
        </div>
      </div>
    </div>
  );
}
