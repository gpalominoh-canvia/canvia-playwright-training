import { test, expect } from '@playwright/test';

//PRUEBA DE ORDENAR PRODUCTOS DE MENOR A MAYOR Y VALIDAR

test('Dante - Ordenar productos', async ({ page }) => {
 await page.goto('/');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
  const primerPrecio = page.locator('.inventory_item_price').first();

  await expect(primerPrecio).toHaveText('$7.99');

});