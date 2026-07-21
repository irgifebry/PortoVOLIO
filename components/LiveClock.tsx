"use client";

import { useEffect, useState } from "react";

type LiveClockProps = {
  className?: string;
};

export default function LiveClock({ className }: LiveClockProps) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const formatter = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZoneName: "short",
      });
      setTime(formatter.format(new Date()));
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`telemetry ${className ?? ""}`} suppressHydrationWarning>
      {time || "00:00:00"}
    </span>
  );
}
