/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
      },
      colors: {
        spatial: {
          primary: '#171717', // High-contrast stark dark grey/black for text
          secondary: '#737373', // Mid-grey for secondary information/labels
          background: '#F5F5F5', // Light grey for the app canvas
          surface: '#FFFFFF', // Pure white for input fields and cards
          border: '#D4D4D4', // Solid light-mid grey for strict structural borders
          accent: '#262626', // Deep grey for primary CTA buttons (premium feel)
          accentHover: '#000000', // Pure black for CTA hover states
          error: '#EF4444', // Accessible red for form validation
          success: '#22C55E', // Accessible green for confirmed status
        }
      },
      borderRadius: {
        'spatial': '0.5rem', // 8px for modern Spatial corners
      },
      boxShadow: {
        'spatial': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)', // Soft, premium elevation without glow
      }
    },
  },
  plugins: [],
};