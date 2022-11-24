/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media'
  theme: {
    // screens: {
    //   sm: "496px", //768px default - (240 * 2) + 16 = 496
    //   md: "752px", //1024px default - (240 * 3) + (16 * 2) = 752
    //   lg: "1008px", //1280px default - (240 * 4) + (16 * 3) = 1008
    //   xl: "1264px", //1536px default - (240 * 5) + (16 * 4) = 1264
    //   "2xl": "1520px", //1792px default - (240 * 6) + (16 * 5) = 1520
    // },
    extend: {
      screens: {
        "3xl": "1776px", // no default (240 * 7) + (16 * 6) = 1776
        "4xl": "2032px", // no default (240 * 8) + (16 * 7) = 2032
        "5xl": "2288px", // no default (240 * 9) + (16 * 8) = 2288
        "6xl": "2544px", // no default (240 * 10) + (16 * 9) = 2544
      },
    },
    container: {
      screens: {
        // sm: "256px", //640px default - (240) + 16 = 256
        // md: "496px", //768px default - (240 * 2) + 16 = 496
        // lg: "752px", //1024px default - (240 * 3) + (16 * 2) = 752
        // xl: "1008px", //1280px default - (240 * 4) + (16 * 3) = 1008
        // "2xl": "1264px", //1536px default - (240 * 5) + (16 * 4) = 1264
        // "3xl": "1520px", //  default - (240 * 6) + (16 * 5) = 1520
      },
    },
  },
  plugins: [],
};
