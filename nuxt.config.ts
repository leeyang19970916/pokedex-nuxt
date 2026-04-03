// nuxt.config.ts
export default defineNuxtConfig({
  srcDir: "app/",
  compatibilityDate: "2026-03-18",
  // 讓 Nuxt 知道你要用這些超能力
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@element-plus/nuxt",
    "@nuxt/eslint",
    "@vueuse/nuxt",
    "@nuxt/image",
  ],
  // vite: {
  //   css: {
  //     preprocessorOptions: {
  //       scss: {
  //         additionalData: '@use "~/assets/styles/main.scss" as *;',
  //       },
  //     },
  //   },
  // },
  tailwindcss: {
    cssPath: ["~/assets/styles/tailwind.css", { injectPosition: "first" }],
    exposeConfig: true,
    // config: "tailwind.config",
  },

  // Element Plus 設定 (可選)
  elementPlus: {
    icon: "ElIcon", // 自動引入 Icon
    importStyle: "scss", // 讓 Element Plus 配合 SCSS
  },
});
