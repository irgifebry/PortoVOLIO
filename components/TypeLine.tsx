"use client";

import { useEffect, useState } from "react";

export default function TypeLine({ text }: { text: string }) {
  const [shown, setShown] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setShown(text);
      setDone(true);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, 34);
    return () => clearInterval(id);
  }, [text]);

  function render(str: string) {
    return str
      .replace(
        "designs",
        '<span class="text-[var(--color-teal)]">designs</span>',
      )
      .replace("builds", '<span class="text-[var(--color-amber)]">builds</span>');
  }

  return (
    <p className="font-[var(--font-mono)] text-base text-[var(--color-dim)] sm:text-lg">
      <span dangerouslySetInnerHTML={{ __html: render(shown) }} />
      <span
        className={
          done
            ? "opacity-0"
            : "ml-0.5 inline-block w-[2px] animate-pulse border-r-2 border-[var(--color-amber)] align-middle"
        }
      />
    </p>
  );
}
