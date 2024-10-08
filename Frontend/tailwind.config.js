/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'orange': '#F8912D',
        'green': '#236C13',
        'hover-green': '#21CA1B',
        'site-bg': '#EBEBEB',
      }
    }
  },
  plugins: [],
}
