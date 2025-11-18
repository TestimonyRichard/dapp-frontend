// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./app/**/*.{js,ts,jsx,tsx}",
//     "./pages/**/*.{js,ts,jsx,tsx}",
//     "./components/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },

      colors: {
        brand: {
          primary: "#6D28D9",      // Royal Purple
          secondary: "#4338CA",    // Indigo
          accent: "#D4AF37",       // Gold
          light: "#F3F0FF",        // Soft purple tint
          dark: "#2A1854",         // Deep purple
          emerald: "#059669",      // Success color
          danger: "#B91C1C",       // Error red
          muted: "#64748B",        // Gray text
        },
      },

      backgroundImage: {
        "brand-gradient":
          "linear-gradient(90deg, #4338CA, #6D28D9, #7C3AED)",
        "brand-radial":
          "radial-gradient(circle at top left, #6D28D9, #4338CA 50%, #2A1854)",
        "brand-soft":
          "linear-gradient(135deg, rgba(109,40,217,0.06), rgba(67,56,202,0.03))",
      },

      boxShadow: {
        glow: `
          0 6px 18px rgba(99, 102, 241, 0.12),
          0 8px 30px rgba(109, 40, 217, 0.06),
          0 0 10px rgba(212, 175, 55, 0.06)
        `,
        "glow-strong": `
          0 10px 30px rgba(109, 40, 217, 0.22),
          0 0 18px rgba(212, 175, 55, 0.10)
        `,
      },

      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.75rem",
      },

      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200px 0" },
          "100%": { backgroundPosition: "200px 0" },
        },
      },

      animation: {
        shimmer: "shimmer 2s infinite",
      },
    },
  },

  plugins: [],
};

