import { test, expect } from '@playwright/test';

test('Dante - usuario bloqueado muestra mensaje de error', async ({ page }) => {

  await page.goto('/');

  await page.locator('[data-test="username"]').fill('locked_out_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  const mensajeError = page.locator('[data-test="error"]');

  await expect(mensajeError).toBeVisible();

  await expect(mensajeError).toHaveText(
    'Epic sadface: Sorry, this user has been locked out.'
  );

});