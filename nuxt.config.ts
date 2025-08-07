import { defineNuxtConfig } from 'nuxt/config'
import { fileURLToPath } from 'node:url'
import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  srcDir: fileURLToPath(new URL('./', import.meta.url)),
  components: {
    dirs: [
      '~/components',
    ]
  },
  typescript: {
    strict: true,
    typeCheck: true
  },
  runtimeConfig: {
    public: {
      rssFeeds: {
        mos: process.env.NUXT_PUBLIC_MOS_API_URL,
        lenta: process.env.NUXT_PUBLIC_LENTA_API_URL,
        ria: process.env.NUXT_PUBLIC_RIA_API_URL,
      }
    }
  },
  alias: {
    '@': fileURLToPath(new URL('./', import.meta.url)),
    '~': fileURLToPath(new URL('./', import.meta.url)),
    '#imports': fileURLToPath(new URL('./.nuxt/imports.d.ts', import.meta.url)),
  },
  nitro: {
    compatibilityDate: '2025-08-02',
  },
  vite: {
    plugins: [
      svgLoader({
        defaultImport: 'component'
      })
    ]
  },
})
