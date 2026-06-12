import { test as base } from '@playwright/test';
import { LoginPage } from '@pom/pages/LoginPage';
import { InventoryPage } from '@pom/pages/InventoryPage';
import { CartPage } from '@pom/pages/CartPage';

/**
 * Fixtures personalizados: inyectan los Page Objects ya instanciados
 * en cada test, evitando boilerplate de `new LoginPage(page)` en cada spec.
 *
 * NIVEL 2 — Ejercicio 3: se expone además `CartPage` por el fixture.
 *
 * Uso:
 *   import { test, expect } from '@pom/fixtures/pages.fixture';
 *   test('...', async ({ loginPage, cartPage }) => { ... });
 */
type Pages = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
};

export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
});

export { expect } from '@playwright/test';
