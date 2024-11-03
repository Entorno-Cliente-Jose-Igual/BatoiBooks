import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    watch: {
      usePolling: true, // This can help in some environments
    },
  },
});