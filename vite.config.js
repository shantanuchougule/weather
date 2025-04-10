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
    include: ['antd'], // <-- force include antd for optimization
  },
  build: {
    rollupOptions: {
      external: [], // <-- tell Rollup NOT to externalize any modules
    },
  },
})
