import type { ReactNode } from "react";

type MarqueeProps = {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
};

export default function Marquee({ children, duration = 34, reverse = false, className = "" }: MarqueeProps) {
  return (
    <div
      className={`marquee ${reverse ? "marquee--reverse" : ""} ${className}`}
      style={{ ["--marquee-duration" as string]: `${duration}s` }}
    >
      <div className="marquee__track" aria-hidden={false}>
        {children}
      </div>
      <div className="marquee__track" aria-hidden="true">
        {children}
      </div>
    </div>
  );
}