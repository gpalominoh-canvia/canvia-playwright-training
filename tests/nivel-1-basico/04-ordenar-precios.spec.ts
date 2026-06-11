import { test, expect } from '@playwright/test';

test('ordenar por precio menor a mayor', async ({ page }) => {
  await page.goto('/');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

  const precios = await page.locator('[data-test="inventory-item-price"]').allInnerTexts();

  const numeros = precios.map((p) => Number(p.replace('$', '')));

  expect(numeros[0]).toBe(Math.min(...numeros));
});
