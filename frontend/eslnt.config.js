import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import react from 'eslint-plugin-react';

export default [
    {
        files: ['**/*.{js,jsx}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parserOptions: { ecmaFeatures: { jsx: true } },
        },
        env: {
            browser: true,
            es2021: true,
        },
        plugins: { react },
        rules: {
            'react/react-in-jsx-scope': 'off',
            'no-unused-vars': 'warn',
        },
    },
    js.configs.recommended,
    prettier,
];
