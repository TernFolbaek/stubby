/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'light-purple': '#D6BCFA', 
      },
      spacing: {
        '0.6': '0.6rem',
      },
    },
  },
  plugins: [],
}
