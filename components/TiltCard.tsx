"use client";

import { useRef, type ReactNode } from "react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** max rotation in degrees */
  intensity?: number;
  /** lift on hover in px */
  lift?: number;
};

export default function TiltCard({
  children,
  className = "",
  intensity = 7,
  lift = -6,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    // spotlight position for the gradient border
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);

    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const rotateY = (px - 0.5) * intensity * 2;
      const rotateX = (0.5 - py) * intensity * 2;
      el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${lift}px)`;
    });
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transformStyle: "preserve-3d" }}
      className={`tilt ${className}`}
    >
      {children}
    </div>
  );
}