/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        foreground: '#ededed',
      },
      fontFamily: {
        protest: ['Protest Guerrilla', 'cursive'],
      },
    },
  },
  plugins: [],
}
