import { test, expect } from '@playwright/test';

test('logout regresa a la pagina de login', async ({ page }) => {
  await page.goto('/');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await page.locator('#react-burger-menu-btn').click();
  await page.locator('[data-test="logout-sidebar-link"]').click();

  await expect(page.locator('[data-test="username"]')).toBeVisible();
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();
});
