// eslint.config.js
import tsParser from '@typescript-eslint/parser';
import vueParser from 'vue-eslint-parser';
import eslintPluginVue from 'eslint-plugin-vue';
import eslintPluginTypeScript from '@typescript-eslint/eslint-plugin';

export default [
	{
		// 全局忽略文件
		ignores: [
			'**/node_modules',
			'**/dist',
			'**/*.d.ts',
			'**/auto-imports.d.ts',
			'**/components.d.ts'
		]
	},
	// Vue 文件配置
	{
		files: ['**/*.vue'],
		plugins: {
			vue: eslintPluginVue
		},
		languageOptions: {
			parser: vueParser,
			parserOptions: {
				parser: tsParser, // Vue 模板中解析 TypeScript
				sourceType: 'module',
				ecmaVersion: 'latest',
				extraFileExtensions: ['.vue']
			}
		},
		rules: {
			...eslintPluginVue.configs['vue3-recommended'],
			'vue/multi-word-component-names': 'off'
		}
	},
	// TypeScript 文件配置
	{
		files: ['**/*.ts', '**/*.tsx'],
		plugins: {
			'@typescript-eslint': eslintPluginTypeScript
		},
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				sourceType: 'module',
			}
		},
		rules: {
			...eslintPluginTypeScript.configs.recommended.rules,
			'@typescript-eslint/no-unused-vars': 'error'
		}
	},
	// // 通用 JavaScript 配置
	// {
	// 	files: ['**/*.js', '**/*.jsx'],
	// 	languageOptions: {
	// 		ecmaVersion: 'latest',
	// 		sourceType: 'module'
	// 	},
	// 	rules: {
	// 		'no-console': 'warn'
	// 	}
	// }
];