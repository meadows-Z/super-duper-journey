/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F9F6F7',
          100: '#F3ECF0',
          200: '#E7D9E0',
          300: '#D1B3C1',
          400: '#B67D97',
          500: '#9A4F70',
          600: '#7D3C51', // Main primary
          700: '#652F41',
          800: '#4D2431',
          900: '#331921',
        },
        secondary: {
          50: '#FCF9F6',
          100: '#F9F4EE',
          200: '#F2E8D9',
          300: '#E6D2B8',
          400: '#C6A989',
          500: '#A67F5D', // Main secondary
          600: '#8A6647',
          700: '#6D4E36',
          800: '#513A28',
          900: '#36261A',
        },
        accent: {
          50: '#F5F7FA',
          100: '#E9EEF4',
          200: '#D3DDE9',
          300: '#AEBFD2',
          400: '#6D89AD',
          500: '#3D5F8A',
          600: '#1E3A5F', // Main accent
          700: '#182F4C',
          800: '#122339',
          900: '#0C1826',
        },
        cream: '#F5F5DC',
        success: {
          500: '#10B981',
          600: '#059669',
        },
        warning: {
          500: '#F59E0B',
          600: '#D97706',
        },
        error: {
          500: '#EF4444',
          600: '#DC2626',
        },
      },
      fontFamily: {
        heading: ['Merriweather', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'page-turn': 'pageTurn 0.6s ease-in-out',
        'fade-in': 'fadeIn 0.4s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        pageTurn: {
          '0%': { transform: 'rotateY(0deg)', opacity: '0.6' },
          '100%': { transform: 'rotateY(20deg)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};