/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F43F5E', // Rose 500 - Vibrant but Elegant
        secondary: '#620534ff', // Rose 950 - Deep Burgundy (readable text)
        'primary-dark': '#BE123C', // Rose 700
        'primary-light': '#FFE4E6', // Rose 100 - Soft background
        'kawaii-pink': '#FB7185', // Rose 400 - Soft accent
        'accent': '#FFF1F2', // Rose 50 - Very light background
        'accent': '#FFFFFF', // White
        'soft-gray': '#F8F9FA',
      },
      fontFamily: {
        sans: ['Fredoka', 'sans-serif'],
        display: ['"Mochiy Pop One"', 'sans-serif'], // Super Kawaii & Bold
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2s infinite',
        'bounce-slow': 'bounce 3s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      borderRadius: {
        'xl': '1.5rem',
        '2xl': '2rem',
        '3xl': '3rem',
      }
    },
  },
  plugins: [],
}
