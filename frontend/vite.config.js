import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env, // Include this line
    'import.meta.env.VITE_BACKEND_BASEURL': JSON.stringify(process.env.VITE_BACKEND_BASEURL), // Include this line
  },
  server: {
    port: 8080,
    proxy: {
      '/api': {
        target: process.env.VITE_BACKEND_BASEURL, // Point to my backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
