import { test, expect } from '@pom/fixtures/pages.fixture';
import { users } from '@pom/data/users';

/**
 * Suite de ejemplo: inicio de sesión en SauceDemo.
 * Sirve como referencia del patrón POM + fixtures para la capacitación.
 */
test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('login exitoso con usuario estándar', async ({ page, loginPage, inventoryPage }) => {
    await loginPage.login(users.standard.username, users.standard.password);

    await expect(page).toHaveURL(/inventory/);
    expect(await inventoryPage.getHeaderTitle()).toBe('Products');
    expect(await inventoryPage.getItemsCount()).toBeGreaterThan(0);
  });

  test('muestra error con credenciales inválidas', async ({ loginPage }) => {
    await loginPage.login(users.invalid.username, users.invalid.password);

    expect(await loginPage.getErrorMessage()).toContain('Username and password do not match');
  });

  test('muestra error con usuario bloqueado', async ({ loginPage }) => {
    await loginPage.login(users.locked.username, users.locked.password);

    expect(await loginPage.getErrorMessage()).toContain('locked out');
  });
});
