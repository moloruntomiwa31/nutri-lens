// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      title: "Nutri-Lens",
      link: [
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/icon.svg",
        },
      ],
    },
  },
  modules: ["@nuxt/icon", "@nuxt/image"],
  nitro: {
    routeRules: {
      "/api/**": { cors: true },
    },
  },
  // vuefire: {
  //   auth: {
  //     enabled: true,
  //   },
  //   config: {
  //     apiKey: process.env.NUXT_FIREBASE_API_KEY,
  //     authDomain: process.env.NUXT_FIREBASE_AUTH_DOMAIN,
  //     projectId: process.env.NUXT_FIREBASE_PROJECT_ID,
  //     storageBucket: process.env.NUXT_FIREBASE_STORAGE_BUCKET,
  //     messagingSenderId: process.env.NUXT_FIREBASE_SENDER_ID,
  //     appId: process.env.NUXT_FIREBASE_APP_ID,
  //   },
  // },
  runtimeConfig: {
    apiSecret: process.env.NUXT_API_SECRET,
  },
  routeRules: {
    '/auth/**': { ssr: false }, // Disable SSR for auth routes
  },
});
