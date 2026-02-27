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
          DEFAULT: "#22d3ee",
          glow: "#67e8f9",
        },
        accent: {
          DEFAULT: "#a78bfa",
          glow: "#c4b5fd",
        },
        surface: {
          950: "#050816",
          900: "#0a1024",
          800: "#111a35",
        },
      },
      boxShadow: {
        neon: "0 0 0 1px rgba(34, 211, 238, 0.25), 0 12px 30px rgba(7, 22, 58, 0.45)",
      },
      backgroundImage: {
        grid: "radial-gradient(rgba(103,232,249,0.12) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
