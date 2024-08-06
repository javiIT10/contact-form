/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        karla: ["Karla", "sans-serif"],
      },
      colors: {
        /* ### Primary */
        "green-lighter": "hsl(148, 38%, 91%)" /* (lighter) */,
        "green-medium": "hsl(169, 82%, 27%)" /* (medium) */,
        red: "hsl(0, 66%, 54%)",

        /* ### Neutral */
        white: "hsl(0, 0%, 100%)",
        "grey-medium": "hsl(186, 15%, 59%)" /* (medium) */,
        "grey-darker": "hsl(187, 24%, 22%)" /* (darker) */,
      },
    },
  },
  plugins: [],
};
