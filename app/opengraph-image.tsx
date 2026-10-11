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
          background: "#141204",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* accent blobs */}
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: "rgba(232,152,94,0.18)",
            filter: "blur(90px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -220,
            left: -100,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: "rgba(169,113,75,0.26)",
            filter: "blur(90px)",
          }}
        />

        {/* top rule */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 44 }}>
          <div style={{ width: 56, height: 6, borderRadius: 9999, background: "#e8985e" }} />
          <div style={{ fontSize: 20, letterSpacing: "0.2em", textTransform: "uppercase", color: "#e8985e" }}>
            UI/UX DESIGNER &amp; FULL-STACK ENGINEER
          </div>
        </div>

        {/* name */}
        <div
          style={{
            fontSize: 112,
            fontWeight: 700,
            color: "#f6efdf",
            lineHeight: 0.9,
            letterSpacing: "-0.045em",
            display: "flex",
          }}
        >
          IRGI
        </div>
        <div
          style={{
            fontSize: 112,
            fontWeight: 700,
            color: "transparent",
            WebkitTextStroke: "3px #f6efdf",
            lineHeight: 0.92,
            letterSpacing: "-0.045em",
            display: "flex",
          }}
        >
          FEBRYANSYAH
        </div>

        {/* bio */}
        <div
          style={{
            marginTop: 40,
            fontSize: 28,
            color: "rgba(246,239,223,0.55)",
            maxWidth: 820,
            lineHeight: 1.45,
            display: "flex",
          }}
        >
          React, React Native, Android, and Linux infrastructure.
        </div>

        {/* footer row */}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 80,
            right: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid rgba(246,239,223,0.14)",
            paddingTop: 24,
          }}
        >
          <div style={{ fontSize: 22, letterSpacing: "0.18em", color: "rgba(246,239,223,0.5)" }}>
            REACT * REACT NATIVE * ANDROID * LINUX
          </div>
          <div style={{ fontSize: 22, color: "#e8985e" }}>irgifebry.vercel.app</div>
        </div>
      </div>
    ),
    { ...size },
  );
}