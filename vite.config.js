import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 自动导入 API，例如 `ref`、`reactive` 以及 Element Plus 的方法
import AutoImport from 'unplugin-auto-import/vite'
// 自动导入组件，使用组件时无需逐个手动 import
import Components from 'unplugin-vue-components/vite'
// Element Plus 组件解析器，配合自动导入插件使用
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// Element Plus 样式按需加载，并支持自定义主题变量
import ElementPlus from 'unplugin-element-plus/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // 启用 Vue 单文件组件支持
    vue(),
    // 自动导入常用 API 和 Element Plus 相关方法
    AutoImport({
      resolvers: [ElementPlusResolver(
          { importStyle: 'sass' }
      )],
    }),
    // 自动注册组件，减少重复导入代码
    Components({
      resolvers: [ElementPlusResolver(
          { importStyle: 'sass' }
      )],
    }),

    // 使用源码样式，便于通过 Sass 覆盖 Element Plus 默认主题
    ElementPlus({
      useSource: true,
    }),
  ],
  resolve: {
    alias: {
      // `@` 指向 `src` 目录，方便项目内路径引用
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 所有 scss 文件默认注入全局样式和变量
        additionalData: `
          @use "@/assets/css/index.scss" as *;
        `,
      }
    }
  }
})
