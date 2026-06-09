import { test, expect } from '@playwright/test';

test('validar logout', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
const primer_item=page.locator('[data-test="inventory-item-description"]').first();
await expect(primer_item).toContainText(
  '$7.99'
);
});