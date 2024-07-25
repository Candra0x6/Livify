/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        bgshade: "#EEEFFB",
        pink: "#FB2E86",
        red: "#FB2448",
        blue: "#2F1AC4",
        offnavy: "#3F509E",
        primarytext: "#151875",
        subtext1: "hsl(var(--skyblue))",
        subtext2: "#8A8FB9",
        subtext3: "#B7BACB",
        pantone: "#E0D3F5",
        offpurple: "#9F63B5",
        "background-hover": "#FB2E86",
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
      },
      fontFamily: {
        JosefinRegular: "Josefin-Regular",
        JosefinSemibold: "Josefin-SemiBold",
        JosefinBold: "Josefin-Bold",
        JosefinLight: "Josefin-Light",
        LatoRegular: "Lato-Regular",
        LatoSemibold: "Lato-Semibold",
        LatoBold: "Lato-Bold",
        LatoBlack: "Lato-Black",
        LatoLight: "Lato-Light",
        Poppins: "Poppins",
      },
    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        "@font-face": {
          fontFamily: "Josefin-Regular",
          src: "url(/fonts/JosefinSans/JosefinSans-Regular.ttf)",
        },
      });
    }),
    plugin(function ({ addBase }) {
      addBase({
        "@font-face": {
          fontFamily: "Josefin-SemiBold",
          src: "url(/fonts/JosefinSans/JosefinSans-SemiBold.ttf)",
        },
      });
    }),
    plugin(function ({ addBase }) {
      addBase({
        "@font-face": {
          fontFamily: "Josefin-Bold",
          src: "url(/fonts/JosefinSans/JosefinSans-Bold.ttf)",
        },
      });
    }),
    plugin(function ({ addBase }) {
      addBase({
        "@font-face": {
          fontFamily: "Josefin-Light",
          src: "url(/fonts/JosefinSans/JosefinSans-Light.ttf)",
        },
      });
    }),
    plugin(function ({ addBase }) {
      addBase({
        "@font-face": {
          fontFamily: "Lato-Regular",
          src: "url(/fonts/Lato/Lato-Regular.ttf)",
        },
      });
    }),
    plugin(function ({ addBase }) {
      addBase({
        "@font-face": {
          fontFamily: "Lato-Semibold",
          src: "url(/fonts/Lato/Lato-Semibold.ttf)",
        },
      });
    }),
    plugin(function ({ addBase }) {
      addBase({
        "@font-face": {
          fontFamily: "Lato-Bold",
          src: "url(/fonts/Lato/Lato-Bold.ttf)",
        },
      });
    }),
    plugin(function ({ addBase }) {
      addBase({
        "@font-face": {
          fontFamily: "Lato-Light",
          src: "url(/fonts/Lato/Lato-Light.ttf)",
        },
      });
    }),
    plugin(function ({ addBase }) {
      addBase({
        "@font-face": {
          fontFamily: "Lato-Black",
          src: "url(/fonts/Lato/Lato-Black.ttf)",
        },
      });
    }),
    plugin(function ({ addBase }) {
      addBase({
        "@font-face": {
          fontFamily: "Lato-Thin",
          src: "url(/fonts/Lato/Lato-Thin.ttf)",
        },
      });
    }),
  ],
};
