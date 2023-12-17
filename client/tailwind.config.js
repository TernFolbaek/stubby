/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'light-purple': '#D6BCFA', 
        'button-purple': '#7B00FE',
        'button-light': '#3B2E58',
      },
      spacing: {
        '0.6': '0.6rem',
      },
    },
  },
  plugins: [],
}
