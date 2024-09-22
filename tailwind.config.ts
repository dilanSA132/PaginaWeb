import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        gradient: 'gradient 10s ease infinite', // Animación del fondo degradado
        'fade-in-up': 'fadeInUp 0.8s ease-out', // Animación para la aparición de productos
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' }, // Convertido a cadena
          '100%': { opacity: '1', transform: 'translateY(0)' },  // Convertido a cadena
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'circle-color-1': '#4FD1C5', // Teal color
        'circle-color-2': '#48BB78', // Green color
        'circle-color-3': '#81E6D9', // Light teal
        'circle-color-4': '#38B2AC', // Dark teal
        'circle-color-5': '#A0AEC0', // Grayish-blue
      },
    },
  },
  plugins: [],
};

export default config;
