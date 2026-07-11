/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark Cinematic Luxury Palette — matches video background
        primary: {
          DEFAULT: '#E8DCC8', // Warm Ivory (main text on dark)
          foreground: '#0D0D0D',
        },
        accent: {
          DEFAULT: '#C9A96E', // Rich Champagne Gold
          hover: '#B8924F',
          light: '#3A2E1E',  // Dark gold tint for subtle bg
        },
        secondary: {
          DEFAULT: '#0D0D0D', // Near Black (page background)
          foreground: '#E8DCC8',
        },
        muted: {
          DEFAULT: '#1A1A1A', // Dark card background
          foreground: '#8A8070', // Warm muted text
        },
        border: '#2A2520',   // Dark warm border
        surface: '#161412',  // Slightly lighter than bg for cards
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'premium': '0 20px 40px -15px rgba(0, 0, 0, 0.6)',
        'soft': '0 8px 30px rgba(0, 0, 0, 0.3)',
        'gold': '0 10px 20px -5px rgba(201, 169, 110, 0.25)',
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
