/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Morning Effect Primary Colors
        dawn: {
          50: '#FFF9F0',
          100: '#FFF3E0',
          200: '#FFE4C4',
          300: '#FFD699',
          400: '#FFC966',
          500: '#FFB84D',
          600: '#FF9F1A',
          700: '#E68A00',
          800: '#CC7A00',
          900: '#996600',
        },
        amber: {
          50: '#FFFBF0',
          100: '#FFF5DD',
          200: '#FFECB8',
          300: '#FFE094',
          400: '#FFD770',
          500: '#FFCB47',
          600: '#F5B800',
          700: '#D49F00',
          800: '#A67C00',
          900: '#7A5A00',
        },
        sunrise: {
          50: '#FFF9ED',
          100: '#FFF0D6',
          200: '#FFE0AD',
          300: '#FFCF85',
          400: '#FFBD5C',
          500: '#FFAB33',
          600: '#FF9500',
          700: '#DB7D00',
          800: '#B36600',
          900: '#8A4E00',
        },
        // Complementary colors
        navy: {
          50: '#E8EDF5',
          100: '#D1DBE8',
          200: '#A3B7D1',
          300: '#7593BA',
          400: '#476FA3',
          500: '#0A1A2D',
          600: '#081527',
          700: '#061020',
          800: '#040B1A',
          900: '#020614',
        },
        // Neutral warm tones
        sand: {
          50: '#FDFCFA',
          100: '#F8F4EC',
          200: '#F2EBD9',
          300: '#E8DCC2',
          400: '#DECCAA',
          500: '#D4BD93',
          600: '#C5A875',
          700: '#A88E5E',
          800: '#8A7448',
          900: '#6D5A35',
        },
      },
      animation: {
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'bounce-soft': 'bounceSoft 1s ease-in-out infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'scale-in': 'scaleIn 0.25s ease-out',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 171, 51, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(255, 171, 51, 0.6)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(255, 171, 51, 0.3)',
        'glow-md': '0 0 20px rgba(255, 171, 51, 0.4)',
        'glow-lg': '0 0 30px rgba(255, 171, 51, 0.5)',
        'warm': '0 4px 6px -1px rgba(255, 171, 51, 0.1), 0 2px 4px -1px rgba(255, 171, 51, 0.06)',
        'warm-lg': '0 10px 15px -3px rgba(255, 171, 51, 0.15), 0 4px 6px -2px rgba(255, 171, 51, 0.05)',
        'warm-xl': '0 20px 25px -5px rgba(255, 171, 51, 0.2), 0 10px 10px -5px rgba(255, 171, 51, 0.04)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
