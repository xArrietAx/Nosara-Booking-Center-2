const colors = require("./src/config/theme.json");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "375px",
      sm: "575px",
      md: "768px",
      lg: "992px", 
      xl: "1200px",
      "2xl": "1536px",
      "3xl": "1792px",
    },
    extend: {
      colors: {
        primary: colors.colors.primary,
        secondary: colors.colors.secondary,
        text: colors.colors.text,
        border: colors.colors.border
      },
    },
  },
  plugins: [],
  corePlugins: {
    container: false,
  },
};
