/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {colors: {
      'primary-color': '#177E89',
      'primary-white': '#FFFFFF',
      'primary-black': '#000000',
    },},
  },
  plugins: [],
}