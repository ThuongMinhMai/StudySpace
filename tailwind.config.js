/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}' // Add paths to your template files
  ],
  theme: {
    extend: {
      fontFamily: {
        encodesans: ['"Encode Sans"', 'sans-serif'],
        greatvibes: ['"Great Vibes"', 'cursive'],
        paytoneone: ['"Paytone One"', 'sans-serif'],
      },
    }
  },
  plugins: []
}
