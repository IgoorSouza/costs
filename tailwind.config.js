/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
    screens: {
      "sm": "640px",
      "md": "768px",
      "lg": "1200px",
      "xl": "1600px",
      "2xl": "2000px"
    },
  },
  plugins: [],
};
