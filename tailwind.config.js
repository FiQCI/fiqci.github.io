/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: {
    files: ["./src/**/*.{js,jsx}", "./content/**/*.{md,html}"],
  },
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Inter"', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        'fiqci': "var(--fiqci-banner-image)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
