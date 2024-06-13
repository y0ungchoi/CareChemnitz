/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      current: "currentColor",
      main: "#005284",
      background: "#d2e0e9",
      input: "#e0e7ec",
      white: "#ffffff",
      black: "#000000",
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
