import { test, expect } from '@pom/fixtures/pages.fixture';
import { users } from '@pom/data/users';
import { products } from '@pom/data/products';

/**
 * NIVEL 2 — Ejercicios 2 y 5 (Issue #3).
 * Carrito con Page Objects + fixtures. El test no contiene ningún selector.
 */
test.describe('Carrito (POM)', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  // Ej. 2 — método addProductByName + contador del carrito.
  test('agregar un producto incrementa el contador del carrito', async ({ inventoryPage }) => {
    expect(await inventoryPage.getCartBadgeCount()).toBe(0);

    await inventoryPage.addProductByName(products.backpack);

    expect(await inventoryPage.getCartBadgeCount()).toBe(1);
  });

  // Ej. 5 (reto) — el reto del Nivel 1 refactorizado con Page Objects.
  test('reto N1 refactorizado: badge en 1 tras agregar (POM)', async ({
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.addProductByName(products.backpack);

    expect(await cartPage.getBadgeCount()).toBe(1);

    await cartPage.open();
    expect(await cartPage.getItemsCount()).toBe(1);
  });
});
