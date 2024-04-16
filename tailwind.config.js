import { platformSelect } from "nativewind/theme";

const presets = require("nativewind/preset");

const colors = require("./theme/Colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "selector",
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [presets],
  theme: {
    extend: {
      colors: {
        // *  Custom Colors
        ...colors,
      },
    },
  },
  plugins: [],
};
