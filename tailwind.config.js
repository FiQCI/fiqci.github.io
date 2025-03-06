/** @type {import('tailwindcss').Config} */

module.exports = {
  content: {
    files: ["./src/**/*.{js,jsx}", "./content/**/*.{md,html}"],
  },
  theme: {
    extend: {
      backgroundImage: {
        'fiqci': "url('/assets/images/FiQCI-banner.jpg')",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
