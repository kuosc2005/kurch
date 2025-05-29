import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        primary: "#025C62",
        white: "#FFF",
        back: "#2B2B2B",
        muted: "#716F74",
        gray: {
          100: "#F9F9F9",
          200: "#EAEBEE",
          400: "#959595",
          500: "#6B6B6B",
          800: "#2B2B2B",
        },
      },
      fontSize: {
        heading: "36px",
        subheading: "24px",
        body: "16px",
        small: "14px",
      },
      borderRadius: {
        sm2: "2px",
      },
      borderWidth: {
        px1: "1px",
      },
    },
  },
  plugins: [],
} satisfies Config;
