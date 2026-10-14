import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Same mark as public/favicon.svg — iOS ignores SVG favicons, so it needs a PNG. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <svg xmlns="http://www.w3.org/2000/svg" width={size.width} height={size.height} viewBox="0 0 64 64">
        <rect width="64" height="64" fill="#0b0b0b" />
        <g fill="#e1ac10">
          <path d="M10 12h14v7H10zM14 19h6v26h-6zM10 45h14v7H10z" />
        </g>
        <g fill="#eaeaea">
          <path d="M31 12h8v40h-8zM31 12h22v8H31zM31 29h17v7H31z" />
        </g>
      </svg>
    ),
    { ...size },
  );
}
