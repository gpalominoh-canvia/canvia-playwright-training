import { test, expect } from '@playwright/test';

test('validacion de menu hamburguesa luego de login', async ({ page }) => {
  // 1. Navegar a la página de login
  await page.goto('/');
  // 2. Ingresar credenciales y hacer login
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');
  // 3. Verificar que el menú hamburguesa esté visible
  await expect(page.locator('#react-burger-menu-btn')).toBeVisible();
});
