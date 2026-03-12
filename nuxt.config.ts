// nuxt.config.ts
export default defineNuxtConfig({
  srcDir: "app/",
  // 讓 Nuxt 知道你要用這些超能力
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@element-plus/nuxt",
    "@nuxt/eslint",
  ],

  // SCSS 全域變數配置 (如果你有全域變數檔)
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/styles/main.scss" as *;',
        },
      },
    },
  },

  // Element Plus 設定 (可選)
  elementPlus: {
    icon: "ElIcon", // 自動引入 Icon
    importStyle: "scss", // 讓 Element Plus 配合 SCSS
  },
});
