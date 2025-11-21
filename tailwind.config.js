/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#03071E",
          bgLight: "#370617",
          surface: "#6A040F",

          text: "#DEC9E9",
          muted: "#DAC3E8",

          primary: "#6247AA",
          primaryHover: "#7251B5",

          accent: "#9163CB",
          accentLight: "#A06CD5",
        },
      },
    },
  },
  plugins: [],
};
