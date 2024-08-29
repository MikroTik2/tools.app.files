import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
    ],
    
    css: {
        postcss: {
            plugins: [tailwind(), autoprefixer()],
        },
    },

    optimizeDeps: {
        exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/util']
    },

    server: {
        headers: {
          'Cross-Origin-Opener-Policy': 'same-origin',
          'Cross-Origin-Embedder-Policy': 'require-corp'
        }
    },

    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
});
