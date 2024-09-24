/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx, css}', // Adjust the paths according to your project structure
    './styles/glbals.css',
    './pages/**/*.{html,js,jsx,ts,tsx,css}',
    './components/**/*.{html,js,jsx,ts,tsx,css}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}