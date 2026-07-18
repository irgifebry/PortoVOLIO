"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "li" | "article";
  stagger?: boolean;
  delay?: boolean;
};

export default function Reveal({
  children,
  className = "",
  as = "div",
  stagger = false,
  delay = false,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const base = stagger ? "stagger" : "reveal";
  const classes = [
    base,
    visible ? "is-visible" : "",
    delay ? "md:delay-100" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const Tag = as as React.ElementType;
  return (
    <Tag ref={ref} className={classes}>
      {children}
    </Tag>
  );
}
