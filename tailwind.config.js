/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}' // Add paths to your template files
  ],
  theme: {
    extend: {
      fontFamily: {
        greatvibes: ['"Great Vibes"', 'cursive'],
      },
    }
  },
  plugins: []
}
