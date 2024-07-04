// https://nuxt.com/docs/api/configuration/nuxt-config
import { createPinia } from 'pinia'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/content",
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@pinia/nuxt",
    "@nuxt/icon"
  ],
  compatibilityDate: "2024-07-03",
  runtimeConfig: {
    public: {
      OPENAI_API_KEY: '',
    },
    OPENAI_API_KEY: '',
  }
})