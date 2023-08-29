/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
export default {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}", "./index.html"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      ...colors,
      red: "#b20000",
      black: "#3A3A3A",
      white: "#FFF",
      green: "#005C6E",
      lightgreen: "#229337",
      gray: "#F8f8f8",
      gray2: "#F1F1F1",
      gray3: "#BDBDBD",
      gray4: "#A9B4CD",
      blue: "#2BB8C9",
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
