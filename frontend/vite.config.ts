import { fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.BASEURL,
  server: {
    allowedHosts: ['1847-2601-1c2-200-13-947c-3ef-5b7d-3bc1.ngrok-free.app'],
    port: 8081,
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Your backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  },
  build: {
    outDir: '../backend/dist',
    emptyOutDir: true // also necessary
  },
  plugins: [
    vue(),
    vueDevTools()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    __APP_ENV__: JSON.stringify(process.env.APP_ENV || 'development')
  }
})
