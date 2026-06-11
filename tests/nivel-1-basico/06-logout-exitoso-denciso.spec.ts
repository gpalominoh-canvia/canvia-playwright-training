import { test, expect } from '@playwright/test';

test('logout', async ({ page }) => {
  await page.goto('/');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  const hamburguesa = page.getByRole('button', { name: 'Open Menu' });

  await expect(hamburguesa).toBeVisible();

  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();

  const currentUrl = page.url();
  expect(currentUrl).toBe('https://www.saucedemo.com/');
});
