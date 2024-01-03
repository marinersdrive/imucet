/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
            "./index.html",
            "./src/**/*.{js,ts,jsx,tsx}",
          ],
  theme: {
    fontFamily: {
        "montserrat" : ["Montserrat"]
    },
    colors: {
      "white": "#FFFFFF",
      "dark-green": "#0B6623",
      "gray-600": "#718096",
      "gray-300": "#F6F6F6",
      "light-gray": "#D3D3D3",
      "red" : "#D0312D",
      "blue": "#3F88C5",
      "dark-blue": "#4075A0",
      "light-blue": "#8ECAE6",
      "orange": "#E54E2E",
      "black": "#023047",
      "green": "#4CBB17"
    },
    extend: {},
  },
  plugins: [],
}

