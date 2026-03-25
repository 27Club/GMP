import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#eef3f8",
          100: "#d5e1ed",
          200: "#afc5db",
          300: "#82a3c4",
          400: "#5b83ac",
          500: "#3d6590",
          600: "#2e4f74",
          700: "#1e3a5f",
          800: "#0f2b46",
          900: "#081b2e",
          950: "#040e18",
        },
        gold: {
          50: "#fdf9ef",
          100: "#faf0d5",
          200: "#f4dfa8",
          300: "#edc872",
          400: "#e5ad3e",
          500: "#d4a843",
          600: "#c08a28",
          700: "#9d6a22",
          800: "#815423",
          900: "#6b4520",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
