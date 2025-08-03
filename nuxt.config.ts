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
        mos: 'https://www.mos.ru/rss',
        lenta: 'https://lenta.ru/rss',
        ria: 'https://ria.ru/export/rss2/archive/index.xml',
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
