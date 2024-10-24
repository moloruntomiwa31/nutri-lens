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
  modules: ["@nuxt/icon"],
  runtimeConfig: {
    GEMINI_API_KEY: "AIzaSyAJF9VqassGKH_LLYgzCwV9K9Y3lQ-9ko0",
  },
});
