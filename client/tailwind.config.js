/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      blue: colors.gray,
      yellow: colors.yellow,
      green: colors.green,
      red: colors.red,
      main: "#005284",
      background: "#d2e0e9",
      input: "#e0e7ec",
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
