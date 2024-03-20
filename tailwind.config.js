/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui({themes: {
    light: {
      colors: {
        primary: {
          DEFAULT: "#D76445",
          foreground: "#000000",
        },
        warning: {
          DEFAULT: "#000000",
          foreground: "#000000",
        },
        success: {
          DEFAULT: "#126905",
          foreground: "#000000",
        },
        secondary: {
          DEFAULT: "#1455412b",
          foreground: "#000000",
        },
        danger: {
          DEFAULT: "#f28242",
          foreground: "#000000",
        },
        focus: "#BEF264",
      },
    },
  },})],
}

