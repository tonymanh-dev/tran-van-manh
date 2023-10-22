/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],

  theme: {
    extend: {
      borderColor: {
        DEFAULT: '#1f2937',
      },
      colors: {
        primary: { DEFAULT: '#8b5cf6' },
        secondary: { DEFAULT: '#d946ef' },

        // ...
      },
      boxShadow: {
        'color-lg': '0px 0px 100px 50px rgba(79,70,229,0.12)',
        'color-sm': '0px 5px 10px 6px rgba(79,70,229,0.1)',
      },
    },
  },
  plugins: [],
}
