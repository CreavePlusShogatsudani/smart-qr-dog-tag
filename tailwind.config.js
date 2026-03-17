/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        teal: {
          50: '#fdf8f8',
          100: '#fbf0f0',
          200: '#f5e0e0',
          300: '#efd0d0',
          400: '#edc2c2',
          500: '#edc2c2', // requested base color
          600: '#d8a4a4',
          700: '#bd8383',
          800: '#a16565',
          900: '#874e4e',
          950: '#703e3e',
        }
      }
    },
  },
  plugins: [],
}

