/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bgPrimary: '#0D0D1A',
        bgSurface: '#1A1A2E',
        accentBlue: '#1A73E8',
        hudGlow: '#00E5FF',
        textPrimary: '#F0F0F0',
        textMuted: '#888899',
        alert: '#FF4D6D',
        success: '#00C853',
      },
      fontFamily: {
        hud: ['Orbitron', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

