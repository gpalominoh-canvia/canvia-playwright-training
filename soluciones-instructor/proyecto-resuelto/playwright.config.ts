import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Carga variables desde .env si existe (no se versiona).
dotenv.config();

/**
 * Configuración base de Playwright para la capacitación.
 * La URL base se toma de la variable de entorno BASE_URL (ver .env.example),
 * con un valor por defecto apuntando al sitio de práctica SauceDemo.
 */
const BASE_URL = process.env.BASE_URL ?? 'https://www.saucedemo.com';
const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  // Tiempo máximo por test
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  // Falla el build en CI si quedó un test.only olvidado
  forbidOnly: isCI,
  // Reintentos solo en CI
  retries: isCI ? 2 : 0,
  // Un worker en CI para estabilidad; paralelo en local
  workers: isCI ? 1 : undefined,
  reporter: isCI
    ? [['github'], ['html', { open: 'never' }], ['list']]
    : [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10_000,
  },
  // Un "project" por nivel del curso. Permite ejecutar cada clase por separado:
  //   npx playwright test --project=nivel-1-basico
  //   npx playwright test --project=nivel-2-pom
  //   npx playwright test --project=nivel-3-screenplay
  // Todos corren en Chromium por defecto; agregar Firefox/WebKit es un ejercicio.
  projects: [
    {
      name: 'nivel-1-basico',
      testDir: './tests/nivel-1-basico',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'nivel-2-pom',
      testDir: './tests/nivel-2-pom',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'nivel-3-screenplay',
      testDir: './tests/nivel-3-screenplay',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      // NIVEL 5 — Ejercicio 2: el Nivel 1 también en Firefox.
      name: 'nivel-1-firefox',
      testDir: './tests/nivel-1-basico',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      // Pruebas de API: no usan navegador, solo el fixture `request`.
      // Tienen su propia baseURL (API pública de práctica).
      name: 'nivel-6-api',
      testDir: './tests/nivel-6-api',
      use: { baseURL: process.env.API_BASE_URL ?? 'https://jsonplaceholder.typicode.com' },
    },
  ],
});
