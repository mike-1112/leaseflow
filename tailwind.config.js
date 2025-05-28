/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/views/**/*.html.erb",
    "./app/helpers/**/*.rb",
    "./app/assets/builds/**/*.css"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto','ui-sans-serif','system-ui'],
      },
      colors: {
        primary: {
          light: '#3B82F6',
          DEFAULT: '#1D4ED8',
          dark: '#1E40AF'
        },
        accent: '#F59E0B'
      }
    }
  },
  plugins: []
}
