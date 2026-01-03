/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f5c6d0',
        secondary: '#000000',
        accent: '#ffffff',
        'soft-gray': '#f4f4f4',
        'dark-surface': '#121212'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Orbitron', 'sans-serif'], // Futuristic headers
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        marquee: 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
    },
    plugins: [],
  }
}
