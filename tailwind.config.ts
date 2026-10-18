import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        espresso: {
          dark: "#3B1E12",
          DEFAULT: "#6F3E28",
          light: "#8C4F34",
        },
        caramel: {
          DEFAULT: "#B87945",
          warm: "#C98854",
          light: "#E1A775",
        },
        cream: {
          dark: "#D6BF9E",
          DEFAULT: "#E9D6B8",
          light: "#F5EADC",
        },
        milk: {
          DEFAULT: "#F4EEE5",
          pure: "#FAF7F2",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Cinzel", "Didot", "serif"],
        sans: ["var(--font-sans)", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      letterSpacing: {
        luxury: "0.22em",
        epic: "0.35em",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
