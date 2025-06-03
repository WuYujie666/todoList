import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vitest/config' //??????
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), vueDevTools()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    css: {
        devSourcemap: true,
    },
    test: {
        globals: true,
        environment: 'happy-dom',
        // 其他 Vitest 配置...
    },
    base: './', // 替换为你的实际仓库名
    build: {
        outDir: 'dist',
    },
})
