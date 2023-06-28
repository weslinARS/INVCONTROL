import daisyui from "daisyui";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
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
    },
  },
  plugins: [require("@tailwindcss/typography"), daisyui],
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
};
