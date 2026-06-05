import { test as base } from '@playwright/test';
import { LoginPage } from '@pom/pages/LoginPage';
import { InventoryPage } from '@pom/pages/InventoryPage';

/**
 * Fixtures personalizados: inyectan los Page Objects ya instanciados
 * en cada test, evitando boilerplate de `new LoginPage(page)` en cada spec.
 *
 * Uso:
 *   import { test, expect } from '@pom/fixtures/pages.fixture';
 *   test('...', async ({ loginPage }) => { ... });
 */
type Pages = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
};

export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
});

export { expect } from '@playwright/test';
