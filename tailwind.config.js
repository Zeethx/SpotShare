/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      'primary-color': '#7267f8',
      'secondary-color': '#875053',
      'primary-white': '#F5F5F5',
      'primary-black': '#000000',
    },
    fontFamily: {
      'outfit' : ['Outfit', 'sans-serif'],
      'freeman' : ['Freeman', 'sans-serif'],
    },
  },
  },
  plugins: [],
}