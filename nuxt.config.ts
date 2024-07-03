// https://nuxt.com/docs/api/configuration/nuxt-config
import { createPinia } from 'pinia'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/content", "@nuxtjs/tailwindcss", "@nuxt/image", "@pinia/nuxt",
  ],
  compatibilityDate: "2024-07-03",


})
