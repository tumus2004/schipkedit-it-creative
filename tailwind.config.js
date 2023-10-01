/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'heading-gold': '#a9997a',
      },
      backgroundImage: {
        'background-hero': "url('/img/background-hero.png')",
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      const newComponents = {
        '.planet-stats': {
          position: 'relative',
          '--x': '60%',
          '--y': '60%',
          '--alpha': '0',
          '&::before': {
            content: "''",
            position: 'absolute',
            top: 'var(--y)',
            left: 'var(--x)',
            width: '55px',
            height: '55px',
            background:
              'radial-gradient(circle, rgba(255, 255, 255, var(--alpha)) 0%, transparent 75%)',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            filter: 'blur(20px)',
          },
        },
      };
      addComponents(newComponents);
    },
  ],
};
