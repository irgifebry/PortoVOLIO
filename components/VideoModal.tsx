"use client";

import { useEffect, useRef, useState } from "react";
import { X, Play, Pause } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip, useGSAP);

function fmt(s: number) {
  if (isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec < 10 ? "0" : ""}${sec}`;
}

export default function VideoModal() {
  const [data, setData] = useState<{ src: string; slug: string; rect: DOMRect } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const seekRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    function onOpen(e: Event) {
      const detail = (e as CustomEvent).detail;
      setData(detail);
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("open-video", onOpen);
    return () => window.removeEventListener("open-video", onOpen);
  }, []);

  useGSAP(() => {
    if (!data || !containerRef.current || !videoWrapperRef.current) return;

    gsap.set(videoWrapperRef.current, {
      position: "fixed",
      top: data.rect.top,
      left: data.rect.left,
      width: data.rect.width,
      height: data.rect.height,
      zIndex: 50,
    });

    gsap.to(videoWrapperRef.current, {
      top: "8vh",
      left: "8vw",
      width: "84vw",
      height: "84vh",
      borderRadius: "0px",
      duration: 0.6,
      ease: "power3.inOut",
      onComplete: () => {
        gsap.to(".modal-controls", { opacity: 1, duration: 0.2 });
      },
    });

    gsap.to(containerRef.current, { backgroundColor: "rgba(9, 9, 11, 0.95)", duration: 0.3 });

  }, [data]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    if (data) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [data]);

  function close() {
    if (!videoWrapperRef.current || !data) return;

    const v = videoRef.current;
    if (v) v.pause();

    gsap.to(".modal-controls", { opacity: 0, duration: 0.1 });

    gsap.to(videoWrapperRef.current, {
      top: data.rect.top,
      left: data.rect.left,
      width: data.rect.width,
      height: data.rect.height,
      borderRadius: "0px",
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        setData(null);
        setPlaying(false);
        document.body.style.overflow = "";
      },
    });

    gsap.to(containerRef.current, { backgroundColor: "transparent", duration: 0.4 });
  }

  function toggle() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
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

  if (!data) return null;

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-label="Video player"
      aria-modal="true"
      className="fixed inset-0 z-[60] flex items-center justify-center backdrop-blur-sm"
    >
      <button
        type="button"
        aria-label="Close video"
        onClick={close}
        className="absolute inset-0 cursor-default"
        tabIndex={-1}
      />
      <div ref={videoWrapperRef} className="absolute overflow-hidden border border-hair bg-zinc-950 shadow-2xl">
        <div className="modal-controls opacity-0 flex items-center justify-end border-b border-hair bg-zinc-900 px-5 py-3">
          <button
            type="button"
            onClick={close}
            aria-label="Close video"
            className="grid h-8 w-8 place-items-center text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100 cursor-pointer"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="relative flex min-h-0 flex-1 items-center justify-center bg-black">
          <video
            ref={videoRef}
            src={data.src}
            muted={false}
            loop
            playsInline
            autoPlay
            onTimeUpdate={onTime}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        <div className="modal-controls opacity-0 flex items-center gap-4 border-t border-hair bg-zinc-900 px-5 py-3">
          <button
            type="button"
            onClick={toggle}
            aria-label="Play or pause"
            className="grid h-9 w-9 place-items-center bg-signal text-white transition-colors hover:bg-rose-600 cursor-pointer"
          >
            {playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" fill="currentColor" />}
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
            className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-zinc-700 accent-signal"
          />
          <span
            ref={timeRef}
            className="min-w-[70px] text-right font-mono text-xs text-zinc-400"
          >
            0:00 / 0:00
          </span>
        </div>
      </div>
    </div>
  );
}
