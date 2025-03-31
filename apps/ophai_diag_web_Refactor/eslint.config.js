import tsParser from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser'
import eslintConfig from "../../eslint.config.js";
import path from "path";
export default [
    // ...eslintConfig,
  {
    ignores: ['node_modules', 'eslint-config.js', '*/auto-imports.d.ts', '*/components.d.ts'],
    files: ['src/**/*.ts', 'src/**/*.vue'],
    rules: {
      'no-console': 'off',
      // 'no-unused-vars': 'error'
    },
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  }
]
