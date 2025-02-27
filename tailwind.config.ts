import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import { heroui } from "@heroui/react";

export default {
  content: [
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
} satisfies Config;
