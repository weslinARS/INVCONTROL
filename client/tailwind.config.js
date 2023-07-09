/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";  
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        Roboto: ["Roboto", "sans-serif"],
        Inter: ["Inter", "sans-serif"],
        Roboto_condensed: ["Roboto Condensed", "sans-serif"],
      },
      colors: {
        dark: {
          50: "#656C7A",
          100: "#585D68",
          200: "#494E56",
          300: "#3B3E44",
          400: "#2D2F33",
          500: "#1E1F22",
          600: "#0F1011",
          900: "#16161A",
        },
        blueish_green: "#40d9aa",
        skyBlue: "#35a7e3",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), daisyui,require("tailwindcss-animate"),require('@headlessui/tailwindcss')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#4338ca",
          secondary: "#f3f2ff",
          accent: "#33b789",
          neutral: "#191D24",
          "base-100": "#f6f6f5",
          info: "#4ad6ef",
          success: "#68b42d",
          warning: "#F8d116",
          error: "#f60059",
        },
      },
    ],
  },
}