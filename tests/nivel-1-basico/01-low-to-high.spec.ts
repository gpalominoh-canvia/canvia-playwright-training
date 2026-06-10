import { test, expect } from '@playwright/test';

test('orden de productos por precio menor a mayor', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

  const priceTexts = await page.locator('.inventory_item_price').allTextContents();
  const prices = priceTexts.map((price) => Number(price.replace('$', '')));
  const lowestPrice = Math.min(...prices);

  expect(prices[0]).toBe(lowestPrice);
});
