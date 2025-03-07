/** @type {import('tailwindcss').Config} */

module.exports = {
  content: {
    files: ["./src/**/*.{js,jsx}", "./content/**/*.{md,html}"],
  },
  theme: {
    extend: {
      backgroundImage: {
        'fiqci': "var(--fiqci-banner-image)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
