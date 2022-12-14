/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        lightBackground: '#edf6f9',
        darkBackground: '#2b2d42',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
