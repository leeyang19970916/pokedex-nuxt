// nuxt.config.ts
export default defineNuxtConfig({
  srcDir: "app/",
  compatibilityDate: "2026-03-18",
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@element-plus/nuxt",
    "@nuxt/eslint",
    "@vueuse/nuxt",
    "@nuxt/image",
  ],
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",

      link: [
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/pokeball.svg",
        },
      ],
    },
  },
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
  },

  elementPlus: {
    icon: "ElIcon",
    importStyle: "scss",
  },
});
