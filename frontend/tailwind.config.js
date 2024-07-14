/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in-left': 'fade-in-left 1s ease-in-out',
        'fade-out-right': 'fade-out-right 1s ease-in-out',
      },
      keyframes: {
        'fade-in-left': {
          '0%': {
            opacity: 0,
            transform: 'translateX(-100%)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateX(0)',
          },
        },
        'fade-out-right': {
          '0%': {
            opacity: 1,
            transform: 'translateX(0)',
          },
          '100%': {
            opacity: 0,
            transform: 'translateX(100%)',
          },
        },
      },
    },
  },
  plugins: [],
};
