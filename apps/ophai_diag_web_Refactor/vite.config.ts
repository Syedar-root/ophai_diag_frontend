import path from 'path'
import {mergeConfig} from 'vite'
import svgLoader from 'vite-svg-loader'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Inspect from 'vite-plugin-inspect'
import baseConfig from "../../core/configs/vite/vite.base.config"
import viteCompression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';
import ElementPlus from "unplugin-element-plus/vite";

const pathSrc = path.resolve(__dirname, 'src')

export default mergeConfig(baseConfig,{
  assetsInclude: ['**/*.onnx'], // 添加这一行
  resolve: {
    alias: {
      '@': pathSrc,
      '@assets': path.resolve(__dirname, './src/shared/assets')
    }
  },
  plugins: [
    viteCompression({
      algorithm: 'gzip', // 压缩算法，可选 'gzip' 或 'brotli'
      ext: '.gz', // 生成的压缩文件后缀
      threshold: 10240, // 仅对大于 10KB 的文件进行压缩
      deleteOriginFile: false // 是否删除原始文件（建议保留）
    }),
    visualizer({
      open: false, // 构建后自动打开报告
      filename: 'stats.html', // 分析文件名
      gzipSize: true, // 显示 Gzip 压缩后大小
      brotliSize: true // 显示 Brotli 压缩后大小
    }),
    svgLoader({
      svgoConfig: {
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false
              }
            }
          }
        ]
      }
    }),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: "src/auto-import.d.ts",
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      dts: true,
      dirs: ['src/**'],
      resolvers: [
          ElementPlusResolver({importStyle: 'sass'}),
      ],
    }),
    ElementPlus({
      useSource: true,
      defaultLocale: 'zh-cn',
    }),

    Inspect(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/shared/assets/styles/element-vars.scss" as *;
                          @use "@/shared/assets/styles/vars.scss" as *;`
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        // 入口文件命名规则（如 main.js）
        entryFileNames: '[name]-[hash].js',
        // 代码分割的 chunk 文件命名规则（如 chunk-123.js）
        chunkFileNames: 'chunks/[name]-[hash].js',
        // 静态资源（图片、字体等）命名规则
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },

})
