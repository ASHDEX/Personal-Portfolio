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
          DEFAULT: "#334155",
          glow: "#475569",
        },
        accent: {
          DEFAULT: "#64748b",
          glow: "#94a3b8",
        },
        surface: {
          950: "#f8fafc",
          900: "#ffffff",
          800: "#f1f5f9",
        },
      },
      boxShadow: {
        neon: "0 1px 2px rgba(15, 23, 42, 0.08), 0 12px 32px rgba(15, 23, 42, 0.08)",
      },
      backgroundImage: {
        grid: "radial-gradient(rgba(148,163,184,0.2) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
