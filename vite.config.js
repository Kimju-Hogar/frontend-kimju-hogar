import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: true,
        port: 5173
    },
    build: {
        minify: 'terser',
        chunkSizeWarningLimit: 1000,
    }
})
