/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],

  theme: {
    extend: {
      colors: {
        "weather-primary": "#4B527E",
        "weather-secondary": "#2E4374",
      },
    },

    fontFamily: {
      Roboto: ["Roboto, sans-serif"],
    },

    container: {
      padding: "2rem",
      center: true,
    },

    screens: {
      sm: "640px",
      md: "768px",
    },
  },

  plugins: [],
}

