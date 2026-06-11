import { test, expect } from '@playwright/test';

test('menu visible tras iniciar sesion exitosa', async ({ page }) => {
  await page.goto('/');

  await page.locator('[data-test="username"]').fill('standard_user');

  await page.locator('[data-test="password"]').fill('secret_sauce');

  await page.locator('[data-test="login-button"]').click();
  const menu = page.locator('#react-burger-menu-btn');

  await expect(page).toHaveURL(/inventory/);

  await expect(menu).toBeVisible();
});
