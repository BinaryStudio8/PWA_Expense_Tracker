module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  safelist: ["animate-moveCloud", "animate-pulseSun", "animate-slideMoon"],
  theme: {
    extend: {
      animation: {
        moveCloud: "moveCloud 15s linear infinite",
        pulseSun: "pulseSun 3s ease-in-out infinite",
        slideMoon: "slideMoon 20s linear infinite",
      },
      keyframes: {
        moveCloud: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" },
        },
        pulseSun: {
          "0%, 100%": { opacity: 0.8, transform: "scale(1)" },
          "50%": { opacity: 1, transform: "scale(1.1)" },
        },
        slideMoon: {
          "0%": { transform: "translateX(120%)" },
          "100%": { transform: "translateX(-120%)" },
        },
      },
    },
  },
  plugins: [],
};
