// nuxt.config.ts
import { sentryVitePlugin } from "@sentry/vite-plugin";

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
  vite: {
    build: {
      sourcemap: true,
    },
    plugins: [
      sentryVitePlugin({
        org: "wits-rk",
        project: "pokedex",
        authToken: process.env.SENTRY_AUTH_TOKEN,
        sourcemaps: {
          filesToDeleteAfterUpload: [
            ".output/public/**/*.map",
            ".output/server/**/*.map",
          ],
        },
      }) as any,
    ],
  },
  tailwindcss: {
    cssPath: ["~/assets/styles/tailwind.css", { injectPosition: "first" }],
    exposeConfig: true,
  },

  elementPlus: {
    icon: "ElIcon",
    importStyle: "scss",
  },
  future: {
    compatibilityVersion: 4,
  },
  runtimeConfig: {
    public: {
      sentryDsn: "",
    },
  },
});
