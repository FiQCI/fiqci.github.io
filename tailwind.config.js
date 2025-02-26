/** @type {import('tailwindcss').Config} */

module.exports = {
  content: {
    files: ["./src/**/*.{js,jsx}", "./content/**/*.{md,html}"],
  },
  theme: {
    extend: {
      backgroundImage: {
        // You can choose any key name; here, we use 'hero'
        'lumi': "url('/assets/images/LUMI.jpg')",
      },
      backgroundColor: {
        'dark-blue': "#00264C"
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
