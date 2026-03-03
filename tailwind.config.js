/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#26d9b8",
          glow: "#5eefd4",
        },
        accent: {
          DEFAULT: "#7c8bff",
          glow: "#a5b0ff",
          warm: "#fbbf24",
        },
        surface: {
          950: "#07080f",
          900: "#0d1120",
          800: "#131d32",
        },
      },
      boxShadow: {
        neon: "0 0 0 1px rgba(38,217,184,0.18), 0 8px 28px rgba(4,8,22,0.65)",
        panel: "0 1px 0 rgba(255,255,255,0.04) inset, 0 16px 48px rgba(4,8,22,0.7)",
      },
      backgroundImage: {
        grid: "radial-gradient(rgba(38,217,184,0.09) 1px, transparent 1px)",
      },
      fontFamily: {
        sans: ["var(--font-space)", "Segoe UI", "sans-serif"],
        mono: ["var(--font-mono)", "Consolas", "monospace"],
      },
    },
  },
  plugins: [],
};
