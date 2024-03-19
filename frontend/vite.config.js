import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    sourcemap: true,
  },
  server: {
    proxy: {
      // Proxying API requests to PocketBase
      '/api': {
        target: 'http://localhost:8090', // Target API endpoint
        changeOrigin: true, // Recommended for production environments
      },
    },
  },
});
