import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Same mark as public/favicon.svg — iOS ignores SVG favicons, so it needs a PNG. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <svg xmlns="http://www.w3.org/2000/svg" width={size.width} height={size.height} viewBox="0 0 64 64">
        <rect width="64" height="64" rx="14" fill="#141204" />
        <rect x="14" y="11" width="9" height="8" fill="#e8985e" />
        <g fill="#f6efdf">
          <path d="M14 23h9v30h-9z" />
          <path d="M35 11h9v42h-9z" />
          <path d="M32 22h19v7H32z" />
        </g>
      </svg>
    ),
    { ...size }
  );
}
