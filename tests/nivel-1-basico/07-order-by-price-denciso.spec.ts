import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL as string;

test('order by', async ({ page }) => {
  await page.goto(BASE_URL);

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  const hamburguesa = page.getByRole('button', { name: 'Open Menu' });

  await expect(hamburguesa).toBeVisible();

  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

  const low_price = parseFloat(
    (await page.locator('[data-test="inventory-item-price"]').nth(0).innerText())
      .replace('$', '')
      .trim(),
  );
  const high_price = parseFloat(
    (await page.locator('[data-test="inventory-item-price"]').nth(1).innerText())
      .replace('$', '')
      .trim(),
  );

  const difference = high_price - low_price;
  expect(difference).toBeGreaterThan(0);
});
