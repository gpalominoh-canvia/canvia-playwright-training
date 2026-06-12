import { test, expect, type Page } from '@playwright/test';

/**
 * NIVEL 1 — Ejercicios resueltos (Issue #2).
 *
 * Tests planos (sin patrones). Reutilizamos un helper local de login para no
 * repetir las tres acciones en cada test; en el Nivel 2 esto se vuelve POM.
 */
async function login(page: Page, user = 'standard_user', pass = 'secret_sauce'): Promise<void> {
  await page.goto('/');
  await page.locator('[data-test="username"]').fill(user);
  await page.locator('[data-test="password"]').fill(pass);
  await page.locator('[data-test="login-button"]').click();
}

// 1. Menú visible tras login exitoso.
test('el botón de menú es visible tras iniciar sesión', async ({ page }) => {
  await login(page);
  await expect(page).toHaveURL(/inventory/);
  await expect(page.locator('#react-burger-menu-btn')).toBeVisible();
});

// 2. Mensaje de error del usuario bloqueado.
test('usuario bloqueado muestra mensaje de error', async ({ page }) => {
  await login(page, 'locked_out_user', 'secret_sauce');
  const error = page.locator('[data-test="error"]');
  await expect(error).toBeVisible();
  await expect(error).toContainText('Sorry, this user has been locked out');
});

// 3. Logout: login -> menú -> Logout -> volver a login.
test('logout regresa a la página de login', async ({ page }) => {
  await login(page);

  await page.locator('#react-burger-menu-btn').click();
  await page.locator('#logout_sidebar_link').click();

  await expect(page).toHaveURL(/saucedemo\.com\/?$/);
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();
});

// 4. Ordenar por "Price (low to high)" y validar el primer precio.
test('ordenar por precio ascendente deja el menor primero', async ({ page }) => {
  await login(page);

  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

  const textos = await page.locator('[data-test="inventory-item-price"]').allTextContents();
  const precios = textos.map((t) => Number(t.replace('$', '')));

  expect(precios[0]).toBe(Math.min(...precios));
  expect(precios).toEqual([...precios].sort((a, b) => a - b));
});

// 5. (Reto) Agregar un producto y validar el badge del carrito.
test('agregar un producto muestra el badge en 1', async ({ page }) => {
  await login(page);

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});
