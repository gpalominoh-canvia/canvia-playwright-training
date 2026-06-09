import { test, expect } from '@playwright/test';

test('usuario invalido', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('marco');
  await page.locator('[data-test="password"]').fill('marco');
  await page.locator('[data-test="login-button"]').click();
  const error = page.locator('[data-test="error"]');
  await expect(error).toBeVisible();
  await expect(error).toContainText(
    'Epic sadface: Username and password do not match any user in this service',
  );
});