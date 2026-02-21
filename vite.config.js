import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // Use /Corvexis/ on GitHub Pages production builds, ./ for local dev
  base: command === 'build' ? '/Corvexis/' : './',
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

