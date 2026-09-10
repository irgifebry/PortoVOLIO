import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Irgi Febryansyah — UI/UX Designer & Full-Stack Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#09090b",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* grid decoration */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderLeft: "1px dashed rgba(255,255,255,0.06)",
            borderRight: "1px dashed rgba(255,255,255,0.06)",
            margin: "0 60px",
          }}
        />

        {/* label */}
        <div
          style={{
            display: "flex",
            fontSize: 13,
            fontFamily: "monospace",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#f43f5e",
            marginBottom: 32,
          }}
        >
          Designer / Engineer
        </div>

        {/* name */}
        <div
          style={{
            fontSize: 96,
            fontWeight: 400,
            color: "#fafafa",
            lineHeight: 1,
            marginBottom: 40,
          }}
        >
          Irgi Febryansyah
        </div>

        {/* bio */}
        <div
          style={{
            fontSize: 28,
            color: "rgba(250,250,250,0.5)",
            maxWidth: 800,
            lineHeight: 1.5,
          }}
        >
          UI/UX designer & full-stack engineer — React, React Native, Android.
        </div>

        {/* url */}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 80,
            fontSize: 16,
            fontFamily: "monospace",
            color: "#f43f5e",
          }}
        >
          irgifebry.vercel.app
        </div>
      </div>
    ),
    { ...size },
  );
}
