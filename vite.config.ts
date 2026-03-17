import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': '/src' } },
  build: { outDir: 'dist', sourcemap: false, rollupOptions: { output: { manualChunks: { vendor: ['react', 'react-dom'] } } } },
  server: { port: 5173, host: true },
  preview: { port: 4173, host: true },
})
