import pluginRouter from '@tanstack/eslint-plugin-router';
import js from '@eslint/js';
import react from 'eslint-plugin-react';
// @ts-expect-error no type declarations available
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['.output', '.vinxi'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{js,ts,tsx}'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        project: true,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      react,
      '@tanstack/router': pluginRouter,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      'react/prop-types': 'off',
      'no-duplicate-imports': 'error',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
    settings: { react: { version: 'detect' } },
  }
);
