import { defineConfig } from 'vite';

export default defineConfig({
  build: {
      outDir: 'dist', // Directorio de salida
      rollupOptions: {
          output: {
              manualChunks: undefined,
              entryFileNames: 'bundle.js', // Nombre del archivo de salida
              chunkFileNames: 'bundle.js',
              assetFileNames: 'bundle.[ext]',
          },
      },
  },
});