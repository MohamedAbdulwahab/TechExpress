import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // proxy settings
  server: {
    proxy: {
      '/api/products': {
        target: 'http://localhost:5500',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
