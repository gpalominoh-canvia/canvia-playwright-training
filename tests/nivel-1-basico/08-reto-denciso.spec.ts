import { test, expect } from '@playwright/test';

test('reto', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  const hamburguesa = page.getByRole('button', { name: 'Open Menu' });

  await expect(hamburguesa).toBeVisible();

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  const badge = parseInt(
    (await page.locator('[data-test="shopping-cart-badge"]').innerText()).trim(),
    10,
  );

  expect(badge).toBe(1);
});
