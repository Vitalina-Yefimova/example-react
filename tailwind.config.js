/** @type {import('tailwindcss').Config} */
module.exports = {
  content:
    ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        spinSlow: "spin 10s linear infinite",
      },
      plugins: [],
    }
  }
}