import path from 'path'
import {mergeConfig } from 'vite'
import svgLoader from 'vite-svg-loader'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Inspect from 'vite-plugin-inspect'
import baseConfig from "../../core/configs/vite/vite.base.config"


const pathSrc = path.resolve(__dirname, 'src')

export default mergeConfig(baseConfig,{
  resolve: {
    alias: {
      '@': pathSrc,
      '@assets': path.resolve(__dirname, './src/shared/assets')
    }
  },
  plugins: [
    // Vue(),
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
      resolvers: [ElementPlusResolver({importStyle: 'sass'})],
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

})
