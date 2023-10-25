import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default ({ mode }) =>
  defineConfig({
    plugins: [
      react(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(__dirname, 'src/assets/svg')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
        inject: 'body-first'
      })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          // 全局注入scss mixin
          additionalData: '@use "@/styles/mixin.scss" as *;'
        }
      }
    },
    build: {
      assetsDir: 'assets/images/',
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
        }
      },
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: ['development', 'qa'].includes(mode) ? false : true,
          drop_debugger: true
        }
      }
    },
    define: {
      'process.env': {}
    },
    resolve: {
      alias: {
        '~': '',
        '@': path.resolve(__dirname, 'src'),
        views: path.resolve(__dirname, './src/views'),
        components: path.resolve(__dirname, './src/components'),
        utils: path.resolve(__dirname, './src/utils'),
        assets: path.resolve(__dirname, './src/assets')
      }
    },
    server: {
      hmr: {
        overlay: false
      },
      port: 3001,
      host: true,
      proxy: {
        '/wapi': {
          target: 'http://hi-gw-qa.weizhipin.com', // 后面需要修改
          changeOrigin: true
        }
      }
    }
  })
