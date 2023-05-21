import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as dotenv from 'dotenv';

export default ({ mode }) => {
  dotenv.config({ path: `./.env.${mode}` });
  // now you can access config with process.env.{configName}

  // https://vitejs.dev/config/
  return defineConfig({
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
};
