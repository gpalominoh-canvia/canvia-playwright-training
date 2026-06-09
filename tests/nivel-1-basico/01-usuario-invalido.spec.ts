import { test, expect } from '@playwright/test';

test('usuario invalido muestra mensaje de error', async ({ page }) => {
  await page.goto('/');

  await page.locator('[data-test="username"]').fill('standar_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await expect(page.locator('[data-test="error"]')).toBeVisible();
});
