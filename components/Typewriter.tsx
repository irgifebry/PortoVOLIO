"use client";

import { useEffect, useState } from "react";

type TypewriterProps = {
  phrases: string[];
  className?: string;
};

export default function Typewriter({ phrases, className }: TypewriterProps) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let idx = 0;
    let phraseIdx = 0;
    let mode: "typing" | "pause" | "deleting" = "typing";
    let timer: ReturnType<typeof setTimeout>;

    function tick() {
      const current = phrases[phraseIdx % phrases.length];
      if (!current) return;

      if (mode === "typing") {
        if (idx < current.length) {
          idx++;
          setDisplayed(current.slice(0, idx));
          timer = setTimeout(tick, 40 + Math.random() * 60);
        } else {
          mode = "pause";
          timer = setTimeout(tick, 2000);
        }
      } else if (mode === "pause") {
        mode = "deleting";
        timer = setTimeout(tick, 30);
      } else {
        if (idx > 0) {
          idx--;
          setDisplayed(current.slice(0, idx));
          timer = setTimeout(tick, 20 + Math.random() * 30);
        } else {
          phraseIdx++;
          mode = "typing";
          timer = setTimeout(tick, 200);
        }
      }
    }

    timer = setTimeout(tick, 200);
    return () => clearTimeout(timer);
  }, [phrases]);

  return (
    <span className={className}>
      {displayed}
      <span className="inline-block w-[2px] h-[1em] bg-current align-middle ml-0.5 animate-pulse" />
    </span>
  );
}
