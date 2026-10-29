import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    rollupOptions: {
      // Duas páginas: a principal e /videos/ (acesso direto e botão voltar do navegador funcionam).
      input: {
        main: resolve(__dirname, 'index.html'),
        videos: resolve(__dirname, 'videos/index.html'),
      },
      output: {
        manualChunks: {
          ogl: ['ogl'],
        },
      },
    },
  },
})
