/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne','sans-serif'],
        body: ['Outfit','sans-serif'],
        mono: ['JetBrains Mono','monospace'],
      },
      screens: { '3xl': '1920px' },
    },
  },
  plugins: [],
}
