import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    minify: false,      // helps avoid memory issues on Render
    target: 'esnext'    // use modern JS (faster build)
  }
})