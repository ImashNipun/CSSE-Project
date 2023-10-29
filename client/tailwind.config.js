/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-image":
          "linear-gradient(to top ,rgba(0,0,0,0.8), rgba(255,255,255,0)),url('./assets/hero-image.jpg')",
        "topup-image": "url('./assets/topup-image.jpg')",
      },
    },
  },
  plugins: [],
};
