import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => { // Access the current mode
  const env = loadEnv(mode, process.cwd()); // Load env vars based on mode

  return {
    plugins: [react()],
    server: {
      port: 8080,
      proxy: {
        '/api': {
          target: env.VITE_BACKEND_BASEURL, // Use env here
          changeOrigin: true,
          secure: false, // Set to true for HTTPS in production
        },
      },
    },
  };
});