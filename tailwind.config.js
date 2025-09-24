/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Primary like your screenshots
        brand: {
          50:  '#eef4ff',
          100: '#dfe9ff',
          200: '#c0d4ff',
          300: '#9dbbff',
          400: '#6f97ff',
          500: '#3f72ff',   // main
          600: '#2f5be6',
          700: '#2444c7',
          800: '#1e39a7',
          900: '#1a318c',
        },
        // soft supporting accents for little icon bubbles
        mint:  { 100: '#e9fbf6', 500: '#3ac3a3' },
        peach: { 100: '#fff3ea', 500: '#ff9f6e' },
        sky:   { 100: '#eef6ff', 500: '#6aa8ff' },
      },
      borderRadius: {
        xl2: '1.25rem', // larger tile corners
      },
      boxShadow: {
        // soft elevated cards
        card: '0 8px 24px rgba(15, 23, 42, 0.06)',
        cardHover: '0 12px 28px rgba(15, 23, 42, 0.10)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
  ],
};
