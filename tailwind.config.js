/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#E7FFE9",
          200: "#A1FFC7",
          300: "#81F8B1",
        },
        gray: {
          cool: "#EBEBEB",
        },
      },
    },
  },
  plugins: [],
};
