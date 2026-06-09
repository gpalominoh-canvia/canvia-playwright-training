import { test, expect } from '@playwright/test';

//PRUEBA USUARIO INCORRECTO

test('Dante - Prueba de usuario incorrecto', async ({ page }) => {
  await page.goto('/');

  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('dante');
  await page.locator('[data-test="username"]').press('Tab');
  await page.locator('[data-test="password"]').fill('dante');
  await page.locator('[data-test="login-button"]').click();

  const error = page.locator('[data-test="error"]');
  await expect(error).toBeVisible();
  await expect(error).toContainText('Username and password do not match');
});