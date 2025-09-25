/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#182027',
          header: '#101922',
          hover: '#374652',
          'hover-subtle': '#2c3942',
          active: '#22313a',
          border: '#526069',
          'active-border': '#5c6a78',
          accent: '#4FA3FF',
          accentSoft: '#E7F3FF',
          alt: '#F7F9FB',
          altDark: '#121921'
        },
      },
    },
  },
  plugins: [],
}
