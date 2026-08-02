/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1d4ed8", // Blue
        secondary: "#1e293b", // Dark Gray
        accent: "#3b82f6",
        background: "#f8fafc"
      }
    },
  },
  plugins: [],
}
