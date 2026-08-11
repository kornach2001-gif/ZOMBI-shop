import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/ZOMBI-shop/',
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    allowedHosts: ['zombishop', 'localhost', '.localhost'],
  },
  preview: {
    host: true,
    port: 4173,
    strictPort: true,
    allowedHosts: ['zombishop', 'localhost', '.localhost'],
  },
})
