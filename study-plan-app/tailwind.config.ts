import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef6ff",
          100: "#d9eaff",
          200: "#b3d5ff",
          300: "#85bbff",
          400: "#569dff",
          500: "#2d7cff",
          600: "#1b5de6",
          700: "#1547b3",
          800: "#123a8c",
          900: "#112f6e"
        }
      }
    }
  },
  plugins: []
};

export default config;
