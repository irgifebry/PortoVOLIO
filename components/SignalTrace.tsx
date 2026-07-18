"use client";

import { useEffect, useState } from "react";

const PATH =
  "M0 30 L60 30 L80 30 L95 12 L110 48 L125 22 L140 38 L160 30 L240 30 L260 30 L275 8 L292 52 L308 20 L324 40 L344 30 L440 30 L460 30 L475 18 L490 44 L506 26 L522 34 L542 30 L640 30";

export default function SignalTrace() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <svg
      viewBox="0 0 640 60"
      className="h-10 w-full max-w-md"
      fill="none"
      role="img"
      aria-label="Signal trace"
    >
      <line
        x1="0"
        y1="30"
        x2="640"
        y2="30"
        stroke="var(--color-line)"
        strokeWidth="1"
      />
      <path
        d={PATH}
        stroke="var(--color-amber)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="signal-draw"
        style={{
          strokeDasharray: 1400,
          strokeDashoffset: mounted ? 0 : 1400,
          transition: "stroke-dashoffset 1.6s ease 0.2s",
        }}
      />
      <circle cx="522" cy="34" r="3" fill="var(--color-teal)" />
    </svg>
  );
}
