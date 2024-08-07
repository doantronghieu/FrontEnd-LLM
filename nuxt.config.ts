// https://nuxt.com/docs/api/configuration/nuxt-config

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
      OPENAI_API_KEY: process.env.NUXT_PUBLIC_OPENAI_API_KEY || '',
      SERVER_FASTAPI: process.env.NUXT_PUBLIC_SERVER_FASTAPI || 'http://localhost:8000',
      HISTORY_TYPE: process.env.NUXT_PUBLIC_HISTORY_TYPE || '',
      NUXT_MAIN_COLOR: 'sky',
      PATH_BOT_ICON: '/assets/bot-icon.png',
    },
    OPENAI_API_KEY: process.env.NUXT_OPENAI_API_KEY,
    ENDPOINT_BACKEND: '12345',
  },
  nitro: {
    preset: 'node-server',
    // devProxy: {
    //   '/api/fastapi': {
    //     target: process.env.NUXT_PUBLIC_SERVER_FASTAPI || 'http://localhost:8000',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api\/fastapi/, '')
    //   }
    // }
    // devProxy: {
    //   '/api': {
    //     target: process.env.NUXT_PUBLIC_SERVER_FASTAPI,
    //     changeOrigin: true,
    //   }
    // },
  },
  content: {
    api: {
      baseURL: '/api/_content'
    }
  },
})