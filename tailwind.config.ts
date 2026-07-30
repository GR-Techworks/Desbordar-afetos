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
        primary: {
          DEFAULT: "#7A1A2E",
          light: "#9C2A42",
          dark: "#5A0F1E",
        },
        acolhimento: {
          DEFAULT: "#F5E3D8",
          light: "#FDF6F0",
        },
        criatividade: {
          DEFAULT: "#4A2C5E",
          light: "#6B4A82",
        },
        seguranca: {
          DEFAULT: "#6B4F3C",
          light: "#8B6F5A",
        },
        equilibrio: {
          DEFAULT: "#5A7A5A",
          light: "#7A9A7A",
        },
        warm: {
          white: "#FDF7F2",
          beige: "#F5ECE4",
        },
        "soft-text": "#2C1A10",
        "muted-text": "#5A4A3E",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        body: ["var(--font-lora)", "serif"],
        mono: ["var(--font-courier)", "monospace"],
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      animation: {
        "float-down": "floatDown 2.4s cubic-bezier(0.16,1,0.3,1) infinite",
        "hero-fade": "heroFadeIn 1.6s cubic-bezier(0.16,1,0.3,1) 0.4s forwards",
        "badge-float": "badgeFloat 2.4s ease-in-out infinite",
      },
      keyframes: {
        floatDown: {
          "0%, 100%": { transform: "translateX(-50%) translateY(0)", opacity: "0.6" },
          "50%": { transform: "translateX(-50%) translateY(8px)", opacity: "1" },
        },
        heroFadeIn: {
          to: { opacity: "1", transform: "translateY(0)" },
        },
        badgeFloat: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
