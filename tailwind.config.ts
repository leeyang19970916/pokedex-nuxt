export default {
  content: [
    "./app/**/*.{vue,ts}",
    // `./components/**/*.{vue,js,ts}`,
    // `./layouts/**/*.vue`,
    // `./pages/**/*.vue`,
    // `./composables/**/*.{js,ts}`,
    // `./plugins/**/*.{js,ts}`,
    // `./utils/**/*.{js,ts}`,
    // `./App.{js,ts,vue}`,
    // `./app.{js,ts,vue}`,
    // `./Error.{js,ts,vue}`,
    // `./error.{js,ts,vue}`,
    // `./app.config.{js,ts}`,
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#40c1ad",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
