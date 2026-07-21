"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip, useGSAP);

export default function VideoModal() {
  const [data, setData] = useState<{ src: string; slug: string; rect: DOMRect } | null>(null);
  const [closeBtnPos, setCloseBtnPos] = useState<{ top: number; right: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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
    const cardW = data.rect.width;
    const cardH = data.rect.height;

    gsap.set(videoWrapperRef.current, {
      position: "fixed",
      top: data.rect.top,
      left: data.rect.left,
      width: cardW,
      height: cardH,
      zIndex: 50,
      scaleX: 1,
      scaleY: 1,
    });

    gsap.set(containerRef.current, { backgroundColor: "transparent", backdropFilter: "blur(0px)" });

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const targetScale = Math.min((vw * 0.9) / cardW, (vh * 0.85) / cardH);
    const destX = vw / 2 - data.rect.left - cardW / 2;
    const destY = vh / 2 - data.rect.top - cardH / 2;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (vw < 768) {
      const videoTop = vh / 2 - (cardH * targetScale) / 2;
      const videoRight = vw / 2 - (cardW * targetScale) / 2;
      setCloseBtnPos({ top: videoTop + 12, right: videoRight + 12 });
    } else {
      setCloseBtnPos(null);
    }

    gsap.to(videoWrapperRef.current, {
      x: destX,
      y: destY,
      scaleX: targetScale,
      scaleY: targetScale,
      borderRadius: "8px",
      duration: reduced ? 0 : 0.5,
      ease: "power3.out",
    });

    gsap.to(containerRef.current, {
      backgroundColor: "rgba(9, 9, 11, 0.75)",
      backdropFilter: "blur(12px)",
      duration: reduced ? 0 : 0.4,
      ease: "power2.out",
    });
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

    gsap.to(videoWrapperRef.current, {
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      borderRadius: "0px",
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => {
        setData(null);
        document.body.style.overflow = "";
      },
    });

    gsap.to(containerRef.current, {
      backgroundColor: "transparent",
      backdropFilter: "blur(0px)",
      duration: 0.3,
    });
  }

  if (!data) return null;

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-label="Video player"
      aria-modal="true"
      className="fixed inset-0 z-[60] flex items-center justify-center"
      style={{ backdropFilter: "blur(0px)" }}
    >
      <button
        type="button"
        onClick={close}
        className="absolute inset-0 cursor-default"
        tabIndex={-1}
      />

      <div ref={videoWrapperRef} className="overflow-hidden bg-black shadow-2xl">
        <div className="flex h-full w-full items-center justify-center">
          <video
            ref={videoRef}
            src={data.src}
            muted={false}
            loop
            playsInline
            autoPlay
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
