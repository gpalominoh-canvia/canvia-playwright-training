import { test, expect } from '@playwright/test';

test('usuario bloqueado muestra mensaje de error', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('locked_out_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="error"]').click();
  await expect(page.locator('[data-test="error"]')).toBeVisible();
});
