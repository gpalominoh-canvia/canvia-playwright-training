import { test, expect } from '@playwright/test';

//PRUEBA USUARIO SE LOGEA Y CIERRA SESIÓN

test('Dante - volver al login', async ({ page }) => {
  await page.goto('/');

  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
  await expect(page).toHaveURL(/saucedemo/);

  await expect(page.locator('[data-test="login-button"]')).toBeVisible();

});

