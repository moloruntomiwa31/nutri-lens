/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        black: "#000",
        white: "#fff",
        primaryGreen: "#A5B68D",
        secondaryGreen: "#626F47",
        lightGray: "#EDE8DC",
        grayColor: "#ECDFCC",
        primaryRed: "#FF0000",
        primaryPurple: "#3B1E54",
        primaryBlue: "#091057",
      },
    },
  },
  plugins: [],
};
