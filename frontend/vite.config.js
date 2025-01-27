import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@mui/icons-material'], // Add '@mui/icons-material' to the list
  },
  server: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // Point to my backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
