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
        primary: "#b3eafe",
        poke: {
          normal: "#dcdcdc",
          grass: "#b4f000",
          fire: "#ff6900",
          water: "#14b9ff",
          electric: "#ffe100",
          bug: "#46c846",
          flying: "#78dcff",
          rock: "#b48c64",
          poison: "#d28cd2",
          ground: "#fac85a",
          ice: "#14f5ff",
          fighting: "#dc6900",
          psychic: "#f08cdc",
          ghost: "#a08cff",
          dragon: "#5078dc",
          dark: "#787878",
          steel: "#aac8f0",
          fairy: "#ffafdc",
        },
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
  // ... 其他設定
  safelist: [
    {
      // 使用正則表達式，涵蓋所有屬性名
      pattern:
        /^(bg|text|border)-poke-(normal|grass|fire|water|electric|bug|flying|rock|poison|ground|ice|fighting|psychic|ghost|dragon|dark|steel|fairy)$/,
    },
  ],
  plugins: [],
};
