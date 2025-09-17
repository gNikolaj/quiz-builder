import js from '@eslint/js';
import prettier from 'eslint-config-prettier';

export default [
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
        env: {
            node: true,
            es2021: true,
        },
        rules: {
            'no-unused-vars': 'warn',
        },
    },
    js.configs.recommended,
    prettier,
];
