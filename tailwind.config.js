/** @type {import('tailwindcss').Config} */

export const content = [
  "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
];

export const theme = {
  extend: {
    colors: {
      "heading-gold": "#a9997a",
    },
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
    },
    backgroundImage: {
      "background-hero": "url('/img/background-hero.png')",
    },
  },
};
