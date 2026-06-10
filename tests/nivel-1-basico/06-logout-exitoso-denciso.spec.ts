import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL as string;

test('logout', async ({ page }) => {
  await page.goto(BASE_URL);

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  const hamburguesa = page.getByRole('button', { name: 'Open Menu' });

  await expect(hamburguesa).toBeVisible();

  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();

  const currentUrl = page.url();
  expect(currentUrl).toBe(BASE_URL);
});
