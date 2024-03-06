import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import type { ConfigEnv } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import viteCompression from 'vite-plugin-compression'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import UnoCSS from 'unocss/vite'

// import { buildConfig } from './src/utils/build';

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir)
}

const alias: Record<string, string> = {
  '@': pathResolve('./src/'),
}

const viteConfig = defineConfig((mode: ConfigEnv) => {
  const env = loadEnv(mode.mode, process.cwd())
  return {
    plugins: [
      vue(),
      viteCompression(),
      UnoCSS({}),
      AutoImport({
        imports: [
          // 需要自动导入的插件，自定义导入的API
          'vue',
          'vue-router',
          'pinia',
          '@vueuse/core',
          // custom
          {
            axios: [
              // default imports
              ['default', 'axios'], // import { default as axios } from 'axios',
            ],
          },
        ],
        // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
        dts: 'src/auto-import.d.ts',
        vueTemplate: true,
      }),
      Components({
        dirs: ['src/composables'],
        // 配置文件生成位置
        dts: 'src/components.d.ts',
      }),
    ],
    root: process.cwd(),
    resolve: { alias },
    base: mode.command === 'serve' ? './' : env.VITE_PUBLIC_PATH,
    optimizeDeps: {
      exclude: ['vue-demi'],
    },
    server: {
      host: '0.0.0.0',
      port: env.VITE_PORT as unknown as number,
      open: JSON.parse(env.VITE_OPEN),
      hmr: true,
      proxy: {
        '/gitee': {
          target: 'https://gitee.com',
          ws: true,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/gitee/, ''),
        },
      },
    },
    build: {
      outDir: 'dist',
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
          manualChunks(id) {
            if (id.includes('node_modules'))
              return id.toString().match(/\/node_modules\/(?!.pnpm)(?<moduleName>[^\/]*)\//)?.groups!.moduleName ?? 'vender'
          },
        },
        // ...(JSON.parse(env.VITE_OPEN_CDN) ? { external: buildConfig.external } : {}),
      },
    },
    css: { preprocessorOptions: { css: { charset: false } } },
    define: {
      __NEXT_VERSION__: JSON.stringify(process.env.npm_package_version),
      __NEXT_NAME__: JSON.stringify(process.env.npm_package_name),
    },
  }
})

export default viteConfig
