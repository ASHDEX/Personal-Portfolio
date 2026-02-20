/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#0f766e",
        accent: "#f97316",
        surface: "#f8fafc",
      },
    },
  },
  plugins: [],
};
