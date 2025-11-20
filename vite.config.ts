import { defineConfig } from 'vite'

export default defineConfig({
  // Base path für GitHub Pages (Repository-Name)
  base: process.env.NODE_ENV === 'production' ? '/besser-wuenschen/' : '/',

  slidev: {
    markdown: {
      // linkify: false,   // Autolinks komplett aus
      markdownItOptions: {
        linkify: false, // Autolinks komplett aus
      },
    },
  },
})
