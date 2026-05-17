import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        apple: {
          white: "#ffffff",
          light: "#f5f5f7",
          gray: "#f0f0f0",
          mid: "#d2d2d7",
          dark: "#1d1d1f",
          text: "#6e6e73",
          link: "#0066cc",
          blue: "#0071e3",
          border: "#d2d2d7",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system", "BlinkMacSystemFont", "SF Pro Display",
          "SF Pro Text", "Helvetica Neue", "Arial", "Noto Sans SC",
          "sans-serif"
        ],
      },
      borderRadius: {
        apple: "12px",
      },
      boxShadow: {
        apple: "0 1px 3px rgba(0,0,0,0.06)",
        "apple-hover": "0 4px 20px rgba(0,0,0,0.08)",
        "apple-lg": "0 8px 40px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
