import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Corvexis/',
  plugins: [react()],
  server: {
    fs: {
      allow: [
        '.',
        'c:/Users/user/Documents'
      ]
    }
  }
})
