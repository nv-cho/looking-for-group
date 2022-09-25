/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      zIndex: {
        10: "10",
        20: "20",
        30: "30",
      },
      colors: {
        primary: "#f59e0b", // amber-500
        primaryLight: "#fffbeb", // amber-50
        secondary: "#fcd34d", // amber-300
      },
      opacity: {
        95: ".95",
        85: ".85",
        75: ".75",
        65: ".65",
        55: ".55",
        45: ".45",
        35: ".35",
        25: ".25",
        15: ".15",
      },
      fontFamily: {
        ModestoPoster: ["ModestoPoster", "serif"],
        NotoSerif: ["Noto Serif", "serif"],
        Lusitana: ["Lusitana", "serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
