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
  runtimeConfig: {
    public: {
      firebaseApiKey: import.meta.env.NUXT_PUBLIC_FIREBASE_API_KEY,
      firebaseAuthDomain: import.meta.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: import.meta.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
      firebaseStorageBucket: import.meta.env
        .NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: import.meta.env.NUXT_PUBLIC_FIREBASE_SENDER_ID,
      firebaseAppId: import.meta.env.NUXT_PUBLIC_FIREBASE_APP_ID,
    },
    apiSecret: import.meta.env.NUXT_PUBLIC_API_SECRET,
  },
  routeRules: {
    "/auth/**": { ssr: false }, // Disable SSR for auth routes
  },
});
