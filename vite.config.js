import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    allowedHosts: [
      '.vercel.app',
    ],
    proxy: {
      '/api': {
        target: 'https://brandcraftai-backend.onrender.com',
        changeOrigin: true,
      },
    },
  },
});