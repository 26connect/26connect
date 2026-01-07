/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", 
    "./components/**/*.{js,jsx,ts,tsx}", 
    "./modules/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444', 
          600: '#dc2626', // Swiss Red Main
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        danger: '#ef4444',
        success: '#22c55e',
      }
    },
  },
  plugins: [],
}