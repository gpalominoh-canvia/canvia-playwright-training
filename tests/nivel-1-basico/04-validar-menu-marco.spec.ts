import { test, expect } from '@playwright/test';

test('validar boton menu visible', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
const menu_boton=page.getByRole('button', { name: 'Open Menu' });
await expect(menu_boton).toBeVisible();
});