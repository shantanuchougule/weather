import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['antd'],
  },
  build: {
    target: 'esnext', // optional, ensures modern build
    rollupOptions: {
      external: [], // do not externalize any packages
      output: {
        manualChunks: undefined, // avoids splitting issues
      },
    },
    commonjsOptions: {
      transformMixedEsModules: true, // handles CJS/ESM edge cases
    },
  },
})
