import { test, expect } from '@playwright/test';

test('agregar producto y validar carrito', async ({ page }) => {
  await page.goto('/');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  const carrito = page.locator('[data-test="shopping-cart-badge"]');

  await expect(carrito).toHaveText('1');
});
