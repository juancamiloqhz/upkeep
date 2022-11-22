/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "3xl": "1600px",
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
