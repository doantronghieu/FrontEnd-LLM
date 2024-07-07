// https://nuxt.com/docs/api/configuration/nuxt-config
import { createPinia } from 'pinia'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/content",
    "@nuxt/image",
    "@pinia/nuxt",
    "@nuxt/ui",
  ],
  
  compatibilityDate: "2024-07-03",
  runtimeConfig: {
    public: {
      OPENAI_API_KEY: '',
    },
    OPENAI_API_KEY: '',
    ENDPOINT_BACKEND: '12345',

    SERVER_FASTAPI: 'http://127.0.0.1:8000',
    HISTORY_TYPE: 'dynamodb',
  }
})