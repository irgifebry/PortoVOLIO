import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Irgi Febryansyah, UI/UX designer and full-stack engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#17120f";
const BONE = "#f2ece0";
const MUTED = "#b3a294";
const ACCENT = "#e0a912";

/**
 * Flat, no gradients and no rules — the same poster the site opens on,
 * in the site's own colours. next/og renders with a system sans, so the
 * weight is pushed rather than set in Archivo.
 */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: BG,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: ACCENT,
            }}
          >
            UI/UX design &amp; engineering
          </div>

          <div
            style={{
              marginTop: 28,
              fontSize: 150,
              fontWeight: 800,
              color: BONE,
              lineHeight: 0.88,
              letterSpacing: "-0.04em",
              display: "flex",
            }}
          >
            IRGI
          </div>
          <div
            style={{
              fontSize: 150,
              fontWeight: 800,
              color: ACCENT,
              lineHeight: 0.9,
              letterSpacing: "-0.04em",
              display: "flex",
            }}
          >
            FEBRYANSYAH
          </div>

          <div
            style={{
              marginTop: 36,
              fontSize: 30,
              color: MUTED,
              maxWidth: 760,
              lineHeight: 1.4,
              display: "flex",
            }}
          >
            The same person draws the interface, writes the code, and keeps it
            running.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 24, color: MUTED, display: "flex" }}>
            React · React Native · Android · Linux
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, color: ACCENT, display: "flex" }}>
            irgifebry.vercel.app
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}