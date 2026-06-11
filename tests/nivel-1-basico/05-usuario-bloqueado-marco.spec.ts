import { test, expect } from '@playwright/test';

test('validar usuario bloqueado', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('locked_out_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
    const error=page.locator('[data-test="error"]')
await expect(error).toBeVisible();
await expect(error).toContainText(
    'Epic sadface: Sorry, this user has been locked out.'
);
});