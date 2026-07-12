/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html"],
  theme: {
    extend: {
      colors: {
        surface: "#ffffff",
        "surface-hover": "#f5f5f5",
        "border-light": "#e0e0e0",
        muted: "#6b6b6b",
        accent: "#e63946",
        "accent-hover": "#c1121f",
        "dark-bg": "#0f0f0f",
        "dark-surface": "#1a1a1a",
        "dark-surface-hover": "#252525",
        "dark-border": "#2a2a2a",
        "dark-muted": "#a0a0a0",
        "dark-text": "#f0f0f0",
      },
      fontFamily: {
        display: ["Inter Tight", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "display-xl": ["5rem", { lineHeight: "0.95", letterSpacing: "-0.03em", fontWeight: "900" }],
        "display-lg": ["3.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "800" }],
        heading: ["1.75rem", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "700" }],
        subheading: ["1.125rem", { lineHeight: "1.4", letterSpacing: "0", fontWeight: "600" }],
      },
      maxWidth: {
        content: "1200px",
      },
      spacing: {
        section: "5rem",
        "section-lg": "8rem",
      },
    },
  },
  plugins: [],
}
