module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.js"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#033D42",
        secondary: "#0077DD",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
