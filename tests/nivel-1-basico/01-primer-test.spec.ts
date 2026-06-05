import { test, expect } from '@playwright/test';

/**
 * NIVEL 1 — Clase 1: Primer test con Playwright.
 *
 * Objetivo: entender la estructura mínima de un test (test/expect),
 * navegar a una página y hacer una aserción básica.
 *
 * Sin patrones todavía: todo está "plano" dentro del test a propósito,
 * para enfocarnos en las APIs de Playwright.
 */

test('abrir la página de login muestra el formulario', async ({ page }) => {
  // 1. Navegar (usa baseURL de playwright.config.ts)
  await page.goto('/');

  // 2. Verificar que el campo de usuario está visible
  await expect(page.locator('[data-test="username"]')).toBeVisible();

  // 3. Verificar el texto del botón de login
  await expect(page.locator('[data-test="login-button"]')).toHaveValue('Login');
});

test('el título de la página es el esperado', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Swag Labs');
});
