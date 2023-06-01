/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/index.tsx", "./src/pages/favorites.tsx"],
  theme: {
    extend: {
      fontFamily: {
        play: "playfair-display",
      },
    },
  },
  plugins: [],
};
