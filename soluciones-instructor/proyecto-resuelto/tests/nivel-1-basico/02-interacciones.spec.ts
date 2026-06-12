import { test, expect } from '@playwright/test';

/**
 * NIVEL 1 — Clase 2: Interacciones, localizadores y aserciones.
 *
 * Objetivo: llenar campos, hacer clic, leer texto y validar resultados.
 * Practicamos distintos tipos de localizadores y aserciones web-first.
 *
 * Seguimos sin patrones: el foco es dominar las acciones básicas.
 */

test('login exitoso redirige al inventario', async ({ page }) => {
  await page.goto('/');

  // Acciones sobre el formulario
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // Aserciones del resultado
  await expect(page).toHaveURL(/inventory/);
  await expect(page.locator('.title')).toHaveText('Products');
});

test('credenciales inválidas muestran mensaje de error', async ({ page }) => {
  await page.goto('/');

  await page.locator('[data-test="username"]').fill('usuario_invalido');
  await page.locator('[data-test="password"]').fill('clave_incorrecta');
  await page.locator('[data-test="login-button"]').click();

  const error = page.locator('[data-test="error"]');
  await expect(error).toBeVisible();
  await expect(error).toContainText('Username and password do not match');
});

test('contar la cantidad de productos listados', async ({ page }) => {
  // Login mediante acciones directas
  await page.goto('/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // Distintas formas de localizar y contar
  const productos = page.locator('.inventory_item');
  await expect(productos).toHaveCount(6);
});
