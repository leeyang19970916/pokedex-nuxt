export default {
  content: ["./app/**/*.{vue,ts}", "./app.vue", "./error.vue"],
  theme: {
    extend: {
      colors: {
        primary: "#b3eafe",
        poke: {
          normal: { 400: "#dcdcdc", 500: "#a0a0a0" },
          grass: { 400: "#b4f000", 500: "#92bf19" },
          fire: { 400: "#ff6900", 500: "#ff3700" },
          water: { 400: "#14b9ff", 500: "#0094e5" },
          electric: { 400: "#ffe100", 500: "#e4b700" },
          bug: { 400: "#46c846", 500: "#32b432" },
          flying: { 400: "#78dcff", 500: "#79bcd7" },
          rock: { 400: "#b48c64", 500: "#a07850" },
          poison: { 400: "#d28cd2", 500: "#be78be" },
          ground: { 400: "#fac85a", 500: "#cca142" },
          ice: { 400: "#14f5ff", 500: "#00b7ee" },
          fighting: { 400: "#dc6900", 500: "#c85500" },
          psychic: { 400: "#f08cdc", 500: "#dc78c8" },
          ghost: { 400: "#a08cff", 500: "#8c78f0" },
          dragon: { 400: "#5078dc", 500: "#3c64c8" },
          dark: { 400: "#787878", 500: "#646464" },
          steel: { 400: "#aac8f0", 500: "#96b4dc" },
          fairy: { 400: "#ffafdc", 500: "#ff7eb8" },
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
  safelist: [
    {
      pattern: /^(bg|text|border|shadow)-poke-(.*)-(400|500)$/,
      // 告訴 Tailwind：這些顏色我可能會加上 hover 效果喔
      variants: ["hover"],
    },
  ],
  plugins: [],
};
