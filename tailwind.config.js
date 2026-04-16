/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sophisticated Premium Palette
        primary: {
          DEFAULT: '#0A1128', // Deep Night Navy
          foreground: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#C5A059', // Muted Champagne Gold
          hover: '#B68F46',
          light: '#F4EBD0',
        },
        secondary: {
          DEFAULT: '#FDFCFB', // Pearl White
          foreground: '#0A1128',
        },
        muted: {
          DEFAULT: '#F0F2F5',
          foreground: '#64748B',
        },
        border: '#E2E8F0',
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'premium': '0 20px 40px -15px rgba(10, 17, 40, 0.08)',
        'soft': '0 8px 30px rgba(0, 0, 0, 0.04)',
        'gold': '0 10px 20px -5px rgba(197, 160, 89, 0.2)',
      },
      borderRadius: {
        '3xl': '24px',
        '4xl': '32px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        }
      }
    },
  },
  plugins: [],
}
