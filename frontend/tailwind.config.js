/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/flowbite/**/*.js",
    
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      borderColor: ["checked"],
      backgroundColor: ["active"],
      backgroundImage: (theme) => ({
        "gradient-linear":
          "linear-gradient(87deg, rgba(27,122,139,1) 0%, rgba(27,122,139,1) 8%, rgba(109,194,203,1) 100%)",
      }),
      spacing: {
        100: "100px",
        80: "80px",
      },
      colors: {
        mainGreen: "#199B8A",
        darkGreen: "#003C43",
        creme: "#EFF2F9",
        secondaryWritingGrey: "#A8ADB6",
        EmptyBackgroundGrey: "#F4F4F4",
        mainWritingGrey: "#6D717A",
        lightStrockGrey: "#D7DBE1",
        EmptyWritingGrey: "#D0D0D0",
        mainGreenHover: "#167f75",
      },
      boxShadow: {
        panelShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;",
        hardShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;",
      },
      borderRadius: {
        50: "50px",
        20: "20px",
        24: "24px",
        10: "10px",
        15: "15px",
        25: "25px",
      },
      borderWidth: {
        3: "3px",
        1: "1px",
      },
      boxShadow: {
        panelShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        hardShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;",
      },
      fontSize: {
        20: "20px",
        25: "25px",
      },
      fontWeight: {
        450: "450",
      },
      backdropBlur: {
        custom: "124px",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("flowbite/plugin")],
};
