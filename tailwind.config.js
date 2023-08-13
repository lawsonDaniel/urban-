/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "auth-bg": "url('/img/auth_bg.png')",
      },
      colors: {
        primary: "#036E03",
        primary_light: "#6cc56c2e",
        light: "#A6EF5D",
        dark: "#121212",
        arsh: "#D9D9D9",
        accent: "#6CC56C",
        primary2: "#61FC61",
        primary_blue: "#375F90",
        primary_red: "#C05406",
        danger: "#FF4848",
        // secondary: '#FFC107',
        // success: '#4CAF50',
        // danger: '#F44336',
        // warning: '#FF9800',
        // info: '#2196F3',
        // dark: '#212121',
        // light: '#F5F5F5',
      },
      plugins: [],
      fontFamily: {
        creato: ["creato", "public/fonts/creato_display/CreatoDisplay-Bold.otf"],
        thin: ["creato-thin", "public/fonts/creato_display/CreatoDisplay-Thin.otf"],
      },
    },
  },
  plugins: [],
};
