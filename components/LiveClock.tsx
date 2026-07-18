"use client";

import { useEffect, useState } from "react";

export default function LiveClock() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const pad = (n: number) => String(n).padStart(2, "0");
    function tick() {
      const now = new Date();
      setTime(`${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`);
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return <span className="font-[var(--font-mono)] tabular-nums">{time}</span>;
}
