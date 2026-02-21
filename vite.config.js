import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // '/' = root, works with custom domain (CNAME -> corvexis-digital.github.io)
  // GitHub Pages maps the custom domain to this repo automatically
  base: command === 'build' ? '/' : './',
  plugins: [react()],
  optimizeDeps: {
    entries: ['index.html'],
    exclude: ['temp-study-buddy', 'temp-word-quest']
  },
  server: {
    fs: {
      allow: ['.']
    }
  }
}))

