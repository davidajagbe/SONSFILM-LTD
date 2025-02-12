import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    proxy: {
      '/api': {
        target: import.meta.env.VITE_BACKEND_BASEURL, // Point to my backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
