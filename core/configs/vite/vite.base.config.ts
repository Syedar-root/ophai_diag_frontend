// configs/vite/vite.base.config.ts
import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import path from "path";
// 基础配置（通用插件、别名、代理等）
export default defineConfig({
  plugins: [Vue()],
  resolve: {
	alias: {
	  "@": path.resolve(__dirname,"src"), // 通用别名
	  "@core": path.resolve(__dirname, "../../core"),
	},
  },
});