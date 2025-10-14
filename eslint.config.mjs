// @ts-check

import eslint from '@eslint/js'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'

export default defineConfig(
    {
        ignores: ['dist', 'node_modules', 'eslint.config.mjs', 'tsconfig.json'],
    },
    eslint.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootdir: import.meta.dirname,
            },
        },
    },
    {
        rules: {
            // 'no-console': 'error',
            // 'dot-notation': 'error',
        },
    },
)
