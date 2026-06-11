import { test, expect } from '@playwright/test';

test('validar carrito', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  const primer_item=page.locator('[data-test="item-4-title-link"]');
  const nombrePrimerItem = await primer_item.textContent();
await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
await page.locator('[data-test="shopping-cart-link"]').click();
const item_carrito=page.locator('[data-test="item-4-title-link"]');
const nombreItemCarrito = await item_carrito.textContent();
await expect(nombreItemCarrito).toBe(nombrePrimerItem);

});