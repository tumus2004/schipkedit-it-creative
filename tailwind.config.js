/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'heading-gold': '#a9997a',
      },
      backgroundImage: {
        'background-hero': "url('/img/background-hero.png')",
      }
    },
  },
  plugins: [],
};
