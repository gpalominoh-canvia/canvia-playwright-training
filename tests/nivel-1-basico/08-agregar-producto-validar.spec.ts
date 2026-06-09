import { test, expect } from '@playwright/test';

//PRUEBA DE AGREGAR PRODUCTOS Y VALIDAR EL BADGE

test('Dante - Ordenar productos', async ({ page }) => {
 await page.goto('/');

  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
 

  await page.locator('[data-test="shopping-cart-link"]').click();

await expect(page.locator('.shopping_cart_badge')).toHaveText('4');

});
