import { test, expect } from '@playwright/test';

test('agrega producto al carrito', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  const primer_item = page.locator('[data-test="item-4-title-link"]');
  // Usamos el operador ?? "" para asegurar que si es null, devuelva un string vacío
  const nombrePrimerItem = (await primer_item.textContent()) ?? '';

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();

  const item_carrito = page.locator('[data-test="item-4-title-link"]');
  // Pasamos el localizador directamente a expect, y la variable de texto limpia
  await expect(item_carrito).toHaveText(nombrePrimerItem);
});
