/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "selector",
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#59746f",
        surface: "#eff3ec",
      },
    },
  },
  plugins: [],
};
