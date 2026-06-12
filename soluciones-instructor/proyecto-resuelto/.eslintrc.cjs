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
  overrides: [
    {
      // Los step definitions de Cucumber usan `expect` fuera de un bloque
      // `test()`, por lo que desactivamos las reglas del plugin de Playwright.
      files: ['src/nivel-4-bdd/**/*.ts', 'src/nivel-4.1-bdd-screenplay/**/*.ts'],
      rules: {
        'playwright/no-standalone-expect': 'off',
        'playwright/expect-expect': 'off',
        'playwright/missing-playwright-await': 'off',
      },
    },
  ],
};
