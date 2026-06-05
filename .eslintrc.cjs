/* Configuración de ESLint para el framework de pruebas. */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'playwright'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:playwright/recommended',
  ],
  env: {
    node: true,
    es2022: true,
  },
  ignorePatterns: [
    'node_modules/',
    'playwright-report/',
    'test-results/',
    'dist/',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
  },
};
