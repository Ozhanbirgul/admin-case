/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        background: "rgb(var(--color-background) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        content: "rgb(var(--color-text) / <alpha-value>)",
      },
      fontFamily: {
        // Gövde metinleri için Inter
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Başlıklar için Poppins
        display: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};