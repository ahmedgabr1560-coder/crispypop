/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        anton: ['Anton', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        crimson: {
          DEFAULT: '#B81D1D',
          dark: '#8B1212',
          deeper: '#4A0404',
          fire: '#9E1414',
        },
        gold: {
          DEFAULT: '#E5A91A',
          bright: '#FFD700',
        },
        charcoal: {
          DEFAULT: '#141414',
          light: '#1C0D0D',
          dark: '#121212',
        }
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      }
    },
  },
  plugins: [],
}
