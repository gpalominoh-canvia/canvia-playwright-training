import { test, expect } from '@playwright/test';

test('login exitoso', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  const hamburguesa = page.getByRole('button', { name: 'Open Menu' });

  await expect(hamburguesa).toBeVisible();
});
